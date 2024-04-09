{
  pkgs,
  config,
  inputs,
  ...
}:
{
  programs.waybar = {
    enable = true;
  };
  home.file.".config/waybar" = {
    source = ../waybar;
    recursive = true;
  };

  home.packages = with pkgs; [ (callPackage ./mediaplayer.nix { }) ];
}
