(function($, game, Field) {


    var $board = $("#game-board");
    var board = $board.get(0);
    var colCount = 22;
    board.addEventListener('scroll', function (event) {
        var trueDivHeight = board.scrollHeight;
        var divHeight = $board.height();
        var maxScollTop = trueDivHeight - divHeight; 
        var bottomHex = $(".hex:first");
        var rowsToAdd = 10;
        if (board.scrollTop === maxScollTop){
            board.scrollTop -= bottomHex.height() * (rowsToAdd - 1);
            for (var i = 0; i < rowsToAdd; i++) {
                addRow(colCount, true);
            }
        }
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}); 
    });

    var x = 0;
    var addRow = function  (cols, magic, done) {
        var rows = game.GUI.grid.state.rows;
         if (magic){
           rows.shift();
        }
        var row = [];
        for (var i = 0; i < cols; i++) {
          var fieldParms = {
            position : {
                x:x,
                y:i
            }
          };
          row.push(new Field(fieldParms));
        };
        rows.push(row);
        x++;
    };


    $("body").on("game-components-ready", function  () {
        for (var i = 0; i < 22; i++) {
            addRow(colCount);
        };
        game.style.setCss(1);
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}); 
    });

    $("#game-board").one('transitionend', ".hex", function(e) {
        var board = document.getElementById("game-board"); 
        var touchDevice = ('ontouchstart' in window);
        if (!touchDevice){
            window.setTimeout(function() {
                $('#game-board').overscroll({
                    showThumbs : false
                });
            }, 800);
         }
    });
  
  $(function() {

  });

})(window.jQuery, window.game, window.game.classes.Field);