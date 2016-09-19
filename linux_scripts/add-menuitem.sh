#!/bin/bash
#
# Resolve the location of the PanDocElectron installation.
# This includes resolving any symlinks.
PRG=$0
while [ -h "$PRG" ]; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '^.*-> \(.*\)$' 2>/dev/null`
    if expr "$link" : '^/' 2> /dev/null >/dev/null; then
        PRG="$link"
    else
        PRG="`dirname "$PRG"`/$link"
    fi
done

ELECTRON_BIN=`dirname "$PRG"`

# absolutize dir
oldpwd=`pwd`
cd "${ELECTRON_BIN}"
ELECTRON_BIN=`pwd`
cd "${oldpwd}"

ICON_NAME=PanDocElectron
TMP_DIR=`mktemp --directory`
DESKTOP_FILE=$TMP_DIR/pandocelectron.desktop
cat << EOF > $DESKTOP_FILE
[Desktop Entry]
Version=1.0
Encoding=UTF-8
Name=SmartGit
Keywords=electron;pandoc;convert
GenericName=PanDocElectron GUI
Type=Application
Categories=Development;Converter
Terminal=false
StartupNotify=true
StartupWMClass=SmartGit
Exec="$ELECTRON_BIN/pandocelectron.sh" %u
MimeType=x-scheme-handler/smartgit;x-scheme-handler/sourcetree;
Icon=$ICON_NAME.png
EOF

# The following alteration of rights is used to refresh immediately
chmod 644 $DESKTOP_FILE

xdg-desktop-menu install $DESKTOP_FILE
xdg-icon-resource install --size  32 "$ELECTRON_BIN/pandocelectron-32.png"  $ICON_NAME
xdg-icon-resource install --size  48 "$SMARTGIT_BIN/pandocelectron-48.png"  $ICON_NAME
xdg-icon-resource install --size  64 "$SMARTGIT_BIN/pandocelectron-64.png"  $ICON_NAME
xdg-icon-resource install --size 128 "$SMARTGIT_BIN/pandocelectron-128.png" $ICON_NAME

rm $DESKTOP_FILE
rm -R $TMP_DIR
