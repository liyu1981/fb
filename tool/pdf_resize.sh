#!/bin/sh

pdfResize() {
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -dPDFSETTINGS=/$1 -sOutputFile=output.pdf $2
}

cd decks
pdfResize screen $1
rm $1
mv output.pdf $1
cd -
