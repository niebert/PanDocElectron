#!/bin/bash
echo "Install Electron Framework"
echo "--------------------------"
echo "OS: Debian, Ubuntu, Mint"
DOCUMENTS="Documents"
cd ~
cd $DOCUMENTS
cd Dokumente
echo "--------------------------"
echo "(1) Install GIT NPM and CURL"
sudo apt-get install -y git curl
sudo apt-get install -y build-essential
echo "--------------------------"
echo "(2) Install NODEJS"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm
echo "---------------------------------------"
echo "(3) Install PanDocElectron Requirements"
echo "---------------------------------------"
echo "OS: Debian, Ubuntu, Mint"
npm install mkdirp
sudo apt-get install -y pandoc pandoc-citeproc imagemagick imagemagick-doc texlive-full
# cd ~
WORKING_DIR="PanDocElectron_bak_bak"
if [ -d "$WORKING_DIR" ]; then rm -r ${WORKING_DIR}; fi
WORKING_DIR="PanDocElectron_bak"
if [ -d "$WORKING_DIR" ]; then mv ${WORKING_DIR} "${WORKING_DIR}_bak"; fi
WORKING_DIR="PanDocElectron"
if [ -d "$WORKING_DIR" ]; then mv $WORKING_DIR "${WORKING_DIR}_bak"; fi
git clone https://github.com/niebert/PanDocElectron.git
cd PanDocElectron
#WORKING_DIR="node_modules"
echo "Delete '/${WORKING_DIR}' if exists"
if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi
npm install
cd ..
WORKING_DIR="PanDoc_bak_bak"
if [ -d "$WORKING_DIR" ]; then rm -r ${WORKING_DIR}; fi
WORKING_DIR="PanDoc_bak"
if [ -d "$WORKING_DIR" ]; then mv ${WORKING_DIR} "${WORKING_DIR}_bak"; fi
WORKING_DIR="PanDoc"
if [ -d "$WORKING_DIR" ]; then mv $WORKING_DIR "${WORKING_DIR}_bak"; fi
git clone https://github.com/niebert/PanDoc.git
echo "REMARK: If Installation ends with error 'node not found'"
echo "please install 'nodejs-legacy' with the following command"
echo "  sudo apt-get install nodejs-legacy"
