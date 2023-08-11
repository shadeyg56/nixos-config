{ pkgs, inputs, ... }:
let
    spicePkgs = inputs.spicetify-nix.packages.x86_64-linux.default;
in {
    imports = [
        inputs.spicetify-nix.homeManagerModule
    ];

    programs.spicetify = {
        enable = true;
        theme = spicePkgs.themes.catppuccin-macchiato;
        colorScheme = "lavender";
        enabledExtenstions = with spicePkgs.extensions; [
            adblock
        ];
        #spotifyPackage = (pkgs.callPackage ../../pkgs/spotify-adblock.nix { });
    };
    
}