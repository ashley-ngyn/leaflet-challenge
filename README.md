# belly-button-challenge #

### link to static page ###
 https://ashley-ngyn.github.io/leaflet-challenge/

## instructions ## 
Part 1: Create the Earthquake Visualization
1. Your first task is to visualize an earthquake dataset. Complete the following steps:
    * Get your dataset. To do so, follow these steps:
        * The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize.
        * When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization
2. Import and visualize the data by doing the following:
    * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
        * Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
        * Hint: The depth of the earth can be found as the third coordinate for each earthquake.
    * Include popups that provide additional information about the earthquake when its associated marker is clicked.
    * Create a legend that will provide context for your map data.

## data source ##
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## sources used ##
* 01: https://stackoverflow.com/questions/3743491/why-might-chrome-return-an-incorrect-mime-type-error-for-one-of-my-js-files-when
* 02: https://www.w3schools.com/colors/colors_picker.asp
* 03: 10-Stu_GeoJson
* 04: https://javascript.info/new-function#:~:text=The%20syntax%20for%20creating%20a,with%20the%20arguments%20arg1...

 * 01 - Make java run in google chrome
     <script type="application/x-javascript" src="static/js/logic.js"></script>

* 02 - Color hex
    if (depth < 10) return "#00ff00";

* 03 - createFeatures
    ** function createFeatures(earthquakeData){
  * Base layers url
    let street = L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    **  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    
* 04 - Use new to create a function
    new Date(features.properties.time)
