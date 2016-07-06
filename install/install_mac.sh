#!/bin/bash
echo "Install Electron Framework"
echo "--------------------------"
echo "OS: MacOSX-Installer"
DOCUMENTS="Documents"
cd ~
cd $DOCUMENTS
brew install git npm curl
brew install Caskroom/cask/xquartz wine mono
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Install PanDocElectron Requirements"
echo "-----------------------------------"
echo "OS: MacOSX-Installer"
npm install mkdirp
sudo apt-get install pandoc pandoc-citeproc imagemagick imagemagick-doc texlive-full
cd ~
git clone https://github.com/niebert/PanDocElectron.git
cd PanDocElectron
rm -R node_modules/*
npm install electron-prebuilt --save-dev
cd ..
cd $DOCUMENTS
git clone https://github.com/niebert/PanDoc.git
