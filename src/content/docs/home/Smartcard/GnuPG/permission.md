---
title: Permissions
---

Unfortunately, `dotter` didn't set up the permissions correctly.
This is an issue and `gpg` will gladly and loudly complain about it.

To fix it, make sure you are indeed the owner of `~/.gnupg`.
After that simply correct the wrong permissions

```bash,nolang,icon=.fa.fa-terminal
chmod 700 ~/.gnupg
chmod 600 ~/.gnupg/gpg.conf
chmod 600 ~/.gnupg/gpg-agent.conf
chmod 600 ~/.gnupg/sshcontrol
```
