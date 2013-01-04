Board = (function(e) {
	var c;
	var LEFT = 10
	var TOP = 100
	var EDGE = 44
	var WALL_LENGTH = 90
	var white;
	var black;


	function col(p) {
		return p.charCodeAt(0) - 'a'.charCodeAt(0) + 1
	}

	function row(p) {
		return parseInt(p[1])
	}

	function pawn(pawn, target) {

	}

	function wall(p) {
		svg.line(0, 0, 100, 130, {
			strokeWidth: 5
		});

	}

	function init_walls() {

		for(var i = 0; i < 10; i++) {
			svg.line(EDGE * i, 0, EDGE * i, 100, {
				stroke: "black",
				strokeWidth: 5
			});

			svg.line(EDGE * i, 500 , EDGE * i, 600, {
				stroke: "black",
				strokeWidth: 5
			});

		}
	}

	function init(svg) {
		window.svg = svg
		var back = svg.image(0, 0, 400, 600, 'images/board.svg');
		
		init_walls()
	}

	var setup = function() {
			$('#svg').svg({
				onLoad: init
			});

		}

	return {
		setup: setup
	}

})()