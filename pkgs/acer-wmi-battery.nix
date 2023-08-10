# builds a kernel driver that allows Acer laptops to control battery health
{ stdenv, fetchFromGitHub, kernel }:

stdenv.mkDerivation rec {
    pname = "acer-wmi-battery";
    version = "0";
    src = fetchFromGitHub {
        owner = "frederik-h";
        repo = pname;
        rev = "4e605fb2c78412e0c431a06e9f8ee17c9e0e0095";
        hash = "sha256-2uVIMvUxIXWz0nK61ukUg7Rh9SVQbyjWr7++hh8mEC0=";
    };

   setSourceRoot = "export sourceRoot=$(pwd)/source";

    KVER = "${kernel.modDirVersion}";

    nativeBuildInputs = kernel.moduleBuildDependencies;

    makeFlags = [
        "-C"
        "${kernel.dev}/lib/modules/${KVER}/build"
        "M=$(sourceRoot)"
    ];

    buildFlags = [ "modules" ];

    installPhase = ''
        mkdir -p $out/lib/modules/${KVER}/kernel/
        cp acer-wmi-battery.ko $out/lib/modules/${KVER}/kernel/
    '';

}