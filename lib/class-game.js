(function($) {
  
  var Client = function(game) {
    this.game = game;
    return this;
  };

  var Game = function() {
    this.client = new Client(this);
    return this;
  };


  if (!window.Game) { window.Game = Game; }
  if (!window.game) { window.game = new Game(); }
  $( "body" ).trigger( "game-ready" );

  $(function() {
  });

})(jQuery);