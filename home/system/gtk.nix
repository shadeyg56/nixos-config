{ pkgs, ... }:
{

  gtk = {
    enable = true;
    theme = {
      name = "Catppuccin-Macchiato-Standard-Lavender-Dark";
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

  home.sessionVariables.GTK_THEME = "Catppuccin-Macchiato-Standard-Lavender-Dark";
}
