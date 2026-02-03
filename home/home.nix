{
  config,
  pkgs,
  inputs,
  ...
}:

{
  home.username = "shadeyg56";
  home.homeDirectory = "/home/shadeyg56";
  home.stateVersion = "23.05";
  programs.home-manager.enable = true;

  home.packages = with pkgs; [

    # terminal
    fastfetch
    kitty
    zsh
    inputs.nixpkgs-pinned.legacyPackages.${pkgs.stdenv.hostPlatform.system}.cava
    btop
    htop
    dialog
    cbonsai
    cmatrix
    direnv
    nix-direnv
    wl-clipboard
    hugo
    gh

    # programs
    vscode-fhs
    eclipses.eclipse-java
    logisim
    (discord.override { withVencord = true; })
    wofi
    spicetify-cli
    swaylock-effects
    kdePackages.dolphin
    brightnessctl
    kdePackages.polkit-kde-agent-1
    bluez
    blueman
    pavucontrol
    playerctl
    hyprpaper
    grim
    slurp
    pamixer
    libreoffice-fresh
    kdePackages.okular
    virt-manager
    filezilla
    prismlauncher
    moonlight-qt
    steam
    heroic
    ungoogled-chromium
    icon-library
    # Removing ventoy for time being in light of https://github.com/ventoy/Ventoy/issues/3224
    #ventoy-full
    imagemagick
    obsidian
    proton-pass
    inputs.azzipkgs.packages.${pkgs.stdenv.hostPlatform.system}.stremio-linux-shell

    (callPackage ../pkgs/adios.nix { })
    (callPackage ../pkgs/marie-sim.nix { })

    # system
    inputs.saturn.packages.${pkgs.stdenv.hostPlatform.system}.default
    udev
    podman
    distrobox
    pipewire
    glibc
    gcc
    python312
    winetricks
    wineWowPackages.waylandFull
    jdk17
    nixd
    hypridle
    # use spicetify adblock instead
    #(callPackage ./pkgs/spotify-adblock.nix { })

    # themes
    darkly
    libsForQt5.qt5ct
    catppuccin-gtk
  ];

  imports = [
    inputs.hyprland.homeManagerModules.default
    ./desktop
    ./terminal
    ./programs
    ./system
  ];
}
