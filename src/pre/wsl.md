# WSL

In this part, we're mainly concerned about WSL 2 itself,
or in more precise terms the WSL _kernel_.

As we will install [a different distro](./archwsl.md) than the default _Ubuntu_ in a second anyway,
we won't bother about that particula part of Microsoft's official documentation.

## Enable the Windows Feature

> [!IMPORTANT]
> It seems as if you don't longer need to manually enable the Windows Feature manually/yourself,
> as [this comment](https://devblogs.microsoft.com/commandline/install-wsl-with-a-single-command-now-available-in-windows-10-version-2004-and-higher/?commentid=5587#comment-5587)
> suggests.
>
> I'll still leave the following info intact, because we all know what
> beautiful, reliable and stable pieces of software _Microsoft Windows_
> and the _Microsoft Store_ are... <sub>`delete sarcasm;`</sub>

You might want to enable the `Windows Subsystem for Linux` Windows feature.
You can either try opening your _Windows Search_ and searching for `Turn Windows features on or off`,
or you can dig your way through the _Control Panel_.

> [!TIP]
> For [WSLg](https://github.com/microsoft/wslg) to work properly,
> you need to make sure you're running the Windows 11,
> or the minimum required version of Windows 10 _(Version 2004 or higher / Build 19041 or higher)_.

## Install / Update WSL

> [!NOTE]
> Microsoft recommends installing the Distro from the Microsoft store,
> but also specifies the commands below in their official documentation.
>
> In my experience, depending on your installation,
> or whether your Microsoft Store has shot itself in the foot yet or not,
> the installation is a little incoherent.
>
> When in doubt, use the
> [official Microsoft installation documentation](https://learn.microsoft.com/en-us/windows/wsl/install).

To install WSL from a `cmd.exe`-prompt or _PowerShell_ run

```shell
wsl --install -d Ubuntu`
```

**with elevated privileges**,
or if you've already installed WSL in the past, run

```shell
wsl --update
```

**also from an elevated prompt**.

### JustWorks<sup>TM</sup> ?

> [!IMPORTANT]
> This should only be neccessary if your Windows is locked down,
> the Microsoft Store is disabled, or similar.

As it turns out, if you're in a pretty restricting corporate setting,
the Windows environment is somewhat ... let's say botched.
The only way I was able to install WSL successfully,
is by using the manual installation method.

This includes

1.  Downloading the [latest WSL
    release](https://github.com/microsoft/WSL/releases) (the
    `.msixbundle`)
2.  Installing it by running

    ```powershell
    Add-AppxPackage Microsoft.WSL_{version}_{arch}.msixbundle
    ```

3.  Proceeding with the [Installing ArchWSL](./archwsl.md) step.

> [!NOTE]
> If `wsl --update` also doesn't work,
> in addition to `wsl --install [...]`,
> you might need to repeat the aforementioned process to update WSL.
