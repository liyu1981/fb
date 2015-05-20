cd decks

rm -rf *.png
for f in *.pdf
do
  echo -n "convert ${f}..."
  convert "${f}[0]" "${f}.png"
  echo "done."
done

cd -
