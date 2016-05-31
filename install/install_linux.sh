#!/bin/bash
echo "Install Electron Framework"
echo "--------------------------"
echo "OS: Debian, Ubuntu, Mint"
DOCUMENTS="Documents"
sudo apt-get install git npm curl
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Install PanDocElectron Requirements"
echo "-----------------------------------"
npm install mkdirp
sudo apt-get install pandoc pandoc-citeproc imagemagick imagemagick-doc texlive-full
cd ~
git clone https://github.com/niebert/PanDocElectron.git
cd PanDocElectron
rm -R node_modules/*
npm init
npm install electron-prebuilt --save-dev
cd ..
cd $DOCUMENTS
git clone https://github.com/niebert/PanDoc.git
