# GnuPG

In case we use an _X session_, it might be smart to tell `gpg` what TTY we're on
by simply adding the following lines to our `~/.bashrc`
```bash,lang=Bash,icon=.devicon-bash-plain,filepath=~/.bashrc
export GPG_TTY=$(tty)
gpg-connect-agent updatestartuptty /bye >/dev/null
```

To now actually use the YubiKey, I need to make sure it works with `gpg`.
However we are presented with a couple issues, as explained in the following parts.
