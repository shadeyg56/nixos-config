# Use powerline
USE_POWERLINE="true"
# Source manjaro-zsh-configuration
if [[ -e $HOME/nixos-config/terminal/zsh/manjaro-zsh-config ]]; then
  source $HOME/nixos-config/terminal/zsh/manjaro-zsh-config
fi
# Use manjaro zsh prompt
if [[ -e $HOME/nixos-config/terminal/zsh/manjaro-zsh-prompt ]]; then
 source $HOME/nixos-config/terminal/zsh/manjaro-zsh-prompt
fi

neofetch
alias disable_health_mode="sudo modprobe -r acer-wmi-battery && sudo modprobe acer-wmi-battery enable_health_mode=0"
alias enable_health_mode="sudo modprobe -r acer-wmi-battery && sudo modprobe acer-wmi-battery enable_health_mode=1"
alias health_mode="bash ~/check_health_mode"

export PATH="/home/shadeyg56/.local/bin:$PATH"
