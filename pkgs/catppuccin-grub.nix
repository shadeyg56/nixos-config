{ stdenv, fetchFromGitHub }:

stdenv.mkDerivation rec {
    pname = "catppuccin-grub";
    version = "0";

    src = fetchFromGitHub {
        owner = "catppuccin";
        repo = "grub";
        rev = "803c5df0e83aba61668777bb96d90ab8f6847106";
        hash = "sha256-/bSolCta8GCZ4lP0u5NVqYQ9Y3ZooYCNdTwORNvR7M0=";
   };

   installPhase = ''
        cp -r src/catppuccin-macchiato-grub-theme $out
   '';
}