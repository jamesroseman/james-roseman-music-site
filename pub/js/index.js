$(document).ready(function() {

	/* Helper methods */

	var getName = function (btnObj) {
		return btnObj.id.replace('btn-','');
	};

	var changeBgPhoto = function(name, isMouseover) {
		$(".bg-news").css({'opacity':0});
		$(".bg-music").css({'opacity':0});
		$(".bg-shows").css({'opacity':0});
		$(".bg-"+name).css({'opacity':1});

		if (!isMouseover) {
			currName = name;
		}
	};


	/* Button background functionality */

	// Store current background photo
	currName = "news";

	// Set mouseover image changes for buttons
	// Set mousedown image changes for buttons
	$('.jr-btn').mouseover(function() {
		changeBgPhoto(getName(this), true);
	});
	$('.jr-btn').mouseout(function() {
		changeBgPhoto(currName);
	});
	$('.jr-btn').mouseup(function() {
		changeBgPhoto(getName(this), false);
	});
});