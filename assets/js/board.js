Board = (function(e) {
	var c;
	var LEFT = 10
	var TOP = 100
	var EDGE = 55
	var white;
	var black;

	imageObj.onload = function() {
		context.drawImage(imageObj, 69, 50);
	};
	imageObj.src = '/images/board.png';
	function col(p) {
		return p.charCodeAt(0) - 'a'.charCodeAt(0) + 1
	}

	function row(p) {
		return parseInt(p[1])
	}

	function pawn(pawn, target) {

	}

	function wall(p) {
		c.lineWidth = 6;
		c.beginPath();
		left = LEFT + col(p) * EDGE
		top_ = TOP + row(p) * EDGE
		if(p[2] == 'h') {
			left -= EDGE
		} else {
			top_ -= EDGE
		}
		c.moveTo(left, top_);
		c.lineTo(left + (p[2] == 'v' ? 0 : EDGE * 2), top_ + (p[2] == 'h' ? 0 : EDGE * 2));
		// c.lineTo(col(p) * 10 + 10, row(p) * 10 + 10);
		c.stroke();
	}

	return {
		setup: function() {
			var canvas = document.getElementById('canvas');
			c = canvas.getContext('2d');
			var imageObj = new Image();

			imageObj.onload = function() {
				c.drawImage(imageObj, 0, 0);
				wall("a1v")
				wall("b2v")
				wall("f3h")
				c.beginPath();
				c.fillStyle = '#fff';
				white = c.arc(LEFT + EDGE * 4.5, TOP + EDGE * 0.5, 10, 0, Math.PI * 2, true);
				c.closePath()
				c.fill()
				c.beginPath();
				black = c.arc(LEFT + EDGE * 4.5, TOP + EDGE * 8.5, 10, 0, Math.PI * 2, true);
				c.closePath();
				c.fillStyle = '#000';
				c.fill()

			};
			imageObj.src = '/images/board.jpg';

		}
	}
})()
