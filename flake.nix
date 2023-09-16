{
  description = "Shade's NixOS Flake";
  inputs = {

    # Official NixOS package source, using nixos-unstable branch here
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    # home-manager, used for managing user configuration
    home-manager = {
      url = "github:nix-community/home-manager/master";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland.url = "github:hyprwm/Hyprland";

    spicetify-nix.url = "github:the-argus/spicetify-nix";

    sddm-sugar-candy-nix = {
      url = "gitlab:Zhaith-Izaliel/sddm-sugar-candy-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    auto-cpufreq = {
      url = "github:AdnanHodzic/auto-cpufreq";
      inputs.nixpkgs.follows = "nixpkgs";
    };

  };
  outputs = { self, nixpkgs, home-manager, hyprland, sddm-sugar-candy-nix, auto-cpufreq, ... }@inputs: 
  let 
    system = "x86_64-linux";

    pkgs = nixpkgs.legacyPackages.${system};

  in {
    nixosConfigurations = {
      "nixos" = nixpkgs.lib.nixosSystem {
        specialArgs = { inherit inputs; };
        modules = [
	        ./hosts/laptop/configuration.nix
          ./modules/power-switcher.nix
	        hyprland.nixosModules.default
	        home-manager.nixosModules.home-manager {
		        home-manager.useGlobalPkgs = true;
		        home-manager.useUserPackages = true;
		        home-manager.extraSpecialArgs = { inherit inputs; };
		        home-manager.users.shadeyg56 = import ./home/home.nix;
	        }
          sddm-sugar-candy-nix.nixosModules.default
          auto-cpufreq.nixosModules.default
	      ];
       };
    };
  };
}
