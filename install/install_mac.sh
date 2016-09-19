#!/bin/bash
echo "Install Electron Framework"
echo "--------------------------"
echo "OS: MacOSX-Installer"
echo "Install BREW"
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
echo "Brew is now installed"
DOCUMENTS="Documents"
cd ~
cd $DOCUMENTS
brew install git npm curl
# brew install Caskroom/cask/xquartz wine mono
brew install wine mono
brew install ghostscript
echo "Install PanDocElectron Requirements"
echo "-----------------------------------"
echo "OS: MacOSX-Installer"
brew install imagemagick
brew install pandoc pandoc-citeproc
WORKING_DIR="PanDocElectron_bak_bak"
if [ -d "$WORKING_DIR" ]; then rm -r ${WORKING_DIR}; fi
WORKING_DIR="PanDocElectron_bak"
if [ -d "$WORKING_DIR" ]; then mv ${WORKING_DIR} "${WORKING_DIR}_bak"; fi
WORKING_DIR="PanDocElectron"
if [ -d "$WORKING_DIR" ]; then mv $WORKING_DIR "${WORKING_DIR}_bak"; fi
git clone https://github.com/niebert/PanDocElectron.git
cd PanDocElectron
WORKING_DIR="node_modules"
echo "Delete '/${WORKING_DIR}' if exists"
if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi
npm install
echo "Install PanDoc Templates"
cd ..
WORKING_DIR="PanDoc_bak_bak"
if [ -d "$WORKING_DIR" ]; then rm -r ${WORKING_DIR}; fi
WORKING_DIR="PanDoc_bak"
if [ -d "$WORKING_DIR" ]; then mv ${WORKING_DIR} "${WORKING_DIR}_bak"; fi
WORKING_DIR="PanDoc"
if [ -d "$WORKING_DIR" ]; then mv $WORKING_DIR "${WORKING_DIR}_bak"; fi
git clone https://github.com/niebert/PanDoc.git

# rm -R node_modules/*

npm install
cd ..
cd $DOCUMENTS
git clone https://github.com/niebert/PanDoc.git

echo "(1) Please install XQuartz from https://www.xquartz.org/ "
echo "(2) Please install NodeJS LTS from https://nodejs.org/en/ "
echo "(3) Please install MacTex Installation from "
