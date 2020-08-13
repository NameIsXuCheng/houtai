$(document).ready(function(){
	$.fn.slide = function() {
		var $this = $(this);
		var slide = $this.find('.slide_area .slide li');
		var total = slide.length; // 
		var animateChk = true; // 
		var cnt = 0;
		var aniTime = 4000; // 
		var speed = 2000; //
		var easing = 'easeInOutQuart'; // http://easings.net/
		var time;
		var ctrl;
		var $action;
		var $easing = 'easeInOutQuart'; //easeInCirc, easeInOutCirc, easeInOutQuart, easeInOutQuad
		

		if(1 < total){
			if( $this.hasClass('slide1') )
			{
				ctrl = '<div class="btn_control">' +
							'<button type="button" class="btn_prev"></button>' +
							'<button type="button" class="btn_next"></button>' +
						'</div>' +
						'<ul class="pagination"></ul>';

			}
			else if( $this.hasClass('slide2') )
			{
				var ctrl = '<div class="btn_control_wrap">' +
								'<div class="btn_auto">' +
									'<button type="button" class="btn_ctrl stop">stop</button>' +
									'<ul class="pagination"></ul>' +
								'</div>' +
								'<div class="btn_control">' +
									'<button type="button" class="btn_prev"></button>' +
									'<button type="button" class="btn_next"></button>' +
								'</div>' +
							'</div>' +
							'<div class="shadow_left"></div>' +
							'<div class="shadow_right"></div>';
			}
			else
			{
				var ctrl = '<div class="slide_tab_wrap">' +
								'<ul></ul>' +
							'</div>' +
							'<div class="btn_control_wrap">' +
								'<div class="btn_auto">' +
									'<button type="button" class="btn_play on"></button>' +
									'<button type="button" class="btn_stop off"></button>' +
								'</div>' +
							'</div>';
			}

			$this.find('.slide_area').append(ctrl);

			//
			$this.find(slide).each(function(i){
				$this.find('.slide_area .pagination').append('<li><a href="#">'+ (i+1) +'</a></li>');
				$this.find('.slide_area .slide_tab_wrap ul').append('<li class="tab_slider_'+ (i+1) +'"><a href="#">'+ (i+1) +'<span class="dot"></span></a></li>');
			});

			$this.find('.slide_area .pagination').children('li:first').addClass('on');
			$this.find('.slide_area .slide_tab_wrap ul').children('li:first').addClass('on');

			
		}
		$this.find(slide).eq(cnt).css({'left':'0'}).addClass('on');

		if( !$this.hasClass('slide1') ) {
			slideActionFn();
		}


		function slideActionFn(){
			clearInterval(time);
			time = setInterval(function() { slideNextFn();}, aniTime );
		}


		function slideNextFn(){
			if (animateChk) {
				animateChk = false;
				cnt >= total-1 ? cnt = 0 : cnt ++;
				slideMoveFn();
			};
		}

		
		function slideMoveFn(mode){
			if (mode == 'fade'){
				speed = 1000;
				$this.find('.slide_area .slide li.on').css({'opacity':'1','left':'0'}).stop().animate({'opacity':'0'}, speed, easing);
				$this.find(slide).eq(cnt).css({'opacity':'0','left':'0'}).stop().animate({'opacity':'1'}, speed, easing, function(){
					animateChk = true;
				});
			}else{
				speed = 1500;
				$this.find('.slide_area .slide li').css({'opacity':'1','left':'100%'});
				$this.find('.slide_area .slide li.on').css({'left':'0'}).stop().animate({'left':'-100%'}, speed, easing);
				$this.find(slide).eq(cnt).css({'left':'100%'}).stop().animate({'left':'0'}, speed, easing, function(){
					animateChk = true;
				});
			}

			$this.find(slide).removeClass('on').eq(cnt).addClass('on');
			$this.find('.slide_area .pagination li').removeClass('on').eq(cnt).addClass('on');
			$this.find('.slide_area .slide_tab_wrap ul li').removeClass('on').eq(cnt).addClass('on');
			$this.find('.slide_area .slide_tab_wrap ul li .dot').eq(cnt).css({'opacity' : 0}).stop().animate({'opacity':1}, 1500, $easing);
		}

		function slidePrev() {
			if (animateChk) {
				animateChk = false;

				cnt <= 0 ? cnt = total -1 : cnt --;

				$this.find('.slide_area .slide li.on').css({'left':'0'}).stop().animate({'left':'100%'}, speed, easing);
				$this.find(slide).eq(cnt).css({'left':'-100%'}).stop().animate({'left':'0'}, speed, easing, function(){
					animateChk = true;
				});

				$this.find(slide).removeClass('on').eq(cnt).addClass('on');
				$this.find('.pagination li').removeClass('on').eq(cnt).addClass('on');
				$this.find('.slide_area .slide_tab_wrap ul li').removeClass('on').eq(cnt).addClass('on');
				$this.find('.slide_area .slide_tab_wrap ul li .dot').eq(cnt).css({'opacity' : 0}).stop().animate({'opacity':1}, 1500, $easing);
			};
		}


		$this.find('.slide_area .pagination li a, .slide_area .slide_tab_wrap li a').on('click',function(e){
			e.preventDefault();
			var idx = $(this).parent('li').index();
			if (animateChk && cnt != idx) {
				animateChk = false;

				cnt = idx;
				slideMoveFn('fade');//20170220 수정 조찬기 : 페이징기능 클릭시 롤링전환 빠르게(fade효과로 전환)

				$this.find('.slide_area .pagination li').removeClass('on').eq(idx).addClass('on');
				$this.find('.slide_area .slide_tab_wrap li').removeClass('on').eq(idx).addClass('on');
				$this.find('.slide_area .slide_tab_wrap ul li .dot').eq(cnt).css({'opacity' : 0}).stop().animate({'opacity':1}, 1500, $easing);
			}
		});


		$this.find('.slide_area .btn_ctrl').on('click', function(){

			var $eventTarget = $(this).attr('class').split(' ')[1];

			if ( $eventTarget == 'stop' ) {
				$(this).text('play');
				$(this).removeClass('stop').addClass('play');
				clearInterval(time);
			} else {
	 			$(this).text('stop');
				$(this).removeClass('play').addClass('stop');
				clearInterval(time);
				time = setInterval(function() { slideNextFn();}, aniTime );
			}

		});

		$this.find('.slide_area .btn_stop').on('click', function(){
			clearInterval(time);
			$this.find('.slide_area .btn_play').removeClass('on').addClass('off');
			$this.find('.slide_area .btn_stop').removeClass('off').addClass('on');
		});

		$this.find('.slide_area .btn_play').on('click', function(){
			clearInterval(time);
			time = setInterval(function() { slideNextFn();}, aniTime );
			$this.find('.slide_area .btn_stop').removeClass('on').addClass('off');
			$this.find('.slide_area .btn_play').removeClass('off').addClass('on');
		});
		

		$this.find('.slide_area .btn_prev').on('click',function(){
		//  clearInterval(time);
			slidePrev();
		});

		$this.find('.slide_area .btn_next').on('click',function(){
		//  clearInterval(time);()
			slideNextFn();
		});

		$this.find('.slide_area .btn_control button').on('mouseenter focusin',function(){
			$(this).css({'opacity' : 1}).siblings().css({'opacity' : 0.3});
		}).on('mouseleave focusout',function(){
			 $this.find('.slide_area .btn_control button').css({'opacity' : 1});
		});

	}; // $.fn.slide

	// $('.slide1').slide(); // plug in  1
	$('.slide2').slide(); // plug in  2
	$('.slide3').slide(); // plug in  3
});