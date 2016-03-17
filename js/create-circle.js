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
    strokeColor: '#E61515',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 20
  });
  circle.bindTo('center', marker, 'position');
}
