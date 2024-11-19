# Where is it?

---
- [x] [`ccid`](https://archlinux.org/packages/extra/x86_64/ccid/)
- [x] [`pcsclite`](https://archlinux.org/packages/extra/x86_64/pcsclite/)
- [ ] [`pcsc-tools`](https://archlinux.org/packages/extra/x86_64/pcsc-tools/)
---

In my case the smart card wasn't immediately available to `gpg`,
despite it clearly showing up in `lsusb`.

You can check this with
```bash,nolang,icon=.fa.fa-terminal
gpg --card-status
```

This command _should_ output some information about the present smart card.
If the output looks like the desert scene out of an old western movie,
it's probably not being recognized correctly.

With WSL, `gnupg` apparently can't simply access the device,
which would normally be made possible by installing [`libusb-compat`](https://archlinux.org/packages/extra/x86_64/libusb-compat/).

To use the smart card, we need to install [`pcsclite`](https://archlinux.org/packages/extra/x86_64/pcsclite/),
which manages the smart card, as well as [`ccid`](https://archlinux.org/packages/extra/x86_64/ccid/),
which is a generic CCID driver.
```bash,nolang,icon=.fa.fa-terminal
paru -S pcsclite ccid
```

Then we _enable_ and _start_ the `pcscd` socket and service,
which means it will be started, whenever needed
```bash,nolang,icon=.fa.fa-terminal
sudo systemctl enable pcscd
sudo systemctl start pcscd
```

As described in the Arch Wiki page about
[GnuPG](https://wiki.archlinux.org/title/GnuPG#Using_a_smart_card_on_a_remote_client) however,
forwarding the smart card to WSL will most likely throw errors.

Following the wiki on how to fix this, we simply add a new `polkit` rule to allow all users of the `wheel` group
(which our user is a part of), access to the smart card.
The `polkit` rules are written in JavaScript and I chose to put this rule in `/etc/polkit-1/rules.d/99-pcscd.rules`.
```js,lang=JavaScript,icon=.devicon-javascript-plain,filepath=/etc/polkit-1/rules.d/99-pcscd.rules
polkit.addRule(function(action, subject) {
    if (action.id == "org.debian.pcsc-lite.access_card" &&
        subject.isInGroup("wheel")) {
        return polkit.Result.YES;
    }
});
polkit.addRule(function(action, subject) {
    if (action.id == "org.debian.pcsc-lite.access_pcsc" &&
        subject.isInGroup("wheel")) {
        return polkit.Result.YES;
    }
});
```

Restart `polkit.service`

```bash,nolang,icon=.fa.fa-terminal
sudo systemctl restart polkit.service
```
or even better, restart WSL (only restarting `polkit` didn't work for me)
```bash,nolang,icon=.fa.fa-terminal
exit
```
```powershell,lang=PowerShell,icon=.devicon-powershell-plain
wsl.exe --shutdown
arch.exe
```

In my case, it was still trying to connect to the smart card using the integrated `ccid`,
so I needed to disable it by modifying/creating `~/.gnupg/scdaemon.conf`
```txt,nolang,icon=.fa.fa-file-text-o,filepath=~/.gnupg/scdaemon.conf
disable-ccid
```

> [!TIP]
> If you still struggle with WSL recognizing the smart card,
> you could try the `pcsc_scan` utility from the [`pcsc-tools`](https://archlinux.org/packages/extra/x86_64/pcsc-tools/) package.
>
> If you still have outstanding permission issues, try running it with `sudo`
> to at least confirm the `usbipd` part worked, although after adding the
> `polkit` rule and a WSL restart, `pcsc_scan` should work as a normal user.
>
> You can also check what `gpg-agent` is doing with
> ```bash,nolang,icon=.fa.fa-terminal
> systemctl --user status gpg-agent
> ```
