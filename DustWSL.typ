This document is an attempt at providing a guide for my
#link("https://learn.microsoft.com/en-us/windows/wsl/install")[WSL 2]
setup based on #emph[Arch Linux];, or rather
#link("https://github.com/yuk7/ArchWSL")[ArchWSL];.

It is mainly intended as a set of personal mental crutches, so the
following disclaimer applies

#quote(block: true)[
\[!CAUTION\] Your mileage may vary!

Not for the faint of heart!

Be wary of utter steaming hot garbage!

Proceed with caution and at your own risk!
]

= Prerequisites
<prerequisites>
Before we can get started, we need to do a bit of configuration outside
and inside the WSL environment to enable the rest of the guide

== Enable the Windows Feature
<enable-the-windows-feature>
#quote(block: true)[
\[!IMPORTANT\] It seems as if you don\'t longer need to manually enable
the Windows Feature manually/yourself, as
#link("https://devblogs.microsoft.com/commandline/install-wsl-with-a-single-command-now-available-in-windows-10-version-2004-and-higher/?commentid=5587#comment-5587")[this comment]
suggests.

I\'ll still leave the following info intact, because we all know what
beautiful, reliable and stable pieces of software #emph[Microsoft
Windows] and the #emph[Microsoft Store] are #sub[sarcasm off] …
]

You might want to enable the
#raw(lang:"verbatim", "Windows Subsystem for Linux") Windows feature.
You can either try opening your #emph[Windows Search] and searching for
#raw(lang:"verbatim", "Turn Windows features on or off");, or you can
dig your way through the #emph[Control Panel];.

#quote(block: true)[
\[!TIP\] For #link("https://github.com/microsoft/wslg")[WSLg] to work
properly, you need to make sure you\'re running the Windows 11, or the
minimum required version of Windows 10 #emph[(Version 2004 or higher /
Build 19041 or higher)];.
]

== Installing / Updating WSL
<installing-updating-wsl>
#quote(block: true)[
\[!NOTE\] Microsoft recommends installing the Distro from the Microsoft
store, but also specifies the commands below.

In my experience, depending on your installation, or whether your
Microsoft Store has shot itself in the foot yet or not, the installation
is a little incoherent.

When in doubt, use the
#link("https://learn.microsoft.com/en-us/windows/wsl/install")[official Microsoft installation documentation];.
]

To install WSL from a #raw(lang:"verbatim", "cmd") or
#raw(lang:"verbatim", "PowerShell") #emph[with elevated privileges] run
`wsl --install -d Ubuntu`, or if you\'ve already installed WSL in the
past, #emph[also from an elevated prompt];, run `wsl --update`.

=== Just Works#super[TM];?
<just-workstm>
#quote(block: true)[
\[!IMPORTANT\] This should only be neccessary if your Windows is locked
down, the Microsoft Store is disabled, or similar.
]

As it turns out, if you\'re in a pretty restricting corporate setting,
the Windows environment is somewhat … botched. The only way I was able
to install WSL successfully is by using the manual installation method.

This includes

+ Downloading the
  #link("https://github.com/microsoft/WSL/releases")[latest WSL release]
  (the #raw(lang:"verbatim", ".msixbundle");)
+ Installing it by running

```powershell
Add-AppxPackage Microsoft.WSL_<version>_<arch>.msixbundle
```

+ Proceeding with the #emph[Installing ArchWSL] step.

#quote(block: true)[
\[!NOTE\] If `wsl --update` also doesn\'t work, in addition to
`wsl --install [...]`, you might need to repeat the aforementioned
process for updating WSL.
]

== Installing ArchWSL
<installing-archwsl>
#quote(block: true)[
\[!NOTE\] When in doubt, use the
#link("https://wsldl-pg.github.io/ArchW-docs/")[ArchWSL documentation];.
]

For me, the simplest procedure was to

+ Download the latest #raw(lang:"verbatim", "Arch.zip") file from the
  #link("https://github.com/yuk7/ArchWSL/releases/latest")[release page]

+ Extract it to a folder where your user has unrestricted read and write
  permissions, so ideally stay away from
  #raw(lang:"verbatim", "Program Files");, etc.

+ Run the included #raw(lang:"verbatim", "Arch.exe")

+ Change the root password

  ```bash
  passwd
  ```

+ Add the #raw(lang:"verbatim", "wheel") group to the allowed
  #raw(lang:"verbatim", "sudo") users

  ```bash
  echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel
  ```

+ Add a new user and add it to the #raw(lang:"verbatim", "wheel") group

  ```bash
  useradd -m -G wheel -s /bin/bash <username>
  ```

+ Change the new user\'s password

  ```bash
  passwd <username>
  ```

+ Exit the WSL environment

  ```bash
  exit
  ```

+ Set the new user as the default one

  ```powershell
  Arch.exe config --default-user <username>
  ```

+ Rebooting or restarting #raw(lang:"verbatim", "LxssManager") with

  ```powershell
  net stop lxssmanager
  ```

  and

  ```powershell
  net start lxssmanager
  ```

+ After that reenter WSL with

  ```powershell
  Arch.exe
  ```

+ Setup the #raw(lang:"verbatim", "pacman") keyring

  ```bash
  sudo pacman-key --init
  sudo pacman-key --populate
  sudo pacman -Sy archlinux-keyring
  ```

+ Update the base system

  ```bash
  sudo pacman -Su
  ```

#quote(block: true)[
\[!TIP\] You can update your mirrorlist with your nearest mirrors.

+ It is best practice to backup your original mirrorlist.

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.old
```

+ Generate a mirrorlist with the 5 best mirrors and save it to
  #raw(lang:"verbatim", "/etc/pacman.d/mirrorlist")

```bash
curl -s "https://archlinux.org/mirrorlist/?country=DE&protocol=http&protocol=https&ip_version=4&use_mirror_status=on"  | sed -e 's/^#Server/Server/' -e '/^#/d' | rankmirrors -n 5 - | sudo tee /etc/pacman.d/mirrorlist
```
]

=== Just Works#super[TM] v2
<just-workstm-v2>
#quote(block: true)[
\[!IMPORTANT\] This should only be neccessary if you\'re behind a
(corporate) http proxy
]

As I\'m sitting behind a corporate http proxy, I had no access to the
internet. This can be confirmed by running

```bash
curl https://archlinux.org
```

To make WSL proxy-aware, I needed to

+ Populate my #raw(lang:"verbatim", "~/.bashrc") with

  ```bash
  export http_proxy=http://<hostname>:<port>
  export https_proxy=$http_proxy
  export ftp_proxy=$http_proxy
  ```

+ Source it with

  ```bash
  source ~/.bashrc
  ```

+ Allow #raw(lang:"verbatim", "sudo") to pass these environment
  variables through by populating
  #raw(lang:"verbatim", "/etc/sudoers.d/proxy") with

  ```txt
  Defaults env_keep += "http_proxy https_proxy ftp_proxy"
  ```

Rerunning the #emph[#raw(lang:"verbatim", "curl") command] should now
produce a response and #raw(lang:"verbatim", "pacman") get updated and
upgraded

```bash
sudo pacman -Syyuu
```
