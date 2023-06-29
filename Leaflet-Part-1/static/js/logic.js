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

// Define a function to calculate the color based on depth
function getColor(depth) {
  const depthRanges = [
    { min: -10, max: 10, color: "#0048BA" },
    { min: 10.001, max: 30, color: "#6495ED" },
    { min: 30.001, max: 50, color: "#00FFFF" },
    { min: 50.001, max: 70, color: "#FFD700" },
    { min: 70.001, max: 90, color: "#FF8C00" },
    { min: 90.001, max: Infinity, color: "#FF0000" }
  ];

  for (let range of depthRanges) {
    if (depth >= range.min && depth <= range.max) {
      return range.color;
    }
  }

  return "#000000"; // Default color if depth doesn't fall within any range
}

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p><strong>Magnitude:</strong> ${new Number(feature.properties.mag)}</p><p><strong>Depth:</strong> ${new Number(feature.geometry.coordinates[2]).toFixed(2)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      const magnitude = feature.properties.mag;
      const radius = getMarkerRadius(magnitude);
      const depth = feature.geometry.coordinates[2];
      const color = getColor(depth);

      return L.circleMarker(latlng, {
        radius: radius,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: onEachFeature
  });

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street
  };

  // Create the legend control.
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    const depthRanges = [
      { min: -10, max: 10, label: "-10 - 10" },
      { min: 10.001, max: 30, label: "10 - 30" },
      { min: 30.001, max: 50, label: "30 - 50" },
      { min: 50.001, max: 70, label: "50 - 70" },
      { min: 70.001, max: 90, label: "70 - 90" },
      { min: 90.001, max: Infinity, label: "90+" }
    ];

    // Create the HTML for the legend
    let legendHTML = '<div class="legend-title"><h4>Depth Legend</h4></div>';
    for (let range of depthRanges) {
      const color = getColor((range.min + range.max) / 2); // Calculate color based on the middle value of the range
      legendHTML += `<div class="legend-item"><i style="background:${color}"></i>${range.label}</div>`;
    }

    div.innerHTML = legendHTML;
    return div;
  };

  // Create an overlay object to hold the earthquake layer.
  let overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map, giving it the streetmap and earthquake layers to display on load.
  let myMap = L.map("map", {
    center: [35.6762, 139.6503],
    zoom: 6,
    layers: [street, earthquakes]
  });

  // Add the legend control to the map.
  legend.addTo(myMap);

  // Create a layer control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
