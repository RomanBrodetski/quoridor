	$(document).on("click", "#play_random", function(e) {
		var es = new EventSource('/streaming/random');
		console.log('playing random')

		es.onmessage = function(e) {
			response = JSON.parse(e.data)
			console.log('unexpected message:')
			console.log(e.data)
		};
		es.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			console.log('unexpected message:')
			console.log(e.data)
		}, false);

		es.addEventListener('move', function(e) {
			Board.move(e.data)
			console.log('move:')
			console.log(e.data)
		}, false);

		es.addEventListener('state', function(e) {
			console.log('state:' + e.data)
			switch(e.data) {
			case "start":
				Board.setup()
				$('.waiting').hide()
				break;
			case "win":
				Board.destroy()
				alert('you won!')
				break;
			case "defeat":
				Board.destroy()
				alert('you lost!')
				break;
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
			$('.first-player').attr('href', '/users/' + obj[0][0])
			$('.second-player').attr('href', '/users/' + obj[1][0])
		}, false);

		$('.waiting').show();
		e.preventDefault();
	});
	$(function() {})