{ lib, python310Packages, fetchFromGitHub, substituteAll, callPackage }:

python310Packages.buildPythonPackage rec {
  pname = "auto-cpufreq";
  version = "1.9.8";

  src = fetchFromGitHub {
    owner = "AdnanHodzic";
    repo = pname;
    rev = "v${version}";
    sha256 = "sha256-ElYzVteBnoz7BevA6j/730BMG0RsmhBQ4PNl9+0Kw4k=";
  };

  propagatedBuildInputs = with python310Packages; [ click distro psutil setuptools (callPackage ../setuptools-git-versioning.nix {})];

  doCheck = false;
  pythonImportsCheck = [ "auto_cpufreq" ];

#   patches = [
#     # hardcodes version output
#     (substituteAll {
#       src = ./fix-version-output.patch;
#       inherit version;
#     })

#     # patch to prevent script copying and to disable install
#     ./prevent-install-and-copy.patch
#   ];

  postInstall = ''
    # copy script manually
    cp ${src}/scripts/cpufreqctl.sh $out/bin/cpufreqctl.auto-cpufreq

    # systemd service
    mkdir -p $out/lib/systemd/system
    cp ${src}/scripts/auto-cpufreq.service $out/lib/systemd/system
    substituteInPlace $out/lib/systemd/system/auto-cpufreq.service --replace "/usr/local" $out
  '';

  meta = with lib; {
    homepage = "https://github.com/AdnanHodzic/auto-cpufreq";
    description = "Automatic CPU speed & power optimizer for Linux";
    license = licenses.lgpl3Plus;
    platforms = platforms.linux;
    maintainers = [ maintainers.Technical27 ];
    mainProgram = "auto-cpufreq";
  };
}