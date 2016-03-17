Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

exports.calculateDistance = function(lat1, lat2, lng1, lng2) {
  var R = 6371000; //Earth radius in meters
  var theta1 = Math.radians(lat1);
  var theta2 = Math.radians(lat2);
  var deltaTheta = Math.radians(Math.abs(lat2-lat1));
  var deltaLambda = Math.radians(Math.abs(lng2-lng1));
  var a = Math.sin(deltaTheta/2)*Math.sin(deltaTheta/2) +
          Math.cos(theta1)*Math.cos(theta2) *
          Math.sin(deltaLambda/2)*Math.sin(deltaLambda/2);
  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
