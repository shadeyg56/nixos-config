{ ... }:
{

  home.file."Pictures/Wallpapers" = {
    source = ./wallpapers;
    recursive = true;
  };

  imports = [
    ./hyprland
    ./ags
  ];
}
