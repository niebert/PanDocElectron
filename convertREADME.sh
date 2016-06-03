#!/bin/sh
cp /Users/niehausbert/ownCloudLD/Atom/PanDocElectron/README.md .
pandoc -f markdown_github -t html --toc -o README.html -c pandoc.css --variable author="Engelbert Niehaus" --variable title="PanDocElectron - Documentation" README.md
