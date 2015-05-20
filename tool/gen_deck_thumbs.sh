cd decks

rm -rf *.png
for f in *.pdf
do
  echo -n "convert ${f}..."
  convert -colorspace sRGB "${f}[0]" "${f}.png"
  echo "done."
done

cd -
