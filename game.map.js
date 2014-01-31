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

        }
    };

game_map.prototype.drawTile = function(tile, destX, destY) {
	game.ctx.drawImage(this.image, tile.sourceX, tile.sourceY, tile.width, tile.height, destX, destY, 32, 32);
}

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
   //     game.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height);

	this.drawTile(this.tileSet[0], 100,100)

    };
	return game_map;
})();

if (typeof mudule !== 'undefined' && typeof module.exports !== 'undefined')

module.exports = game_map;
else
window.game_map = game_map;        
})();
