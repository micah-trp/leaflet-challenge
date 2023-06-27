// Define a function to calculate the marker magnitude
function getMarkerRadius(magnitude) {
    // Adjust the scaling factor as needed
    const scalingFactor = 4;
    // Calculate the radius using a simple linear scaling function
    return Math.sqrt(magnitude) * scalingFactor;
  }
  


// URL for earthquake data for the last 7 days
url_geojson_7d = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create a map instance and set its view to Tokyo
const earthquake_map = L.map('map').setView([35.6765, 139.6503], 3);


// Add a tile layer to the map using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(earthquake_map);