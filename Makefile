############################################################################
#
#  Nix commands related to the local machine
#
############################################################################

KEEP?=10

deploy:
	nh os switch --ask .
test:
	nixos-rebuild test --flake . --use-remote-sudo

debug:
	nixos-rebuild switch --flake . --use-remote-sudo --show-trace --verbose

update:
	nix flake update

history:
	nix profile history --profile /nix/var/nix/profiles/system

keep:
	sudo nix-env --delete-generations +${KEEP} --profile /nix/var/nix/profiles/system
	sudo nix-env --delete-generations +${KEEP} --profile ~/.local/state/nix/profiles/home-manager

gc:
	# remove all generations older than 7 days
	sudo nix profile wipe-history --profile /nix/var/nix/profiles/system  --older-than 7d

	# garbage collect all unused nix store entries
	sudo nix store gc --debug
