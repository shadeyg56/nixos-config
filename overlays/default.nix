{
  inputs,
  pkgs,
  ...
}:
{
  nixpkgs.overlays = [
    (final: prev: {
      inherit (inputs.nixpkgs-staging.legacyPackages.${prev.system}) 
        autoconf-archive;
    })
  ];
}