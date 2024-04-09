{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
{
  home.file.".config/hypr" = {
    source = ../hyprland;
    recursive = true;
  };

  #set up polkit
  home.file."polkit-kde-authentication-agent-1".source = "${pkgs.libsForQt5.polkit-kde-agent}/libexec/polkit-kde-authentication-agent-1";

  wayland.windowManager.hyprland.enable = true;
}
