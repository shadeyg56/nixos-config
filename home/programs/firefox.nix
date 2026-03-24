{ inputs, ... }:

{
  imports = [ inputs.textfox.homeManagerModules.default ];

  textfox = {
    enable = true;
    profiles = [ "lri9qfjr.default" ];
    config = {
      displayNavButtons = true;
      displayUrlbarIcons = true;
    };
  };

}
