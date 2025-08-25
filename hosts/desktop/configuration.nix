{
  inputs,
  config,
  pkgs,
  lib,
  ...
}:
{
  imports = [
    # Include the results of the hardware scan.
    ./hardware-configuration.nix
  ];

  nix.settings.experimental-features = [
    "nix-command"
    "flakes"
  ];
  nix.settings = {
    substituters = [
      "https://hyprland.cachix.org"
      "https://shades-nixos-config.cachix.org"
      "https://cache.nixos.org"
    ];
    trusted-public-keys = [
      "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
      "shades-nixos-config.cachix.org-1:MOIJALAf3hYttmgh8QA6NAN6kwXFLg0THonAkGsfbGs="
    ];
  };

  # allow proprietary packages
  nixpkgs.config.allowUnfree = true;

  environment.systemPackages = with pkgs; [
    git
    vim
    wget
    curl
    gnumake
    nix-prefetch-github
    virtiofsd
    cachix
    nh
  ];

  environment.sessionVariables.NIXOS_OZONE_WL = "1";
  # fixes Eclipse wayland crashing
  environment.sessionVariables.WEBKIT_DISABLE_DMABUF_RENDERER = "1";
  environment.variables.QT_STYLE_OVERRIDE = lib.mkForce "";
  environment.variables.QT_QPA_PLATFORMTHEME = lib.mkForce "qt5ct";

  fonts.packages = with pkgs; [
    nerd-fonts.jetbrains-mono
    nerd-fonts.ubuntu-mono
    nerd-fonts.ubuntu
    font-awesome
    noto-fonts
    material-design-icons
  ];

  # EFI and Bootloader

  boot.loader.efi.efiSysMountPoint = "/boot";
  boot.loader.efi.canTouchEfiVariables = true;

  boot.loader.grub = {
    enable = true;
    default = "saved";
    efiSupport = true;
    useOSProber = true;
    configurationLimit = 10;
    devices = [ "nodev"] ; # efi only
    theme = (pkgs.callPackage ../../pkgs/catppuccin-grub.nix { });
  };

  boot.kernelPackages = inputs.nixpkgs.legacyPackages."x86_64-linux".linuxPackages_latest;

  # Garbage Collection
  nix.gc = {
    automatic = true;
    dates = "weekly";
  };

  networking.hostName = "desktop";
  networking.networkmanager.enable = true;
  networking.nameservers = [ "1.1.1.1" ];

  time.timeZone = "America/Chicago";

  # Enable the X11 windowing system.
  services.xserver.enable = true;
  services.xserver.desktopManager.cinnamon.enable = true;
  services.displayManager = {
    sddm = {
      enable = true;
      wayland.enable = true;
      sugarCandyNix = {
        enable = true;
        settings = {
          Background = lib.cleanSource ../../home/desktop/wallpapers/nixos-catppuccin.png;
          ScreenWidth = 1920;
          ScreenHeight = 1080;
          FormPosition = "left";
          #Catppuccin Macchiato Lavender
          AccentColor = "#b7bdf8";
          Font = "JetBrainsMono Nerd Font";
        };
      };
    };
  };

  services.gvfs.enable = true;

  #Enable policykit
  security.polkit.enable = true;

  #fix swaylock not accepting password
  security.pam.services.swaylock.text = ''
    # PAM configuration file for the swaylock screen locker. By default, it includes
    # the 'login' configuration file (see /etc/pam.d/login)
    auth include login
  '';

  # Enable CUPS to print documents.
  services.printing.enable = true;
  services.printing.drivers = [ pkgs.hplip ];

  # Enable sound.
  hardware.pulseaudio.enable = false;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    wireplumber = {
      enable = true;
      extraConfig = {
        "10-disable-camera" = {
          "wireplumber.profiles" = {
            main."monitor.libcamera" = "disabled";
          };
        };
        bluetoothEnchancements = {
          "wireplumber.settings" = {
            "bluetooth.autoswitch-to-headset-profile" = false;
          };
        };
      };
    };
  };

  hardware.bluetooth = {
    enable = true;
    powerOnBoot = false;
  };

  hardware.graphics.enable32Bit = true;

  # Enable touchpad support (enabled default in most desktopManager).
  services.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.shadeyg56 = {
    isNormalUser = true;
    extraGroups = [
      "networkmanager"
      "wheel"
      "libvirtd"
      "qemu-libvirtd"
    ];
    shell = pkgs.zsh;
    packages = with pkgs; [
      firefox
      tree
    ];
  };

  virtualisation.libvirtd.enable = true;
  virtualisation.podman.enable = true;

  programs.hyprland = {
    enable = true;
    package = inputs.hyprland.packages.${pkgs.system}.hyprland;
  };

  programs.zsh.enable = true;

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;
  programs.ssh.askPassword = "";

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It's perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.05"; # Did you read the comment?
}
