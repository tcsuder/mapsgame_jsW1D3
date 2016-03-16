var map;

exports.initialize = function(styleArray, latitude, longitude) {
  var mapProp = {
    center:new google.maps.LatLng(latitude,longitude),
    zoom:14,
    mapTypeControl: false,
    styles: styleArray,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  return map;
}
