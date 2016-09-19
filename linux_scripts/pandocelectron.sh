#!/bin/bash
#
# Start "npm start" in the PanDocElectron Directory.
# Assuming that pandocelectron.sh in located in a subdirectory of PanDocElectron folder
#
PRG=$0

SCRIPTDIR=`dirname "$PRG"`
ELECTRON_DIR=`dirname "$SCRIPTDIR"`
echo "change to directory: ${ELECTRON_DIR}" 
# absolutize dir
oldpwd=`pwd`
cd "${ELECTRON_DIR}"
npm start
cd "${oldpwd}"
