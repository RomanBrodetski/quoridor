Board = (function(e) {
	var c;
	var LEFT_PAD = 2
	var TOP_PAD = 100
	var EDGE = 45
	var GAP = 5
	// var WALL_LENGTH = 90
	var white;
	var black;
	var walls = []
	var LEFT_MAR
	var TOP_MAR

	function col(p) {
		return p.charCodeAt(0) - 'a'.charCodeAt(0) + 1
	}

	function row(p) {
		return parseInt(p[1])
	}

	function pawn(pawn, target) {

	}

	// function wall(p) {
	// 	svg.line(0, 0, 100, 130, {
	// 		strokeWidth: 5
	// 	});
	// }

	function commit_wall_move(row, column, v) {
		if(v && ($.inArray((row - 1).toString() + column.toString() + 'v', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'v', walls) >= 0 || $.inArray((row + 1).toString() + column.toString() + 'v', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'h', walls) >= 0) || (!v && ($.inArray(row.toString() + (column - 1).toString() + 'h', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'h', walls) >= 0 || $.inArray(row.toString() + (column + 1).toString() + 'h', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'v', walls) >= 0))) {
			return false //overlaps
		}
		move = row.toString() + column.toString() + (v ? 'v' : 'h')
		$.ajax("/move", {
			type: "POST",
			async: false,
			data: {
				wall: move,
				id: cl_id
			},
			success: function(result) {
				alert(result)
			},
			error: function(erroe) {
				alert("error occured during the move!")
			}
		})
		walls.push(row.toString() + column.toString() + (v ? 'v' : 'h'))
		return true;
	}

	function commit_pawn_move(row, column, v) {
		if(v && ($.inArray((row - 1).toString() + column.toString() + 'v', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'v', walls) >= 0 || $.inArray((row + 1).toString() + column.toString() + 'v', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'h', walls) >= 0) || (!v && ($.inArray(row.toString() + (column - 1).toString() + 'h', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'h', walls) >= 0 || $.inArray(row.toString() + (column + 1).toString() + 'h', walls) >= 0 || $.inArray(row.toString() + column.toString() + 'v', walls) >= 0))) {
			return false //overlaps
		}
		move = row.toString() + column.toString() + (v ? 'v' : 'h')
		$.ajax("/move", {
			type: "POST",
			async: false,
			data: {
				wall: move,
				id: cl_id
			},
			success: function(result) {
				alert(result)
			},
			error: function(error) {
				alert("error occured during the move!")
			}
		})
		walls.push(row.toString() + column.toString() + (v ? 'v' : 'h'))
		return true;
	}

	var reflect_move = function(move) {
			wall = $('.enemy_wall')[0]
			x = (parseInt(move[1])) * EDGE + LEFT_PAD
			y = (parseInt(move[0]) - 1) * EDGE + TOP_PAD
			pos_wall(wall, move[2] == 'v', x, y)
			$(wall).removeClass("enemy_wall")
		}

	function in_field(x, y) {
		return x > LEFT_PAD + EDGE / 2 && y > TOP_PAD - EDGE / 2 && x < LEFT_PAD + EDGE * 17 / 2 && y < TOP_PAD + EDGE * 17 / 2
	}

	function pos_wall(wall, v, x, y) {
		wall.setAttribute('x1', v ? x : x - EDGE);
		wall.setAttribute('y1', v ? y : y);
		wall.setAttribute('x2', v ? x : x + EDGE);
		wall.setAttribute('y2', v ? y + EDGE * 2 : y);
	}

	function init_drag() {
		$('.draggable').draggable({
			stop: function(event, ui) {
				wall = event.target
				x = ui.position.left - LEFT_MAR
				y = ui.position.top - TOP_MAR
				v = true
				if(in_field(x, y)) {
					v = Math.abs((x - LEFT_PAD) % EDGE - EDGE / 2) > Math.abs((y - TOP_PAD) % EDGE - EDGE / 2)
					x = LEFT_PAD + Math.floor((x - LEFT_PAD) / EDGE + 0.5) * EDGE
					y = TOP_PAD + Math.floor((y - TOP_PAD) / EDGE + 0.5) * EDGE

					column = Math.floor((x - LEFT_PAD) / EDGE + 0.5)
					row = Math.floor((y - TOP_PAD) / EDGE + 0.5) + (v ? 1 : 0)
					console.log("row: " + row + " column: " + column)
					if(commit_wall_move(row, column, v)) {
						$(wall).draggable("destroy").removeClass('draggable')
						return pos_wall(wall, v, x, y)
					}
				}
				wall.setAttribute('x1', wall.getAttribute('x0')) //bring it back, bring it back, bring it back to me!
				wall.setAttribute('y1', wall.getAttribute('y0'))
				wall.setAttribute('x2', wall.getAttribute('x0'))
				wall.setAttribute('y2', parseInt(wall.getAttribute('y0')) + EDGE * 2 - GAP)
			},
			drag: function(event, ui) {
				wall = event.target
				x = ui.position.left - LEFT_MAR
				y = ui.position.top - TOP_MAR
				v = true
				if(in_field(x, y)) {
					v = Math.abs((x - LEFT_PAD) % EDGE - EDGE / 2) > Math.abs((y - TOP_PAD) % EDGE - EDGE / 2)
					x = LEFT_PAD + Math.floor((x - LEFT_PAD) / EDGE + 0.5) * EDGE
					y = TOP_PAD + Math.floor((y - TOP_PAD) / EDGE + 0.5) * EDGE
				}
				pos_wall(wall, v, x, y)

				// .circle(wall_x, wall_y, 10)
			}
		}).bind('mousedown', function(event, ui) {
			// $(event.target.parentElement).append(event.target);
			wall = event.target
			wall.setAttribute('x0', event.target.getAttribute('x1'));
			wall.setAttribute('y0', event.target.getAttribute('y1')); //store initial coords
		})
	}

	function init_walls() {
		for(var i = 0; i < 10; i++) {
			svg.line(LEFT_PAD + EDGE * i, 0, LEFT_PAD + EDGE * i, EDGE * 2 - GAP, {
				stroke: "black",
				strokeWidth: 5,
				"class": 'enemy_wall'
			});
			svg.line(LEFT_PAD + EDGE * i, EDGE * 23 / 2, LEFT_PAD + EDGE * i, EDGE * 27 / 2 - GAP, {
				stroke: "brown",
				strokeWidth: 5,
				"class": 'draggable'
			});
		}

	}


	var setup = function() {
			$('#svg').svg({
				onLoad: function(svg) {
					window.svg = svg
					svg.image(0, 0, 410, 600, 'images/board.svg');
					LEFT_MAR = $('#svg').position().left
					TOP_MAR = $('#svg').position().top
					init_walls()
					init_drag()
					$('.draggable').draggable('disable')
				}
			});
		}

	var your_turn = function(move) {
			$('.draggable').draggable(move ? 'enable' : 'disable')
		}

	return {
		setup: setup,
		your_turn: your_turn,
		move: reflect_move
	}

})()