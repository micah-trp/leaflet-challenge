# Earthquake Visualisation.
--------------
The repository visualises World Earthquakes over the past 7 days from [earthquake USGS website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) data set using javascript leaflet library.  

Located in the Pacific Ring Of Fire, Japan is the first on the list as nation with the greatest number of earthquakes- [source: world atlas website](https://www.worldatlas.com/articles/the-world-s-10-most-earthquake-prone-countries.html).  
The purpose of this repository is to have an overview of the last 7 days of earthquakes at any time that the data is refreshed with a focus on earthquakes felt in Japan.  
  
Part 1 of this repository We will illustrate a worldmap with earthquaeks over the last 7 Days - where the marker of each reflects the magnitude of the earthquake by their size and the depth of the earthquake by colour.   
By clicking on each marker point we are able to see a pop up of the location, the time of the earthquake , the magnitude and the depth.

  
Part 2 of this repository will include a map layer illustrating the techtonic plates in order to llustrate the relationship between tectonic plates and seismic activity. 

--------------

## Data Source
- [Earthquake USGS - Last 7 Days ](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).  
- [Techtonic Plate Coordinates](https://github.com/fraxen/tectonicplates).  

## Jave script Lirbaries Included 
- Leaflet 
- D3 JavaScript
- chroma.js 
    
## Running Repository 
- Clone repository locally.
- Activate python environment.
- Ensure you have the folllowing dependencies installed:

    
### Images
- View images in directory to see final visualisation

## Analysis Summary
### Leaflet Part 1
- From directory Leaflet-Part-1 load index.html
- Associated logic.js shows earthquake markers with the marker size scaled to the magnitude level while marker color is varying to depth level.  

    
### Leaflet Part 2
- from directory Leaflet-Part-2 load index.html
- Associated logic.js includes "Topographic Map" as additional map view.  
    There is now a Tectonic Plates layter which will show 
