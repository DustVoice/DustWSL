# DustWSL - DustVoice's WSL from scratch

As stated in the book's introduction:

> This document is an attempt at providing a guide for my [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) setup based on [Arch Linux](https://archlinux.org), or rather [ArchWSL](https://github.com/yuk7/ArchWSL).

## Tooling

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Runs on Bun](https://github.com/user-attachments/assets/50282090-adfd-4ddb-9e27-c30753c6b161)](https://bun.sh)

## Commands

All commands are run from the root of the project, from a terminal

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `bun install`              | Installs dependencies                            |
| `bunx --bun astro dev`     | Starts local dev server at `localhost:4321`      |
| `bunx --bun astro build`   | Build your production site to `./dist/`          |
| `bunx --bun astro preview` | Preview your build locally, before deploying     |
| `bunx --bun astro ...`     | Run CLI commands like `astro add`, `astro check` |
