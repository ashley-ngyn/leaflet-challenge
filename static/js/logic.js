// json url for all earthquakes within the past week
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// gather json using d3
d3.json(url).then(function(data){

    // check json data
    console.log(data);

    // pass features to function
    createFeatures(data.features);
});

// make marker size based on magnitude
function markerSize(mag){
    return mag * 4;
}

// source 02 for the color hex
function markerColor(depth){
    if (depth < 10) return "#00ff00";
    else if (depth < 30) return "#ffff00";
    else if (depth < 50) return "#ffcc00";
    else if (depth < 70) return "#ff9933";
    else if (depth < 90) return "#ff6600";
    else return "#ff0000";
}

// source 03 to use createFeatures
function createFeatures(earthquakeData){
    function onEachFeature(feature,layer){

        // path to iterate through json for certain values
        let place = feature.properties.place;
        let time = feature.properties.time;
        let magnitude = feature.properties.mag;
        let depth = feature.geometry.coordinates[2];

        // source 04 to use "new" to create a function
        // list the place, time, mag, depth of earthquake
        layer.bindPopup(`<h3>${place}</h3><hr>
        <p>${new Date(time)}</p>
        <ul><li>Magnitude: ${magnitude}</li><li>Depth: ${depth}</li></ul>`);
    }

    // create geojson layer
    let earthquakes = L.geoJSON(earthquakeData,{
        onEachFeature: onEachFeature,

        // source 05 leaflet documentation on pointToLayer
        pointToLayer: function(feature, latlng){
            let markers ={
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                weight: 1,
                opacity: 1,
                color: "black",
                stroke: true,
                fillOpacity: 0.8
            }
            return L.circleMarker(latlng, markers);
        }

    })
    createMap(earthquakes);
}

function createMap(earthquakes){

    // these are links/functions used from source 03

    // create base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // topographic view
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
    // create a baseMaps object
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
  };

    // create an overlays object
    let overlayMaps = {
        "Earthquakes": earthquakes
      }
    
    // create map
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, earthquakes]
      });

      // create a layer control that contains the baseMaps
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

      // source 06 to add a legend
      let legend = L.control({position: 'bottomright'});
      legend.onAdd = function(){

        let div = L.DomUtil.create('div', 'info legend');
        depthValue = [-10, 10, 30, 50, 70, 90];
        // labels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];

        div.innerHTML += '<h3>Depth</h3>'

        for (let i = 0; i < depthValue.length; i++){
            div.innerHTML +=
                '<i style="background:' + markerColor(depthValue[i] + 1) +
                '"></i> ' + depthValue[i] + (depthValue[i + 1] ? '-' +
                depthValue[i + 1] + '<br>' : '+');
        }
        return div;
      }
      legend.addTo(myMap);
}