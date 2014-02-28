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

//console.log(this.width);
console.log(this.height);
console.log(this.width);
console.log(this.data.length);
console.log(this.data[0]);
console.log(this.data[1]);
console.log(this.data[2]);
console.log(this.data[3]);
var rgbMatrix = bufferConvert(this, 50);
var googleMatrix = selectTileMatrix(rgbMatrix);
//var a = [[0,0],[0,0]];
context.setMap(googleMatrix);



function selectTileMatrix(m){
var g = [];
for(var i = 0; i < m.length; i++){
g[i] = [];
for(var j = 0; j < m[0].length; j++){
if(m[i][j] == '02550255'){
g[i][j] = 1;
console.log("water");
} else {
console.log("glass");
g[i][j] = 0
}
}

}
return g;
};

function bufferConvert(img, tilesize){

var newArray = [];

for(var i = 0; i < img.height/tilesize; i++){
newArray[i] = [];
for(var j = 0; j < img.width/tilesize; j++){
var x = (i*(img.height/tilesize)*4)+(j*tilesize*4);
console.log(x);
console.log(i);
console.log(j);
newArray[i][j] = img.data[x].toString()+img.data[x+1].toString()+img.data[x+2].toString()+img.data[x+3].toString();
console.log(newArray[i][j]);

}

}

console.log("finished");
return newArray;
}

});
});
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
