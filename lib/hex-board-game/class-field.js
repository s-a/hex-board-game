(function(Game) {

  var Field = function  (parms) {

  	this.position = {
  		x : parms.position.x,
  		y : parms.position.y
  	};
  	
    return this;
  };


  Game.prototype.classes = {
    Field : Field
  };

})(window.Game);