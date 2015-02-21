(function($, game) {

	var GUI = function() {
		return this;
	};

	GUI.prototype.zoom = function(scale) {
		$("#game-board").one('transitionend', ".hex", function(e) {
		    var board = document.getElementById("game-board"); 
		    board.scrollTop = board.scrollHeight/2;
		    board.scrollLeft = board.scrollWidth/2;
		});

		game.style.setCss(scale);
	};


	game.GUI = new GUI();
	
})(window.jQuery, window.game);