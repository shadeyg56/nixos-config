{ config, pkgs, inputs, ...}:

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

      # programs
      vscode
      discord
      spotify
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
      swayidle
      pamixer
      libreoffice-fresh
      okular
      (callPackage ./pkgs/adios.nix { })

      # themes
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

