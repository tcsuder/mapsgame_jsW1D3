exports.initialize = function(styleArray) {
  var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:13,
    mapTypeControl: false,
    styles: styleArray,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
