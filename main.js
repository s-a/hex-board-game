(function($, game, Field) {


    var $board = $("#game-board");
    var board = $board.get(0);
    var x;
    var rowsToFetch = 10;


    var onBottomScroll = function() {
        board.removeEventListener('scroll', onScroll);
        var bottomHex = $(".hex:first");
        var currentColCount = game.GUI.grid.state.rows[0].length;

        var rows = game.GUI.grid.state.rows;
        var ordinate = {
            x1 : rows[rows.length-1][0].position.x+1,
            y1 : rows[rows.length-1][0].position.y
        };
        ordinate.x2 = ordinate.x1 + rowsToFetch;
        ordinate.y2 = ordinate.y1 + rows[rows.length-1].length;
        getMockupFieldData(ordinate, function(rows) {
            for (var r = 0; r < rows.length; r++) {
                game.GUI.grid.state.rows.shift();
                game.GUI.grid.state.rows.push(rows[r]);
            }
            board.scrollTop -= bottomHex.height() * (rowsToFetch - 1);
            game.GUI.grid.setState({rows: game.GUI.grid.state.rows}, function() {
                board.addEventListener('scroll', onScroll);
            });
        });
    };

    var onTopScroll = function() {
        var bottomHex = $(".hex:first");
        var currentColCount = game.GUI.grid.state.rows[0].length;
        board.scrollTop += bottomHex.height() * (rowsToFetch - 1);

        x = game.GUI.grid.state.rows[0][0].position.x;
        for (var i = 0; i < rowsToFetch; i++) {
            x--;
            prependRow(currentColCount, true);
        }
        game.GUI.grid.setState({rows: game.GUI.grid.state.rows});
    };


    var onScroll = function (event) {
        var trueDivHeight = board.scrollHeight;
        var divHeight = $board.height();
        var maxScollTop = trueDivHeight - divHeight;
        if (board.scrollTop === maxScollTop){
            onBottomScroll();
        }
        if (board.scrollTop === 0){
            onTopScroll();
        }
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
        var y = game.GUI.grid.state.rows[0][0].position.y;
        for (var i = 0; i < colCount; i++) {
          var fieldParms = {
            position : {
                x:x,
                y:y
            }
          };
          row.push(new Field(fieldParms));
          y--;
        }
        result.unshift(row);
        return result;
    };


    var getMockupFieldData = function  (ordinate, onComplete) {
        var rows = [];

        for (var x = ordinate.x1; x < ordinate.x2; x++) {
            var row = [];
            for (var y = ordinate.y1; y < ordinate.y2; y++) {
              var fieldParms = {
                position : {
                    x : x,
                    y : y
                }
              };
              row.push(new Field(fieldParms));
            }
            rows.push(row);
        }

        window.setTimeout((function() {
            onComplete(rows);
        }), 3000);
    };

    var $loading = $('<div id="game-loading-progress"><img align="center" src="img/pre-loader.gif"></div>');
    $loading.insertAfter($board);
    var reload = function(){
        $board.hide();
        $loading.show();
        board.removeEventListener('scroll', onScroll);
        var needed = game.GUI.board.neededHexTilesToOverfillScreen();
        var viewPoint = {
            x:-0,y:-0
        };

        var ordinate = {
            x1 : Math.round(viewPoint.x - (needed.rowCount/2)),
            x2 : Math.round(viewPoint.x + (needed.rowCount/2)),
            y1 : Math.round(viewPoint.y - (needed.colCount/2)),
            y2 : Math.round(viewPoint.y + (needed.colCount/2))
        };

        getMockupFieldData(ordinate, function(mockupFieldData) {
            game.GUI.board.load(mockupFieldData, function() {
                    board.addEventListener('scroll', onScroll);
            });
        });
    };


    $("body").on("game-components-ready",reload);
    $(window).resize(reload);

})(window.jQuery, window.game, window.game.classes.Field);