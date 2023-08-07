{ pkgs, lib, config, inputs, ... }:
{
  home.file.".config/hypr" ={
    source = "./";
    recursive = true;
  };

  wayland.windowManager.hyprland.enable = true;
} 
