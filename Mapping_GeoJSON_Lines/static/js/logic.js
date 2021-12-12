// Add console.log to check to see if our code is working.
console.log("working");

// Create the streets tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the dark tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//Create a base layer that holds both maps
let baseMaps = {
  Light: light,
  Dark: dark
};

//Create the map object
let map = L.map('mapid', {
  center: [44, -80], // Toronto
  zoom: 2,
  layers: [dark]
});

//Pass map layers into layers control and add layers control to the map
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL from GetHub
let torontoData = "https://raw.githubusercontent.com/SJLewer/Mapping_Earthquakes/main/torontoRoutes.json";


//Create a variable to hold style
let myStyle = {
  color: "#ffffa1", // light yellow
    weight: 2
}
//Get GeoJSON data
d3.json(torontoData).then(function (data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
    style:myStyle,
    //turn feature into a popup marker
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr> <h3>Destination: " + feature.properties.dst + "</hr>" + "</h3>");
    }
  })
  .addTo(map);
});

