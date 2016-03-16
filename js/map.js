exports.initialize = function(styleArray, latitude, longitude) {
  var mapProp = {
    center:new google.maps.LatLng(latitude,longitude),
    zoom:13,
    mapTypeControl: false,
    styles: styleArray,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
