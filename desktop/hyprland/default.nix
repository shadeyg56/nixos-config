{ pkgs, lib, config, inputs, ... }:
{
  home.file.".config/hypr" = {
    source = ../hyprland;
    recursive = true;
  };

  wayland.windowManager.hyprland.enable = true;
} 
