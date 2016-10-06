#!/bin/bash
echo "Remove PanDocElectron Menu Entry from Linux System"
ICON_NAME=PanDocElectron
xdg-desktop-menu uninstall pandocelectrion.desktop
xdg-icon-resource uninstall --size  32 $ICON_NAME
xdg-icon-resource uninstall --size  48 $ICON_NAME
xdg-icon-resource uninstall --size  64 $ICON_NAME
xdg-icon-resource uninstall --size 128 $ICON_NAME
