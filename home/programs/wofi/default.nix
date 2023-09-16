{ pkgs, config, inputs, ... }:
{
    programs.wofi.enable = true;
    home.file.".config/wofi" = {
        source = ../wofi;
        recursive = true;
    };
}