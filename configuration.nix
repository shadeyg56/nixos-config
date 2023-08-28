# Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running `nixos-help`).

{ inputs, config, pkgs, lib, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
      #/home/shadeyg56/nixos-config/pkgs/auto-cpufreq
    ];
  
  nix.settings.experimental-features = [ "nix-command" "flakes"];
  nix.settings = {
    substituters = ["https://hyprland.cachix.org"];
    trusted-public-keys = ["hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="];
  };

  # allow proprietary packages
  nixpkgs.config.allowUnfree = true;
  # enable the NUR (Nix's version of the AUR)
  nixpkgs.config.packageOverrides = pkgs: {
    nur = import (builtins.fetchTarball "https://github.com/nix-community/NUR/archive/master.tar.gz") {
      inherit pkgs;
    };
  };

  environment.systemPackages = with pkgs; [
    git
    vim
    wget
    curl
    gnumake
    nix-prefetch-github
    virtiofsd

    # custom python packages
    (callPackage ./pkgs/setuptools-git-versioning.nix {}) 
    (callPackage ./pkgs/auto-cpufreq { })
    
  ];

  environment.sessionVariables.NIXOS_OZONE_WL = "1";
  environment.variables.QT_STYLE_OVERRIDE = lib.mkForce "";
  environment.variables.QT_QPA_PLATFORMTHEME = lib.mkForce "qt5ct";

  fonts.fonts = with pkgs; [
    (nerdfonts.override { fonts = [ "JetBrainsMono" ]; })
    font-awesome
  ];

  # EFI and Bootloader

  boot.loader.efi.efiSysMountPoint = "/boot";
  boot.loader.efi.canTouchEfiVariables = true;

  boot.loader.grub = {
    enable = true;
    efiSupport = true;
    useOSProber = true;
    configurationLimit = 10;
    device = "nodev"; # efi only
    theme = (pkgs.callPackage ./pkgs/catppuccin-grub.nix { });
  };
 
  boot.kernelPackages = pkgs.linuxPackages_latest;

  #build and load custom drivers
  boot.extraModulePackages = with config.boot.kernelPackages; [
    (callPackage ./pkgs/acer-wmi-battery.nix {})
  ];
  boot.kernelModules = [ "acer-wmi-battery" ];

  # Garbage Collection
  nix.gc = {
    automatic = true;
    dates = "weekly";
    options = "--delete-older-than 1w";
  };

  networking.hostName = "nixos"; # Define your hostname.
  networking.networkmanager.enable = true;
  networking.nameservers = [ "1.1.1.1" ];

  # Set your time zone.
  time.timeZone = "America/Chicago";

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Select internationalisation properties.
  # i18n.defaultLocale = "en_US.UTF-8";
  # console = {
  #   font = "Lat2-Terminus16";
  #   keyMap = "us";
  #   useXkbConfig = true; # use xkbOptions in tty.
  # };

  # Enable the X11 windowing system.
  services.xserver = {
     enable = true;
     desktopManager.cinnamon.enable = true;
     displayManager.sddm = {
      enable = true;
      sugarCandyNix = {
        enable = true;
        settings = {
          Background = ./desktop/wallpapers/nixos.png;
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

#Enable policykit
security.polkit.enable = true;

#fix swaylock not accepting password
security.pam.services.swaylock.text = ''
  # PAM configuration file for the swaylock screen locker. By default, it includes
  # the 'login' configuration file (see /etc/pam.d/login)
  auth include login
'';
  

  # Configure keymap in X11
  # services.xserver.layout = "us";
  # services.xserver.xkbOptions = "eurosign:e,caps:escape";

  # Enable CUPS to print documents.
  services.printing.enable = true;
  services.printing.drivers = [ pkgs.hplip ];

  #Enable auto-cpufreq system wide
  services.auto-cpufreq.enable = true;

  

  # Enable sound.
  hardware.pulseaudio.enable = false;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
  };

  hardware.opengl.driSupport32Bit = true;

  # Enable touchpad support (enabled default in most desktopManager).
  services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.shadeyg56 = {
  	isNormalUser = true;
  	extraGroups = [ "networkmanager" "wheel" "libvirtd" "qemu-libvirtd" ]; # Enable ‘sudo’ for the user.
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

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;
  programs.ssh.askPassword = "";

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # Copy the NixOS configuration file and link it from the resulting system
  # (/run/current-system/configuration.nix). This is useful in case you
  # accidentally delete configuration.nix.
  # system.copySystemConfiguration = true;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It's perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.05"; # Did you read the comment?

}

