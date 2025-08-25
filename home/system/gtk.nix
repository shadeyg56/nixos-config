{ pkgs, inputs, ... }:
{
  imports = [ inputs.catppuccin.homeManagerModules.catppuccin ];

  gtk = {
    enable = true;
    theme = {
      name = "catppuccin-macchiato-lavender-standard";
      package = pkgs.catppuccin-gtk.override {
        accents = [ "lavender" ];
        size = "standard";
        variant = "macchiato";
      };
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

  home.sessionVariables.GTK_THEME = "catppuccin-macchiato-lavender-standard";

  catppuccin.pointerCursor = {
    enable = true;
    flavor = "macchiato";
    accent = "lavender";
  };
  
}
