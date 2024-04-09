{
  pkgs,
  config,
  inputs,
  ...
}:
{
  # programs.cava.enable = true;
  home.file.".config/cava/config".source = ./config;
}
