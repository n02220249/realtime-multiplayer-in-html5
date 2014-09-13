Realtime Multiplayer In HTML5
=============================

Read the article here : 
http://buildnewgames.com/real-time-multiplayer/

View original demo here :
http://underscorediscovery.aws.af.cm/?debug

An example using node.js, socket.io and HTML5 Canvas to explain and demonstrate realtime multiplayer games in the browser.

## Getting started (Using npm package.json)
* Get node.js
* run `npm install` inside the cloned folder
* run `node app.js` inside the cloned folder
* Visit http://127.0.0.1:4004/?debug

## Getting started (Manual install)

* Get node.js
* Install socket.io `npm install socket.io`
* Install node-udid `npm install node-uuid`
* Install express `npm install express`
* Run `node app.js` inside the cloned folder
* Visit http://127.0.0.1:4004/?debug

## License

MIT Licensed. 
See LICENSE if required.

Node.js Google Maps Tile Engine
By Adam Simone

Forked Project for environment to develop node.js game tile engine dynamically using Google maps API "features" functionality in static map. 

Google Maps API "Features" documentation :
https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType

Best available option for engine developed inspired by :
https://tech.bellycard.com/blog/where-d-the-water-go-google-maps-water-pixel-detection-with-canvas/

Server analysis pixel color data from static map returned from API request to determine feature of exact location on map, water, land, etc.

Engine uses Monte Carlo algorithm to randomly sample groups of points and uses chosen threshold for deciding discrete tile type, statistics module tracks time and workload for varies Monte Carlo input, N.

While not implemented, system is ready and capable to select, after initial sampling of tile to skip additional sampling if data is unanimous, to optimize.

******************************************

Tile engine is contained in "game.maps.js", latest function is server_google_query starting on line : 157   map is generated at line : 193

Unfortunatley currently the only way to change world for tile engine is to edit the "zoom" and "loc" variables, "loc" is Latatude and Longitude cooridinates. 

Request url String for Google API request is at line : 173 (game.map.js)

If you with to alter the Monte Carlo Algorithm it is also in "game.maps.js" controlled by a function named monteCarloTile, line : 283    parameter "checknumber" is N or number of random samples.

In the "monteCarloTile" function random points have their color data read using "pixelToHex" on line : 211 of "game.map.js", a function I wrote that uses the raw data from the "img" parameter. This raw data is stored in a buffer. its convoluted structure is translated to comparable medium of Hexadecimal in "pixelToHex" on line : 365 (game.map.js)

"pixelToHex" return a String that can be compared to determine if given pixel is a specific color. The purpose of this is the static map that is returned will be requested to have features displayed in a specific color specified in Hex. In the current Proof Of Concept there is only one "Feature" queried, water requested to be bright green, 00FF00. If the pixel is not Green it is land. This is okay for now but land, highways, roads, and other features that are supported by the API. Multiple static map requests anticipated as overlapping of highways and adding of multiple features in a single may may be subject to new issues. With that said I am sure with multiple requests a new engine could work flawlessly.

I digress but multiple features would be one of the next steps for this project. The tile generation engine is mediated through another part of this project that would find a lot of attention if the project continues to develop, the statistics objects. The "monteCarloTile" function is called once for each tile in the grid. Each time at the beginning of the "monteCarloTile" function an instance of the tileStats is created. This object has an "insert" line : 54 (game.map.js) method to add sample data and using "genTileValue". This functions parameter is the error tolerance for the sample ratio. A "mapStats" object is initiated at the beginning of the tile map generation process and a time sample is taken and elapsed time of process is tracked at end of generation. This level of the process takes place in "server_generateMapFromBuffer" line : 324 (game.map.js). While right now "mapStats" is an example of over anticipating abstraction but the class could take care of data for the tiles as a group or more likely keep track of the group of "tileStats" objects.

******************************************

facets of project besides tile generator:

Incorporate camera viewpoint property that is independent for each client. Camera is updated in the same way that the character is updated and handles input but only with keys J,K,L, and I where the character move is A,S,D, and W. all rendering much have access to this information because everything is shifted by by the camera's fields of x and y respectively. This allows you to see the entire generated tile map dispute it being larger than the screen. 

A debugging method was formed by being able to save the requested static map image to the server. This is useful because until now you static map is not seen. By having the image you can be sure the request worked properly and after sampling a pixel's color I change the pixel's color to be able to visually see where there samples are being taken. The creation of the write stream is created before tile generation at line : 187 (game.map.js) and the modified debugging file is created after completing of the tile engine generation on line : 193 (game.map.js) 


