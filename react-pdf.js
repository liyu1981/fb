var React = require('react');


var Pdf = React.createClass({
  getInitialState: function() {
    return {
      pdf: null
    };
  },

  componentDidMount: function() {
    var self = this;
    PDFJS.getDocument(this.props.file).then(function(pdf) {
      self.setState({pdf: pdf});
      self.props.onLoad && self.props.onLoad(pdf);
    });
  },

  getDefaultProps: function() {
    return {
      page: 1
    };
  },

  componentDidUpdate: function() {
    this.renderPdfPage();
  },

  renderPdfPage: function() {
    var self = this;
    var canvas = self.getDOMNode();
    if (this.state.pdf && canvas && canvas.tagName === 'CANVAS') {
      this.state.pdf.getPage(this.props.page).then(function(pdfPage) {
        setTimeout(function() {
          var canvas = self.getDOMNode(),
              context = canvas.getContext('2d'),
              scale = self.props.scale || 1.0,
              viewport = pdfPage.getViewport(scale);
          if (canvas) {
            var w = canvas.parentNode.offsetWidth;
            var s = getComputedStyle(canvas.parentNode);
            var pl = parseInt(s.paddingLeft.replace('px', ''));
            if (pl > 0) { w = w - pl; }
            var pr = parseInt(s.paddingRight.replace('px', ''));
            if (pr > 0) { w = w - pr; }
            scale = w / viewport.width;
            viewport = pdfPage.getViewport(scale);
          }
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          pdfPage.render(renderContext);
        });
      });
    }
  },

  render: function() {
    if (this.state.pdf) {
      return <canvas onClick={this.props.onClick}></canvas>;
    } else {
      return <div>Loading pdf...</div>;
    }
  }
});


module.exports = Pdf;
