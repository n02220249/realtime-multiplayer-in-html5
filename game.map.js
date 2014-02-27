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
		this.map = this.server_map_gen();
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

game_map.prototype.server_map_gen = function() {

//		[y[x]]

var mapGrid =   [[1,1,2,3,4,5,6,7]
		,[8,9,10,11,12,13,14,15]
		,[16,17,18,19,20,21,22,23]];

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
		this.drawTile(this.tileSet[this.map[i][j]], 100+(j*32),100+(i*32))
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
