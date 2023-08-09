{ pkgs, config, inputs, ... }:
{
    programs.waybar = {
        enable = true;
        package = inputs.hyprland.packages.x86_64-linux.waybar-hyprland;
    };
    home.file.".config/waybar" = {
        source = ../waybar;
        recursive = true;
    };

}