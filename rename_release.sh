AppName="PanDocElectron"
vReleasDir="releases/"
vVersion=""
cd "${vReleasDir}"

rm -R "${AppName}-mas-x64"

vArchOld="x64"
vArchNew="64Bit"
vOSOld="darwin"
vOSNew="MacOSX"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="win32"
vOSNew="Win32"
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
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="win32"
vOSNew="Win32"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

vOSOld="linux"
vOSNew="Linux"
mv "${AppName}-${vOSOld}-${vArchOld}" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
zip -r "${AppName}-${vOSNew}-${vArchNew}${vVersion}.zip" "${AppName}-${vOSNew}-${vArchNew}${vVersion}"
sudo rm -R "${AppName}-${vOSNew}-${vArchNew}${vVersion}"

cd ..
