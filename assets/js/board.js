$(function(e) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();

	imageObj.onload = function() {
		context.drawImage(imageObj, 69, 50);
	};
	imageObj.src = '/images/board.png';

})