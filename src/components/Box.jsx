var React = require('react');
var Modal = require('react-modal');

var Box = React.createClass({
  getInitialState: function(){
    return{
      modalIsOpen: false,
      transitionsValue: '',
      updateValue: ''
    };
  },
  openModal: function() {
   this.setState({modalIsOpen: true});
  },
 closeModal: function() {
   this.setState({modalIsOpen: false});
  },
  save: function(event){
    localStorage.setItem("transitions", this.state.transitionsValue);
    localStorage.setItem("update", this.state.updateValue);
    alert("Guardado Correctamente");
  },
  onChangeTransitions:function(event){
    this.setState({transitionsValue: event.target.value});

  },
  onChangeUpdate: function(event){
    this.setState({updateValue: event.target.value});

  },
  render: function(){
    var style= {
      fontSize : '1.5em',
      color    : '#454545',
      cursor   : 'pointer'
    };
    return(
      <div>
        <div className="container-fixed" onClick={this.openModal}>
          <i className="fa fa-cog" style={style}></i>
        </div>

        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}>
            <h2 id="configTitle">Configuración</h2>
            <div className="containerModal">
              <h3>Transición</h3>
              <select className="selectConfigs" onChange={this.onChangeTransitions}>
                <option value="0">Activada</option>
                <option value="1">Desactivada</option>
              </select>
              <h3>Actualizar</h3>
              <select className="selectConfigs" onChange={this.onChangeUpdate}>
                <option value="0">5  Mins.</option>
                <option value="1">10 Mins.</option>
                <option value="2">15 Mins.</option>
                <option value="3">30 Mins.</option>
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
