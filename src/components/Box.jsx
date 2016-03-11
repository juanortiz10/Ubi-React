var React = require('react');
var Modal = require('react-modal');
var transitionsConfig, minsConfig;
var selectValueTran;
var selectValueMin = "0";
var ColorBox = require('./ColorBox.jsx');
var EmojiBox = require('./EmojiBox.jsx');

if( document.cookie.replace(/(?:(?:^|.*;\s*)transitions\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "ON"){
    transitionsConfig = "ON";
    selectValueTran = "1";
}else{
    transitionsConfig = "OFF";
    selectValueTran = "0";
}

if(document.cookie.replace(/(?:(?:^|.*;\s*)minutes\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "0"){
  selectValueMin = "0";
}else if(document.cookie.replace(/(?:(?:^|.*;\s*)minutes\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "1"){
  selectValueMin = "1";
}else if(document.cookie.replace(/(?:(?:^|.*;\s*)minutes\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "2"){
  selectValueMin = "2";
}

var Box = React.createClass({
  getInitialState: function(){
    return{
      modalIsOpen: false,
      transitionsValue: transitionsConfig,
      selectStatusTransitions : selectValueTran,
      selectStatusMinutes : selectValueMin
    };
  },
  openModal: function() {
   this.setState({modalIsOpen: true});
  },
 closeModal: function() {
   this.setState({modalIsOpen: false});
  },
  save: function(event){
    document.cookie = "transitions="+this.state.transitionsValue;
    document.cookie = "minutes= "+this.state.minutesValue;
    location.reload();
  },
  onChangeTransitions:function(event){
    var value;
    if(event.target.value == 0){
        value = "OFF";
    }else{
        value = "ON"
    }
    this.setState({transitionsValue: value});
  },
  onChangeMinutes: function(event){
    var value;
    if (event.target.value == 0) {
      value = "0";
    }else if(event.target.value == 1){
      value = "1";
    }else if(event.target.value == 2){
      value = "2";
    }
    this.setState({minutesValue: value});
  },
  render: function(){
    var style= {
      fontSize : '1.6em',
      color    : '#454545',
      cursor   : 'pointer'
    };
    return(
      <div>
        <div className="container-fixed">
          <ColorBox route="imgs/yellow.jpg" info="2 ó mas Tickets"/>
          <ColorBox route="imgs/red.png" info="Mas de 3 Tickets"/>
          <ColorBox route="imgs/blue.png" info="Sin Tickets"/>
        </div>
        <div className="container-fixed-emoji">
          <EmojiBox route="icons/cues.png" info="Sin Información"/>
          <EmojiBox route="icons/norefe.png" info="No Referenciable"/>
          <EmojiBox route="icons/proceso.png" info="En Proceso"/>
          <EmojiBox route="icons/refe.png" info="Referenciable"/>
        </div>
        <div className="container-button-fixed">
          <i className="fa fa-cog" style={style} onClick={this.openModal}></i>
        </div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}>
            <h2 id="configTitle">Configuración</h2>
            <div className="containerModal">
              <h3>Transición</h3>
              <select className="selectConfigs" onChange={this.onChangeTransitions} defaultValue={this.state.selectStatusTransitions}>
                <option value="0">Desactivada</option>
                <option value="1">Activada</option>
              </select>
              <h3>Intervalo</h3>
              <select className="selectConfigs" onChange={this.onChangeMinutes} defaultValue={this.state.selectStatusMinutes}>
                <option value="0">1 Minuto</option>
                <option value="1">5 Minutos</option>
                <option value="2">10 Minutos</option>
              </select>
              <div className="buttons">
              <div className="button raised" onClick={this.save}>
                  <div className="center" fit>GUARDAR</div>
                    <paper-ripple fit></paper-ripple>
                  </div>
                  <div className="button raised grey" onClick={this.closeModal}>
                    <div className="center" fit>CANCELAR</div>
                      <paper-ripple fit></paper-ripple>
                  </div>
              </div>
            </div>
        </Modal>
      </div>
    );
  }
});

module.exports = Box;
