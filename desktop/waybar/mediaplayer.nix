{ stdenv, pkgs }:

stdenv.mkDerivation rec {
    name = "mediaplayer";
    src = ./mediaplayer;

    nativeBuildInputs = with pkgs; [
        wrapGAppsHook
    ];
    
    buildInputs = with pkgs; [
        gtk3
        (python311.withPackages (ps:
            with ps; [
            pygobject3
            ]))
        gobject-introspection
        playerctl
    ];

    installPhase = ''
        runHook preInstall
        chmod +x mediaplayer
        mkdir -p $out/bin
        cp mediaplayer $out/bin
        runHook postInstall
    '';

}