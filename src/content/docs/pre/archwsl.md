---
title: ArchWSL
---

In this part, we're installing the distro itself.

> [!NOTE]
> When in doubt,
> use the [ArchWSL documentation](https://wsldl-pg.github.io/ArchW-docs/).

For me, the simplest procedure was to

1.  Download the latest `Arch.zip` file
    from the [release page](https://github.com/yuk7/ArchWSL/releases/latest)
2.  Extract it to a folder where your user has unrestricted read and
    write permissions, so ideally stay away from `Program Files`, etc.
3.  Run the included `Arch.exe`
4.  Change the root password

    ```bash,nolang,icon=.fa.fa-terminal
    passwd
    ```

5.  Add the `wheel` group to the allowed `sudo` users

    ```bash,nolang,icon=.fa.fa-terminal
    echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel
    ```

6.  Choose a username for your new user

    ```bash,nolang,icon=.fa.fa-terminal
    export username={username}
    ```

    and add this new user to the `wheel` group

    ```bash,nolang,icon=.fa.fa-terminal
    useradd -m -G wheel -s /bin/bash $username
    ```

7.  Change the new user's password

    ```bash,nolang,icon=.fa.fa-terminal
    passwd $username
    ```

8.  Exit the WSL environment

    ```bash,nolang,icon=.fa.fa-terminal
    exit
    ```

9.  Set the new user as the default one

    ```powershell,lang=PowerShell,icon=.devicon-powershell-plain
    Arch.exe config --default-user {username}
    ```

10. Reboot the PC or alternatively restart `LxssManager` with

    ```powershell,lang=PowerShell,icon=.devicon-powershell-plain
    net stop lxssmanager
    net start lxssmanager
    ```

11. After that reenter WSL with

    ```powershell,lang=PowerShell,icon=.devicon-powershell-plain
    Arch.exe
    ```

12. Setup the `pacman` keyring

    ```bash,nolang,icon=.fa.fa-terminal
    sudo pacman-key --init
    sudo pacman-key --populate
    sudo pacman -Sy archlinux-keyring
    ```

13. Update the base system

    ```bash,nolang,icon=.fa.fa-terminal
    sudo pacman -Su
    ```

> [!TIP]
> You can update your mirrorlist with your nearest mirrors.
>
> 1. It is best practice to backup your original mirrorlist.
>
>    ```bash,nolang,icon=.fa.fa-terminal
>    sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
>    ```
>
> 2. Generate a mirrorlist and save it to     `/etc/pacman.d/mirrorlist`
>
>    ```bash,nolang,icon=.fa.fa-terminal
>    curl -s "https://archlinux.org/mirrorlist/?country=DE&protocol=http&protocol=https&ip_version=4&use_mirror_status=on" \
>    | sudo tee /etc/pacman.d/mirrorlist
>    ```
>
> 3. Uncomment desired lines in `/etc/pacman.d/mirrorlist` and move them to the top
>
> Alternatively you can automatically pick the 5 best mirrors and save them,
> although you need the `pacman-contrib` package installed for the `rankmirrors` command.
>
> ```bash,nolang,icon=.fa.fa-terminal
> sudo pacman -Syu pacman-contrib
> curl -s "https://archlinux.org/mirrorlist/?country=DE&protocol=http&protocol=https&ip_version=4&use_mirror_status=on" \
> | sed -e 's/^#Server/Server/' -e '/^#/d' \
> | rankmirrors -n 5 - \
> | sudo tee /etc/pacman.d/mirrorlist
> ```

### Just Works<sup>TM</sup> ?

> [!IMPORTANT]
> This should only be neccessary if you're behind a
> (corporate) http proxy

As I'm sitting behind a corporate `http` proxy,
I initially had no access to the internet.

This can be confirmed by running

```bash,nolang,icon=.fa.fa-terminal
curl https://archlinux.org
```

To make WSL proxy-aware, I needed to

1. Populate my `~/.bashrc` with

   ```bash,lang=Bash,icon=.devicon-bash-plain,filepath=~/.bashrc
   export http_proxy=http://<hostname>:<port>
   export https_proxy=$http_proxy
   export ftp_proxy=$http_proxy
   ```

2. Source it with

   ```bash,nolang,icon=.fa.fa-terminal
   source ~/.bashrc
   ```

3. Allow `sudo` to pass these environment variables through by
   populating `/etc/sudoers.d/proxy` with

   ```txt,nolang,icon=.fa.fa-file-text-o,filepath=/etc/sudoers.d/proxy
   Defaults env_keep += "http_proxy https_proxy ftp_proxy"
   ```

Rerunning the `curl`-command should now produce a response
and `pacman` should update and upgrade just fine:

```bash,nolang,icon=.fa.fa-terminal
sudo pacman -Syyuu
```
