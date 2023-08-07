{ config, pkgs, inputs, ...}:

{
    home.username = "shadeyg56";
    home.homeDirectory = "/home/shadeyg56";
    home.stateVersion = "23.05";
    programs.home-manager.enable = true;

    home.packages = with pkgs; [
      neofetch
      vscode
      kitty
      zsh
    ];

    imports = [
	    inputs.hyprland.homeManagerModules.default
	    ./desktop
      ./terminal
    ];
}

