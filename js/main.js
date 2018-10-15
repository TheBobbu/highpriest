$(function() {
	scrollIt = function(clicked) {
		$('html, body').animate({
       scrollTop: $(clicked).offset().top - 85
    }, 0);
	}

	
	var glitchMotion = 0;
	moveBg = function (){
		bgPositions = Math.floor(Math.random()*100) + "% " + Math.floor(Math.random()*100) + "%"
		$('.glitch').css({backgroundPosition: bgPositions});
	}
	removeGlitch = function() {
		$('.glitch').removeClass('glitched');
		clearInterval(glitchMotion);
	}
	glitchIt = function() {
		$('.glitch').addClass('glitched');
		$('.glitch').css({'background-image':'url(img/site/glitch' + Math.floor((Math.random()*5)+1) + '.jpg)'});
		glitchMotion = setInterval( moveBg, 100);
		setTimeout( removeGlitch, 500);
	}

	loadSoundcloud = function(expanded) {
		expanded.find('iframe').each(
			function() {
				if (!$(this).attr('src')) {
					$(this).attr('src', $(this).attr('sc-src'));
				}
			}
		);		
	}

	$('.toggle').click(
		function() {
			if ($(this).hasClass('active')) {
				$(this).toggleClass('active');
				$('.thehighpriest').toggleClass('active');
				scrollIt($(this));
			} else {
				$('.thehighpriest').removeClass('directActive active');
				$('.toggle').removeClass('active');
				$(this).addClass('active');
				loadSoundcloud($(this).next());
				scrollIt($(this));
			}
			glitchIt();
		}
	);
	$('.logo').click(
		function() {
			if (!$('.thehighpriest').hasClass('active')) {
				$('.thehighpriest').toggleClass('directActive active');
				$('.toggle').removeClass('active');
			}
			glitchIt();
		}
	);

	galleryNav = function(focusMedia) {
		if ( focusMedia.prev().length != 0 && !$('.prev').hasClass('show')) {
			$('.prev').addClass('show');
		}
		if ( focusMedia.prev().length == 0 && $('.prev.show')) {
			$('.prev').removeClass('show');
		}
		if ( focusMedia.next().length != 0 && !$('.next').hasClass('show')) {
			$('.next').addClass('show');
		}
		if ( focusMedia.next().length == 0 && $('.next.show')) {
			$('.next').removeClass('show');
		}
		lastClicked = focusMedia;
		console.log(lastClicked);
	}

	var lastClicked = "";

	var videoClicked = function(clickedMedia) {
		var vidURL = clickedMedia[0].getAttribute('vid');
		$('.overlay').append('<iframe class="videoframe" src="' + vidURL + '" frameborder="0" allowfullscreen></iframe>');
		$('.overlay').show();
		galleryNav(clickedMedia);
	}

	var imgClicked = function(clickedMedia) {
		var imgURL = clickedMedia.find('img')[0].getAttribute('src');
		$('.overlay').append('<div class="imgframe"><img class="imginframe" src="' + imgURL + '"></div>');
		$('.overlay').show();
		galleryNav(clickedMedia);
	}

	$('.video').click(
		function() {
			videoClicked( $(this) );			
		}
	);
	$('.image').click(
		function() {
			imgClicked( $(this) );			
		}	
	);
	$('.exitoverlay').click(
		function() {
			$('.videoframe').remove();
			$('.imgframe').remove();
			$(this).parent().hide();
		}
	);
	$('.next').click(
		function() {
			$('.videoframe').remove();
			$('.imgframe').remove();
			var whatClass = lastClicked.next().attr('class');
			if ( whatClass == 'image') {
				imgClicked( lastClicked.next() );
			}
			if ( whatClass == 'video') {
				videoClicked( lastClicked.next() );
			}
		}
	);
	$('.prev').click(
		function() {
			$('.videoframe').remove();
			$('.imgframe').remove();
			var whatClass = lastClicked.prev().attr('class');
			if ( whatClass == 'image') {
				imgClicked( lastClicked.prev() );
			}
			if ( whatClass == 'video') {
				videoClicked( lastClicked.prev() );
			}
		}
	);
	$( window ).load(function() {
	  	$('.blur').removeClass('blur');
	  	$('.loader').hide();
	});

});