// 1. Set up folder with sass
// 2. glyphicon still not working without seperate bootstrap.css file
// 3. set circles to appear on click... couldnt figure out how to call function rather than copy centerLongitude
// 4. created zoom perameter to reload map at consistant zoom levels on button-press
// 5. created extra cities - 15 total
// 6. hid landscape and province tags
// 7. zoom limit still disappears when working with buttons


var initialize = require("./../js/map.js").initialize;
var apiKey = require("./../.env").apiKey;


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
  },{
    cityName: "Berlin",
    lat: 52.508210,
    long: 13.391219
  },{
    cityName: "Paris",
    lat: 48.868770,
    long: 2.351886
  },{
    cityName: "Dublin",
    lat: 53.349318,
    long: -6.285810
  },{
    cityName: "Moscow",
    lat: 55.753632,
    long: 37.611100
  },{
    cityName: "Seattle",
    lat: 47.605380,
    long: -122.326197
  },{
    cityName: "Chicago",
    lat: 41.873462,
    long: -87.679400
  },{
    cityName: "New Orleans",
    lat: 29.978206,
    long: -90.100809
  },{
    cityName: "Mexico City",
    lat: 19.431347,
    long: -99.134647
  },{
    cityName: "Beijing",
    lat: 39.897416,
    long: 116.389394
  },{
    cityName: "New Dehli",
    lat: 28.612002,
    long: 77.208496
  },{
    cityName: "Rome",
    lat: 41.901906,
    long: 12.492667
  },{
    cityName: "Honolulu",
    lat: 21.306219,
    long: -157.844572
  }
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
  },{
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "administrative.province",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

function findCities(city) {
  return city.featureType === "administrative.locality";
};

function findWater(water) {
  return water.featureType === "water";
};

function findAttractions(attraction) {
  return attraction.featureType === "poi";
};

function findRoads(road) {
  return road.featureType === "road";
};

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
  var maxDistance = 0.05;
  var index = Math.floor(Math.random() * 14.9);
  var minZoomLevel = 12;
  var zoom = 14;

  // WAIT FOR API TO LOAD THEN CREATE INITIAL MAP
  setTimeout(function() {
    console.log(index);
    var city = cityArray[index];
    centerLatitude = city.lat;
    centerLongitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, centerLatitude, centerLongitude, zoom));
    map = initialize(styleArray, centerLatitude, centerLongitude, zoom);

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
      radius: 4001,    // 10 miles in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');
  }, 300);


  // CALCULATE DISTANCE FROM MAP-LOAD CENTER TO DECRIMENT GAME SCORE
  setInterval(function() {
    currentLatitude = map.getCenter().lat();
    currentLongitude = map.getCenter().lng();
    var diffLat = Math.abs(currentLatitude-centerLatitude);
    var diffLng = Math.abs(currentLongitude-centerLongitude);
    var distance = Math.sqrt((diffLat*diffLat)+(diffLng*diffLng));
    if(distance > maxDistance) {
      console.log("decriment");
    }
  }, 1000);

  // JQUERY TO SHOW MAP LABELS
  $('#cityLabels').click(function() {
    var zoom = map.getZoom();
    var id = styleArray.findIndex(findCities);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(styleArray, currentLatitude, currentLongitude, zoom);

    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(centerLatitude, centerLongitude),
      title: 'city.cityName'
    });
    marker.setVisible(false);
    var circle = new google.maps.Circle({
      map: map,
      radius: 4001,    // 10 miles in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');

  });
  $('#waterLabels').click(function() {
    var zoom = map.getZoom();
    var id = styleArray.findIndex(findWater);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(styleArray, currentLatitude, currentLongitude, zoom);

    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(centerLatitude, centerLongitude),
      title: 'city.cityName'
    });
    marker.setVisible(false);
    var circle = new google.maps.Circle({
      map: map,
      radius: 4001,    // 10 miles in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');

  });
  $('#attractionLabels').click(function() {
    var zoom = map.getZoom();
    var id = styleArray.findIndex(findAttractions);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(styleArray, currentLatitude, currentLongitude, zoom);

    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(centerLatitude, centerLongitude),
      title: 'city.cityName'
    });
    marker.setVisible(false);
    var circle = new google.maps.Circle({
      map: map,
      radius: 4001,    // 10 miles in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');

  });
  $('#roadLabels').click(function() {
    var zoom = map.getZoom();
    var id = styleArray.findIndex(findRoads);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(styleArray, currentLatitude, currentLongitude, zoom);

    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(centerLatitude, centerLongitude),
      title: 'city.cityName'
    });
    marker.setVisible(false);
    var circle = new google.maps.Circle({
      map: map,
      radius: 4001,    // 10 miles in metres
      strokeColor: '#E61515',
      fillOpacity: 0,
      strokeOpacity: 0.6,
      strokeWeight: 20
    });
    circle.bindTo('center', marker, 'position');

  });
});
