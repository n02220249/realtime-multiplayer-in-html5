(function() {
var game_map = (function() {

var tile = function(game_instance, sourceX, sourceY, width, height) {
this.game = game_instance;
this.sourceX = sourceX;
this.sourceY = sourceY;
this.width = width;
this.height = height;

};

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
var swapArray = [];

for (var i = 0; i < a.length; i++)
	swapArray[i] = a[i].slice();

this.map = swapArray;

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


src = 'http://maps.googleapis.com/maps/api/staticmap?scale=2&center=40.7300694,-74.0024224&zoom=12&size=1024x400&sensor=false&visual_refresh=true&style=feature:water|color:0x00FF00&style=element:labels|visibility:off&style=feature:transit|visibility:off&style=feature:poi|visibility:off&style=feature:road|visibility:off&style=feature:administrative|visibility:off';

var context = this;

http.get(src,function(responseData){


//context.setMap(a);
//console.log('done');
responseData.pipe(new PNG({
                filterType: -1
        }))
        .on('parsed', function(){

//context.setMap(a);
console.log('done');


context.setMap(context.server_generateMapFromBuffer(this,50));









});
});
};
game_map.prototype.server_chooseTileFromBuffer = function(img, x, y, tilesize){
var tileX = x*tilesize+tilesize/2;
var tileY = y*tilesize+tilesize/2;

console.log(tileX);
console.log(tileY);

if(this.pixelToHex(img,tileX,tileY) == "00ff00ff"){
return 1;
}else{
return 0;
}
};

game_map.prototype.server_generateMapFromBuffer = function(img,tilesize){

var map = [];

for (var i = 0; i < img.height/tilesize; i++){
	map[i] = [];
	for(var j = 0; j < img.width/tilesize; j++){
		map[i][j] = this.server_chooseTileFromBuffer(img, j, i, tilesize);
	}	

}

console.log("convert test");
//console.log(this.pixelToHex(img, 4,5));
return map;
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

game_map.prototype.drawTile = function(tile, destX, destY) {

	game.ctx.drawImage(this.image, tile.sourceX, tile.sourceY, tile.width, tile.height, destX, destY, 32, 32);
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

	for(var i=0; i<this.map.length;i++){
	   for(var j=0; j<this.map[0].length;j++){
		this.drawTile(this.tileSet[this.map[i][j]], (j*32),(i*32))
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
