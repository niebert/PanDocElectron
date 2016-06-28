# PanDocElectron
PanDocElectron is a Graphical User Interface (GUI) for calling the PanDoc Document Converter on the Command Shell on Linux, Mac or Windows. Or in simple words:
* converting documents is performed by [PanDoc](http://pandoc.org)
* PanDocElectron frees the user from knowing and setting the parameters from the command line.

## 1 General Requirements for Electron
Electron is more or less a brower, that has full access to your filesystem. So Electron/Atom allows to write multiplattform application just with HTML and Javascript, than runs on:
* Linux (see [section 5](http://niebert.github.io/PanDocElectron/index.html#SEC5))
* MacOSX (see [section 6](http://niebert.github.io/PanDocElectron/index.html#SEC6))
* Windows (see [section 7](http://niebert.github.io/PanDocElectron/index.html#SEC7))

### Requirements for all Electron Applications ###
If you want to use Electron Applications in general (including PanDocElectron) it is necessary to install the following software packages:
* `git` to download and update the sources of Electron Applications (see [http://git-scm.com/](http://git-scm.com/) for installing the software git)
* `nodejs` and `npm` allows to install pre-build packages of Electron as a runtime environment and other packages e.g. Javascript libraries that allow reading and writing files to the filesystem in Electron.

### Requirements for all PanDocElectron ###
PanDocElectron itself consists of
* application `PanDocElectron` and additional packages (see section 2.1)
* a `PanDoc` folder for `Documents` with necessary files to support certain output formats of pandoc. Due to limitation of file size on GitHub the templates
The necessary packages are downloaded with `git` (see section 2.2).

For running and testing the `Electron` applications in general (like PanDocElectron) it is necessary to install the Electron environment on your Desktop Computer. With electron you download the application that is designed as cross-plattform application and install the Electron Framework for your operating system (OS).

## 2 Requirements for PandocElectron

### 2.1 Installation of Packages needed by PanDocElectron
PandocElectron uses other opensource packages for converting files:
* `pandoc` the swiss army knife for document processing developed by John MacFarlane.
* `ImageMagick` to convert PDF-Slides into web-based Presentation with Audio Comments. ImageMagick is used to create multiple PNG-File as slides from the PDF document.
* `latex` for PDF conversion and processing Latex input files. Convert from a latex document and convert the source into WikiMedia output for Wikiversity.

You can find more details in section 5 (Linux), 6 (Mac) and 7 (Windows) to install these packages.

### 2.2 Installation of PanDocElectron and Templates
When `git` is installed on your operating system, you can download PanDocElectron with the following command in the shell:

Install PanDocElectron

> `git clone https://github.com/niebert/PanDocElectron.git`

> `cd  PanDocElectron`

> `npm install`

Templates and Support Files for PanDoc conversion are stored in a separate GitHub repository. Install these necessary files and folders with the following commands:

> `cd  Documents`

> `git clone https://github.com/niebert/PanDoc.git`

You choose a location of your choice. The default folder of the support files is:

> ` Documents/PanDoc`

Also the projects create by PanDocElectron are stored in this folders. In the settings of PanDocElectron you can define your path to templates and project folder.

The directory `PanDoc` can also be created by downloading the [PanDoc.zip from SourceForge](https://sourceforge.net/projects/pandocelectron/files/zip4Documents/) and unzip the file in Documents:


> `cd  Documents`

> `unzip PanDoc.zip`


### 2.3 Starting PanDocElectron

You can start PanDocElectron

> `cd  path/to/app/PanDocElectron`

> `npm install`

Those commands can be automized in a shell script (Linux/Mac) or with a batch file (.BAT) on Windows.

## 3 PanDoc Projects
PanDocElectron uses a project based approach for conversion. A project is a subdirectory of `Documents/Pandoc/` e.g. `Documents/Pandoc/MyProject`. This file contains the input files and the genrated output files by PanDoc. In general the input files are mainly WikiMedia-Files `Documents/Pandoc/MyProject/MyProject.wiki`.
* WikiMedia are provided on Wikiversity.
* WikiMedia is regarded as main input format for content, other inputs formats are possible due to your source content you want to process.

### 3.1 PanDocElectron Filename Convention for converted files in Project
Normally the basename of the input file is the same as the directory name, but this is optional. You can have more than one input file in one directory. From the input document you create output documents in several formats. To distinguish output formats it is necessary to some filename rules. We use the input file `MyProject.wiki` in the input format `WikiMedia` as an example.
* convert `MyProject.wiki` into DOCX File, creates a filename `MyProject.docx`.
* convert `MyProject.wiki` into DOCX File with a 2 Column Layout, creates a filename `MyProject_docx2col.docx`.
* convert `MyProject.wiki` to HTML File, creates a filename `MyProject.html`.
* convert `MyProject.wiki` to HTML presentation, creates a filename `MyProject_reveal.html`.
* convert `MyProject.wiki` to [RevealJS](http://lab.hakim.se/reveal-js/#/) presentation, creates a filename `MyProject_reveal.html`.

The basic version of output format get the standard extension `odt`, `docx` or `html`. To avoid overwriting the files with the same file extensions (e.g. `html`), default filenames are expanded with the output format (eg. `_reveal` for RevealJS format as an output format with the file extension `.html`.

### 3.2 Project subdirectories
In a PanDocElectron Project 4 subdirectories are created.
* `config` contain the configuration for "Title" and "Author" of the project. Config files share the same basename. E.g. the corresponding config file for  `MyProject.wiki` is `config/MyProject.wiki`.
* `images` contains images of the HTML-document, LaTeX, WikiMedia, Markdown input files and the exported slides from an input PDF presentation.
* `audio` contains the MP3 audio comments for a slide or other audio files used in the documents.
* `video` contains videos used in presentations or in WikiMedia. Default video format is `webm` and `ogg` because they can used for streaming in web browsers and in Wikiversity. Use Firefox Plugin for converting videos in your base format [FireOGG](https://firefogg.org/).  

## 4 Software Development with Atom/Electron
* npm installs packages in `node_modules`. If you have installed  `electron-prebuilt` in that folder on a Mac then do not sync the content in you github repository because others users on a Windows Machine will get confused because the software will create error messages due to the non-matching Operating System (OS).
* Install Atom ([https://atom.io/](https://atom.io/)) as Editor for Software Development in

## 5 Linux - Electron Framework

### 5.1 Install GIT
GIT as version control system is used to update PanDocElectron

> `sudo apt-get install git`

### 5.2 Install NPM
The node package manager (NPM) is necessary for installation of electron.

> `sudo apt-get install npm`


### 5.3 Install NodeJS
As a next step it necessary to install NodeJS on your system.

[https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

E.g. on Ubuntu/Linux install NodeJS for version 6 or higher:

> `sudo apt-get install curl `

curl is now installed. We use curl to download the installer for NodeJS.

> `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - `

Now we install nodejs

> `sudo apt-get install -y nodejs ``

### 5.4 Installation of PanDocElectron
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents` resp. `cd /path/to/Documents`

Download/clone PanDocElectron:

> `git clone https://github.com/niebert/PanDocElectron.git`

Download/clone the MathJax and Reveal Files for offline use of presentations:
> `git clone https://github.com/niebert/PanDoc.git`

### 5.5 Install Build essentials on Linux
Finally it is necessary to install the build essentials on the Linux system with:

> `sudo apt-get install -y build-essential `

### 5.6 Install Electron as Runtime Environment for PanDocElectron
Change directory to PanDocElectron and install prebuilt Electron binaries for your  operating system:

> `cd  Documents` resp. `cd /path/to/Documents`

> `mkdir  ElectronApps`

> `git clone https://github.com/niebert/PanDocElectron.git`

> `cd  PanDocElectron`

> `rm -R node_modules/*`

Start the NPM `install` process with
> `npm install`

and accept all settings in the init procedure

> `npm install electron-prebuilt --save-dev`


### 5.7 Install LaTeX
LaTeX is needed to convert the Documents.

* for apt-get based Linux-Distributions (debian, ubuntu etc.):
> `sudo apt-get install texlive-full`

* for openSuSE:
> `sudo zypper install texlive-scheme-full`

* for Fedora, Redhat:
> `sudo yum install texlive-scheme-full`

### 5.8 Install ImageMagick on Linux
ImageMagick is needed to convert the PDF documents into PNG files as slides.
* for apt-get based Linux-Distributions (debian, ubuntu etc.):
> `sudo apt-get install imagemagick imagemagick-doc`

* for openSuSE:
> `sudo zypper install imagemagick imagemagick-doc`

* for Fedora, Redhat:
> `sudo yum install imagemagick imagemagick-doc`


### 5.9 Install additional Packages for PanDocElectron
Install necessary modules for PanDocElectron:

> `cd PanDocElectron` resp. `cd /path/to/application/PanDocElectron`

The following npm `mkdirp` package create all directories in a path if the directories in the path do not exist.

> `npm install mkdirp`

Now all dependencies are installed. PanDocElectron can be started with:

> `npm start `

NPM has to called in the directory `PanDocElectron`.

### 5.10 Install PanDoc on Linux
The main package used by PanDocElectron is PanDoc itself

> `sudo apt-get install pandoc pandoc-citeproc`

### 5.11 Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## 6 MacOSX - Electron Framework
The following command assumes, that [HomeBrew](http://brew.sh) to be installed on your MacOSX.

### 6.1 Install GIT on MacOSX
GIT as version control system is used to update PanDocElectron

> `brew install git`

### 6.2 Install NPM on MacOSX
The node package manager (NPM) is necessary for installation of electron.

> `brew install npm`

### 6.3 Install NodeJS on MacOSX
As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/) use MacOSX-Installer

Opening Windows (xquartz) create in your Electron Application needs the following installation on your MacOSX:

> `brew install Caskroom/cask/xquartz wine mono`


### 6.4 Installation of PanDocElectron
When git installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd  Documents`  resp. `cd /path/to/Documents`

Download/clone PanDocElectron:

> `git clone https://github.com/niebert/PanDocElectron.git`

Download/clone the MathJax and Reveal Files for offline use of presentations:

> `git clone https://github.com/niebert/PanDoc.git`

### 6.5 Install Electron as Runtime Environment for PanDocElectron
Change directory to PanDocElectron and install prebuilt Electron binaries for your  operating system:

> `cd  PanDocElectron` resp. `cd /path/to/application/PanDocElectron`

> `rm -R node_modules/*`

> `npm install electron-prebuilt --save-dev`

> `npm install mkdirp`

Now install the dependencies and test the first run of PanDocElectron:

> `npm install && npm start `

### 6.6 Install ImageMagick on MacOSX
ImageMagick is needed to convert the PDF documents into PNG files as slides.

> `brew install imagemagick imagemagick-doc`


### 6.7 Install LaTeX on MacOSX
LaTeX is needed to convert the Documents.
* Install MacTeX [https://tug.org/mactex/](https://tug.org/mactex/)

### 6.8 Install PanDoc on Linux
The main package used by PanDocElectron is PanDoc itself

> `brew install pandoc`

### 6.9 Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

### 6.10 XCode for MacOSX
Please install Xcode form the AppStore for your MacOSX system as developer environment:
* [https://developer.apple.com/xcode/download](https://developer.apple.com/xcode/download)
* The X-Server on MacOSX is implemented by [XQuatz](https://www.xquartz.org/). Install XQuartz on your MacOSX with DMG-Installer.

### 6.11  Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## 7 PanDocElectron on Windows

### 7.1 Install GIT on Windows
Download [GIT](https://git-scm.com/download/win) from
* [https://git-scm.com/download/win](https://git-scm.com/download/win)
and install GIT with windows installer.

### 7.2 Install NPM on Windows
The node package manager (NPM) is necessary for installation of electron.

* [https://nodejs.org/en/#download](https://nodejs.org/en/#download)

### 7.3 Install NodeJS on Windows
As a next step it necessary to install NodeJS on your system.

* [https://nodejs.org/en/](https://nodejs.org/en/)

Now you are able to install Electron on you system

### 7.4 Installation of PanDocElectron
Open Shell on Windows (e.g. press "Win-R," type "cmd" and press "Enter" to open a Command Prompt session using just your keyboard.
When git is installed on your operting system, you can download PanDocElectron with the following command in the shell:
> `cd /D %userprofile%`

Download/clone PanDocElectron:

> `git clone https://github.com/niebert/PanDocElectron.git`

Download/clone the MathJax and Reveal Files for offline use of presentations:

> `cd documents` resp. your location where you store your documents

> `git clone https://github.com/niebert/PanDoc.git`

### 7.5 Install Electron as Runtime Environment for PanDocElectron
Change directory to PanDocElectron and install prebuilt Electron binaries for your  operating system:

> `cd  PanDocElectron` resp. `cd \path\to\application\PanDocElectron`

> `rmdir node_modules/* /s /q`

> `npm install electron-prebuilt --save-dev`

> `$ npm install mkdirp`

Now install the dependencies and test the first run of PanDocElectron:

> `$ npm install && npm start `

### 7.6 Install ImageMagick on Windows
ImageMagick is needed to convert the PDF documents into PNG files as slides.
* Installation Binaries for ImageMagick are available on [ImageMagick.org](http://www.imagemagick.org/script/binary-releases.php)

### 7.7 Install LaTeX on Windows
LaTeX is needed to convert the Documents.
* MikTex Installation [http://miktex.org/download](http://miktex.org/download)

### 7.8 Install PanDoc on Windows
The main package used by PanDocElectron is PanDoc itself

* [http://pandoc.org/installing.html](http://pandoc.org/installing.html#windows)

### 7.9 Optional: Install Atom Editor to Modify the PanDocElectron
PanDocElectron is a HTML/Javascript Application that can be modified and tailored to your needs with a minor HTML/Javascript knowledge.
The Atom Editor is recommended as developing environment together with electron:
Download and install from  the following website:

* [https://atom.io/](https://atom.io/)

## 8 Developer for Electron Tutorials on Linux and MacOSX

### 8.1 Developer Quickstart

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


### 8.2 Electron Builder Packager

Builder and Packager is used to create Desktop Application
```bash
npm install electron-builder
npm install electron-packager

```

See [Multiplattform Build with Electron](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for further details.
            `
