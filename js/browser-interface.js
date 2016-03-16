var initialize = require("./../js/map.js").initialize;

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
  google.maps.event.addDomListener(window, 'load', initialize(styleArray));
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
