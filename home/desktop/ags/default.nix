{ inputs, pkgs, ... }:
{
  programs.ags = {
    enable = true;
    configDir = ../ags-v2;
    
    extraPackages = with inputs.ags.packages.${pkgs.system}; [
      hyprland
      wireplumber
      battery
      network
      mpris
    ];
  };
}
