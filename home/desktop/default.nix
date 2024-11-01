{ ... }:
{

  home.file."Pictures/Wallpapers" = {
    source = ./wallpapers;
    recursive = true;
  };

  imports = [
    ./hypr
    ./ags
  ];
}
