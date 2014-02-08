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
	this.map = this.server_map_gen();
	}
	if(!this.game.server){
	//	this.server_update();
		console.log("dddd");
	}else{
//		this.server_update();
		console.log("rrrrr");
	
        }
    };

game_map.prototype.foo = function(){


};


game_map.prototype.server_update = function(){

this.server_time = this.local_time;
this.laststate = {
	map : this.map


};
/*
if(this.players.self.instance) {
	this.players.self.instance.emit('onserverupdate',this.laststate);
}

if(this.players.other.instance) {
	this.players.other.instance.emit('onserverupdate',this.laststate);
}
*/
};

game_map.prototype.server_map_gen = function() {
var mapGrid = [[0,1],[2,3],[4,5]];
return mapGrid;

};

game_map.prototype.drawTile = function(tile, destX, destY) {
	game.ctx.drawImage(this.image, tile.sourceX, tile.sourceY, tile.width, tile.height, destX, destY, 32, 32);
};

    game_map.prototype.sliceTiles = function() {
                        var tileArray = new Array();

	for(var i=0; i<2; i++) {
		for(var j=0; j<2; j++) {
	
			tileArray.push(new tile(this.game, j*32, i*32, 32, 32));
		}
	}
	return tileArray;

};
    game_map.prototype.draw = function(){
	this.drawTile(this.tileSet[1], 100,100)

    };
	return game_map;
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')

module.exports = game_map;
else
window.game_map = game_map;        
})();
