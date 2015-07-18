var React = require('react');

var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  ;

var ReactBootstrap = require('react-bootstrap')
  , Grid = ReactBootstrap.Grid
  , Row = ReactBootstrap.Row
  , Col = ReactBootstrap.Col
  , Thumbnail = ReactBootstrap.Thumbnail
  , Button = ReactBootstrap.Button
  , ButtonGroup = ReactBootstrap.ButtonGroup
  , Panel = ReactBootstrap.Panel
  ;

var ReactRouterBootstrap = require('react-router-bootstrap')
  , ButtonLink = ReactRouterBootstrap.ButtonLink
  ;

var path = require('path');

var cookie = require('js-cookie');

var LinkMixin = require('./lib/LinkMixin');
var ALink = React.createClass({
  mixins: [
    LinkMixin
  ],

  render: function() {
    return (
      <a {...this.getLinkProps()} ref='alink'>
        {this.props.children}
      </a>
    );
  }
});
var ThumbnailLink = React.createClass({
  mixins: [
    LinkMixin
  ],

  render: function() {
    var innerThumbStyle = {
      padding: '0px'
    };
    return (
      <Thumbnail>
        <Thumbnail style={innerThumbStyle} {...this.getLinkProps()} {...this.props} ref='thumbnaillink' />
        {this.props.children}
      </Thumbnail>
    );
  }
});

function fbconv(data) {
  console.info('going to fire fbq with:', data);
  window._fbq = window._fbq || [];
  var d = $.extend({'value':'0.00','currency':'HKD'}, data);
  window._fbq.push(['track', '6026067140696', d]);
}

function findDeck(decks, file) {
  for (var i=0; i<decks.length; i++) {
    if (decks[i].file === file) {
      return decks[i];
    }
  }
  return null;
}

var DeckList = React.createClass({
  componentDidMount: function() {
    fbconv({ route: 'DeckList' });
  },

  updatedMark: function(deck) {
    var vs = this.props.appdata.deckViewStatus;;
    var lastseen = vs[deck.file] && vs[deck.file]['lastseen'];
    if (!lastseen ||
        parseInt(deck.updated) > parseInt(lastseen)) {
      return (
        <div className="ribbon">
          <div className="ribbon-stitches-top"></div>
          <strong className="ribbon-content"><h1>Updated</h1></strong>
          <div className="ribbon-stitches-bottom"></div>
        </div>
      );
    }
    return '';
  },

  render: function() {
    var self = this;
    var thumbnails = [];
    this.props.appdata.decks.forEach(function(deck) {
      if (deck.skip) { return; }
      thumbnails.push(
        <Col key={deck.file} xs={12} md={4}>
          {self.updatedMark(deck)}
          <ThumbnailLink src={'decks/' + deck.file + '.pdf.png'} alt='242x200'
                         to='deckviewer' params={deck}>
            <h3><ALink to='deckviewer' params={deck}>{deck.title}</ALink></h3>
            <p>{deck.desc}</p>
          </ThumbnailLink>
        </Col>
      );
    });
    return (
      <Grid><Row>{thumbnails}</Row></Grid>
    );
  }
});

var DeckViewer = React.createClass({
  componentDidMount: function() {
    var root = $(this.getDOMNode());
    var fixMarginBottom = 40;
    var h = $(document).innerHeight() -
      root.find('.panel-heading').offset().top -
      root.find('.panel-heading').outerHeight() -
      fixMarginBottom;
    $(root).find('iframe').css({ height: h });

    fbconv({ route: 'Deck: ' + this.props.params.file });

    // trigger fb social plugin
    window.FB && window.FB.XFBML && window.FB.XFBML.parse();
  },

  pdf: function() {
    var pdf = 'decks/' + this.props.params.file + '.pdf';
    fbconv({ route: 'Pdf: ' + this.props.params.file });
    window.open(pdf);
  },

  fullScreen: function() {
    var html = 'decks/' + this.props.params.file +
               '/' + this.props.params.file + '.html';
    fbconv({ route: 'Fullscreen: ' + this.props.params.file });
    window.open(html);
  },

  render: function() {
    var filename = this.props.params.file + '.pdf';
    var deck = findDeck(this.props.appdata.decks, this.props.params.file) || {};

    var vs = this.props.appdata.deckViewStatus || {};
    vs[this.props.params.file] = { 'lastseen': deck.updated };
    cookie.set('deckViewStatus', vs);

    var header = (
      <span>
        {deck.title}
        <span className='pull-right'>
          <ButtonGroup style={{ marginTop: '-4px' }}>
            <Button onClick={this.pdf}>PDF</Button>
            <Button>
              <div className="fb-like"
                   data-href={window.location.href}
                   data-layout="button"
                   data-action="like"
                   data-show-faces="true"
                   data-share="true">
              </div>
            </Button>
          </ButtonGroup>
        </span>
      </span>
    );
    var html = 'decks/' + this.props.params.file +
               '/' + this.props.params.file + '.html';
    return (
      <div className='container'>
      <Panel className='full-panel' header={header}>
        <iframe id="deckIframe" src={html}></iframe>
      </Panel>
      <br />
      <Panel>
        <center><div className="fb-comments"
             data-href={window.location.href}
             data-numposts="5">
        </div></center>
      </Panel>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      decks: [],
      deckViewStatus: {}
    }
  },

  componentDidMount: function() {
    var self = this;
    $.get('decks.json', function(data) {
      self.setState({ decks: data });
    });
    var vs = cookie.get('deckViewStatus') || "{}";
    this.setState({ deckViewStatus: JSON.parse(vs) });
  },

  render: function() {
    var appdata = { 'appdata': this.state };
    return (
      <div>
        <br/>
        <RouteHandler {...appdata}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name='deckviewer' path='viewer/:file' handler={DeckViewer} />
    <DefaultRoute name="decklist" handler={DeckList}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('top-container'));
});
