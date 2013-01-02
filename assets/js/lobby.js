	$("#register").live("submit", function(e) {
		// alert('s')
		var es = new EventSource('/stream?name=' + $('#name').val());
		es.onmessage = function(e) {
			response = JSON.parse(e.data)
		};
		es.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			alert(data)
		}, false);

		es.addEventListener('state', function(e) {
			switch(e.data) {
			case "start":
				$('.board').show()
				$('.waiting').hide()
			}

		}, false);

		es.addEventListener('meta', function(e) {
			obj = JSON.parse(e.data)
			$('.with').html(obj.join(', '))
		}, false);
		$('.waiting').show()
		$('#register').hide()
		e.preventDefault();
	});