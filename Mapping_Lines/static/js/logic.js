// Add console.log to check to see if our code is working.
console.log("working");

let map = L.map('mapid').setView(
  [40.7, -94.5], // coordinates for north america
  5);  //zoom

//Coordinates for each point to be used in the line
let line = [
  [37.6213, -122.3790], //SFO long, lat
  [30.1975, -97.6664], // AUS
  [43.6777, -79.6248], // Toronto
  [40.6413, -73.7781], //JFK

];

//Create a polyline using the line coordinates and color the line red
L.polyline(line, {
  color:"blue",
  opacity: 0.5,
  weight: 4,
  dashArray: '10,10'
}).addTo(map);


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

// Create the tile layer that will be the background of our map.  use "dark-v10" in place of "streets-v11" in front of tiles for dark map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});
// Add 'graymap' tile layer to the map.
streets.addTo(map);