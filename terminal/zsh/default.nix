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
        #initExtra = "source $HOME/nixos-config/terminal/zsh/.zshrc";
    };

    # themes, and plugins
    home.packages = with pkgs; [
        zsh-powerlevel10k
        zsh-autosuggestions
        zsh-syntax-highlighting
    ];
}