$(function(){
	var $this = $(this);
	var $easing = 'easeInOutQuart'; //easeInCirc, easeInOutCirc, easeInOutQuart, easeInOutQuad
	var $eventTime = 4000;

	var $thumbSlide = $('#wrap.main .thumb_slide li');
	var $action;
	var $num = 0;
	var $thumbTotal = $thumbSlide.length;

	var $slide = $('#wrap.main .slide_wrap .slide li');
    var $total = $slide.length;
    var $animateChk = true;
    var $cnt = 0;
    var $aniTime = 3500;
    var $speed = 2300;
    var $time;
    
    var $windowW = $(window).width();
	var $windowH = $(window).height();
	var $documentH = $(document).height();
	var temp;

    // resize
    $(window).resize(function(){
		resizeFunc();
		// location.reload();
	});
    
	
    
	var _mask = {
		open: function(){
			$('#wrap.main').append('<div class="mask">Mask</div>');
			$('#wrap.main .mask').show();
		},
		close: function(){
			$('#wrap.main .mask').hide();
			$('#wrap.main .mask').remove();
		}
	};
	
	
	// MASK
	function resizeFunc(){
		$('.mask').css({'width':$windowW,'height':$documentH, 'opacity':'0.6'});
		$('.layer_init_wrap').css({'opacity' : 1, 'height' : $windowH });
	}		

	// thumb_slide_wrap
	if( 1 < $thumbTotal ) {

		var $ctrl = '<div class="thumb_btn_control">' +
                        '<div class="thumb_btn_auto">' +
                            '<button type="button" class="btn_play on">재생</button>' +
                            '<button type="button" class="btn_stop off">정지</button>' +
                        '</div>' +
                    '</div>';

        $('.thumb_slide').after( $ctrl );

		$('#wrap.main .thumb_slide_wrap li').each(function(idx , el){
			$('#wrap.main .thumb_slide_wrap li').eq(0).addClass('on');			
			$(this).addClass('menu' + (idx + 1));
		});
	}
	
	
	thumbSlideAction();
	
	function thumbSlideAction(){
		clearInterval( $action );
		$action = setInterval(function() { slideEventAni();}, $eventTime );
  	}

	function slideEventAni(){
		$num ++;
		if($num >= $thumbTotal) {
			$num = 0;
		}
		slideThumbCommon();
	}

	function slideThumbCommon(){
		$('#wrap.main .thumb_slide li .timeline').remove();
		$thumbSlide.eq($num).find('.event_wrap').prepend('<span class="timeline" />');

		$thumbSlide.removeClass('on').eq($num).addClass('on');
		$('#wrap.main .thumb_layer li').removeClass('on').eq($num).addClass('on');
		$('#wrap.main .thumb_slide li.on a').css({'opacity' : 0.3}).stop().animate({'opacity':1}, 1500, $easing); // 펼쳐진 이미지 opacity 적용
        $thumbSlide.eq($num).find('.event_wrap').children('.timeline').css({'width':'0'}).clearQueue().stop().animate({'width':'467px'}, 3900, $easing, function(){
        });
	}
	
	// 연금자산 배너
	$('.pension_banner dt.menu01_tit > a').on('click', function(e){
		e.preventDefault();
		//alert("a");
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu01_con').removeClass("off").css({'opacity' : 0.3}).stop().animate({'opacity':1, 'z-index' : 2}, 1500, $easing);
		$('.menu02_con, .menu03_con').addClass("off").css({'opacity' : 0},{'z-index' : 1});	
	});
	$('.pension_banner dt.menu02_tit > a').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu02_con').removeClass("off").css({'opacity' : 0.3}).stop().animate({'opacity':1, 'z-index' : 2}, 1500, $easing);
		$('.menu01_con, .menu03_con').addClass("off").css({'opacity' : 0},{'z-index' : 1});	
	});	
	$('.pension_banner dt.menu03_tit > a').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu03_con').removeClass("off").css({'opacity' : 0.3}).stop().animate({'opacity':1, 'z-index' : 2}, 1500, $easing);
		$('.menu01_con, .menu02_con').addClass("off").css({'opacity' : 0},{'z-index' : 1});	
	});
	/*$('.pension_banner dt.menu01_tit > a').on('click', function(e){
		e.preventDefault();
		//alert("a");
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu01_con').removeClass("off").addClass("on");
		$('.menu02_con, .menu03_con').addClass("off");	
	});
	$('.pension_banner dt.menu02_tit > a').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu02_con').removeClass("off").addClass("on");	
		$('.menu01_con, .menu03_con').addClass("off");	
	});	
	$('.pension_banner dt.menu03_tit > a').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$('.menu03_con').removeClass("off").addClass("on");
		$('.menu01_con, .menu02_con').addClass("off");	
	});*/
	
    $('#wrap.main .thumb_slide li a').on('click',function(e){
    	e.preventDefault();

        var $idx = $(this).parent().index();
        if ( $num != $idx ) {
            $num = $idx;
        }

  		clearInterval($action);
        slideThumbCommon();
		$('#wrap.main .thumb_layer li').removeClass('on').eq($idx).addClass('on');

		if( $('#wrap.main .thumb_slide').hasClass('auto')) {
			thumbSlideAction();
		}
    });
    $(this).on('click', '#wrap.main .thumb_layer .popup_content.movie .btn_caption', function(){
    	$('#wrap.main .thumb_layer .popup_content.movie .frame_caption').slideToggle('350', function(){ });
    });
    

    $(this).on('click', '#wrap.main .thumb_slide_wrap .btn_stop', function(){
        clearInterval($action);
        thumbCtrlCommon($(this), 'stop');
        
    });
    
    $(this).on('click', '#wrap.main .thumb_slide_wrap .btn_play', function(){
    	
    	thumbCtrlCommon($(this), 'play');        
        $action = setInterval(function() { slideEventAni();}, $eventTime );
    });
    
    function thumbCtrlCommon(_target, _dir){
    	    	
    	$('#wrap.main .thumb_slide_wrap .thumb_btn_auto button').removeClass('on off');
        _target.addClass('on').siblings().addClass('off');
        
        if (_dir == 'stop') {
        	if( $('#wrap.main .thumb_slide').hasClass('auto') ) {
            	$('#wrap.main .thumb_slide').removeClass('auto');
            }
        } else {
        	if( !$('#wrap.main .thumb_slide').hasClass('auto') ) {
            	$('#wrap.main .thumb_slide').addClass('auto');
            }
        }        
    }

    $(this).on('click', '#wrap.main .thumb_slide li .event_wrap button', function(){
    	temp = $(this);
    	
    	if( $num == 0){
    		// location.href= '/newir/home/kr/index.jsp';
    		window.open('/newir/home/kr/index.jsp', '_blank');

    	} else {
    		
    		$('html, body').stop().animate({scrollTop : 1100}, 10, 'swing');
    		
    		clearInterval($action);		
        	$('#wrap.main .thumb_layer_wrap').addClass('on');
        	_mask.open();
        	        
        	if( !$('#wrap.main .thumb_layer .popup_visual.movie').hasClass('active')){
        		movieInsert();	
        	}
    	}		
   	});
    
    
	$(this).on('click', '.thumb_layer_wrap .btn_ctrl', function(e){
		e.preventDefault();
		clearInterval($action);

		var $eventTarget = $(this).attr('class').split(' ')[1];		

		if ( $eventTarget == 'prev' ) {
			$num --;
			
			// if($num < 0) {
			if($num <= 0) {
				$num = $thumbTotal-1;
			}
		} else {
 			$num ++;
			if($num >= $thumbTotal) {
				// $num = 0;
				$num = 1;
			}
		}

		$('#wrap.main .thumb_layer_wrap .thumb_layer li').removeClass('on').eq($num).addClass('on');
		$('#wrap.main .thumb_slide_wrap .thumb_slide li').removeClass('on').eq($num).addClass('on');		
	});
	
	function movieClose() {		
		$('#wrap.main .thumb_layer .popup_visual.movie').removeClass('active').html('');		
	}
	
	function movieInsert(){
		$('#wrap.main .thumb_layer .popup_visual.movie').addClass('active')
			.html('<iframe width="900" height="500" title="미래에셋대우 그룹소개 영상" src="https://www.youtube.com/embed/0LlXTGCjs6I?rel=0" frameborder="0" allowfullscreen></iframe>');
			// .html('<iframe width="900" height="500" title="미래에셋대우 그룹소개 영상" src="https://www.youtube.com/embed/jo5FuvW3iOM" frameBorder="0" allowfullscreen="true" ></iframe>');
					
	}

	$(this).on('click', '.thumb_layer_wrap .btn_close', function(e){
		e.preventDefault();
		clearInterval($action);
		
		$('#wrap.main .thumb_layer_wrap').removeClass('on');
		
		// main visual movie btn_close
		$('#wrap.main .thumb_layer_wrap').css('top','-30%');
		$('#wrap.main .thumb_slide_wrap .thumb_slide li').eq($num).find('> a').click();
		_mask.close();
		
		if( $num == 3 && $('#wrap.main .thumb_layer .popup_visual.movie').hasClass('active') ) {
			movieClose();
		}
				
		thumbSlideAction();		
		setTimeout(function(){
			try{
			temp.focus();
			}catch(e){				
			}
		},10);
		
	});


    if(1 < $total){
        var $ctrl = '<div class="btn_control_wrap">' +
	        			'<div class="btn_auto">' +
	                        '<button type="button" class="btn_ctrl stop">stop</button>' +
	                    	'<ul class="pagination"></ul>' +
	                    '</div>' +
	                    '<div class="btn_control">' +
	                        '<button type="button" class="btn_prev"></button>' +
		                    '<button type="button" class="btn_next"></button>' +
		                '</div>' +
					'</div>';
        
        $('#wrap.main .slide_wrap').append($ctrl);
        $slide.each(function(i , el){
        	$(this).addClass('menu' + (i+1));
            $('#wrap.main .slide_wrap .pagination').append('<li><a href="#">'+ (i+1) +'Page</a></li>');
        });

        $('#wrap.main .slide_wrap .pagination').children('li:first').addClass('on');

        var pagingWidth = ($('#wrap.main .slide_wrap .btn_auto').outerWidth()/2);
        $('#wrap.main .slide_wrap .btn_auto').css({'margin-left' : '-' + pagingWidth +'px'});
    }

    $slide.eq($cnt).css({'left':'0'}).addClass('on');

    timeAction();

    function timeAction(){
        clearInterval($time);
        $time = setInterval(function() { slideNext();}, $aniTime );
    }

    function slideNext(){
        if ($animateChk) {
            $animateChk = false;

            $cnt >= $total-1 ? $cnt = 0 : $cnt ++;

            slideMove();
        };
    }


    function slidePrev(){
        if ($animateChk) {
            $animateChk = false;

            $cnt <= 0 ? $cnt = $total -1 : $cnt --;

            slideMove();
        };
    }

    function slideMove(){

        $('#wrap.main .slide_wrap .slide li.on').stop().animate({'opacity':'0'}, $speed, $easing);
        $slide.eq($cnt).stop().animate({'opacity':'1'}, $speed, $easing, function(){
            $animateChk = true;
        });

        $slide.removeClass('on').eq($cnt).addClass('on');
        $('#wrap.main .slide_wrap .pagination li').removeClass('on').eq($cnt).addClass('on');

    }
    
    $('#wrap.main .slide_wrap .slide li a').on('click',function(e){
    	temp = $(this);
    	e.preventDefault();
        $num = 3;
        slideThumbCommon();
        
        // main visual movie click
        $('html, body').stop().animate({scrollTop : 0}, 10, 'swing');
        $('#wrap.main .thumb_layer_wrap').css('top','-1155px');
		
		clearInterval($action);		
    	$('#wrap.main .thumb_layer_wrap').addClass('on');
    	_mask.open();
    	        
    	if( !$('#wrap.main .thumb_layer .popup_visual.movie').hasClass('active')){
    		movieInsert();	
    	}
    });


    $('#wrap.main .slide_wrap .pagination li a').on('click',function(e){
    	e.preventDefault();
        var $idx = $(this).parent('li').index();
        if ($animateChk && $cnt != $idx) {
            $animateChk = false;

            $cnt = $idx;
            slideMove();

            $('#wrap.main .slide_wrap .pagination li').removeClass('on').eq($idx).addClass('on');
        }
    });

   $(this).on('click', '#wrap.main .slide_wrap .btn_ctrl', function(){

		var $eventTarget = $(this).attr('class').split(' ')[1];

		if ( $eventTarget == 'stop' ) {
			$(this).text('play');
			$(this).removeClass('stop').addClass('play');
			clearInterval($time);
		} else {
 			$(this).text('stop');
			$(this).removeClass('play').addClass('stop');
			clearInterval($time);
        	$time = setInterval(function() { slideNext();}, $aniTime );
		}

	});
   
   

    $('#wrap.main .slide_wrap .btn_prev').on('click',function(){
    	// clearInterval($time);
        slidePrev();
    });

    $('#wrap.main .slide_wrap .btn_next').on('click',function(){
    	// clearInterval($time);
        slideNext();
    });


	$('#wrap.main .slide_wrap .btn_control button').on('mouseenter focusin',function(){
		$(this).css({'opacity' : 1}).siblings().css({'opacity' : 0.3});
    }).on('mouseleave focusout',function(){
    	$('#wrap.main .slide_wrap .btn_control button').css({'opacity' : 1});
    });
	

	$('#wrap.main .advisor li a').on('mouseenter focusin', function(){		
		$('#wrap.main .advisor li').removeClass('on off');
		$(this).parent().addClass('on').siblings().addClass('off');
		$('#wrap.main .advisor li a span').css({'opacity' : 0}).stop().animate({'opacity':1}, 200, $easing); 		
	});

	$('#wrap.main .advisor_wrap').on('mouseleave focusout', function(){
		$('#wrap.main .advisor li a span').css({'opacity' : 0});
		$('#wrap.main .advisor li').removeClass('on off');
	});
	

	$('#wrap.main .fade_menu li').on('mouseenter focusin', function(){
		if( $(this).parent().hasClass('banner1') ) {
			//$(this).find('.over').css({'opacity':.7}).stop().fadeIn(200);			
			$(this).find('.more').stop().animate({'bottom':0 + 'px'}, 300, $easing);
		} else {
			$('#wrap.main .fade_menu li span').stop().animate({'opacity' : 0}, 200, $easing);
			$(this).find('span').stop().animate({'opacity' : 1}, 300, $easing);	
		}			
	
	}).on('mouseleave focusout', function(){			
		if( $(this).parent().hasClass('banner1') ) {
			//$(this).find('.over').stop().fadeOut(200);
			$(this).find('.more').stop().animate({'bottom':-4 + 'px'}, 300, $easing);
		} else {
			$('#wrap.main .fade_menu li span').stop().animate({'opacity' : 0}, 200, $easing);
		}
		
	});
	
	$('#wrap.main .split_list.banner2 li').on('mouseenter focusin', function(){
		$(this).find('.over').css({'opacity':.7}).stop().fadeIn(200);			
		$(this).find('.more').stop().animate({'bottom':'50%'}, 300, $easing);
		
	}).on('mouseleave focusout', function(){			
		$(this).find('.over').stop().fadeOut(200);
		$(this).find('.more').stop().animate({'bottom': -300 + '%'}, 300, $easing);	
	});	
	
	
	if( $('#wrap.main .guide_menu_wrap .top_quick_wrap').length > 0) {
		$('#wrap.main .guide_menu_wrap .top_quick_wrap a').each(function(i){
			$(this).addClass('ico_quick menu' + (i+1));
		});
	}
	
	
	$('#wrap.main .guide_menu_wrap .top_quick_wrap a').on('mouseenter focusin', function(){
		$('#wrap.main .guide_menu_wrap .top_quick_wrap a').removeClass('on');
		//$('#wrap.main .guide_menu_wrap .top_quick_wrap a span').stop().animate({'opacity' : 0}, 100, $easing);
		//$(this).addClass('on').find('span').stop().animate({'opacity' : 1}, 100, $easing);	
	});

	
	$('#wrap.main .guide_menu_wrap .top_quick_wrap').on('mouseleave focusout', function(){
		$('#wrap.main .guide_menu_wrap .top_quick_wrap a').removeClass('on');
		//$('#wrap.main .guide_menu_wrap .top_quick_wrap a span').stop().animate({'opacity' : 0}, 200, $easing);
	});
	
	
	$('#wrap.main #bbsPop.board_list li a').on('click', function(e){
		e.preventDefault();
		var popupTarget = $(this).attr('class');
		var popUrl 		= $(this).attr('href');
		var popTitle 	= $.trim( $(this).text() );
		var popOption 	= '';
		
		if(popupTarget == 'btn_board_pop1') {			
			popOption = 'width=800, height=800, resizable=no, left=0, top=0, scrollbars=yes, status=no';
		} else {			
			popOption = 'width=800, height=800, resizable=no, left=0, top=0, scrollbars=yes, status=no';
		}
		
		window.open(popUrl, '', popOption);		
	});	
	
	
	/*$('#wrap.main .top_quick_wrap a').on('click', function(e){
		e.preventDefault();
			
		var popUrl 	  =  $(this).attr('href');		
		var popOption = 'width=740, height=600, resizable=no, left=0; top=0; scrollbars=yes, status=no;';
				
		window.open(popUrl, '', popOption);		
	});	*/
	
	
	function aniThumbOnlyOne(){
		$('#wrap.main .thumb_slide_wrap li').eq(0).find('a').one().click();
		$('#wrap.main .thumb_layer_wrap thumb_layer li').eq(0).addClass('on');
	}
	
	
	// Get cookie function
	function getCookie(name) { 
		console.log(name)
		var cookieName = name + "=";
		var x = 0;
		while ( x <= document.cookie.length ) { 
			var y = (x+cookieName.length); 
			if ( document.cookie.substring( x, y ) == cookieName) { 
				if ((lastChrCookie=document.cookie.indexOf(";", y)) == -1) 
					lastChrCookie = document.cookie.length;
					return decodeURI(document.cookie.substring(y, lastChrCookie));
			}
			
			x = document.cookie.indexOf(" ", x ) + 1; 
			
			if ( x == 0 ) break; 
		} 
		
		return "";
	}
	
	function setCookie(cname, value, expire) {
		var todayValue = new Date();
		// 오늘 날짜를 변수에 저장

		todayValue.setDate(todayValue.getDate() + expire);
		document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
	}
	
	
	aniThumbOnlyOne();
	//mainInit();	
	
});





