(function($, game) {

  var Grid = React.createClass({
    getInitialState: function() {
      return {
        //cols:[1,1,1,1,1,1,1,1],
        rows: [],
       // message: 'Hello!'
      };
    },
    handleChange: function(event) {
      this.setState({message: event.target.value});
    },
    render: function() {
      var message = this.state.message;
        var rows = this.state.rows.map(function(row, r) {
            var fields = row.map(function(field, c) {
                return <li className='hex'><small className='hex-field-item-text'> {field.position.x},{field.position.y} </small></li>;
            }.bind(this));
            var className = "odd";
            if (r%2===0) { className = "even"; }
            return <ol className={className}>{fields}</ol>;
        }.bind(this));

      return <div className="game-board-container">{rows}</div> ;
    }
  });

  game.GUI.grid = React.render(
    <Grid />,
    document.getElementById('game-board')
  );
  $("body").trigger("game-components-ready");

  

})(window.jQuery, window.game);