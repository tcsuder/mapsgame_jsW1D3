exports.createCircle = function(map, centerLatitude, centerLongitude) {
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(centerLatitude, centerLongitude),
    title: 'city.cityName'
  });

  marker.setVisible(false);
  var circle = new google.maps.Circle({
    map: map,
    radius: 4000,    // measured in metres
    strokeColor: '#00D407',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle.bindTo('center', marker, 'position');

  var circle2 = new google.maps.Circle({
    map: map,
    radius: 5500,    // measured in metres
    strokeColor: '#F5F100',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle2.bindTo('center', marker, 'position');

  var circle3 = new google.maps.Circle({
    map: map,
    radius: 7000,    // measured in metres
    strokeColor: '#E00000',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle3.bindTo('center', marker, 'position');
}
