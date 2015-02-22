(function($, game, Field) {


    var $board = $("#game-board");
    var board = $board.get(0);
    var x;
    board.addEventListener('scroll', function (event) {
        var trueDivHeight = board.scrollHeight;
        var divHeight = $board.height();
        var maxScollTop = trueDivHeight - divHeight; 
        var bottomHex = $(".hex:first");
        var rowsToAdd = 10;
        var currentColCount = game.GUI.grid.state.rows[0].length;
        if (board.scrollTop === maxScollTop){
            board.scrollTop -= bottomHex.height() * (rowsToAdd - 1);
            for (var i = 0; i < rowsToAdd; i++) {
                addRow(currentColCount, true);
            }
        }
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}); 
    });

    
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
        }
        rows.push(row);
        x++;
    };




    var load = function  () {
        x = 0;
        game.GUI.grid.state.rows = [];
        var needed = game.GUI.board.neededHexTilesToOverfillScreen();
        for (var i = 0; i < needed.rowCount; i++) {
            addRow(needed.colCount);
        }

        game.GUI.board.zoom(2);

        $board.one('transitionend', ".hex", function(e) {
            board.scrollTop = board.scrollHeight/4;
            board.scrollLeft = board.scrollWidth/4;
        });

        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}, function  () {
            board.scrollTop = board.scrollHeight/4;
            board.scrollLeft = board.scrollWidth/4;
        }); 
    };

    $("body").on("game-components-ready", load);
    $(window).resize(load);

   

})(window.jQuery, window.game, window.game.classes.Field);