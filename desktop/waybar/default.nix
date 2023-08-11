{ pkgs, config, inputs, ... }:
let
    waybar-hyprland = inputs.hyprland.packages.x86_64-linux.waybar-hyprland.overrideAttrs (
        old: {
            # propagatedBuildInputs = with pkgs; [ 
            #     python310
            #     glib
            #     playerctl
            #     python310Packages.pygobject3
            # ]
            # ++ old.propagatedBuildInputs;
            # installPhase = 
            # (old.installPhase or "")
            # + ''
            #     mkdir -p $out/bin
            #     mv ./mediaplayer.py $out/bin/mediaplayer
            # '';
        });
in
{
    programs.waybar = {
        enable = true;
        package = waybar-hyprland;
    };
    home.file.".config/waybar" = {
        source = ../waybar;
        recursive = true;
    };

    home.packages = with pkgs; [
      (callPackage ./mediaplayer.nix { } )  
    ];

}