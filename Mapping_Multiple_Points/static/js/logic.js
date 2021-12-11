// Add console.log to check to see if our code is working.
console.log("working");

let map = L.map('mapid', {
  center: [40.7, -94.5], // coordinates for north america
  zoom: 4
});

//Get data from cities.js (reference this file in index.html file as "script")
let cityData = cities;

// Iterate through city object and add city to the marker function and added to the map.
cityData.forEach(function (city) {
  console.log(city)
  //Add a circlemarker to the map
  L.circleMarker(city.location, {
    radius: city.population/200000,
    color: "orange",
    weight: 4,
    //fillColor: '#ffffa1',
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
  .addTo(map); 
  });

// Create the tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});
// Add 'graymap' tile layer to the map.
streets.addTo(map);