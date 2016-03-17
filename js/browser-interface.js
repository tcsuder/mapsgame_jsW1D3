var initialize = require("./../js/map.js").initialize;
var apiKey = require("./../.env").apiKey;
var calculateDistance = require("./../js/calculate-distance.js").calculateDistance;

var cityArray = [
  {
    cityName: "London",
    lat: 51.508742,
    long: -0.120850
  },{
    cityName: "Portland",
    lat: 45.525319,
    long: -122.658549
  },{
    cityName: "New York",
    lat: 40.736198,
    long: -73.965213
  },
];

var styleArray = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "administrative.neighborhood",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "transit",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

function findCities(city) {
  return city.featureType === "administrative.locality";
}

function findWater(water) {
  return water.featureType === "water";
}

function findAttractions(attraction) {
  return attraction.featureType === "poi";
}

function findRoads(road) {
  return road.featureType === "road";
}

$(function() {

  // GENERATE SCRIPT TAG IN DOM

  var s = document.createElement("script");
  s.type="text/javascript";
  s.src="http://maps.googleapis.com/maps/api/js?key=" + apiKey;
  $("head").prepend(s);

  // INITIALIZE GLOBAL VARIABLES
  var map;
  var centerLatitude;
  var centerLongitude;
  var currentLatitude;
  var currentLongitude;
  var maxDistance = 4000;
  var index = Math.floor(Math.random() * 3);
  var minZoomLevel = 12;


  // WAIT FOR API TO LOAD THEN CREATE INITIAL MAP
  setTimeout(function() {
    console.log(index);
    var city = cityArray[index];
    centerLatitude = city.lat;
    centerLongitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, centerLatitude, centerLongitude));
    map = initialize(styleArray, centerLatitude, centerLongitude);

    // LIMIT ZOOM
   google.maps.event.addListener(map, 'zoom_changed', function() {
     if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });

    // CREATE CIRCLE FOR DANGER ZONE
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(centerLatitude, centerLongitude),
      title: 'city.cityName'
    });
    marker.setVisible(false);

    var circle = new google.maps.Circle({
      map: map,
      radius: 4000,    // measured in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');
  }, 200);

  // CALCULATE DISTANCE FROM MAP-LOAD CENTER TO DECRIMENT GAME SCORE
  setInterval(function() {
    currentLatitude = map.getCenter().lat();
    currentLongitude = map.getCenter().lng();
    var distance = calculateDistance(centerLatitude, currentLatitude, centerLongitude, currentLongitude);
    if(distance > maxDistance) {
      console.log("decriment");
    }
  }, 1000);

  // JQUERY TO SHOW MAP LABELS
  $('#cityLabels').click(function() {
    var id = styleArray.findIndex(findCities);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude));
    map = initialize(styleArray, currentLatitude, currentLongitude);
  });
  $('#waterLabels').click(function() {
    var id = styleArray.findIndex(findWater);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude));
    map = initialize(styleArray, currentLatitude, currentLongitude);
  });
  $('#attractionLabels').click(function() {
    var id = styleArray.findIndex(findAttractions);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude));
    map = initialize(styleArray, currentLatitude, currentLongitude);
  });
  $('#roadLabels').click(function() {
    var id = styleArray.findIndex(findRoads);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude));
    map = initialize(styleArray, currentLatitude, currentLongitude);
  });
});
