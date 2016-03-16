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
  var s = document.createElement("script");
  s.type="text/javascript";
  s.src="http://maps.googleapis.com/maps/api/js?key=" + apiKey;
  $("head").prepend(s);
  var index = Math.floor(Math.random() * 3);
  setTimeout(function() {
    console.log(index);
    var city = cityArray[index];
    var latitude = city.lat;
    var longitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, latitude, longitude));
    var map = initialize(styleArray, latitude, longitude);
  }, 200);


  $('#cityLabels').click(function() {
    var id = styleArray.findIndex(findCities);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    var latitude = city.lat;
    var longitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, latitude, longitude));
    var map = initialize(styleArray, latitude, longitude);
    console.log(map);
  });
  $('#waterLabels').click(function() {
    var id = styleArray.findIndex(findWater);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    var latitude = city.lat;
    var longitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, latitude, longitude));
    var map = initialize(styleArray, latitude, longitude);
  });
  $('#attractionLabels').click(function() {
    var id = styleArray.findIndex(findAttractions);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    var latitude = city.lat;
    var longitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, latitude, longitude));
    var map = initialize(styleArray, latitude, longitude);
  });
  $('#roadLabels').click(function() {
    var id = styleArray.findIndex(findRoads);
    styleArray.splice(id, 1);
    var city = cityArray[index];
    var latitude = city.lat;
    var longitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(styleArray, latitude, longitude));
    var map = initialize(styleArray, latitude, longitude);
  });
});
