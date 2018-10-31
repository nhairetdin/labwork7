$(document).on("ready", function () {
  databaseHandler.createDatabase();
});

// user clicks register-button in register form (register.html)
function addUser() {
  var name = $("#txtName").val();
  var password = $("#txtPassword").val();

  if (!name) {
    alert("Name is required");
  } else {
    var r = confirm("Name: " + name + "\n" + "Password: " + password);
    if (r == true) {
      userHandler.addUser(name, password);
      $("#txtName").val("");
      $("#txtPassword").val("");
    }
    closeMenu('registerMenu')
  }
}

// user clicks login-button
function login() {
  var name = $("#loginName").val();
  var password = $("#loginPassword").val();
  var userid = "" + name + password
  userHandler.getUser(userid)
}



///////////////////////////////////MAP STUFF/////////////////////////////////////
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