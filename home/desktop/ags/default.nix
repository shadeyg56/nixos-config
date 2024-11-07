{ inputs, pkgs, ... }:
{
  programs.ags = {
    enable = true;
    configDir = ../ags;
    
    extraPackages = with inputs.ags.packages.${pkgs.system}; [
      hyprland
    ];
  };
}
