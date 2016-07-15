#!/bin/sh
AppName="PanDocElectron"

vReleasDir="releases/"
echo "Delete previous Release of ${AppName} "
sudo rm -R "${vReleasDir}*"
mkdir "${vReleasDir}"
electron-packager-interactive

# vVersion="_0_9_2"
vVersion=""
cd  "${vReleasDir}"

rm -R "${AppName}-mas-x64"

vArchOld="x64"
vArchNew="64Bit"
echo "Create for Architecture ${vArchNew} (${vArchOld})"

vOSOld="darwin"
vOSNew="MacOSX"
cmv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
# sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="win32"
vOSNew="Windows"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="linux"
vOSNew="Linux"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vArchOld="ia32"
vArchNew="32Bit"
echo "Create for Architecture ${vArchNew} (${vArchOld})"

mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="win32"
vOSNew="Windows"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="linux"
vOSNew="Linux"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

cd ..
