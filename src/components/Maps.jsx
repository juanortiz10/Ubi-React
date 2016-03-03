var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('react-google-maps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var LatLng = GoogleMapsAPI.LatLng;
var Marker = ReactGoogleMaps.Marker;

var Maps = React.createClass({
  getDefaultProps: function () {
      return {
          initialZoom: 6,
          latitude: 22.133977,
          longitude: -101.448995
      };
  },
  componentDidMount: function (rootNode) {
      var mapOptions = {
          center: this.mapCenterLatLng(),
          zoom: this.props.initialZoom,
          disableDefaultUI: true
      },
      map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
      var marker = new google.maps.Marker({
        position: this.mapCenterLatLng(),
        title: 'Ubi',
        map: map
      });
      this.setState({map: map});
  },
  mapCenterLatLng: function () {
    return new google.maps.LatLng(this.props.latitude, this.props.longitude);
  },
  render: function () {
        return (
            <div className='map-gic'></div>
        );
    }
});

module.exports = Maps;
