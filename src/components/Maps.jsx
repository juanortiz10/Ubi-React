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
var infowindow = new google.maps.InfoWindow();
//Component
var Maps = React.createClass({
  //Default props or variables to set into the map
  getInitialState: function(){
    return{
      markers: [], info: '', map: null
    };
  },
  getDefaultProps: function () {
      return {
          initialZoom: 6,
          cameraInterval,
          source: 'http://192.168.11.148:8000/point/all',
          interval : 60
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
      this.getData();
  },
  getData: function(){
    var markerList = [];
    this.serverRequest = $.get(this.props.source, function (result) {
        for(var i = 0; i < result.length; i++){
            var lat = result[i].latitude;
            var lng = result[i].longitude;
            var hospital = result[i].name;
            var tickets = result[i].indicator;
            var info = "<h2>"+ result[i].name + "</h2>" +
                        "<p><h5>Dirección:</h5> "+ result[i].address +" </p> " +
                        "<p><h5>Contacto: </h5>" + result[i].contact +" </p> " +
                        "<p><h5>Teléfono: </h5>" + result[i].phone + " </p> " +
                        "<p><h5>Tickets: </h5>" + result[i].indicator + " </p> ";
            markerList.push(this.createMarker(lat,lng, hospital,this.state.map, info, tickets));
        }
        this.setState({markers: markerList});
      }.bind(this));
  },
  getUpdatedData: function(){
    this.serverRequest = $.get(this.props.source, function (result) {
        var markerList = [];
        for(var i = 0; i < result.length; i++){
            var tickets = result[i].indicator;
            var info = "<h2>"+ result[i].name + "</h2>" +
                        "<p><h5>Dirección:</h5> "+ result[i].address +" </p> " +
                        "<p><h5>Contacto: </h5>" + result[i].contact +" </p> " +
                        "<p><h5>Teléfono: </h5>" + result[i].phone + " </p> "  +
                        "<p><h5>Tickets: </h5>" + result[i].indicator + " </p> ";
            markerList.push(this.updateMarkers(this.state.map, info, i, tickets));
        }
        this.setState({markers: markerList});
      }.bind(this));
  },
  //Function that creates a marker on the map
  createMarker: function(lat,lng, hospital,map,info, tickets){
    var iconRoute = "";
    if(tickets == 0){
      iconRoute="icons/blue.png";
    }else if(tickets <= 2){
      iconRoute="icons/yellow.png";
    }else if(tickets >= 3){
      iconRoute="icons/red.png";
    }
    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          title: hospital,
          icon: iconRoute,
          animation: google.maps.Animation.DROP,
          map: map
    });
    marker.addListener('click', function() {
      infowindow.setContent(info);
      infowindow.open(map, marker);
    });
    return marker;
  },
  //Function that returns latitude and longitude google coordinates
  mapCenterLatLng: function () {
    return new google.maps.LatLng(this.props.latitude, this.props.longitude);
  },
  updateMarkers: function(map, info, position, tickets){
      var mark = this.state.markers[position];
      var iconRoute = "";
      if(tickets == 0){
        iconRoute="icons/blue.png";
      }else if(tickets <= 2){
        iconRoute="icons/yellow.png";
      }else if(tickets >= 3){
        iconRoute="icons/red.png";
      }
      mark.setIcon(iconRoute);
      mark.addListener('click', function() {
        infowindow.setContent(info);
        infowindow.open(map, mark);
      });
      return mark;
  },
  //Render
  render: function () {
      setInterval(this.getUpdatedData,60000);
        return (
            <div className='map-gic'></div>
        );
    }
});

module.exports = Maps;
