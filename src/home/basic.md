# Basic tools

---
- [x] [`base-devel`](https://archlinux.org/packages/core/any/base-devel/)
- [x] [`git`](https://archlinux.org/packages/extra/x86_64/git/)
- [x] [`openssh`](https://archlinux.org/packages/core/x86_64/openssh/)
---

First off, we need to install some basic tools to be able to set up the *dotfiles* correctly.

## Version Control

For that we will first install `git`, so we can grab an [AUR](https://aur.archlinux.org) helper named [`paru`](https://github.com/morganamilo/paru).

```bash,nolang,icon=.fa.fa-terminal
sudo pacman -S git
```

## AUR

In order for us to install this package in a second, we also need the `base-devel` package group

```bash,nolang,icon=.fa.fa-terminal
sudo pacman -S base-devel
```

We can now clone the repository `paru-bin` from *AUR* (this way we don't need to compile it),
as well as build and install it.

```bash,nolang,icon=.fa.fa-terminal
git clone https://aur.archlinux.org/paru-bin.git
cd paru-bin
makepkg -si
```

From now on we can simply substitute `pacman` with `paru`.

> [!IMPORTANT]
> `paru` is **not** supposed to be run with /root/ privileges.
> You shouldn't use `sudo paru`!
> Paru will invoke a `sudo` prompt on its own!
>
> If you expect `paru` to take longer between `sudo` invocations than
> the timeout, you can use `--sudoloop` to keep `sudo` from timeouting.

## Editor

For easy file editing, I'm going to use [`neovim`](https://neovim.io) from
[the equally named package](https://archlinux.org/packages/extra/x86_64/neovim/),
so editing is as simple as calling `nvim` on the file.

I _will_ install `emacs` later, but in order for me to not bite into my desk,
I _will_ also need my _doomed_ config.

## SSH

In order to switch to SSH URLs later in this document (e.g. for my dotfiles repo),
we of course need to install it through the [`openssh`](https://archlinux.org/packages/core/x86_64/openssh/) package.
