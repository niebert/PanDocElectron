#!/bin/sh
#wget http://www.quelle.de/meinedatei.deb
# dpkg -i package.deb
sudo apt-get install geany libjpeg62 octave qtoctave geogebra grass qgis gnuplot inkscape gimp audacity kdenlive r-base r-recommended
#  LaTeX Maxima wxMaxima Octave 4.0 enthaelt GUI Package einbinden PanDoc Cite PanDoc Imagemagick texstudio kile Atom
wget https://download1.rstudio.org/rstudio-0.99.486-amd64.deb
sudo dpkg -i ./rstudio-0.99.486-amd64.deb
