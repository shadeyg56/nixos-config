{
  pkgs,
  config,
  inputs,
  ...
}:
{
  home.file.".config/btop" = {
    source = ../btop;
    recursive = true;
  };
}
