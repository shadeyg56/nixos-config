{ inputs, pkgs, ... }:
{
  programs.ags = {
    enable = true;

    configDir = ../ags;
  };
}
