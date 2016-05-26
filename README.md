# PanDocElectron
PanDocElectron is a Graphical User Interface (GUI) for calling the PanDoc Document Converter on the Command Shell on Linux, Mac or Windows. Or in simple words:
* converting documents is performed by [PanDoc](http://pandoc.org)
* PanDocElectron frees the user from knowing and setting the parameters from the command line.

##General Requirements for Electron
Electron is more or less a browers, that has full access to your filesystem. So Electron/Atom allows to write Multiplattform Application just with HTML and Javascript.
If you want to use Electron Applications in general (including PanDocElectron) it is necessary to install the following software packages:
* `git` to download and update the sources of Electron Applications (see [http://git-scm.com/](http://git-scm.com/) for installing the software git)
* `npm` to install pre-build packages of Electron as a runtime environment.
* `nodejs` allow with Javscript reading and writing files to the filesystem in Electron.

##Requirements for PandocElectron
PandocElectron uses other opensource packages for converting files:
* `pandoc` the swiss army knife for document processing developed by John MacFarlane.
* `ImageMagick` to convert PDF-Slides into web-based Presentation with Audio Comments. ImageMagick is used to create multiple PNG-File as slides from the PDF document.
* `latex` for PDF conversion and processing Latex input files. Convert from a latex document and convert the source into WikiMedia output for Wikiversity.

### Installation of PanDocElectron
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents`
> `git clone https://github.com/niebert/PanDocElectron`

Choose a location of your choice.

### PanDoc Projects
PanDocElectron uses a project based approach for conversion. A project is a subdirectory of `Documents/Pandoc/` e.g. `Documents/Pandoc/MyProject`. This file contains the input files and the genrated output files by PanDoc. In general the input files are mainly WikiMedia-Files `Documents/Pandoc/MyProject/MyProject.wiki`.
* WikiMedia are provided on Wikiversity.
* WikiMedia is regarded as main input format for content, other inputs formats are possible due to your source content you want to process.

### PanDocElectron Filename Convention for converted files in Project
Normally the basename of the input file is the same as the directory name, but this is optional. You can have more than one input file in one directory. From the input document you create output documents in several formats. To distinguish output formats it is necessary to some filename rules. We use the input file `MyProject.wiki` in the input format `WikiMedia` as an example.
* convert `MyProject.wiki` into DOCX File, creates a filename `MyProject.docx`.
* convert `MyProject.wiki` into DOCX File with a 2 Column Layout, creates a filename `MyProject_docx2col.docx`.
* convert `MyProject.wiki` to HTML File, creates a filename `MyProject.html`.
* convert `MyProject.wiki` to HTML presentation, creates a filename `MyProject_reveal.html`.
* convert `MyProject.wiki` to [RevealJS](http://lab.hakim.se/reveal-js/#/) presentation, creates a filename `MyProject_reveal.html`.

The basic version of output format get the standard extension `odt`, `docx` or `html`. To avoid overwriting the files with the same file extensions and underscore filename expand is used (eg. `_reveal` for RevealJS format as an output format with the file extension `.html`.

### Project subdirectories
In a PanDocElectron Project 4 subdirectories are created.
* `config` contain the configuration for "Title" and "Author" of the project. Config files share the same basename. E.g. the corresponding config file for  `MyProject.wiki` is `config/MyProject.wiki`.
* `images` contains images of the HTML-document, LaTeX, WikiMedia, Markdown input files and the exported slides from an input PDF presentation.
* `audio` contains the MP3 audio comments for a slide or other audio files used in the documents.
* `video` contains videos used in presentations or in WikiMedia. Default video format is `webm` and `ogg` because they can used for streaming in web browsers and in Wikiversity. Use Firefox Plugin for converting videos in your base format [FireOGG](https://firefogg.org/).  

## Electron Framework
For running and testing the `Electron` application (like PanDocElectron) it is necessary to install the Electron environment on your Desktop Computer. With electron you are able to create cross-plattform application.

## Software Development with Atom/Electron
* npm installs packages in `node_modules`. If you have installed  `electron-prebuilt` in that folder on a Mac then do not sync the content in you github repository because others users on a Windows Machine will get confused because the software will create error messages due to the non-matching Operating System (OS).
* Install Atom ([https://atom.io/](https://atom.io/)) as Editor for Software Development in

## Linux - Electron Framework

### Install NPM
The node package manager (NPM) is necessary for installation of electron.

> `sudo apt-get install npm`


### Install NodeJS
As a next step it necessary to install NodeJS on your system.

[https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

E.g. on Ubuntu/Linux install NodeJS for version 6 or higher:

> `sudo apt-get install curl `

curl is now installed. We use curl to download the installer for NodeJS.

> `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - `

Now we install nodejs

> `sudo apt-get install -y nodejs ``

### Install Electron as Runtime Environment for PanDocElectron
Now you are able to install Electron on you system

> `sudo npm install -g electron-prebuilt`

### Install Build essentials on Linux
Finally it is necessary to install the build essentials on the Linux system with:

> `sudo apt-get install -y build-essential `

### Installation of PanDocElectron
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents`

> `git clone https://github.com/niebert/PanDocElectron`

### Install LaTeX
LaTeX is needed to convert the Documents.

* for apt-get based Linux-Distributions (debian, ubuntu etc.):
> `sudo apt-get install texlive-full`

* for openSuSE:
> `sudo zypper install texlive-scheme-full`

* for Fedora, Redhat:
> `sudo yum install texlive-scheme-full`

### Install ImageMagick on Linux
ImageMagick is needed to convert the PDF documents into PNG files as slides.
* for apt-get based Linux-Distributions (debian, ubuntu etc.):
> `sudo apt-get install imagemagick imagemagick-doc`

* for openSuSE:
> `sudo zypper install imagemagick imagemagick-doc`

* for Fedora, Redhat:
> `sudo yum install imagemagick imagemagick-doc`


### Install additional Packages for PanDocElectron
Install necessary modules for PanDocElectron:

> `cd PanDocElectron`

> `npm install mkdirp`



### Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## MacOSX - Electron Framework

### Install NPM
The node package manager (NPM) is necessary for installation of electron.

> `brew install npm`

### Install NodeJS
As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/) use MacOSX-Installer

### Install Electron as Runtime Environment for PanDocElectron
Now you are able to install Electron on you system

> `sudo npm install -g electron-prebuilt`

If you want to create Windows Application on your MacOSX please install

> `brew install Caskroom/cask/xquartz wine mono`

### Installation of PanDocElectron
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents`

> `git clone https://github.com/niebert/PanDocElectron`

### Install ImageMagick on MacOSX
ImageMagick is needed to convert the PDF documents into PNG files as slides.
> `brew install imagemagick imagemagick-doc`


### Install LaTeX on MacOSX
LaTeX is needed to convert the Documents.
* Install MacTeX [https://tug.org/mactex/](https://tug.org/mactex/)

### Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)


### XCode for MacOSX
Please install Xcode form the AppStore for your MacOSX system as developer environment:
* [https://developer.apple.com/xcode/download](https://developer.apple.com/xcode/download)

### Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## PanDocElectron on Windows

### Install NPM on Windows
The node package manager (NPM) is necessary for installation of electron.

* [https://nodejs.org/en/#download](https://nodejs.org/en/#download)

### Install NodeJS on Windows
As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/)

Now you are able to install Electron on you system

### Installation of PanDocElectron
Open Shell on Windows (e.g. press "Win-R," type "cmd" and press "Enter" to open a Command Prompt session using just your keyboard.
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd /D %userprofile%`

> `git clone https://github.com/niebert/PanDocElectron`

### Install ImageMagick on Windows
ImageMagick is needed to convert the PDF documents into PNG files as slides.
* Installation Binaries for ImageMagick are available on [ImageMagick.org](http://www.imagemagick.org/script/binary-releases.php)

### Install LaTeX on Windows
LaTeX is needed to convert the Documents.
* MikTex Installation [http://miktex.org/download](http://miktex.org/download)

## Developer Quickstart for Electron Tutorials on Linux and MacOSX

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


## Electron Builder Packager

Builder and Packager is used to create Desktop Application
```bash
npm install electron-builder
npm install electron-packager

```

See [Multiplattform Build with Electron](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for further details.
            `
