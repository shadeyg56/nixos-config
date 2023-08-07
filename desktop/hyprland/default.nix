{ pkgs, lib, config, inputs, ... }:
{
  home.file.".config/hypr" ={
    source = /etc/nixos/desktop/hyprland;
    recursive = true;
  };

  wayland.windowManager.hyprland.enable = true;
} 
