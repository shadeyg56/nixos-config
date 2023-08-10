{ pkgs, ... }:
{
    programs.zsh = {
        enable = true;
        enableSyntaxHighlighting = true;
        plugins = [
            {
                name = "powerlevel10k";
                src = pkgs.zsh-powerlevel10k;
                file = "share/zsh-powerlevel10k/powerlevel10k.zsh-theme";
            }
            {
                file = "p10k.zsh";
                name = "powerlevel10k-config";
                src = ../zsh;
            }
            {
                name = "zsh-autosuggestions";
                src = pkgs.zsh-autosuggestions;
                file = "share/zsh-autosuggestions/zsh-autosuggestions.zsh";
            }
        ];
        shellAliases = {
            disable_health_mode = "sudo modprobe -r acer-wmi-battery && sudo modprobe acer-wmi-battery enable_health_mode=0";
            enable_health_mode = "sudo modprobe -r acer-wmi-battery && sudo modprobe acer-wmi-battery enable_health_mode=1";
            health_mode = "cat /sys/bus/wmi/drivers/acer-wmi-battery/health_mode";
        };
        initExtra = "neofetch";
    };

    # themes, and plugins
    home.packages = with pkgs; [
        zsh-powerlevel10k
        zsh-autosuggestions
        zsh-syntax-highlighting
    ];
}