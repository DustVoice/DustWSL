# Introduction

This document is an attempt at providing a guide for my [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) setup based on [Arch Linux](https://archlinux.org), or rather [ArchWSL](https://github.com/yuk7/ArchWSL).

It is mainly intended as a set of personal mental crutches, so the following disclaimer applies

> [!CAUTION]
> Your mileage may vary!\
> Not for the faint of heart!\
> Be wary of utter steaming hot garbage!\
> Proceed with caution and at your own risk!\

## Overview

### Prerequisites
In this part we are mainly concerned about setting up WSL in general.
For that we need to do a bit of configuration outside and inside the WSL environment.
First off [WSL](./wsl/README.md) gets set up (Kernel) and then [ArchWSL](./archwsl/README.md) (Distro).

### Setup `$HOME`
In this part I set up my `$HOME` directory and environment,
with all the basic tools needed to actually be able to use WSL.

### Part 3: Optional
This part is more about additional tooling and software needed to develop with different
programming languages, having GUI applications available, etc.
This section is way more, as the name suggests, optional.
And even I personally might decide I don't need language _X_ on a particular system.
> [!NOTE]
> Some chapters in **Optional** might be referenced from earlier _not so optional_ parts of my setup.

## Syntactic Sugar

Throughout this document I use some special elements to make it easier for the reader to retrieve information at a glance.

### Packages

At the beginning of a chapter, I sometimes include a list of packages.
This is an accumulated list of packages mentioned throughout this chapter.
It makes it easier to see which packages are supposed to be installed, so nothing is forgotten.
Mandatory or strongly suggested packages are checked, optional ones are not.

---
- [x] [`git`](https://archlinux.org/packages/extra/x86_64/git/)
- [ ] [`vlc`](https://archlinux.org/packages/extra/x86_64/vlc/)
---

### Alerts

I use [GitHub style Alerts](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/)
in some places to provide some additional notes, comments, tips or warnings.
To cite the [official discussion](https://github.com/orgs/community/discussions/16925):

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

### Terminal and Code blocks

I try to enhance the code blocks with some useful information, such as language/fileformat, filename, etc.

Executing a command within Windows will normally be marked by a `PowerShell` block
```powershell,lang=PowerShell,icon=.devicon-powershell-plain
Get-Language
which.exe wsl
```

Executing a command from within WSL will be marked by a prompt symbol.
An optional directory to run the commmand in, can also be specified
```bash,nolang,icon=.fa.fa-terminal,filepath=~/dotfiles
ls -la | grep ".el"
```

If a file or code snippet in a specific language is shown, it will be also shown as such
```rust,lang=Rust,icon=.devicon-rust-original
println!("Hello world");
```

A text file also has its appropriate symbol.
A filepath can optionally be specified, same as with a code snippet.

```txt,nolang,icon=.fa.fa-file-text-o,filepath=~/log.txt
[INFO:] Test
```