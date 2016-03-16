var initialize = require("./../js/map.js").initialize;
var apiKey = require("./../.env").apiKey;

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
  var s = document.createElement("script");
  s.type="text/javascript";
  s.src="http://maps.googleapis.com/maps/api/js?key=" + apiKey;
  $("head").prepend(s);
  setTimeout(function() {
    google.maps.event.addDomListener(window, 'load', initialize(styleArray));
  }, 100);
  $('#cityLabels').click(function() {
    var id = styleArray.findIndex(findCities);
    styleArray.splice(id, 1);
    google.maps.event.addDomListener(window, 'load', initialize(styleArray));
  });
  $('#waterLabels').click(function() {
    var id = styleArray.findIndex(findWater);
    styleArray.splice(id, 1);
    google.maps.event.addDomListener(window, 'load', initialize(styleArray));
  });
  $('#attractionLabels').click(function() {
    var id = styleArray.findIndex(findAttractions);
    styleArray.splice(id, 1);
    google.maps.event.addDomListener(window, 'load', initialize(styleArray));
  });
  $('#roadLabels').click(function() {
    var id = styleArray.findIndex(findRoads);
    styleArray.splice(id, 1);
    google.maps.event.addDomListener(window, 'load', initialize(styleArray));
  });
});
