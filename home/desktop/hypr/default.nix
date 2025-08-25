{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
{
  home.file.".config/hypr" = {
    source = ../hypr;
    recursive = true;
  };

  #set up polkit
  home.file."polkit-kde-authentication-agent-1".source = "${pkgs.kdePackages.polkit-kde-agent-1}/libexec/polkit-kde-authentication-agent-1";

  wayland.windowManager.hyprland.enable = true;
}
