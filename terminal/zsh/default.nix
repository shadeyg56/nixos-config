{ pkgs, ... }:
{
    programs.zsh = {
        enable = true;
        #dotDir = "nixos-config/terminal/zsh";
        initExtra = "source $HOME/nixos-config/terminal/zsh/.zshrc";
    };
}