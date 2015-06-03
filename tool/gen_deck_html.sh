#!/bin/sh

# usage:
#   gen_deck_html.sh <file_name>

TARGET=$1
PDF=${1}.pdf

cd decks
rm -rf ${1}
pdf2htmlEX --embed cfijo --data-dir=../tool/pdf2htmlex_master --dest-dir ${TARGET} ${PDF}
cd -
