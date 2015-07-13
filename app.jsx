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

function fbconv(data) {
  console.log('going to fire fbq with:', data);
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
  getInitialState: function() {
    return {
      decks: []
    }
  },

  componentDidMount: function() {
    var self = this;
    $.get('decks.json', function(data) {
      self.setState({ decks: data });
    });
    fbconv({ route: 'DeckList' });
  },

  render: function() {
    var thumbnails = [];
    this.state.decks.forEach(function(deck) {
      if (deck.skip) { return; }
      thumbnails.push(
        <Col key={deck.file} xs={6} md={4}>
          <Thumbnail src={'decks/' + deck.file + '.pdf.png'} alt='242x200'>
            <h3>{deck.title}</h3>
            <p>{deck.desc}</p>
            <p><ButtonLink bsStyle='primary' to='deckviewer'
                           params={deck}>View</ButtonLink></p>
          </Thumbnail>
        </Col>
      );
    });
    return (
      <Grid><Row>{thumbnails}</Row></Grid>
    );
  }
});

var DeckViewer = React.createClass({
  getInitialState: function() {
    this.max_page = 1;
    return {
      decks: [],
      page: 1
    }
  },

  componentDidMount: function() {
    var root = $(this.getDOMNode());
    var fixMarginBottom = 40;
    var h = $(document).innerHeight() -
            root.find('.panel-heading').offset().top -
            root.find('.panel-heading').outerHeight() -
            fixMarginBottom;
    $(root).find('iframe').css({ height: h });
    var self = this;
    $.get('decks.json', function(data) {
      self.setState({ decks: data });
    });
    fbconv({ route: 'Deck: ' + this.props.params.file });
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
    var deck = findDeck(this.state.decks, this.props.params.file) || {};
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
  render: function() {
    return (
      <div>
        <br/>
        <RouteHandler/>
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
