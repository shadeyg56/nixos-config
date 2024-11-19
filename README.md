# :snowflake: nixos-config

My dotfiles for nixos

<a href="https://github.com/nixos/nixpkgs"><img src="https://img.shields.io/badge/NixOS-unstable-informational.svg?style=flat&logo=nixos&logoColor=CAD3F5&colorA=24273A&colorB=8AADF4"></a> [![Nix Build](https://github.com/shadeyg56/nixos-config/actions/workflows/build-nix.yml/badge.svg)](https://github.com/shadeyg56/nixos-config/actions/workflows/build-nix.yml)

<img src=https://gitlab.com/uploads/-/system/project/avatar/41881180/nixos_logo2_transp.png alt=nixos-logo width=400/>


## Why NixOS?
Gone are the days of having to reconfigure your Arch install because your last one broke.

NixOS is a declarative operating system that allows you to create perfectly reproducible systems that can be installed in just a single command

### Pros
- Easily revert to previous configurations through bootloader
- Reproducable system
- Central location for system and user configuration
- nixpkgs is a massive package repo

### Cons
- High learning curve
- The read-only system can be hard to adjust to

Basically Nix can take a while to learn and setup, but once you figure it out you never have to waste time configuring one of your systems again


## Features
* window manager - [hyprland](https://hyprland.org/)
* widget suite (my own [Astal](https://github.com/aylur/astal) app) - [saturn](https://github.com/shadeyg56/saturn)
* theme - [catppuccin](https://github.com/catppuccin/catppuccin) macchiato for basically everything
* terminal - [kitty](https://github.com/kovidgoyal/kitty)
* shell - [zsh](https://www.zsh.org/) with [powerlevel10k](https://github.com/romkatv/powerlevel10k)
* file manager - [dolphin](https://github.com/KDE/dolphin)

Looking for something else? Use the GitHub search function or browse the files split into categories

## Installation
1. Download the [NixOS ISO file](https://nixos.org/download.html#nixos-iso)
2. Flash the ISO to a USB and install NixOS until you get to `nixos-install`

    A install guide can be found [here](https://nixos.org/manual/nixos/stable/#ch-installation)
3. Clone this repo
4. Replace `hardware-configuration.nix` with the one you generated **(If you skip this step, your system will not boot)**
5. Edit `configuration.nix` if you want to change your username or other settings
6. Run `nixos-install --flake .#nixos`
7. Reboot and enjoy!

## Cachix
Builds are made after every commit using a GitHub action and uploaded to [Cachix](https://www.cachix.org/). 

When building the config, Nix will check to see if the derivations are in the cache and will just copy them instead of rebuilding. This saves significant time when building or updating on a system