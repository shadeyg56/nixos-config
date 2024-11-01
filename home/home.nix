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
    neofetch
    kitty
    zsh
    cava
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
    dolphin
    brightnessctl
    libsForQt5.polkit-kde-agent
    bluez
    blueman
    pavucontrol
    playerctl
    hyprpaper
    grim
    slurp
    pamixer
    libreoffice-fresh
    okular
    virt-manager
    filezilla
    prismlauncher
    moonlight-qt
    steam
    stremio
    ungoogled-chromium
    icon-library
    ventoy-full
    imagemagick
    (callPackage ../pkgs/adios.nix { })
    (callPackage ../pkgs/marie-sim.nix { })

    # system
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
    lightly-qt
    libsForQt5.qt5ct
    catppuccin-gtk
  ];

  imports = [
    inputs.hyprland.homeManagerModules.default
    inputs.ags.homeManagerModules.default
    ./desktop
    ./terminal
    ./programs
    ./system
  ];
}
