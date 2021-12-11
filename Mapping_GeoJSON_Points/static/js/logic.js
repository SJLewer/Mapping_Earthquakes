// Add console.log to check to see if our code is working.
console.log("working");

// //Add GeoJSON data
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// //Get GeoJSON data
// L.geoJSON(sanFranAirport, {
//   //turn feature into a popup marker
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h3>Airport Code: " + feature.properties.faa +"</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</hr>" + "</h3>");
//   }
  
// }).addTo(map);

// //Get data from cities.js (reference this file in index.html file as "script")
// let cityData = cities;

// // Iterate through city object and add city to the marker function and added to the map.
// cityData.forEach(function (city) {
//   console.log(city)
//   //Add a circlemarker to the map
//   L.circleMarker(city.location, {
//     radius: city.population/200000,
//     color: "orange",
//     weight: 4,
//     //fillColor: '#ffffa1',
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
//   .addTo(map); 
//   });

// Create the streets tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  Street: streets,
  Dark: dark
};

//Create the map object
let map = L.map('mapid', {
  center: [30, 30], // geographical center of the Earth
  zoom: 2,
  layers: [streets]
});

//Pass map layers into layers control and add layers control to the map
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL from GetHub
let airportData = "https://raw.githubusercontent.com/SJLewer/Mapping_Earthquakes/main/majorAirports.json";

//Get GeoJSON data
d3.json(airportData).then(function(data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
      //turn feature into a popup marker
      onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3>Airport Code: " + feature.properties.faa +"</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</hr>" + "</h3>");
      }
      }).addTo(map);
});

