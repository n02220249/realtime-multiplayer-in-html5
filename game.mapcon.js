(function() {
var game_map = (function() {
var game_map = function( game_instance ) {
        this.game = game_instance;
        this.pos = { x:0, y:0 };
        if(!this.game.server){
        var img = new Image();
        img.src = 'map.png';
        this.image = img;
        }
    };

    game_map.prototype.draw = function(){
        game.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height);

    };
	return game_map;
})();

if (typeof mudule !== 'undefined' && typeof module.exports !== 'undefined')

module.exports = game_map;
else
window.game_map = game_map;        
})();
