{ stdenv, fetchFromGitHub, makeWrapper, makeDesktopItem,  jdk }: 

stdenv.mkDerivation rec {
  pname = "MarieSim";
  version = "1.3.01";

  src = fetchFromGitHub {
    owner = "chippography";
    repo = "MARIESimulator";
    rev = "fde35ee1753f3aeb02b4fc69181e2c39c61aebdf";
    hash =  "sha256-vdtcyy1aVyMo6EfBlItaB3Lxuu0r7SeeuV4yTwHpjNk=";
  };
  
  desktopItem = makeDesktopItem {
    name = "MarieSim";
    exec = "MarieSim";
    desktopName = "MARIE Simulator";
  };

  nativeBuildInputs = [ makeWrapper ];
  buildInputs = [ jdk ];

  buildPhase = ''
    mkdir -p $out/bin
    mkdir -p $out/share/applications
    javac ${src}/MarieSim1.java -d .
    jar cf $out/MarieSim.jar ./MarieSim1.class ./MarieSimulator/*
  '';

  installPhase = ''
    makeWrapper ${jdk}/bin/java $out/bin/MarieSim \
    --add-flags "-cp $out/MarieSim.jar MarieSim1"

    cp ${desktopItem}/share/applications/* $out/share/applications
  '';
}