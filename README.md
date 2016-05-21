# PanDocElectron
PanDocElectron is a Graphical User Interface (GUI) for calling the PanDoc Document Converter on the Command Shell on Linux, Mac or Windows. Or in simple words:
* The converting documents is performed by PanDoc
* PanDocElectron frees the user from knowing and setting the parameters from the command line.
##General Requirements for Electron
Electron is more or less a browers, that has full access to your filesystem. So Electron/Atom allows to write Multiplattform Application just with HTML and Javascript.
If you want to use Electron Applications in general (including PanDocElectron) it is necessary to install the following software packages:
* `git` to download and update the sources of Electron Applications ([http://git-scm.com/](http://git-scm.com/)])
* `npm` to install pre-build packages of Electron as a runtime environment.
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents`
> `git clone https://github.com/niebert/PanDocElectron`

## Electron Framework
For running and testing the `Electron` application (like PanDocElectron) it is necessary to install the Electron environment on your Desktop Computer. With electron you are able to create cross-plattform application.

## Software Development with Atom/Electron
* npm installs packages in `node_modules`. If you have installed  `electron-prebuilt` in that folder on a Mac then do not sync the content in you github repository because others users on a Windows Machine will get confused because the software will create error messages due to the non-matching Operating System (OS).
* Install Atom ([https://atom.io/](https://atom.io/)) as Editor for Software Development in 

## Linux - Electron Framework
The node package manager (NPM) is necessary for installation of electron.

> `sudo apt-get install npm`

As a next step it necessary to install NodeJS on your system.

[https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

E.g. on Ubuntu/Linux install NodeJS for version 6 or higher:

> `sudo apt-get install curl `
> `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - `
> `sudo apt-get install -y nodejs ``


Now you are able to install Electron on you system

> `sudo npm install -g electron-prebuilt`

Finally it is necessary to install the build essentials on the Linux system with:

> `sudo apt-get install -y build-essential `

Install necessary modules for PanDocElectron:

> `cd PanDocElectron`
> `npm install mkdirp`

The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## MacOSX - Electron Framework
The node package manager (NPM) is necessary for installation of electron.

> `brew install npm`

As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/)

Now you are able to install Electron on you system

> `sudo npm install -g electron-prebuilt`

If you want to create Windows Application on your MacOSX please install

> `brew install Caskroom/cask/xquartz wine mono`

The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

Please install Xcode form the AppStore for your MacOSX system as developer environment:

* [https://developer.apple.com/xcode/download](https://developer.apple.com/xcode/download)


## Electron Tutorials for Linux and MacOSX

* [Create the first App in Electron](https://www.youtube.com/watch?v=ojX5yz35v4M)
* Install a [Quick Start Electron](http://electron.atom.io/) Application. Use the install support for this:

Clone the Quick Start repository first
> `$ git clone https://github.com/electron/electron-quick-start`

Go into the repository`
> `$ cd electron-quick-start ``

Now install the dependencies and run
> `$ npm install && npm start `

Install necessary modules for PanDocElectron:

> `$ npm install mkdirp`

## PanDocElectron on Windows
The node package manager (NPM) is necessary for installation of electron.

* [https://nodejs.org/en/#download](https://nodejs.org/en/#download)

As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/)

Now you are able to install Electron on you system

## Electron Builder Packager

Builder and Packager is used to create Desktop Application
```bash
npm install electron-builder
npm install electron-packager

```

See [Multiplattform Build with Electron](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for further details.
            `
