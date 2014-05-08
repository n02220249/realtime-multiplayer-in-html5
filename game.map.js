(function() {
var game_map = (function() {

var tile = function(game_instance, sourceX, sourceY, width, height) {
this.game = game_instance;
this.sourceX = sourceX;
this.sourceY = sourceY;
this.width = width;
this.height = height;

};

var mapStats = function() {
this.totalN = 0;

this.startTime = Date.now()
console.log(this.startTime);



};

mapStats.prototype.insert = function(tileObj) {

};

mapStats.prototype.elapsedTime = function() {
var currTime = Date.now();
return  (currTime - this.startTime);

};

var tileStats = function(img,x,y) {
	this.img = img;
	this.totalN = 0;
	this.counter = [];
	this.counter[0] = 0;
	this.counter[1] = 0;
	this.x = x;
	this.y = y;	


};

tileStats.prototype.printStats = function() {
console.log("Tile X: " + this.x + " Y: " + this.y);
console.log("Stats:");
console.log("total: " + this.totalN);
console.log("[1]: "+this.counter[0]);
console.log("[0]: "+this.counter[1]);
console.log("**************************************************");
};

tileStats.prototype.insert = function(value){
this.counter[value] = this.counter[value] + 1;
this.totalN++;
};

tileStats.prototype.getStats = function() {
var s;
s = s + "number of points:" + this.totalN;
//s = "total Tiles: " + 

return s;
};

tileStats.prototype.percentForIndex = function(index) {
return 0;
};

tileStats.prototype.genTileValue = function(errTol) { //out of 100
console.log("tileStat total : " + this.totalN);
var ratio = (this.counter[1])/this.totalN;
console.log("ratio: " + ratio);

if(ratio >(errTol/100)){
return 1;
}else{
return 0;
}

//return 0;
};
//genStats.prototype.
var game_map = function( game_instance ) {
        this.game = game_instance;
        this.pos = { x:0, y:0 };
        if(!this.game.server){
        var img = new Image();
        img.src = 'tiletrans4.png';
        this.image = img;
	this.tileSet = this.sliceTiles();
//	this.map = this.server_map_gen();
	//console.log(this.map);
	}
	if(!this.game.server){
	//	this.server_update();
		console.log("dddd");
		//this.map = this.server_map_gen();
	}else{

		this.server_google_query();

		//this.map = this.server_map_gen();
		console.log("rrrrr");
	
        }
    };




game_map.prototype.printMap = function(){

console.log(this.map);

}


game_map.prototype.setMap = function(a){
if(a){
var swapArray = [];

for (var i = 0; i < a.length; i++)
	swapArray[i] = a[i].slice();

this.map = swapArray;
}
};



game_map.prototype.server_update = function(){

this.server_time = this.local_time;
this.laststate = {
	map : this.map


};

    if(this.game.players.self.instance) {
        this.game.players.self.instance.emit( 'onmapinit', this.laststate );
    }

        //Send the snapshot to the 'client' player
    if(this.game.players.other.instance) {
        this.game.players.other.instance.emit( 'onmapinit', this.laststate );
    }
    




};

game_map.prototype.server_google_query = function(){
var fs = require('fs'), PNG = require('pngjs').PNG, http = require('http');

//1024 400
//40.7300694, -74.0024224
var zoom = '2';
//var loc = '40.7127,-74.0059';    //manhattan

//var loc = '37.91408,-122.3101';     //san fran

//var loc = '16.9046921,-92.2834331';   //mexico zoom = 5 

//var loc = '38.5882897,137.8463195'     //japan zoom = 5

var loc = '50,-110';

src = 'http://maps.googleapis.com/maps/api/staticmap?scale=2&center='+loc+'&zoom='+zoom+'&size=976x650&sensor=false&visual_refresh=true&style=feature:water|color:0x00FF00&style=element:labels|visibility:off&style=feature:transit|visibility:off&style=feature:poi|visibility:off&style=feature:road|visibility:off&style=feature:administrative|visibility:off';

var context = this;

http.get(src,function(responseData){


//context.setMap(a);
//console.log('done');
responseData.pipe(new PNG({
                filterType: -1
        }))
        .on('parsed', function(){

var dst = fs.createWriteStream('out.png');

//context.setMap(a);
console.log('done');


context.setMap(context.server_generateMapFromBuffer(this,32));


this.pack().pipe(dst);
});
});
};


game_map.prototype.server_chooseTileFromBuffer = function(img, x, y, tilesize){
var tileX = x*tilesize+tilesize/2;
var tileY = y*tilesize+tilesize/2;

var tileXLeftTop = x*tilesize;
var tileYLeftTop = y*tilesize;
console.log(tileX);
console.log(tileY);

var pixelColor = this.pixelToHex(img,tileX,tileY);
console.log(pixelColor);

for(var i = 0;i<tilesize;i++){
this.changePixelColor(img,tileXLeftTop+i,tileYLeftTop,0,0,0,255);
}

for(var i = 0;i<tilesize;i++){
this.changePixelColor(img,tileXLeftTop,tileYLeftTop+i,0,0,0,255);
}

return this.hexToTile(pixelColor);

/**
if(pixelColor == "00ff00ff" || pixelColor == "00fe00ff"){
console.log("1");      //water
return 1;
}else{
console.log("0");      //grass

return 0;

}
**/
};
game_map.prototype.hexToTile = function(hColor) {

if(hColor == "00ff00ff" || hColor == "00fe00ff"){
//console.log("1");      //water
return 1;
}else{
//console.log("0");      //grass

return 0;
}

};

game_map.prototype.server_iGenTile = function(img,x,y,tilesize, checknumber){


var tileX = x*tilesize+tilesize/2;
var tileY = y*tilesize+tilesize/2;

var tileXLeftTop = x*tilesize;
var tileYLeftTop = y*tilesize;

var stats = new tileStats(img, x, y);


for (var i = 0; i < (1); i++){
        
	

        for(var j = 0; j < (img.width/tilesize); j++){
		
		console.log("X " + tileX + "Y" + tileY);
			
                var pxlcl = this.pixelToHex(img,tileX,tileY);
		console.log(pxlcl);
		var tileVal =this.hexToTile(pxlcl);	
		stats.insert(tileVal);

		
        }

}


return stats.genTileValue();
}

game_map.prototype.monteCarloTile = function(img, x, y, tilesize, checknumber) {

var tileXLeftTop = x*tilesize;
var tileYLeftTop = y*tilesize;

var stats = new tileStats(img,x,y);

this.createTileBorder(img,tileXLeftTop,tileYLeftTop,tilesize);
for(var i = 0; i < checknumber; i++){
var pointX = tileXLeftTop + parseInt(tilesize*Math.random());
var pointY = tileYLeftTop + parseInt(tilesize*Math.random());
//console.log("X: " + pointX + "Y: " + pointY);
var hex = this.pixelToHex(img,pointX,pointY);

var tileVal = this.hexToTile(hex);

this.changePixelColor(img,pointX,pointY,0,0,0,255);


stats.insert(tileVal);

}
var val = stats.genTileValue(50);
stats.printStats();

return val;
};

game_map.prototype.createTileBorder = function(img, tx,ty,tilesize){

for(var i = 0;i<tilesize;i++){
this.changePixelColor(img,tx+i,ty,0,0,0,255);
}

for(var i = 0;i<tilesize;i++){
this.changePixelColor(img,tx,ty+i,0,0,0,255);
}


};

game_map.prototype.server_generateMapFromBuffer = function(img,tilesize){

var map = [];

var stats = new mapStats();

for (var i = 0; i < (img.height/tilesize); i++){
	map[i] = [];
	for(var j = 0; j < (img.width/tilesize); j++){
		
//		map[i][j] = this.server_chooseTileFromBuffer(img, j, i, tilesize);

//		map[i][j] = this.server_iGenTile(img, j, i, tilesize);

//		this.createTileBorder(tilesize);

		map[i][j] = this.monteCarloTile(img, j, i, tilesize, 40);

	}	


}
console.log("elapsed time (ms): "+stats.elapsedTime());
console.log("convert test");
//console.log(this.pixelToHex(img, 4,5));
return map;
};
game_map.prototype.changePixelColor = function(img, pixelX, pixelY, r, g, b, a){
var data = img.data;
var imgWidth = img.width;
var forY = pixelY*imgWidth;
var shift = (forY+pixelX)*4;
data[shift] = r;
data[shift+1] = g;
data[shift+2] = b;
data[shift+3] = a;



};

game_map.prototype.pixelToHex = function(img, pixelX, pixelY){

var data = img.data;
var imgWidth = img.width;


var forY = pixelY*imgWidth;
var shift = (forY+pixelX)*4;
var colorR = toHex(data[shift]);
var colorG = toHex(data[shift+1]);

var colorB = toHex(data[shift+2]);
var colorA = toHex(data[shift+3]);
var num = ""+colorR+colorG+colorB+colorA;
this.changePixelColor(img,pixelX,pixelY,0,0,0,255);
return num;

function toHex(x){
var hex = x.toString(16);
return hex.length == 1 ? "0" + hex : hex;
}

};


game_map.prototype.bufferConvert = function(data){
var newArray = [];


newArray[0]=data[0].toString() + data[1].toString() + data[2].toString() + data[3].toString();
console.log(newArray[0]);
};


game_map.prototype.server_map_gen = function() {

//		[y[x]]

var mapGrid =   [[1,1,2,3,4,5,0,0]
		,[8,9,10,11,12,13,0,0]
		,[16,17,18,19,20,21,0,0]];

//var mapGrid
return mapGrid;

};

game_map.prototype.drawTile = function(tile, destX, destY, cX, cY) {

//var cameraX = -this.game.players.self.pos.x;
//var cameraY = -this.game.players.self.pos.y;

	game.ctx.drawImage(this.image, tile.sourceX, tile.sourceY, tile.width, tile.height, destX-cX, destY-cY, 32, 32);
};

    game_map.prototype.sliceTiles = function() {
                        var tileArray = new Array();

	for(var i=0; i<8; i++) {
		for(var j=0; j<8; j++) {
	
			tileArray.push(new tile(this.game, j*32, i*32, 32, 32));
		}
	}
	return tileArray;

};
    game_map.prototype.draw = function(){

	if(this.map){

var cameraX = parseInt(-this.game.camera.x);
var cameraY = parseInt(-this.game.camera.y);



	for(var i=0; i<this.map.length;i++){
	   for(var j=0; j<this.map[0].length;j++){
		this.drawTile(this.tileSet[this.map[i][j]], (j*32),(i*32),cameraX, cameraY)
	   }
	}
	}
    };
	return game_map;
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')

module.exports = game_map;
else
window.game_map = game_map;        
})();
