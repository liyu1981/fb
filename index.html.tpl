<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="og:title" content="Marketing API Deck">
<meta name="og:description" content="Decks on how to use Facebook marketing APIs">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.js"></script>
<style>
/* responsive pre: http://codepen.io/marcopontili/pen/yEjvk */
pre {
  word-break: break-all; /* webkit */
  word-wrap: break-word;
  white-space: pre;
  white-space: -moz-pre-wrap; /* fennec */
  white-space: pre-wrap;
  white-space: pre\9; /* IE7+ */
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.voffset  { margin-top: 2px; }
.voffset1 { margin-top: 5px; }
.voffset2 { margin-top: 10px; }
.voffset3 { margin-top: 15px; }
.voffset4 { margin-top: 30px; }
.voffset5 { margin-top: 40px; }
.voffset6 { margin-top: 60px; }
.voffset7 { margin-top: 80px; }
.voffset8 { margin-top: 100px; }
.voffset9 { margin-top: 150px; }

.effect-blink-enter {
  background-color: #d9534f;
  transition: all 2s;
}
.effect-blink-leave {
  background-color: inherit;
}

.full-panel {
  margin-top: 0px;
  margin-bottom: 0px;
}

.full-panel .panel-body {
  padding: 0px;
}

.full-panel iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.panel, .thumbnail {
  border-radius: 2px;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
}

body {
/*  background: #e9eaed; */
}

.se-deck-list {
  -webkit-column-count: 2;
  -webkit-column-gap: 10px;
  -webkit-column-fill: auto;
  -moz-column-count: 3;
  -moz-column-gap: 10px;
  -moz-column-fill: auto;
  column-count: 3;
  column-gap: 15px;
  column-fill: auto;
}

.se-deck-list-item {
  display: inline-block;
  width:  100%;
}


@media only screen and (max-width : 768px) {
div.container { margin-top: 0px !important; }
div#sehome-container .close { display: none; }
div#sehome-container .col-md-12 { padding: 0px; }
div#sehome-container .col-md-12 iframe { height: auto !important; }
div#sehome-container div#iframe-container { position: relative; padding-bottom: 56.25%; /* 16:9 */ padding-top: 25px; height: 0; }
div#sehome-container div#iframe-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100% !important; }
.se-deck-list { -webkit-column-count: 1; -moz-column-count: 1; column-count: 1; }
}
</style>
<script>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();
</script>

<title>Solution Engineer's Home: liyuhk</title>

<!-- Bootstrap core CSS -->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.min.js"></script>
<script>
window.seaworld = { 'se_name': '$se_name' ,'info': $se_info ,'data': $se_data };
</script>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=334467960089822";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
</head>
<body>
<div class="container" style="margin-top: 60px;"><div class="row"><div class="col-xs-12">
  <div id="fb-root"></div>
  <div id="sehome-container"></div>
  <script type="text/javascript" src="sehome.js"></script>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=334467960089822";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  </script>
</div></div></div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63694179-1', 'auto');
  ga('send', 'pageview');
</script>

</body>
</html>

