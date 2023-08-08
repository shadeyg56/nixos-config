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

    ];

    imports = [
	    inputs.hyprland.homeManagerModules.default
	    ./desktop
      ./terminal
      ./programs
    ];
}

