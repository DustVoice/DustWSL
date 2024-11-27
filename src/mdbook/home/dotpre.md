# Dotfiles Prerequisites

---
- [ ] [`jujutsu`](https://archlinux.org/packages/extra/x86_64/jujutsu/)
---

Before we can use the dotfiles we need to download them first, duh.

## jj

As I'm using [`jj`](https://github.com/martinvonz/jj) currently,
I personally will use it to clone my dotfiles repository.
As `jj` doesn't support _gitmodules_ however,
I will still need to use `git` for that until I change this dependency.

```bash,nolang,icon=.fa.fa-terminal
paru -S jujutsu
```

> [!NOTE]
> You can still use `git` however, as `jj` uses `git` under the hood normally.

## The repository

Cloning the repository will first be done using its `https` URL,
as using SSH with my Yubikey requires my dotfiles to already be setup.
Therefore I will simply change the remote URL later to use SSH.

```bash,nolang,icon=.fa.fa-terminal
jj git clone --colocate https://github.com/DustVoice/dotfiles.git
```

The only thing left to do is initialize the submodules

```bash,nolang,icon=.fa.fa-terminal
git submodule update --init --remote
```

> [!NOTE]
> As `jj` has no concepts of `git` submodules (yet),
> we can simply use the most recent commit of the modules (`--remote`).
