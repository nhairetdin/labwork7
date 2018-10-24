function getMapLocation() {
  navigator.geolocation.getCurrentPosition
  (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates
var onMapSuccess = function (position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  // navigator.geolocation coordinates needs to be converted to other format:
  let center = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

  new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      center: center,
      zoom: 15
    })
  });
}

function onMapError(error) {
  console.log('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
}