// Add console.log to check to see if our code is working.
console.log("working");

// Create the streets tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the dark tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//Create a base layer that holds both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

//Create the map object
let map = L.map('mapid', {
  center: [43.7, -79.3], // Toronto
  zoom: 11,
  layers: [streets]
});

//Pass map layers into layers control and add layers control to the map
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL from GetHub
let torontoHoods = "https://raw.githubusercontent.com/SJLewer/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//Create a variable to hold style
let myStyle = {
  fillColor: "yellow",
  line: "blue",
  weight: 1
}
//Get GeoJSON data
d3.json(torontoHoods).then(function (data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
   style:myStyle,
    //turn feature into a popup marker
    onEachFeature: function (features, layer) {
      layer.bindPopup("<h3>Neighborhood: " + features.properties.AREA_NAME+"</h3>");
    }
  })
  .addTo(map);
});

