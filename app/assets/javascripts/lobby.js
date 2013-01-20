	$(document).on("submit", "#register", function(e) {
		// alert('s')
		window.cl_id = new Date().getTime()
		var es = new EventSource('/stream?name=' + $('#name').val() + "&id=" + cl_id);
		es.onmessage = function(e) {
			response = JSON.parse(e.data)
		};
		es.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			// alert(data)
		}, false);

		es.addEventListener('move', function(e) {
			Board.move(e.data)
		}, false);

		es.addEventListener('state', function(e) {
			switch(e.data) {
			case "start":
				$('.waiting').hide()
			}
		}, false);

		es.addEventListener('your_turn', function(e) {
			if(e.data == 0) {
				$('.turn').hide()
				Board.your_turn(false)
			} else {
				$('.turn').show()
				Board.your_turn(true)
			}
		}, false);

		es.addEventListener('pawn_moves', function(e) {
			Board.set_legal_pawn_moves(e.data)
		}, false);

		es.addEventListener('playernames', function(e) {
			obj = JSON.parse(e.data)
			$('.with').html(obj.join(', '))
		}, false);

		$('.waiting').show()
		$('#register').hide()
		e.preventDefault();
	});
	$(function() {
		Board.setup()
	})
