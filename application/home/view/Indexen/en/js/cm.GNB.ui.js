$(function(){

	var openChk = true;
	var delta = 300;

	// GNB
	$('#gnb > li').on('mouseenter', function(){

		var _this = $(this);
		setTimeout(function(){

			if (openChk == true) {
				openChk = false;
				// common function
				gnbMenuOpen( _this );
				openChk = true;
			}
		}, delta);
	})
	.on('focusin', function(){
		gnbMenuOpen( $(this) );
	});


	$('#gnb_cover').on('mouseleave', function(){
		openChk = false;

		setTimeout(function(){
			if (openChk == false) {
				
				// common function
				gnbMenuClose();
				openChk = true;
			}

		}, delta);
	})
	.on('foucsuout', function(){
		gnbMenuClose();
	});

	function gnbMenuOpen(_ths){
		var idx = _ths.index();
		//$('#gnb_cover').removeClass('on');
		_ths.addClass('on').siblings().removeClass('on');		
		$('#headerWrap').css({'z-index':'15'});
		/*
		if ( idx == 0) {
			$('#gnb_cover').css({'height' : '54px'});
		} else {
			var $coverHeight = $('#gnb > li.on .depth_content').outerHeight() + 56;
			if ($coverHeight != undefined) {
				// $('#gnb > li .depth_content').css({'opacity':'100'});
				$('#gnb_cover').css({'height' : $coverHeight});
			}
		}
		*/
		if ( idx != 0) {
			var $coverHeight = $('#gnb > li.on .depth_content').height() + 116;
			if ($coverHeight != undefined) {
				// $('#gnb > li .depth_content').css({'opacity':'100'});
				$('#gnb_cover').css({'height' : $coverHeight}).addClass('on');
			}
		} else if( idx == 0 ) {
			$('#gnb_cover').css({'height' : '54px'}).removeClass('on');
		}
	}

	function gnbMenuClose(){
		$('#gnb_cover').css({'height' : '54px'}).removeClass('on');;
		$('#headerWrap').css({'z-index':''});
		// $('#gnb > li .depth_content').css({'opacity':'0'});
		$('#gnb > li').removeClass('on');
	}



	$(this).on('keydown','#gnb > li .depth_content .sub_depth_wrap:last .sub_depth ul li:last a', function(event){

		var isShift = window.event.shiftKey ? true : false;
		if ( (!isShift && event.keyCode == 9) ){
			gnbMenuClose();
		}
	});


	// GNB FIXED
	$(window).scroll(function(){
		var scrollEvent = $(document).scrollTop();
		if (scrollEvent > 0) {
			$('#headerWrap, #container').addClass('fixed');
		} else {
			$('#headerWrap, #container').removeClass('fixed');
		}
	});

	// INPUT PLACEHOLDER
	function labelPlaceHolder() {
		
		var temp = $('.overlay').val();
		if ( temp != undefined) {
			$('.overlay').val('');
		}

		$('.overlay').on('focusin', function(){
			$(this).parent().find('.overlay_guide').hide();
	    })
	    .on('focusout', function(){
	        if (this.value == '')
	        {
	        	$(this).parent().find('.overlay_guide').show();
	        } else {
	        	$(this).parent().find('.overlay_guide').hide();
	        };
	    });
		
		$('.overlay_guide.exception').on('click', function(){
			$(this).parent().find('.overlay').focus();
		});
	}
	
	$(window).load(function(){
		labelPlaceHolder();
	});
	

});