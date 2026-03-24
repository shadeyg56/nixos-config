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

  # disable linking hyprland.conf since we include it as
  # extraConfig below. This prevents a warning from
  # being thrown by the module
  home.file.".config/hypr/hyprland.conf".enable = false;

  #set up polkit
  home.file."polkit-kde-authentication-agent-1".source =
    "${pkgs.kdePackages.polkit-kde-agent-1}/libexec/polkit-kde-authentication-agent-1";

  wayland.windowManager.hyprland = {
    enable = true;
    extraConfig = "${builtins.readFile ./hyprland.conf}";

  };
}
