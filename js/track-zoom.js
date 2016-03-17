exports.trackZoom = function(map, maxZoom, points) {
  map.addListener('zoom_changed', function() {
    // var newZoom = map.getZoom();
    // if (newZoom < maxZoom) {
    //   maxZoom = newZoom;
    //   points -= 50;
    // }
    console.log(map.getZoom());
  });
};
