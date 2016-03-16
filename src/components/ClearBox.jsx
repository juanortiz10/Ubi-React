var React = require('react');
var PubSub = require('pubsub-js');

var ClearBox = React.createClass({
  getInitialState: function(){
    return{
      emojiName: this.props.emoji,
      clazz: 'colorBox_on'
    };
  },
  onSet: function(){
    PubSub.publish('buttons', this.props.code);
  },
  changeClass: function(newClass){
    this.setState({clazz: newClass});
  },
  render: function(){
    return(
      <div onClick={this.props.clickAll}>
        <img className={this.state.clazz} src={this.props.route} data-toggle="tooltip" title={this.props.info}/>
      </div>
    );
  }
});

module.exports = ClearBox;
