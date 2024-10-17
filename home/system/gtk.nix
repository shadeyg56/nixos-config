{ pkgs, inputs, ... }:
{
  imports = [ inputs.catppuccin.homeManagerModules.catppuccin ];

  gtk = {
    enable = true;
    catppuccin= {
      enable = true;
      flavor = "macchiato";
      accent = "lavender";
      size = "standard";
      tweaks = [ "normal" ];
    };
    iconTheme = {
      name = "Papirus-Dark";
      package = pkgs.papirus-icon-theme;
    };
    font = {
      name = "Noto Sans";
      size = 10;
    };
  };

  catppuccin.pointerCursor = {
    enable = true;
    flavor = "macchiato";
    accent = "lavender";
  };
  
}
