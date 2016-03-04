/*
name: Maps
author: Juan Ortiz Jr.
project: Ubi
date: 03/March/2016
*/
var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('react-google-maps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var LatLng = GoogleMapsAPI.LatLng;
var Marker = ReactGoogleMaps.Marker;

//Component
var Maps = React.createClass({
  //Default props or variables to set into the map
  getDefaultProps: function () {
      return {
          initialZoom: 6,
          latitude: 22.133977,
          longitude: -101.448995
          'url': 
      };
  },
  //This will run when DOM be ready
  componentDidMount: function (rootNode) {
      var mapOptions = {
          center: this.mapCenterLatLng(),
          zoom: this.props.initialZoom,
          disableDefaultUI: true
      },
      map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
      this.setState({map: map});
  },
  //Function that returns latitude and longitude google coordinates
  mapCenterLatLng: function () {
    return new google.maps.LatLng(this.props.latitude, this.props.longitude);
  },
  //Render
  render: function () {
        return (
            <div className='map-gic'></div>
        );
    }
});

module.exports = Maps;
