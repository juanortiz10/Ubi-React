var React = require('react');

var EmojiBox = React.createClass({
  render: function(){
    return(
      <div>
        <img className="img_emoji" src={this.props.route} data-toggle="tooltip" title={this.props.info}/>
      </div>
    );
  }
});

module.exports = EmojiBox;
