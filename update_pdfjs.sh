VERSION=1.1.3
ZIPNAME=pdfjs-${VERSION}-dist.zip
rm -rf pdfjs
mkdir pdfjs
cd pdfjs
wget https://github.com/mozilla/pdf.js/releases/download/v${VERSION}/${ZIPNAME}
unzip ${ZIPNAME}
rm -rf ${ZIPNAME}
echo "Updated pdfjs v${VERSION}." >update.log
echo "done"
cd -
