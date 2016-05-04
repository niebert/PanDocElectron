# PanDocElectron
Atom/Electron Application for calling PanDoc Converter with Shell Commands on Linux Windows Mac


# Electron Framework
For running and testing the application PanDocElectron it is necessary to install the Electron environment on your Desktop Computer. With electron you are able to create cross-plattform application.

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

Please install Xcode form the AppStore for your MacOSX system

The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## Electron Tutorials

* [Create the first App in Electron](https://www.youtube.com/watch?v=ojX5yz35v4M)
* Install a [Quick Start Electron](http://electron.atom.io/) Application. Use the install support for this:

Clone the Quick Start repository first
> `$ git clone https://github.com/electron/electron-quick-start`

Go into the repository`
> `$ cd electron-quick-start ``

Now install the dependencies and run
> `$ npm install && npm start `

## Electron Builder Packager

Builder and Packager is used to create Desktop Application
```bash
npm install electron-builder
npm install electron-packager

```

See [Multiplattform Build with Electron](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for further details.
            `
