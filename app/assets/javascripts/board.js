Board = (function(e) {
	var c;
	var PAWN_RADIUS = 15
	var LEFT_PAD = 2
	var TOP_PAD = 97
	var EDGE = 45
	var GAP = 5
	// var WALL_LENGTH = 90
	var white;
	var black;
	window.walls = []
	var LEFT_MAR
	var TOP_MAR
	var legal_pawn_moves = []

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

	function commit_wall_move(column, row, v) {
		move = column.toString() + row.toString() + (v ? 'v' : 'h')
		if(v && ($.inArray(column.toString() + (row - 1).toString() + 'v', walls) >= 0 || $.inArray(column.toString() + row.toString() + 'v', walls) >= 0 || $.inArray(column.toString() + (row + 1).toString() + 'v', walls) >= 0 || $.inArray(column.toString() + row.toString() + 'h', walls) >= 0) || (!v && ($.inArray((column - 1).toString() + row.toString() + 'h', walls) >= 0 || $.inArray(column.toString() + row.toString() + 'h', walls) >= 0 || $.inArray((column + 1).toString() + row.toString() + 'h', walls) >= 0 || $.inArray(column.toString() + row.toString() + 'v', walls) >= 0))) {
			console.log(move + 'is impossible!')
			return false //overlaps
		}
		console.log('your move: ' + move)
		$.ajax("/move", {
			type: "POST",
			async: false,
			data: {
				move: move,
				id: cl_id
			},
			success: function(result) {
				// alert(result)
				walls.push(move)
				console.log("move sent to server")
			},
			error: function(error) {
				alert("error occured during the move!")
			}
		})
		return true;
	}

	function commit_pawn_move(column, row) {
		move = column.toString() + row.toString()
		if($.inArray(move, legal_pawn_moves) == -1) {
			return false
		}
		console.log('your move: ' + move)
		$.ajax("/move", {
			type: "POST",
			async: false,
			data: {
				move: move,
				id: cl_id
			},
			success: function(result) {
				// walls.push(move)
				console.log("move sent to server")
			},
			error: function(error) {
				alert("error occured during the move!")
			}
		})
		return true;
		}

		var reflect_move = function(move) {
				console.log('enemy move: ' + move)
				if(move.length == 3) {
					wall = $('.enemy_wall')[0]
					x = (parseInt(move[0])) * EDGE + LEFT_PAD
					y = (parseInt(move[1]) - (move[2] == 'v' ? 1 : 0)) * EDGE + TOP_PAD
					walls.push(move)
					pos_wall(wall, move[2] == 'v', x, y)
					$(wall).removeClass("enemy_wall")
				} else {
					pos_pawn($('.enemy_pawn')[0], (parseInt(move[0]) - 0.5) * EDGE + LEFT_PAD, (parseInt(move[1]) - 0.5) * EDGE + TOP_PAD)
				}
			}

		function in_field(x, y) {
			return x > LEFT_PAD + EDGE / 2 && y > TOP_PAD - EDGE / 2 && x < LEFT_PAD + EDGE * 17 / 2 && y < TOP_PAD + EDGE * 17 / 2
		}

		function possible_pawn(column, row) {
			return column >= 1 && column <= 9 && row >= 1 && row <= 9
		}

		function pos_wall(wall, v, x, y) {
			wall.setAttribute('x1', v ? x : x - EDGE);
			wall.setAttribute('y1', v ? y : y);
			wall.setAttribute('x2', v ? x : x + EDGE);
			wall.setAttribute('y2', v ? y + EDGE * 2 : y);
		}

		function pos_pawn(pawn, x, y) {
			pawn.setAttribute('cx', x)
			pawn.setAttribute('cy', y)
		}

		function init_drag() {
			$('.draggable').draggable({
				stop: function(event, ui) {
					wall = event.target
					x = ui.position.left - LEFT_MAR
					y = ui.position.top - TOP_MAR - window.pageYOffset
					v = true
					if(in_field(x, y)) {
						v = Math.abs((x - LEFT_PAD) % EDGE - EDGE / 2) > Math.abs((y - TOP_PAD) % EDGE - EDGE / 2)
						x = LEFT_PAD + Math.floor((x - LEFT_PAD) / EDGE + 0.5) * EDGE
						y = TOP_PAD + Math.floor((y - TOP_PAD) / EDGE + 0.5) * EDGE

						column = Math.floor((x - LEFT_PAD) / EDGE + 0.5)
						row = Math.floor((y - TOP_PAD) / EDGE + 0.5) + (v ? 1 : 0)
						if(commit_wall_move(column, row, v)) {
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
					y = ui.position.top - TOP_MAR - window.pageYOffset
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

		function init_pawns() {
			svg.circle(LEFT_PAD + EDGE * 4.5, TOP_PAD + EDGE * 0.5, PAWN_RADIUS, {
				stroke: "black",
				strokeWidth: 5,
				"class": 'enemy_pawn'
			});
			svg.circle(LEFT_PAD + EDGE * 4.5, TOP_PAD + EDGE * 8.5, PAWN_RADIUS, {
				stroke: "brown",
				fill: "brown",
				strokeWidth: 5,
				"class": 'pawn'
			});
			$('.pawn').draggable({
				stop: function(event, ui) {
					pawn = event.target
					x = ui.position.left - LEFT_MAR
					y = ui.position.top - TOP_MAR - window.pageYOffset
					col = Math.ceil((x) / EDGE)
					row = Math.ceil((y - TOP_PAD) / EDGE)
					// console.log("col: " + col + " row: " + row)
					if(possible_pawn(col, row)) {
						x = (col - 0.5) * EDGE + LEFT_PAD
						y = (row - 0.5) * EDGE + TOP_PAD
						// console.log("x: " + x + " y: " + y)
						if(commit_pawn_move(col, row)) {
							return pos_pawn(pawn, x, y)
						}
					}
					pawn.setAttribute('cx', pawn.getAttribute('x0')) //bring it back, bring it back, bring it back to me!
					pawn.setAttribute('cy', pawn.getAttribute('y0'))
				},
				drag: function(event, ui) {
					pawn = event.target
					x = ui.position.left - LEFT_MAR
					y = ui.position.top - TOP_MAR - window.pageYOffset
					col = Math.ceil((x) / EDGE)
					row = Math.ceil((y - TOP_PAD) / EDGE)
					// console.log("col: " + col + " row: " + row)
					if(possible_pawn(col, row)) {
						x = (col - 0.5) * EDGE + LEFT_PAD
						y = (row - 0.5) * EDGE + TOP_PAD
						// console.log("x: " + x + " y: " + y)
					}
					pawn.setAttribute('cx', x)
					pawn.setAttribute('cy', y)

					// .circle(wall_x, wall_y, 10)
				}
			}).bind('mousedown', function(event, ui) {
				// $(event.target.parentElement).append(event.target);
				pawn = event.target
				pawn.setAttribute('x0', event.target.getAttribute('cx'));
				pawn.setAttribute('y0', event.target.getAttribute('cy')); //store initial coords
			})

		}


		var setup = function() {
				$('#svg').svg({
					onLoad: function(svg) {
						window.svg = svg
						svg.image(0, 0, 410, 600, 'assets/board.svg');
						LEFT_MAR = $('#svg').offset().left
						TOP_MAR = $('#svg').offset().top
						// LEFT_MAR = 0
						// TOP_MAR = 0
						init_walls()
						init_pawns()
						init_drag()
						$('.draggable').draggable('disable')
					}
				});
			}

		var your_turn = function(move) {
				$('.draggable').draggable(move ? 'enable' : 'disable')
			}
		var set_legal_pawn_moves = function(moves) {
				legal_pawn_moves = JSON.parse(moves)
				console.log(moves)
			}

		return {
			setup: setup,
			your_turn: your_turn,
			move: reflect_move,
			set_legal_pawn_moves: set_legal_pawn_moves
		}

	})()
