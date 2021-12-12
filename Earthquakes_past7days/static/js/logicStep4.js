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

//Create the earthquake layer
let earthquakes = new L.LayerGroup();

//Define an object that contains the overlays
let overlays = {
  "Earthquakes": earthquakes
};

//Create the map object
let map = L.map('mapid', {
  center: [39.5, -98.5], // geographical center of the US
  zoom: 3,
  layers: [streets]
});

//Pass map layers into layers control and add layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

//Accessing the earthquake GeoJSON URL
let eqData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Get GeoJSON data
d3.json(eqData).then(function (data) {
  console.log(data);
  //function to return the style data for each earthquake plotted on the map.
  //pass the magnitude into a function to calculate the circle radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  //Function determines the color of the circle based on magnitude
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  //Function determines the radius of the earthquake marker based on its magnitude.
  //Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  //Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
    //turn feature into a popup marker
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: styleInfo,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    //add earthquake layer to map
    earthquakes.addTo(map);
  });