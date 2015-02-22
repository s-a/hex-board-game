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

    
    var addRow = function  (colCount, magic, currentData) {
        var result = currentData;
        if (!currentData){
            result = game.GUI.grid.state.rows;
        }
         if (magic){
           result.shift();
        }
        var row = [];
        for (var i = 0; i < colCount; i++) {
          var fieldParms = {
            position : {
                x:x,
                y:i
            }
          };
          row.push(new Field(fieldParms));
        }
        result.push(row);
        x++;
        return result;
    };


    function getMockupFieldData () {
        x = 0;
        var result = [];
        var needed = game.GUI.board.neededHexTilesToOverfillScreen();
        for (var i = 0; i < needed.rowCount; i++) {
            result = addRow(needed.colCount, false, result);
        }
        return result;
    }


    $("body").on("game-components-ready", function() {
        var mockupFieldData = getMockupFieldData();
        game.GUI.board.load(mockupFieldData);
    });
    $(window).resize(function(){
        var mockupFieldData = getMockupFieldData();
        game.GUI.board.load(mockupFieldData);
    });

})(window.jQuery, window.game, window.game.classes.Field);