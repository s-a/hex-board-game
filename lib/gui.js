(function($, game) {


    var $board = $("#game-board");
    var board = $board.get(0);
    var currentZoom = 2;

    var convertEmToPixel = function( value, scope, suffix ) {
	    if (!scope || value.toLowerCase().indexOf("rem") >= 0) {
	      scope = 'body';
	    }
	    if (suffix === true) {
	      suffix = 'px';
	    } else {
	      suffix = null;
	    }
	    var multiplier = parseFloat(value);
	    var scopeTest = $('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(scope);
	    var scopeVal = scopeTest.height();
	    scopeTest.remove();
	    return Math.round(multiplier * scopeVal) + suffix;
    };

	var GUI = function() {
		this.game = game;
		this.board.GUI = this;
		return this;
	};

	GUI.prototype.board = {
		el : board,
		$el : $board
	};

	GUI.prototype.board.load = function  (data) {
		var self = this;
		this.$el.hide();
		if (data){
        	this.GUI.grid.state.rows = data;
		}
        this.zoom(this.zoom());

		$board.one('transitionend', ".hex", function(e) {
            board.scrollTop = (board.scrollHeight/4)+1;
            board.scrollLeft = (board.scrollWidth/4)+1;
        });

        this.GUI.grid.setState({rows: this.GUI.grid.state.rows}, function  () {
			self.$el.show();
            board.scrollTop = (board.scrollHeight/4)+1;
            board.scrollLeft = (board.scrollWidth/4)+1;
        });
    };

	GUI.prototype.board.neededHexTilesToOverfillScreen = function() {
		var px = convertEmToPixel(this.zoom());
		return {
			colCount : $board.width() / px + 5,
			rowCount : $board.height() / px + 5,
		};
	};

	GUI.prototype.board.zoom = function(scale) {
		if (scale){
 			$board.one('transitionend', ".hex", function(e) {
			    board.scrollTop = (board.scrollHeight/4)+1;
			    board.scrollLeft = (board.scrollWidth/4)+1;
			});

			game.style.setCss(scale);
			currentZoom = scale;
		} else {
			return currentZoom;
		}
	};

    $(function(e) {
        var touchDevice = ('ontouchstart' in window);
        if (!touchDevice){
            window.setTimeout(function() {
                $board.overscroll({
                    showThumbs : false
                });
            }, 800);
         }
    });
	game.GUI = new GUI();

})(window.jQuery, window.game);