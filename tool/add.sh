#!/bin/sh

PDF=$1
FILENAME=`basename $PDF`
BASENAME=${FILENAME%.*}
overwrite=no

echo "** copy file ${PDF} to decks"
if [ -f decks/$FILENAME ]; then
  echo "overwrite=yes"
  overwrite=yes
fi
cp -v $PDF decks/

echo "** resize ${FILENAME} for screen view"
./tool/pdf_resize.sh $PDF

echo "** generate thumb for ${FILENAME}"
./tool/gen_deck_thumb.sh $FILENAME

echo "** generate html for ${BASENAME}"
./tool/gen_deck_html.sh $BASENAME

echo "** update decks.json"
echo $overwrite
tmpfile=/tmp/decks.$(date +%s).json
if [[ $overwrite == "yes" ]]; then
  echo "overwrite, update timestamp only."
  json="{
\"action_update\": 1,
\"payload\": { \"file\": \"${BASENAME}\", \"updated\": \"$(date +%s)\" }
}"
  echo $json | node tool/update_decks_json.js >$tmpfile
  cp -v decks.json decks.json.bak
  cp -v $tmpfile decks.json
else
  json="{
\"file\": \"${BASENAME}\",
\"title\": \"\",
\"desc\": \"\",
\"updated\": \"$(date +%s)\"
}"
  echo $json | node tool/update_decks_json.js >$tmpfile
  cp -v decks.json decks.json.bak
  cp -v $tmpfile decks.json
  vim -c "/$BASENAME" decks.json
fi

echo "** all done!"
