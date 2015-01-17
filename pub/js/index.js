$(document).ready(function() {

	/* Helper methods */

	var getName = function (btnObj) {
		return btnObj.id.replace('btn-','');
	};

	var changeBgPhoto = function(name, isMouseover) {
		$('.bg-news').css({'opacity':0});
		$('.bg-music').css({'opacity':0});
		$('.bg-shows').css({'opacity':0});
		$('.bg-'+name).css({'opacity':1});

		if (!isMouseover) {
			currName = name;
		}
	};

	var changeContent = function(name) {
		if (name !== 'mailing') {
			changeBgPhoto(name, false);
		}
		window.history.pushState('','','/#'+name);
		$('.content-news').css({'display':'none'});
		$('.content-music').css({'display':'none'});
		$('.content-shows').css({'display':'none'});
		$('.content-mailing').css({'display':'none'});
		$('.content-'+name).css({'display':'block'});
	};

	var createNewsCard = function(rawDate, content) {
		var formatDate = rawDate.split(' ',4).join(' ');
		return  '<div class="content-news-card">'+
					'<div class="content-news-date">'+
						formatDate +
					'</div>'+
					'<div class="content-news-main">'+
						content +
					'</div>'+
				'</div>';
	};

	var createNewsCardPhoto = function(rawDateg, photoUrl, caption) {
		var formatDate = rawDate.split(' ',4).join(' ');
		return  '<div class="content-news-card">'+
					'<div class="content-news-date">'+
						formatDate +
					'</div>'+
					'<div class="content-news-main">'+
						'<a href="'+photoUrl+'" data-lightbox="'+photoUrl+'" data-title="'+caption+'">' +
							'<img src="'+photoUrl+'" width="100%" height="auto"' +
						'</a>' +
					'</div>'+
				'</div>';
	};


	/* Check URL */

	var exURL = document.URL.split('').reverse().join('').split('/',1).join('').split('').reverse().join('');
	if (exURL.length !== 0) {
		changeContent(exURL.replace('#',''));
	}


	/* Button background functionality */

	currName = 'news';
	// Set mouseover/down image changes for buttons
	$('.jr-btn').mouseover(function() {
		changeBgPhoto(getName(this), true);
	});
	$('.jr-btn').mouseout(function() {
		changeBgPhoto(currName);
	});
	// On click, change displayed content
	$('.jr-btn').mouseup(function() {
		changeContent(getName(this));
	});

	
	/*
		Mailing link 
	*/
	$('#mailing-out').mouseup(function() {
		// Change the URL
		changeContent('mailing');
	});

	/*
		Handle the RSS feed here
	*/
	$.getScript("http://jamesrosemanmusic.tumblr.com/api/read/json", function() {
		// If there are no posts
		if (tumblr_api_read.posts.length === 0) {
			$('.content-news').append(createNewsCard('Apologies','<p style="text-align:center;font-size: 18px;">No news! Check back soon!</p>'));
		} else {
			tumblr_api_read.posts.forEach(function(post) {
				// If the post is a photo
				if (post.type === "photo") {
					$('.content-news').append(createNewsCardPhoto(post['date'],post['photo-url-1280'],post['photo-caption']));
				} else {
					$('.content-news').append(createNewsCard(post['date'],post['regular-body']));
				}
			});
		}
	});
});