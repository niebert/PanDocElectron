#!/bin/bash
echo "Install Electron Framework"
echo "--------------------------"
sudo apt-get install npm
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install electron-prebuilt --save-dev
echo "Install PanDocElectron Requirements"
echo "-----------------------------------"
sudo apt-get install image
