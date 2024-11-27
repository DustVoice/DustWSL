# USBIP

We simply need to install the [`usbipd-win`](https://github.com/dorssel/usbipd-win) software on our Windows machine.

Make sure to reopen any shell/terminal and check that `uspipd.exe` is available on your `PATH`.

> [!NOTE]
> You will probably need to perform the next step with elevated rights.
> Either open e.g. PowerShell as an Administrator,
> or install [`sudo` from `scoop`](https://scoop.sh/#/apps?q=sudo) for example.

We can now easily list available devices using

```powershell,lang=PowerShell,icon=.devicon-powershell-plain
usbipd.exe list
```

Take note of the `BUSID` of the desired (smart card) device.

> [!TIP]
> You can also use the _Hardware ID_ (`VID:PID` column) by using the
> `-i` flag instead of the `-b` one.

Then simply execute

```powershell,lang=PowerShell,icon=.devicon-powershell-plain
usbipd.exe bind -b {BUSID}
```

replacing `BUSID` with the one you took note of earlier.

> [!WARNING]
> It can be necessary to _force_ this operation with the `-f` flag,
> in which case the device will be unavailable under Windows until you perform an `unbind`.

Now the only thing left to do is attaching the smart card to WSL

```powershell,lang=PowerShell,icon=.devicon-powershell-plain
usbipd.exe attach --wsl -b {BUSID}
```

> [!NOTE]
> The `bind` procedure is persistent between reboots.
> The `attach` procedure however isn't, necessitating a reattachement.
>
> This also means forcing the `bind` using `-f` makes it unavailable
> _until_ you explicitly do an `unbind`,
> when `attach` on the contrary,
> reinstates control to Windows whenever the device is no longer connected to WSL.

You can easily check if this worked by observing the `usbipd.exe` command output
or by utilizing `lsusb` from the [`usbutils`](https://archlinux.org/packages/core/x86_64/usbutils/) package.
