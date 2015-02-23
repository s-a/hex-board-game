(function(game) {

	var StyleController = function() {
		//Sass.initialize(window.sassWorker);
		return this;
	};

	$style = $("<style></style>");
	$style.appendTo($("body"));

	StyleController.prototype.setCss = function(hexagonSize) {
debugger;
		var scss = [];
		var hexCount = game.GUI.board.neededHexTilesToOverfillScreen().colCount;

		factor = 0;
		if (hexagonSize<=8){
			factor = 0.45;
		}
		if (hexagonSize<=7){
			factor = 0.5;
		}
		if (hexagonSize<=6){
			factor = 0.58;
		}
		if (hexagonSize<=5){
			factor = 0.64;
		}
		if (hexagonSize<=4){
			factor = 0.75;
		}
		if (hexagonSize<=3){
			factor = 0.9;
		}
		if (hexagonSize<=2){
			factor = 1.3;
		}
		if (hexagonSize<=1){
			factor = 2.3;
		}

		if (hexagonSize<=1){
			scss.push("		.hex-field-item-text {");
			scss.push("			display : none;");
			scss.push("		}");
		} else {
			scss.push("		.hex-field-item-text {");
			scss.push("			display: inline-block;");
			scss.push("		}");
		}

		scss.push(".hex-field-item-text {");
		scss.push("		margin-left: " + (hexagonSize / 2.5) + "em;");
		scss.push("   	margin-top: " + (hexagonSize / 2) + "em;");
		scss.push("}");


		scss.push("ol.even {");
		scss.push("		position: relative;");
		scss.push("   	left: " + ((hexagonSize / 1.1)+(hexagonSize/3)) + "em;");
		scss.push("}");

		scss.push("ol.odd {");
		scss.push("		position: relative;");
		scss.push("   	margin-top: " + (-(hexagonSize*factor)) + "em;");
		scss.push("		margin-bottom: " + (-(hexagonSize*factor)) + "em;");
		scss.push("   	left: " + (hexagonSize/3) + "em;");
		scss.push("}");

		scss.push(".hex {");
		scss.push("   	position: relative;");
		scss.push("   	margin: 1em auto;");
		scss.push("   	width: " + (hexagonSize) + "em;");
		scss.push("   	height: " + (hexagonSize * 1.7) + "em;");
		scss.push("   	border-radius: 2%;");
		scss.push("   	background: #ccc;   ");
		scss.push("		transform: rotate(-90deg);");
		scss.push("		display: inline-block;");
		scss.push(" 	margin-right: " + (hexagonSize / 1.30) + "em;");
		scss.push("   	transition: all 1ms linear;");
		scss.push("}");

		scss.push(".hex-field-item-text{");
		scss.push("   	position: absolute;");
		scss.push("   	transform: rotate(90deg);");
		scss.push("   	width: 100%;");
		scss.push("   	z-index: 1;");
		scss.push("}");

		scss.push(".hex:before, .hex:after {");
		scss.push("   	position: absolute;");
		scss.push("   	width: inherit;");
		scss.push("   	height: inherit;");
		scss.push("   	border-radius: inherit;");
		scss.push("   	background: inherit;   content: '';");
		scss.push("}");

		scss.push(".hex:before {transform: rotate(60deg);}");
		scss.push(".hex:after {transform: rotate(-60deg);}");
		scss.push(".hex:hover {background: #F58787;cursor: pointer;}");

		scss.push(".game-board-container ol{");
		scss.push("		width: " + (hexagonSize * hexCount * 2) + "em;");
		scss.push("}");
		scss.push(".game-board-container{");
		scss.push("		width: " + (hexagonSize * (hexCount) * 2) + "em;");
		//scss.push("		height:hexagonSize * ($hex-count + 1 ) * 2.75;");
		scss.push("}");
/*
	console.log(scss.join("\n"));
*/

		var successCallback = function(css) {
		};

		
	    $style.html(scss.join("\n")); 
	};

	game.style = new StyleController();

})(game);