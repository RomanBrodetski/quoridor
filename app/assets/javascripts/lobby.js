	$(document).on("click", "#play_random", function(e) {
		var es = new EventSource('/streaming/random');
		console.log('playing random')

		es.onmessage = function(e) {
			response = JSON.parse(e.data)
			console.log('inexpected message:')
			console.log(e.data)
		};
		es.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			console.log('inexpected message:')
			console.log(e.data)
		}, false);

		es.addEventListener('move', function(e) {
			Board.move(e.data)
			console.log('move:')
			console.log(e.data)
		}, false);

		es.addEventListener('state', function(e) {
			console.log('state:')
			console.log(e.data)
			switch(e.data) {
			case "start":
				Board.setup()
				$('.waiting').hide()
			}
		}, false);

		es.addEventListener('your_turn', function(e) {
			console.log('your_turn:')
			console.log(e.data)
			if(e.data == 0) {
				$('.turn').hide()
				Board.your_turn(false)
			} else {
				$('.turn').show()
				Board.your_turn(true)
			}
		}, false);

		es.addEventListener('pawn_moves', function(e) {
			console.log('pawn_moves:')
			console.log(e.data)
			Board.set_legal_pawn_moves(e.data)
		}, false);

		es.addEventListener('playernames', function(e) {
			console.log('playernames:')
			console.log(e.data)
			obj = JSON.parse(e.data)
			$('.with').html(obj.join(', '))
		}, false);

		$('.waiting').show()
		$('#register').hide()
		e.preventDefault();
	});
	$(function() {
	})
