# DustWSL - DustVoice's WSL from scratch

As stated in the book's introduction:

> This document is an attempt at providing a guide for my [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) setup based on [Arch Linux](https://archlinux.org), or rather [ArchWSL](https://github.com/yuk7/ArchWSL).

## Tooling

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

## Commands

All commands are run from the root of the project, from a terminal

| Command                     | Action                                                         |
| :-------------------------- | :------------------------------------------------------------- |
| `pnpm install`              | Installs dependencies + creates backup `yarn.lock`             |
| `pnpm dev`                  | Starts local dev server at `localhost:4321`                    |
| `pnpm build`                | Build your production site to `./dist/`                        |
| `pnpm preview`              | Preview your build locally, before deploying                   |
| `pnpm astro ...`            | Run CLI commands like `astro add`, `astro check`, `astro sync` |
| `pnpm dlx @astrojs/upgrade` | Update Starlight and therefore Astro, etc.                     |
