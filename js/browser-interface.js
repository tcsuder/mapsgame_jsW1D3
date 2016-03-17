// 2. glyphicon still not working without seperate bootstrap.css file / do this later


var initialize = require("./../js/map.js").initialize;
var apiKey = require("./../.env").apiKey;
var calculateDistance = require("./../js/calculate-distance.js").calculateDistance;
var createCircle = require('./../js/create-circle.js').createCircle;
var limitZoom = require('./../js/limit-zoom.js').limitZoom;
var trackZoom = require('./../js/track-zoom.js').trackZoom;

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
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
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
  },{
    featureType: "administrative.land_parcel",
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
  var index = Math.floor(Math.random() * 15);
  var city;
  var playedCities = [];
  var maxDistance = 4000;
  var minZoomLevel = 12;
  var zoom = 14;
  var maxZoom = 14;
  var points = 1000;
  var totalScore = 0;
  var localStyleArray = [];
  var decrimentTimer = 1000;
  var localTimer;
  var changeTimer = false;
  var scoreTimer;

  // WAIT FOR API TO LOAD THEN CREATE INITIAL MAP
  setTimeout(function() {
    for(var i = 0; i<styleArray.length; i++) {
      localStyleArray.push(styleArray[i]);
    }
    city = cityArray[index];
    centerLatitude = city.lat;
    centerLongitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, centerLatitude, centerLongitude, zoom));
    map = initialize(localStyleArray, centerLatitude, centerLongitude, zoom);


    // LIMIT ZOOM
    limitZoom(map, minZoomLevel);

    // TRACK ZOOM TO DECRIMENT POINTS
    trackZoom(map, maxZoom, points);

    // CREATE CIRCLE FOR DANGER ZONE
    createCircle(map, centerLatitude, centerLongitude);

  }, 300);

  //SHOW GUESS BUTTON
  $('#guess').show();

  // CALCULATE DISTANCE FROM MAP-LOAD CENTER TO DECRIMENT GAME SCORE
  setInterval(function() {
    decrimentTimer -= 20;
    changeTimer = false;
    currentLatitude = map.getCenter().lat();
    currentLongitude = map.getCenter().lng();
    var distance = calculateDistance(centerLatitude, currentLatitude, centerLongitude, currentLongitude);
    var diffDistance = distance - maxDistance;
    var decTime = 1000/(Math.pow(10, (diffDistance/2500)));
    if(decrimentTimer === 0) {
      decrimentTimer = 1000;
    }
    // console.log(distance);

    if(distance > maxDistance) {
      if(decrimentTimer === 20) {
        clearInterval(scoreTimer);
        scoreTimer = setInterval(function() {
          points--;
        }, decTime);
      }
    } else {
      clearInterval(scoreTimer);
    }
    var newZoom = map.getZoom();
    if (newZoom < maxZoom) {
      maxZoom = newZoom;
      points -= 50*(14-newZoom);
    }
  }, 20);

  // JQUERY TO SHOW MAP LABELS
  $('#cityLabels').click(function() {
    var zoom = map.getZoom();
    var id = localStyleArray.findIndex(findCities);
    if(id >= 0) {
      if(localStyleArray[id].stylers[0].visibility !== "on") {
        points -= 1000;
        localStyleArray[id].stylers[0].visibility = "on";
      }
    }
    city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(localStyleArray, currentLatitude, currentLongitude, zoom);
    limitZoom(map, minZoomLevel);

    createCircle(map, centerLatitude, centerLongitude);
  });
  $('#waterLabels').click(function() {
    var zoom = map.getZoom();
    var id = localStyleArray.findIndex(findWater);
    if(id > 0) {
      if(localStyleArray[id].stylers[0].visibility !== "on") {
        points -= 300;
        localStyleArray[id].stylers[0].visibility = "on";
      }
    }
    city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(localStyleArray, currentLatitude, currentLongitude, zoom);
    limitZoom(map, minZoomLevel);
    trackZoom(map, maxZoom, points);
    createCircle(map, centerLatitude, centerLongitude);
  });
  $('#attractionLabels').click(function() {
    var zoom = map.getZoom();
    var id = localStyleArray.findIndex(findAttractions);
    if(id > 0) {
      if(localStyleArray[id].stylers[0].visibility !== "on") {
        points -= 500;
        localStyleArray[id].stylers[0].visibility = "on";
      }
    }
    city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(localStyleArray, currentLatitude, currentLongitude, zoom);
    limitZoom(map, minZoomLevel);
    trackZoom(map, maxZoom, points);
    createCircle(map, centerLatitude, centerLongitude);
  });
  $('#roadLabels').click(function() {
    var zoom = map.getZoom();
    var id = localStyleArray.findIndex(findRoads);
    if(id > 0) {
      if(localStyleArray[id].stylers[0].visibility !== "on") {
        points -= 200;
        localStyleArray[id].stylers[0].visibility = "on";
      }
    }
    city = cityArray[index];
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, currentLatitude, currentLongitude, zoom));
    map = initialize(localStyleArray, currentLatitude, currentLongitude, zoom);
    limitZoom(map, minZoomLevel);
    trackZoom(map, maxZoom, points);
    createCircle(map, centerLatitude, centerLongitude);
  });

  // GAME FUNCTIONALITY

  setInterval(function() {
    $("#points").text(points);
  }, 5)

  $("#guess").submit(function(event) {
    event.preventDefault()
    // debugger;
    var guess = $("#guessInput").val().toLowerCase();
    $('#result').show();
    console.log(city.cityName);
    if (guess === city.cityName.toLowerCase()) {
      totalScore += points;
      $("#result").text("Right! Good Job!");
      playedCities.push(city);
      $("#totalScore").text(totalScore);
      $('#newRound').show();
      $('#guess').hide();
    } else {
      $("#result").text("wrong answer")
      points -= 100;
    }
    setTimeout(function() {
      $("#result").hide();
    }, 2000);
    $("#guessInput").val("");
  });

  $('#newRound').click(function() {
    points = 1000;
    maxZoom = 14;
    $('#guess').show();
    var newCity = false;
    var counter = 0;
    while(!newCity) {
      index = Math.floor(Math.random() * 15);
      city = cityArray[index];
      if (playedCities.indexOf(city) < 0) {
        console.log(city.cityName);
        newCity = true;
      }
      counter++;
      if(counter > 1000) {
        break;
      }
    }
    localStyleArray = [];
    for(var i = 0; i<styleArray.length; i++) {
      localStyleArray.push(styleArray[i]);
    }
    centerLatitude = city.lat;
    centerLongitude = city.long;
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, centerLatitude, centerLongitude, zoom));
    map = initialize(localStyleArray, centerLatitude, centerLongitude, zoom);
    limitZoom(map, minZoomLevel);
    trackZoom(map, maxZoom, points);
    createCircle(map, centerLatitude, centerLongitude);
    $('#newRound').hide();
  });
});
