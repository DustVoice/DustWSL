---
title: SSH
---

As I'm almost exclusively using `gpg-agent` for SSH (except some cases where I use FIDO2 and resident keys),
as a substitute for `ssh-agent`, I have to set it up, so other applications can connect to it.

For that we mainly have to `unset` `SSH_AGENT_PID` and `set` `SSH_AUTH_SOCK`.
This is best done in our `~/.bashrc`

```bash,lang=Bash,icon=.devicon-bash-plain,filepath=~/.bashrc
unset SSH_AGENT_PID
if [ "${gnupg_SSH_AUTH_SOCK_by:-0}" -ne $$ ]; then
  export SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
fi
```

> [!TIP]
> As we want to use `git` over SSH in a second anyway,
> we can test if everything worked by trying to connect to GitHub
> (of course, you already need SSH setup for your GitHub account)
>
> ```bash,nolang,icon=.fa.fa-terminal
> ssh -F /dev/null git@github.com
> ```

## Dotfiles

Now that SSH is working just fine, we can switch the remote of the dotfiles repo over to use SSH.

```bash,nolang,icon=.fa.fa-terminal,filepath=~/dotfiles
jj git remote set-url origin git@github.com:DustVoice/dotfiles.git
```

A simple

```bash,nolang,icon=.fa.fa-terminal,filepath=~/dotfiles
jj git fetch
```

should succeed without any issues.
