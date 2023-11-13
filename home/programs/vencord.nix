{ pkgs, fetchurl, ... }:
{
  home.file.".config/Vencord/themes/catppuccin-macchiato-lavender.theme.css" = {
    source = fetchurl {
      url = "https://catppuccin.github.io/discord/dist/catppuccin-macchiato-lavender.theme.css";
    };
  };
}