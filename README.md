# local-cli

Bash CLI for [Local](https://localwp.com) — manage WordPress sites from the terminal using fzf.

## Requirements

- [Local](https://localwp.com) running
- `curl`, `jq`, `fzf`

## Install

```bash
git clone https://github.com/getflywheel/local-cli
cd local-cli
./local-cli install        # symlinks to ~/.local/bin/local-cli
```

Make sure `~/.local/bin` is in your `$PATH`. Or pass a custom dir:

```bash
./local-cli install ~/bin
```

## Usage

```bash
local-cli              # interactive: pick site → pick action
local-cli list         # list all sites
local-cli running      # list running sites only
local-cli start        # pick site via fzf and start it
local-cli stop         # pick site via fzf and stop it
local-cli stop-all     # stop all running sites
local-cli theme        # detect site from current theme dir and toggle start/stop
local-cli theme <path> # same but with explicit path
local-cli help         # show help
```

## Theme detection

If you're inside a WordPress theme directory, `local-cli theme` will find the corresponding Local site and offer to start or stop it:

```bash
cd ~/Local\ Sites/my-site/app/public/wp-content/themes/my-theme
local-cli theme
# Site:   my-site
# Status: halted
# Start site? [y/N]
```

Requires `functions.php` and `style.css` to be present in the directory.
