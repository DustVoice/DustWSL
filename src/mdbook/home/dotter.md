# Dotfiles

---
- [x] [`dotter-rs-bin`](https://aur.archlinux.org/packages/dotter-rs-bin)
---

To manage my dotfiles, I'm currently using [`dotter`](https://github.com/SuperCuber/dotter).
We can simply install it from the AUR

```bash,nolang,icon=.fa.fa-terminal
paru -S dotter-rs-bin
```

For `dotter` to work correctly, we first need to create a `local.toml` config file
in the TOML format, to tell it which package groups we want and if we need a special config
(e.g. for Windows).
This file needs to be in the `.dotter` dir within the newly cloned dotfile repository.

I will enable both the **dev** as well as the **dev-extra** package within my config:

```toml,lang=TOML,filepath=~/dotfiles/.dotter/local.toml
packages = ["dev", "dev-extra"]
```

After that, a simple

```bash,nolang,icon=.fa.fa-terminal,filepath=~/dotfiles
dotter deploy
```

within the `dotfiles` repo should do the rest of the magic.
