var React = require('react');

var ColorBox = React.createClass({
  render: function(){
    return(
      <div>
        <img src={this.props.route} data-toggle="tooltip" title={this.props.info} className="colorBox"/>
      </div>
    );
  }
});

module.exports = ColorBox;
