function readStdin(callback) {
  var content = '';
  process.stdin.resume();
  process.stdin.on('data', function(buf) { content += buf.toString(); });
  process.stdin.on('end', function() {
    callback && callback(content);
  });
}

readStdin(function(strinput) {
  var input = JSON.parse(strinput);

  var fs = require('fs');
  fs.readFile('decks.json', function(err, strdata) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var j = JSON.parse(strdata);
    j.push(input);

    console.log(JSON.stringify(j, null, 2));
  });
});
