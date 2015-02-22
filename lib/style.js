(function(game) {

	var StyleController = function() {
		Sass.initialize(window.sassWorker);
		return this;
	};

	$style = $("<style></style>");
	$style.appendTo($("body"));

	StyleController.prototype.setCss = function(hexagonSize) {

		var scss = [];
		scss.push("$hex-size : " + hexagonSize + ";");
		scss.push("$hex-count : " +  game.GUI.grid.state.rows[0].length + ";");
		scss.push("$factor : 0;");

		scss.push("@if ($hex-size<=8){");
		scss.push("		$factor : 0.45;");
		scss.push("}");
		scss.push("@if ($hex-size<=7){");
		scss.push("		$factor : 0.5;");
		scss.push("}");
		scss.push("@if ($hex-size<=6){");
		scss.push("		$factor : 0.58;");
		scss.push("}");
		scss.push("@if ($hex-size<=5){");
		scss.push("		$factor : 0.64;");
		scss.push("}");
		scss.push("@if ($hex-size<=4){");
		scss.push("		$factor : 0.75;");
		scss.push("}");
		scss.push("@if ($hex-size<=3){");
		scss.push("		$factor : 0.9;");
		scss.push("}");
		scss.push("@if ($hex-size<=2){");
		scss.push("		$factor : 1.3;");
		scss.push("}");
		scss.push("@if ($hex-size<=1){");
		scss.push("		$factor : 2.3;");
		scss.push("}");

		scss.push("@if ($hex-size<=1){");
		scss.push("		.hex-field-item-text {");
		scss.push("			display : none;");
		scss.push("		}");
		scss.push("} @else {");
		scss.push("		.hex-field-item-text {");
		scss.push("			display: inline-block;");
		scss.push("		}");
		scss.push("}");

		scss.push("$hex-size : $hex-size * 1em;");

		scss.push(".hex-field-item-text {");
		scss.push("		margin-left: $hex-size / 2.5;");
		scss.push("   	margin-top: $hex-size / 2;");
		scss.push("}");


		scss.push("ol.even {");
		scss.push("		position: relative;");
		scss.push("   	left: ($hex-size / 1.1)+($hex-size/3);");
		scss.push("}");

		scss.push("ol.odd {");
		scss.push("		position: relative;");
		scss.push("   	margin-top: -($hex-size*$factor);");
		scss.push("		margin-bottom: -($hex-size*$factor);");
		scss.push("   	left: $hex-size/3;");
		scss.push("}");

		scss.push(".hex {");
		scss.push("   	position: relative;");
		scss.push("   	margin: 1em auto;");
		scss.push("   	width: ($hex-size);");
		scss.push("   	height: ($hex-size * 1.7);");
		scss.push("   	border-radius: 2%;");
		scss.push("   	background: #ccc;   ");
		scss.push("		transform: rotate(-90deg);   ");
		scss.push("		display: inline-block;  ");
		scss.push(" 	margin-right: ($hex-size / 1.30);");
		scss.push("   	transition: all 150ms ease-in-out;");
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
		scss.push("		width: $hex-size * ($hex-count) * 2;");
		scss.push("}");
		scss.push(".game-board-container{");
		scss.push("		width: $hex-size * ($hex-count) * 2;");
		//scss.push("		height:$hex-size * ($hex-count + 1 ) * 2.75;");
		scss.push("}");
/*
	console.log(scss.join("\n"));
*/

		var successCallback = function(css) {
		    $style.html(css);
		};

		Sass.compile(scss.join(" "), successCallback);
	};

	game.style = new StyleController();

})(game);