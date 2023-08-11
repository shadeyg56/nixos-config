{ stvenv, pkgs }:

stdenv.mkDerivation rec {
    name = "mediaplayer";
    src = ./mediaplayer;

    propagatedBuildInputs = with pkgs; [ 
        python310
        glib
        playerctl
        python310Packages.pygobject3
    ]

    installPhase = ''
        mkdir -p $out/bin
        cp mediaplayer $out/bin
    '';

}