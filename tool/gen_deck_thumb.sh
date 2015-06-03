#!/bin/sh

# usage: gen_deck_thumb.sh 123.pdf

PDF=$1

cd decks

rm -rf $PDF.png
echo "convert ${PDF}..."
convert -colorspace sRGB "${PDF}[0]" "${PDF}.png"
echo "done."

cd -
