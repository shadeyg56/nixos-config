{
  config,
  pkgs,
  inputs,
  ...
}:

{

  programs.neovim =
    let
      toLua = str: ''
        lua << EOF
        ${str}
        EOF
      '';
      toLuaFile = file: ''
        lua << EOF
        ${builtins.readFile file}
        EOF
      '';
    in
    {
      enable = true;

      viAlias = true;
      vimAlias = true;
      vimdiffAlias = true;

      extraPackages = with pkgs; [
        luajitPackages.lua-lsp

        xclip
        wl-clipboard
      ];

      plugins = with pkgs.vimPlugins; [

        {
          plugin = nvim-lspconfig;
          config = toLuaFile ./plugin/lsp.lua;
        }

        {
          plugin = comment-nvim;
          config = toLua ''require("Comment").setup()'';
        }

        {
          plugin = catppuccin-nvim;
          config = "colorscheme catppuccin-macchiato";
        }

        neodev-nvim

        nvim-cmp
        {
          plugin = nvim-cmp;
          config = toLuaFile ./plugin/cmp.lua;
        }

        {
          plugin = telescope-nvim;
          config = toLuaFile ./plugin/telescope.lua;
        }

        {
          plugin = nvim-tree-lua;
          config = toLuaFile ./plugin/nvim-tree.lua;
        }

        barbar-nvim
        gitsigns-nvim

        telescope-fzf-native-nvim

        cmp_luasnip
        cmp-nvim-lsp

        luasnip
        friendly-snippets

        lualine-nvim
        nvim-web-devicons

        {
          plugin = (
            nvim-treesitter.withPlugins (p: [
              p.tree-sitter-nix
              p.tree-sitter-vim
              p.tree-sitter-bash
              p.tree-sitter-lua
              p.tree-sitter-python
              p.tree-sitter-json
            ])
          );
          config = toLuaFile ./plugin/treesitter.lua;
        }

        vim-nix
      ];

      extraLuaConfig = ''
        ${builtins.readFile ./options.lua}
        ${builtins.readFile ./plugin/other.lua}
      '';

      # extraLuaConfig = ''
      #   ${builtins.readFile ./nvim/options.lua}
      #   ${builtins.readFile ./nvim/plugin/lsp.lua}
      #   ${builtins.readFile ./nvim/plugin/cmp.lua}
      #   ${builtins.readFile ./nvim/plugin/telescope.lua}
      #   ${builtins.readFile ./nvim/plugin/treesitter.lua}
      #   ${builtins.readFile ./nvim/plugin/other.lua}
      # '';
    };
}
