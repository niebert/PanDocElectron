<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PanDocElectron](#pandocelectron)
  - [PanDocElectron Web-Site](#pandocelectron-web-site)
  - [Wikiversity Environment](#wikiversity-environment)
  - [Last Update](#last-update)
  - [General Requirements for Electron](#general-requirements-for-electron)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# PanDocElectron

## [PanDocElectron Web-Site](http://niebert.github.io/PanDocElectron/)

PanDocElectron is a Graphical User Interface (GUI) for calling the PanDoc Document Converter on the Command Shell on Linux, Mac or Windows. Or in simple words:
* converting documents is performed by [PanDoc](http://pandoc.org)
* PanDocElectron frees the user from knowing and setting the parameters from the command line.
* List of other GUIs and PanDoc Wrappers are available at [GitHub jgm](https://github.com/jgm/pandoc/wiki/Pandoc-Extras#pandoc-wrappers-and-interfaces)

## Wikiversity Environment
PanDocElectron is mainly developed to support the multiformat use of [Open Educational Resources]()

## Last Update
* (2018-01-14) `wtf_wikipedia.js` added to js-repository for browserified version of PanDocElectron. Integration is a ToDo.  
* (2018-01-04) New Version 0.9.8 - Download Media from Wikiversity - MathJax path updated due to shutdown MathJax CDN 0
* (2017-06-25) Bugfix added
* (2016-10-15) Wikipedia Download added to PanDocElectron
* (2016-06-30) Create New Projects - correted Pathnames
* (2016-06-29) Calling pandoc on windows changed, create BAT and SH files from PanDocElectron.
* (2016-06-28) imagemagick folder added, due to inkonsistent filename for convert by Windows (instead of fat2ntfs.exe)

##  General Requirements for Electron
Electron is more or less a brower, that has full access to your filesystem. So Electron/Atom allows to write multiplattform application just with HTML and Javascript, than runs on:
* Linux (see [section 2.3](http://niebert.github.io/PanDocElectron/index.html#SEC5))
* MacOSX (see [section 2.4](http://niebert.github.io/PanDocElectron/index.html#SEC6))
* Windows (see [section 2.5](http://niebert.github.io/PanDocElectron/index.html#SEC7))
