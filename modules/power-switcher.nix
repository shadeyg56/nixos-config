{
  pkgs,
  lib,
  inputs,
  ...
}:
# run certain commands depending whether the system is on AC or on battery
let
  programs = lib.makeBinPath [ inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.default ];

  unplugged = pkgs.writeShellScript "unplugged" ''
    export PATH=$PATH:${programs}
    export HYPRLAND_INSTANCE_SIGNATURE=$(ls -w1 /tmp/hypr | tail -1)

    hyprctl --batch 'keyword decoration:drop_shadow 0 ; keyword animations:enabled 0 ; keyword decoration:blur:enabled 0 '
  '';

  plugged = pkgs.writeShellScript "plugged" ''
    export PATH=$PATH:${programs}
    export HYPRLAND_INSTANCE_SIGNATURE=$(ls -w1 /tmp/hypr | tail -1)

    hyprctl --batch 'keyword decoration:drop_shadow 1 ; keyword animations:enabled 1 ; keyword decoration:blur:enabled 1'
  '';
in
{
  services.udev.extraRules = ''
    # start/stop services on power (un)plug
    SUBSYSTEM=="power_supply", ENV{POWER_SUPPLY_ONLINE}=="1", RUN+="${plugged}"
    SUBSYSTEM=="power_supply", ENV{POWER_SUPPLY_ONLINE}=="0", RUN+="${unplugged}"
  '';
}
