(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function getSlideShareHash(deck) {
  var pos = deck.URL.value.lastIndexOf('/');
  return deck.URL.value.substr(pos + 1).trim();
}

var SEDeckLightbox = React.createClass({
  displayName: 'SEDeckLightbox',
  getInitialState: function getInitialState() {
    return {
      show: this.props.deck ? true : false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.deck) {
      this.setState({ show: true });
    }
  },
  turnOnOff: function turnOnOff() {
    var s = !this.state.show;
    this.setState({ show: s });
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // trigger fb social plugin
    window.FB && window.FB.XFBML && window.FB.XFBML.parse();
  },
  render: function render() {
    if (!this.props.deck || !this.state.show) {
      return React.createElement('div', null);
    }

    var d = this.props.deck;
    var embed = d.Embed.value.replace('width="427"', 'width="100%"').replace('height="356"', 'height="700"');
    return React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(
        'button',
        { type: 'button', className: 'close',
          style: { 'marginRight': '-35px', 'marginTop': '-25px' },
          onClick: this.turnOnOff },
        React.createElement(
          'span',
          null,
          React.createElement(
            'h3',
            null,
            React.createElement(
              'b',
              null,
              '×'
            )
          )
        )
      ),
      React.createElement('div', { dangerouslySetInnerHTML: { __html: embed } }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'center',
          null,
          React.createElement('div', { className: 'fb-comments',
            'data-href': window.location.href + '#' + getSlideShareHash(d),
            'data-numposts': '5' })
        )
      ),
      React.createElement('hr', null)
    );
  }
});

var SEDeckListItem = React.createClass({
  displayName: 'SEDeckListItem',
  render: function render() {
    var _this = this;

    var i = this.props.item;
    var onclick = function onclick() {
      _this.props.onShow(_this.props.item);
    };
    return React.createElement(
      'div',
      { className: 'col-sm-6 col-md-4' },
      React.createElement(
        'div',
        { className: 'thumbnail',
          style: { 'cursor': 'pointer' },
          onClick: onclick },
        React.createElement('img', { src: i.ThumbnailXXLargeURL.value }),
        React.createElement(
          'div',
          { className: 'caption' },
          React.createElement(
            'h3',
            null,
            i.Title.value
          ),
          React.createElement(
            'p',
            null,
            i.Description.value
          ),
          React.createElement('div', { className: 'fb-like',
            'data-href': window.location.href + '#' + getSlideShareHash(i),
            'data-layout': 'button',
            'data-action': 'like',
            'data-show-faces': 'true',
            'data-share': 'true' })
        )
      )
    );
  }
});

var SEDeckList = React.createClass({
  displayName: 'SEDeckList',
  getInitialState: function getInitialState() {
    return {
      showingDeck: this.findDeckInHash() || null
    };
  },
  findDeckInHash: function findDeckInHash() {
    var deckhash = window.location.hash.substr(1).trim();
    if (deckhash === '') {
      return null;
    }
    return window.seaworld.data.Tag.Slideshow.find(function (deck) {
      return deck.URL.value.endsWith(deckhash);
    });
  },
  showDeck: function showDeck(deck) {
    this.setState({ showingDeck: deck });
    window.location.hash = getSlideShareHash(deck);
  },
  render: function render() {
    var _this2 = this;

    var deck_entries = [];
    window.seaworld.data.Tag.Slideshow.forEach(function (slideshow) {
      deck_entries.push(React.createElement(SEDeckListItem, { key: slideshow.ID.value,
        item: slideshow,
        onShow: _this2.showDeck }));
    });
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(SEDeckLightbox, { deck: this.state.showingDeck }),
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'col-md-3' },
          React.createElement(
            'center',
            null,
            React.createElement(
              'a',
              { href: 'https://www.facebook.com/' + window.seaworld.info.fbid },
              React.createElement('img', {
                width: '150',
                src: 'https://graph.facebook.com/' + window.seaworld.info.fbid + '/picture?type=square&type=large',
                className: 'img-circle' })
            ),
            React.createElement(
              'h2',
              null,
              window.seaworld.info.name
            ),
            React.createElement(
              'p',
              null,
              window.seaworld.info.title,
              ' ',
              React.createElement('br', null),
              'Location: ',
              window.seaworld.info.location,
              ' ',
              React.createElement('br', null),
              'Expertise: ',
              window.seaworld.info.expertise
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col-md-9' },
          React.createElement(
            'div',
            null,
            'Avaliable Decks:'
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              null,
              deck_entries
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(SEDeckList, null), document.getElementById('sehome-container'));

},{}]},{},[1]);
