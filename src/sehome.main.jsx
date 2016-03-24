function getSlideShareHash(deck) {
  var pos = deck.URL.value.lastIndexOf('/');
  return deck.URL.value.substr(pos + 1).trim();
}

const SEDeckLightbox = React.createClass({
  getInitialState() {
    return {
      show: this.props.deck ? true : false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.deck) {
      this.setState({ show: true });
    }
  },

  turnOnOff() {
    var s = !this.state.show;
    this.setState({ show: s });
  },

  componentDidUpdate(prevProps, prevState) {
    // trigger fb social plugin
    window.FB && window.FB.XFBML && window.FB.XFBML.parse();
  },

  render() {
    if (!this.props.deck || !this.state.show) {
      return (<div />);
    }

    var d = this.props.deck;
    var embed = d.Embed.value
      .replace('width="427"', 'width="100%"')
      .replace('height="356"', 'height="700"');
    return (
      <div className="col-md-12">
        <button type="button" className="close"
          style={{ 'marginRight': '-35px', 'marginTop': '-25px' }}
          onClick={this.turnOnOff}>
          <span><h3><b>×</b></h3></span>
        </button>
        <div dangerouslySetInnerHTML={{__html: embed}}></div>
        <div><center><div className="fb-comments"
             data-href={window.location.href + '#' + getSlideShareHash(d)}
             data-numposts="5">
        </div></center></div>
        <hr />
      </div>
    );
  }
});

const SEDeckListItem = React.createClass({
  render() {
    var i = this.props.item;
    var onclick = () => { this.props.onShow(this.props.item); };
    return (
      <div className="se-deck-list-item">
        <div className="thumbnail"
          style={{ 'cursor': 'pointer' }}
          onClick={onclick}>
          <img src={i.ThumbnailXXLargeURL.value}></img>
          <div className="caption">
          <h3>{i.Title.value}</h3>
          <p>{i.Description.value}</p>
          <div className="fb-like"
            data-href={window.location.href + '#' + getSlideShareHash(i)}
            data-layout="button"
            data-action="like"
            data-show-faces="true"
            data-share="true">
          </div>
        </div>
      </div>
      </div>
    );
  }
});

const SEDeckList = React.createClass({
  getInitialState() {
    return {
      showingDeck: this.findDeckInHash() || null
    };
  },

  findDeckInHash() {
    var deckhash = window.location.hash.substr(1).trim();
    if (deckhash === '') {
      return null;
    }
    return window.seaworld.data.Tag.Slideshow.find((deck) => {
      return deck.URL.value.endsWith(deckhash);
    });
  },

  showDeck(deck) {
    this.setState({ showingDeck: deck });
    window.location.hash = getSlideShareHash(deck);
  },

  render() {
    var deck_entries = [];
    window.seaworld.data.Tag.Slideshow.forEach((slideshow) => {
      deck_entries.push(
        <SEDeckListItem key={slideshow.ID.value}
          item={slideshow}
          onShow={this.showDeck} />
      );
    });
    return (
      <div className="row">
        <SEDeckLightbox deck={this.state.showingDeck} />
        <div className="container">
          <div className="col-md-3"><center>
            <a href={'https://www.facebook.com/' + window.seaworld.info.fbid}>
              <img
                width="150"
                src={'https://graph.facebook.com/' + window.seaworld.info.fbid + '/picture?type=square&type=large'}
                className="img-circle"></img>
            </a>
            <h2>{window.seaworld.info.name}</h2>
            <p>
              {window.seaworld.info.title} <br />
              Location: {window.seaworld.info.location} <br />
              Expertise: {window.seaworld.info.expertise}
            </p>
          </center></div>
          <div className="col-md-9">
            <div><h3>Avaliable Decks:</h3></div>
            <div className="se-deck-list">{deck_entries}</div>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h3>More videoes? Find them at {"  "}
            <a href="https://www.facebook.com/marketingdevelopers/videos"
               target="_blank">Facebook Marketing Developers Group</a>
            </h3>
            <a href="https://www.facebook.com/marketingdevelopers/videos"
               target="_blank">
               <img src="images/facebook_marketingdevelopers_videolist.png"
                    width="100%"></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <SEDeckList />,
  document.getElementById('sehome-container')
);
