# ArchWSL

In this part, we're installing the distro itself.

> [!NOTE]
> When in doubt, use the [ArchWSL documentation](https://wsldl-pg.github.io/ArchW-docs/).

For me, the simplest procedure was to

1.  Download the latest `Arch.zip` file from the [release
    page](https://github.com/yuk7/ArchWSL/releases/latest)
2.  Extract it to a folder where your user has unrestricted read and
    write permissions, so ideally stay away from `Program Files`, etc.
3.  Run the included `Arch.exe`
4.  Change the root password

    ```bash
    passwd
    ```

5.  Add the `wheel` group to the allowed `sudo` users

    ```bash
    echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel
    ```

6.  Add a new user and add it to the `wheel` group

    ```bash
    useradd -m -G wheel -s /bin/bash <username>
    ```

7.  Change the new user's password

    ```bash
    passwd <username>
    ```

8.  Exit the WSL environment

    ```bash
    exit
    ```

9.  Set the new user as the default one

    ```powerbash
    Arch.exe config --default-user <username>
    ```

10. Reboot the PC or alternatively restart `LxssManager` with

    ```powerbash
    net stop lxssmanager
    ```

    and

    ```powerbash
    net start lxssmanager
    ```

11. After that reenter WSL with

    ```powerbash
    Arch.exe
    ```

12. Setup the `pacman` keyring

    ```bash
    sudo pacman-key --init
    sudo pacman-key --populate
    sudo pacman -Sy archlinux-keyring
    ```

13. Update the base system

    ```bash
    sudo pacman -Su
    ```

> [!TIP]
> You can update your mirrorlist with your nearest mirrors.
>
> 1.  It is best practice to backup your original mirrorlist.
>
>     ```bash
>     sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.old
>     ```
>
> 1.  Generate a mirrorlist with the 5 best mirrors and save it to
>     `/etc/pacman.d/mirrorlist`
>
>     ```bash
>     curl -s "https://archlinux.org/mirrorlist/?country=DE&protocol=http&protocol=https&ip_version=4&use_mirror_status=on" \
>     | sed -e 's/^#Server/Server/' -e '/^#/d' \
>     | rankmirrors -n 5 - \
>     | sudo tee /etc/pacman.d/mirrorlist
>     ```

### Just Works<sup>TM</sup> ?

> [!IMPORTANT]
> This should only be neccessary if you're behind a
> (corporate) http proxy

As I'm sitting behind a corporate `http` proxy,
I initially had no access to the internet.

This can be confirmed by running

```bash
curl https://archlinux.org
```

To make WSL proxy-aware, I needed to

1.  Populate my `~/.bashrc` with

    ```bash
    export http_proxy=http://<hostname>:<port>
    export https_proxy=$http_proxy
    export ftp_proxy=$http_proxy
    ```

2.  Source it with

    ```bash
    source ~/.bashrc
    ```

3.  Allow `sudo` to pass these environment variables through by
    populating `/etc/sudoers.d/proxy` with

    ```txt
    Defaults env_keep += "http_proxy https_proxy ftp_proxy"
    ```

Rerunning the `curl`-command should now produce a response
and `pacman` should update and upgrade just fine:

```bash
sudo pacman -Syyuu
```
