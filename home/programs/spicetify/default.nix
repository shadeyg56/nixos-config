{ pkgs, inputs, lib, ... }:
let
    spicePkgs = inputs.spicetify-nix.packages.x86_64-linux.default;
in {
    imports = [
        inputs.spicetify-nix.homeManagerModule
    ];

    nixpkgs.config.allowUnfreePredicate = pkg: builtins.elem (lib.getName pkg) [
        "spotify"
     ];

    programs.spicetify = {
        enable = true;
        theme = spicePkgs.themes.catppuccin;
        colorScheme = "macchiato";
        enabledExtensions = with spicePkgs.extensions; [
            adblock
            shuffle
        ];
	#windowManagerPatch = true;
        #spotifyPackage = (pkgs.callPackage ../../pkgs/spotify-adblock.nix { });
    };
    
}
