// URL for earthquake data for the last 7 days
let url_7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url_7Days).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Define a function to calculate the marker radius based on magnitude
function getMarkerRadius(magnitude) {
  // Adjust the scaling factor as needed
  const scalingFactor = 10;
  // Calculate the radius using a simple linear scaling function
  return Math.sqrt(magnitude) * scalingFactor;
}

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p><strong>Magnitude:</strong> ${new Number(feature.properties.mag)}</p><p><strong>Depth:</strong> ${new Number(feature.geometry.coordinates[2]).toFixed(2)}</p>`);
  }

  // Define the legend control
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    const depthRanges = [
      { min: -10, max: 10, label: "-10 -10" },
      { min: 10.001, max: 30, label: "10-30" },
      { min: 30.001, max: 50, label: "30-50" },
      { min: 50.001, max: 70, label: "50-70" },
      { min: 70.001, max: 90, label: "70-90" },
      { min: 90.001, max: Infinity, label: "90+" }
    ];

    // Create the HTML for the legend
    let legendHTML = "<h4>Depth Legend</h4>";
    for (let range of depthRanges) {
      legendHTML += `<div><i style="background:${getColor(range.min + 1)}"></i>${range.label}</div>`;
    }

    div.innerHTML = legendHTML;
    return div;
  };

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      const magnitude = feature.properties.mag;
      const radius = getMarkerRadius(magnitude);

      return L.circleMarker(latlng, {
        radius: radius,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function.
  createMap(earthquakes, legend);
}

function createMap(earthquakes, legend) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [35.6762, 139.6503],
    zoom: 6,
    layers: [street, earthquakes]
  });

  // Add the legend control to the map.
  legend.addTo(myMap);

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

function getColor(depth) {
  const colorScale = chroma.scale(["blue", "red"]).domain([-10, 10, 10.001, 30, 30.001, 50, 50.001, 70, 70.001, 90, 90.001]);
  return colorScale(depth).hex();
}
