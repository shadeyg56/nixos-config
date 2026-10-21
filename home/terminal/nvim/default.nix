{
  config,
  pkgs,
  inputs,
  ...
}:

{

  programs.neovim =
    let
      toLua = str: str;
      toLuaFile = file: builtins.readFile file;
    in
    {
      enable = true;

      viAlias = true;
      vimAlias = true;
      vimdiffAlias = true;
      withRuby = false;
      withPython3 = false;

      extraPackages = with pkgs; [
        luajitPackages.lua-lsp

        xclip
        wl-clipboard
      ];

      plugins = with pkgs.vimPlugins; [

        {
          plugin = nvim-lspconfig;
          type = "lua";
          config = toLuaFile ./plugin/lsp.lua;
        }

        {
          plugin = comment-nvim;
          type = "lua";
          config = toLua ''require("Comment").setup()'';
        }

        {
          plugin = catppuccin-nvim;
          type = "lua";
          config = ''vim.cmd.colorscheme("catppuccin-macchiato")'';
        }

        neodev-nvim
        plenary-nvim

        nvim-cmp
        {
          plugin = nvim-cmp;
          type = "lua";
          config = toLuaFile ./plugin/cmp.lua;
        }

        {
          plugin = telescope-nvim;
          type = "lua";
          config = toLuaFile ./plugin/telescope.lua;
        }

        {
          plugin = nvim-tree-lua;
          type = "lua";
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
          type = "lua";
          config = toLuaFile ./plugin/treesitter.lua;
        }

        vim-nix
      ];

      initLua = ''
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
