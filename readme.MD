# hex-board-game (work in progress...)

## Install with bower
```bower install hex-board-game```

## Try the test
 - Open ```http://localhost/YOUR_PRORJECT/bower_components/hex-board-game/``` in browser. (some requests need a webserver so the demo cannot run from filesystem!)  


Set current zoom scale:
```
game.GUI.board.zoom([INTEGER 1-8]);
```

Set current viewpoint:
```
game.GUI.board.viewPoint = {
    x:-110,
    y:-0
};
```

Currently there is mockup function fetching the hex map data. You can overwrite this method to fetch your data from server.

``` javascript
(function($, game, Field) {
 
    GUI.prototype.board.fetchData = function  (ordinate, onComplete) {
        $loading.show();
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
            $loading.hide();
        }), 800);
    }; 
    
})(window.jQuery, window.game, window.game.class.Field);
```


Todo; Write the docs; 