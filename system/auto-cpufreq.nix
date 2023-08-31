{ pkgs, ... }:{
    
    home.file.".config/auto-cpufreq/auto-cpufreq.conf".text = ''
        [charger]
        governor = performance
        turbo = auto

        [battery]
        governor = powersave
        turbo = auto
    '';

}