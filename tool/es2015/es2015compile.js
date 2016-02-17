// usage: node compile.js src lib/Adminhtml
//
// following dev dependencies are needed
//
// {
//   "devDependencies": {
//     "babel-preset-es2015": "^6.3.13",
//     "babel-preset-react": "^6.3.13",
//     "babelify": "^7.2.0",
//     "browserify": "^13.0.0",
//   },
// }

process.chdir(process.cwd());

var fs = require('fs');
var path = require('path');
var cluster = require('cluster');
var browserify =
  require(path.join(process.cwd(), 'node_modules', 'browserify'));

var srcdir = process.argv[2];
var destdir = process.argv[3];
var watch = process.argv[4] || false;
var depsmap = {};
var incompiling = {};

function compile(srcfile, destfile, callback) {
  var s = fs.createWriteStream(destfile);
  var basename = path.basename(destfile, '.js')
  var deps = [];
  var b = browserify()
    .add(srcfile, {
      builtins: false,
      standalone: 'fbms.app.main.' + basename
    })

  if (callback) {
    b.pipeline.get('deps')
     .on('data', function(data) {
       deps.push(data.file);
     });
  }

  b.transform('babelify', {presets: ['es2015', 'react']})
   .bundle()
   .on('error', function(err) {
     console.log(err.stack);
     callback && callback([srcfile]);
   })
   .pipe(s);

  s.on('finish', function() { callback && callback(deps); });
}

function cluster_fork(args, callback, need_deps) {
  if (incompiling[args['SRCFILE']]) {
    //console.log(args['SRCFILE'], 'in compiling');
    return;
  }
  var new_worker_env = args;
  incompiling[args['SRCFILE']] = true;
  if (need_deps) {
    new_worker_env['NEED_DEPS'] = true;
  }
  cluster.fork(new_worker_env).on('message', function(msg) {
    if (msg.deps) {
      callback && callback(msg.deps);
    }
    delete incompiling[msg['SRCFILE']];
  });
}

if (cluster.isMaster) {
  if (!fs.existsSync(destdir)) {
    console.error('dir', destdir, 'not exist, please `mkdir', destdir, '`.');
    process.exit(1);
  }
  if (watch) {
    // start watcher
    fs.watch(srcdir, { persistent: true, recursive: false },
      function(event, f) {
        if (depsmap[f]) {
          depsmap[f].map(function(opts) { cluster_fork(opts); });
        }
      }
    );
  }
  fs.readdir(srcdir, function(err, files) {
    files
      .filter(function(file) {
        return file.substr(-('.main.jsx'.length)) === '.main.jsx';
      })
      .forEach(function(file) {
        var srcfile = path.join(srcdir, file);
        var filenoext = path.basename(file, '.main.jsx');
        var destfile = path.join(destdir, filenoext + '.js');
        var opts = {
          'SRCFILE': srcfile,
          'DESTFILE': destfile
        };
        if (watch) {
          cluster_fork(opts, function(deps) {
            deps.map(function(dep) {
              delete opts['NEED_DEPS'];
              if (depsmap[dep]) {
                depsmap[path.relative(srcdir, dep)].push(opts);
              } else {
                depsmap[path.relative(srcdir, dep)] = [opts];
              }
            });
            //console.log('depsmap is', depsmap);
          }, true);
        } else {
          cluster_fork(opts);
        }
      });
  });
} else {
  var srcfile = process.env['SRCFILE'];
  var destfile = process.env['DESTFILE'];
  var need_deps = process.env['NEED_DEPS'];
  console.log('compile', srcfile, '->', destfile);
  var start = Date.now();
  compile(srcfile, destfile, function(deps) {
    var end = Date.now();
    console.log('finished', srcfile, 'in',
                Math.floor((end-start)/1000), 'seconds');
    var msg = { SRCFILE: srcfile };
    if (need_deps) {
      msg.deps = deps;
    }
    process.send(msg);
  });
}
