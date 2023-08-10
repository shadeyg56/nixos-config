{ stdenv, fetchFromGitHub, fetchurl, pkgs, python310Packages}: 

stdenv.mkDerivation rec {
    pname = "adios";
    version = "0.2.3";

    src = fetchurl{
        url = https://github.com/MightyPork/adios/releases/download/0.2.3/adios-0.2.3-1.tar.gz;
        sha256 = "19cs0w85lylf8idg9dqnpp3r07caf06a3klq1hv9zbqar3kw543x";
    };

    nativeBuildInputs = with pkgs; [
        wrapGAppsHook
    ];

    buildInputs = with pkgs; [
        gtk3
        gobject-introspection
    ];

    propagatedBuildInputs = [
        (pkgs.python310.withPackages (p: with p; [
            pygobject3 docopt
        ]))
    ];

    setSourceRoot = "sourceRoot=`pwd`";

    buildPhase = "";

    installPhase = "
        mkdir -p $out/bin
        mv ./adios $out/bin
    ";
}

