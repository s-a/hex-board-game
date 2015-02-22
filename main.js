(function($, game, Field) {


    var $board = $("#game-board");
    var board = $board.get(0);
    var x;


    var onBottomScroll = function() {
        var bottomHex = $(".hex:first");
        var rowsToAdd = 10;
        var currentColCount = game.GUI.grid.state.rows[0].length;
        board.scrollTop -= bottomHex.height() * (rowsToAdd - 1);
        for (var i = 0; i < rowsToAdd; i++) {
            addRow(currentColCount, true);
            x++;
        }
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}); 
    };

    var onTopScroll = function() {
        var bottomHex = $(".hex:first");
        var rowsToAdd = 10;
        var currentColCount = game.GUI.grid.state.rows[0].length;
        board.scrollTop += bottomHex.height() * (rowsToAdd - 1);
        x = game.GUI.grid.state.rows[0][0].position.x;
        for (var i = 0; i < rowsToAdd; i++) {
            x--;
            prependRow(currentColCount, true);
        }
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows}); 
    };

    board.addEventListener('scroll', function (event) {
        var trueDivHeight = board.scrollHeight;
        var divHeight = $board.height();
        var maxScollTop = trueDivHeight - divHeight; 
        if (board.scrollTop === maxScollTop){
            onBottomScroll();
        }
        if (board.scrollTop === 0){
            onTopScroll();
        }
    });


    var addRow = function(colCount, magic, currentData) {
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
        return result;
    };

    var prependRow = function(colCount, magic, currentData) {
        var result = currentData;
        if (!currentData){
            result = game.GUI.grid.state.rows;
        }
         if (magic){
           result.pop();
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
        result.unshift(row);
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