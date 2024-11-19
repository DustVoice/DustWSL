# Shell

---
- [x] [`nushell`](https://archlinux.org/packages/extra/x86_64/nushell/)
---

In order for me to not go insane with the default `bash` shell,
I will quickly install my shell next.
Of course, you can use any shell you want.
In my case, I'll be using _nushell_.

I am using `nu` because of its nice functionality
and because I'm a sucker for `rust` software.

```bash,nolang,icon=.fa.fa-terminal
paru -S nushell
```

## Set it as default

If you remember correctly, we set the login shell to `bash` when creating the custom user,
so you might wonder why we didn't directly set it to `nu`.

Well nushell isn't _POSIX compliant_, and neither does it want to be.
Therefore running `nu` as a login shell might not be the absolute best experience you'll ever have.

Instead, we populate our `.bashrc` with some scripting that will let `nu` take over any _interactive_ shell,
while scripts, etc. that expect a `POSIX` compliant shell can have their way.

```bash,lang=Bash,icon=.devicon-bash-plain,filepath=~/.bashrc
if [[ $- == *i* && $(ps --no-header --pid $PPID --format comm) != "nu" && -z ${BASH_EXECUTION_STRING} ]]
then
  exec nu
fi
```

## Special case for `wezterm`

I'm using the terminal emulator `wezterm` to run WSL.
There is a weird behaviour however with nushell,
where a `\n` gets inserted above the prompt on every keystroke.

If you look inside `~/.config/nushell/config.nu`,
the `shell_integration` -> `osc133` value is set to `("WEZTERM_PANE" not-in $env)`.
This means that it gets disabled when `wezterm` is being used,
which mitigates the aformentioned issue.

This works flawlessly in Windows,
but unfortunately `WEZTERM_PANE` isn't automatically set within WSL.

To _hack_ this, I just added an `export` to my `~/.bashrc`

```bash,lang=Bash,icon=.devicon-bash-plain,filepath=~/.bashrc
export WEZTERM_PANE=0
```
