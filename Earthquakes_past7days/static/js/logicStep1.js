// Add console.log to check to see if our code is working.
console.log("working");

// Create the streets tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the satellite tile layer that will be the background of our map.  
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//Create a base layer that holds both maps
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

//Create the map object
let map = L.map('mapid', {
  center: [39.5,-98.5], // geographical center of the US
  zoom: 3,
  layers: [streets]
});

//Pass map layers into layers control and add layers control to the map
L.control.layers(baseMaps).addTo(map);

//Accessing the earthquake GeoJSON URL
let eqData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Get GeoJSON data
d3.json(eqData).then(function(data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
      // //turn feature into a popup marker
      // onEachFeature: function(feature, layer) {
      //   console.log(layer);
      //   layer.bindPopup("<h3>Magnitude: " + features[0].properties.mag +"</h3> <hr> <h3>Location(Place): " + features[0].properties.place + "</hr>" + "</h3>");
      // }
      }).addTo(map);
});

