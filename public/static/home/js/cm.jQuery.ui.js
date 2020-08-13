$(function(){	
		
	// List TAB
	if ( $('.tab_wrap.list').length > 0 ) {
		
		$('.tab_wrap.list li:nth-child(3n + 1)').css('width','33.4%');
		$('.tab_wrap.list li:lt(3)').css('margin-top','0');
	}
	
	
	// fund 간단히 보기 정렬
	if ( $('.simple_data_wrap .list_simple_data').length > 0 ) {
		$('.simple_data_wrap .list_simple_data > li:nth-child(3n)').css('margin-right','0');
	}

	// Margin of the last element control
	// variable announce
	var $wrapContent =$('.dep02Sec, .dep03Sec, dep04Sec, .layer_content, .box_wrap, .notice_wrap, .boxSec, .outcome_wrap');


	$wrapContent.each(function(){
		$(this).children().last().css('margin-bottom', '0px');
	}); //end each
	
	$('#contents').each(function(){
		$(this).children().last().css('margin-bottom', '0px');
	}); //end each	
	
	$('.split.col2 .colSec:nth-child(even)').css('margin-right','0');
	$('.split .colSec:first-child, .split .colSec:nth-child(2)').css('margin-top','0');
	
	window.colMargin = function(){
		// Margin
		// Margin adjustments when the word(imgTxtV) containing
		// variable announce
		var $splitImgTxtV = $('.split, .lst');
		var $splitImgTxtVColSec = $splitImgTxtV.find('>.colSec');
		
		// Depending on the class column margin control
		$splitImgTxtVColSec.each(function(index){
			// variable announce
			var colIndexOf = $(this).parent().attr('class').indexOf('col')+3;
			var intCol = Number( $(this).parent().attr('class').charAt(colIndexOf) );
			var thisIndex = Number($(this).index() + 1);

			if(thisIndex % intCol == 0){
				$(this).css('margin-right', '0px');
				if($(this).parent().is('ol')){
					$(this).css('padding-right', '0px');
				}
			}//end if

			if(thisIndex <= intCol){
				$(this).css('margin-top',"0px");
			}//end if

		}); //end each
	};
	colMargin();
	
	
	// Layer 클래스 펀드 비교
	$(this).on('click','.layer_popup_wrap .btn.compare', function(e){
		e.preventDefault();
		
		var state = $('.btn.compare').hasClass('on');		
		if( !state ) {
			$(this).addClass();
			$('.compare_detail_wrap').show();					
		}		
	});
	
	$(this).on('click','.compare_detail_wrap .btn_close', function(e){
		e.preventDefault();
		$('.layer_popup_wrap .btn.compare').removeClass('on');
		$(this).parent().hide();		
	});

	
	// TAB MENU(DISPLAY NONE-BLOCK 방식)
	if ( $(".tab_cont_wrap").length > 0 ){//.tab_cont_wrap이 있을 경우에만 작동
		var tabWrap = $(".sub_menu").find(".tab_menu"),
			tabBtn = tabWrap.find(">li a");
			tabBtn.on("click",function(e){
			e.preventDefault();
			
			$(".tab_wrap.sub_menu .tab_menu > li, .tab_wrap.sub_menu .tab_menu > li > a").removeAttr('title');
			$(this).attr('title', '현재페이지');
			
			var idx = $(this).parent().index();
			$(this).parent().addClass("on").siblings().removeClass("on");
			$(".tab_cont_wrap").find(".tab_cont_box").eq(idx).show().siblings().hide();
		});	
	}
	
	// Search link 위치값(레이어팝업일경우)
	if ( $(".layer_popup_wrap").find(".fin_search_wrap").length > 0 ){
		var posfinSearchBox = $(".fin_search").find("fieldset").position().left;
		$(".fin_search_link").css("margin-left",posfinSearchBox-40);
	}
	
	
	$(window).resize(function(){
		resizeFunc();
	});
	
	var _mask = {
		open : function(){
			$('.mask').css({'width': $(window).width(), 'height':$(document).height(), 'opacity':'.6'});
			$('.mask').show();
		}, 
		close : function(){			
			$('.mask').hide();			
			$('.mask').remove();			
		}
	};
	
	
	function resizeFunc(){
		$('.mask').css({'width': $(window).width(), 'height':$(document).height(), 'opacity':'.6'});		
	}
	
		
	var _this;
	var layerMask = '<div class="mask">암막효과 Layer</div>';
	var layerH;
	var layerW;
	var windowH = $(window).height() - 200;
	
	// layer Ajax
	$(this).on('click', '.ajax_layer', function(e){			
		e.preventDefault();
		
		var layerCover = '<div class="layer_wrapping ajax"></div>';
		var layerHref = $(this).attr('href'); 		
		var href = layerHref + ' .layer_popup_wrap';		
		$('#wrap').after( layerMask );
		_this = $(this);		
		$(this).after( layerCover );
		
		_mask.open();
		$('.layer_wrapping.ajax').load( href );
		
		setTimeout(function(){
			
			layerH = $('.layer_wrapping.ajax .layer').outerHeight() / 2;
			layerW = $('.layer_wrapping.ajax .layer_popup_wrap').outerWidth();
			
			$('.layer_wrapping.ajax').css({'margin-left': - ( layerW / 2 ) + 'px'});			
			
			if( windowH > (layerH * 2)) {				
				$('.layer_wrapping.ajax').css({'margin-top': - layerH + 'px'});
				$('.layer_wrapping.ajax').removeClass('scroll');
			} else {
				$('.layer_wrapping.ajax').addClass('scroll');
				$('.layer_wrapping.ajax').css({'height': windowH + 'px', 'top': '100px', 'overflow': 'hidden', 'width' :(layerW + 17) + 'px'});
				$('.layer_wrapping.ajax .layer_content').css({'overflow': 'scroll', 'margin-right': '-17px', 'height' : (windowH - 120) + 'px'});}		    			   
			
		},40);		
						
		$(this).next('.layer_wrapping').show();
		$('.layer_wrapping.ajax').attr('tabindex', '0').focus();				
		
	});
		
	
	// layer page
	$(this).on('click', '.page_layer', function(e){
		e.preventDefault();		 		 			
		_this = $(this);				

		$('#wrap').after( layerMask );
		$('.layer_wrapping.page').attr('tabindex', '0').focus();
		$(this).next().show();
		_mask.open();
	
	 			
		var chk = 0;
		setTimeout(function(){						
			
			layerW = $('.layer_wrapping.page .layer_popup_wrap').outerWidth();
									
			$('.layer_wrapping.page').css({'margin-left': - ( layerW / 2 ) + 'px'});
			
					    			   				
			$('.layer_wrapping.page .layer > div').each(function(){
				temp = $(this).outerHeight();
											
				if (chk <= temp) {
					chk = temp;
				}
				
				if( windowH > (chk)) {				
					// $('.layer_wrapping.page').css({'margin-top': - (chk / 2) + 'px', 'height': chk + 'px'});
					$('.layer_wrapping.page').css({'margin-top': - (chk / 2) + 'px'});
					$('.layer_wrapping.page').removeClass('scroll' );
				} else {
					$('.layer_wrapping.page').removeClass('scroll');
					$('.layer_wrapping.page').css({'height': windowH + 'px', 'top': '100px', 'overflow': 'hidden', 'width' :(layerW + 17) + 'px'});
					$('.layer_wrapping.page .layer_content').css({'overflow': 'scroll', 'margin-right': '-17px', 'height' : (windowH - 120) + 'px'});}
			});
			
			$('.layer_wrapping.page .layer > div').eq(0).addClass('on');

		},10);	
								
	});
		
	 
	// layer close
	$(this).on('click', '.layer_wrapping .btn_close', function(e){
		e.preventDefault();
		
		if( $(this).parents('.layer_wrapping').hasClass('ajax') ){			
			_this.next().hide();
			$('.layer_wrapping.ajax').remove();			
		} else {
			 $(this).parents('.layer_wrapping').hide();
		}
		
		if (_this != undefined ) {
			_this.focus();
			_this = undefined;	
		}
				
		_mask.close();
	});
	
	
	// focus
	$(this).on('keydown', '.layer_wrapping a.btn_close', function(event){
		var isShift = window.event.shiftKey ? true : false;		
		
		if( !isShift && event.keyCode == 9){
			if ( $('.layer_popup_wrap .family_site').length > 0 ) {				
				$('.family_site a:first').focus();						
			}
						
			$('.layer_wrapping').attr('tabindex', '0').focus();				
			
		}				
	});
	
		
	$(this).on('keydown', '.layer_popup_wrap', function(event){
		var isShift = window.event.shiftKey ? true : false;		
		if( isShift && event.keyCode == 9){
			if ( $('.layer_popup_wrap .family_site').length > 0 ) {	
				setTimeout(function(){				
					$('.family_site a:last').focus();
				},15);				
			}
	
			setTimeout(function(){				
				$('.layer_wrapping a.btn_close').focus();
			},30);				

		}
	});
	
	// Scroll Table
	if( $('.table_wrap.scroll_table .div_scroll').length > 0 ){
		var elHeight = $('.table_wrap.scroll_table .div_scroll').outerHeight();
		var wrapHeight = $('.table_wrap.scroll_table .div_scroll').attr('style').substr(7,3);
		
		if (elHeight >= wrapHeight){
			$('.table_wrap.scroll_table').addClass('on');
		} else {
			$('.table_wrap.scroll_table').removeClass('on');
		}
	}
	
	
	//Tab Menu
	function tabMenu( $el ) {
	
		$('.tab_wrap > .tab_menu > li').find(' > a').removeAttr('title','현재페이지');
		$('.tab_wrap > .tab_menu > li.on').find(' > a').attr('title','현재페이지');
		
		var tabLength = $el.find('> .tab_menu > li').length,
			maxLength = 14;

		if ( tabLength <= maxLength ){			
			$el.find('> .tab_menu').addClass('col' + tabLength);
			$('.sub_menu.l > .tab_menu').removeClass('col' + tabLength);
			$('.sub_menu.r > .tab_menu').removeClass('col' + tabLength);
		}
	  
	}
	
	// DOM have Tabmenu
	if ( $('.tab_wrap').length > 0 ) {
		$('.tab_wrap').each(function( i, val ){
			tabMenu( $(this) );
		});
	}
	
	$(".navi_guide_wrap ul.hide > li.on").attr('title','현재단계');
	
	// Tab Show/Hide
	$(".displayTab li a").click(function(e){
		e.preventDefault();
		$(".displayTab li a").parent().removeClass("on").find(' > a').removeAttr('title','현재페이지');
		$(".tab_cont").hide();
		$(this).parent().addClass("on").find(' > a').attr('title','현재페이지');

		var index = $(this).parent().index();
		//alert(index);
		var selector = ".tabCont0" + (index+1);
		$(selector).show();
		
	});	

	// radio Show/Hide
	/* Mark Up Ex.
	 * <div class="dispGroup">
	 * 	<label class="" for="a"><input type="" name="same" id="a" checked="checked">A Type</label>
	 * 	<label class="" for="b"><input type="" name="same" id="b">B Type</label>
	 * </div>
	 * <div class="dispCont dispCont01">A Type's Contents : AAAAA</div>
	 * <div class="dispCont dispCont02">B Type's Contents : BBBBB</div>
	 */
	$(".dispCont").not(":first").hide();
	$(".dispGroup label").click(function(){
		var disLabel = $(".dispGroup label");
		$(disLabel).removeAttr('title','선택됨').find('>input').prop('checked','false').removeAttr('checked','checked');
		$(".dispCont").hide();
		$(this).attr('title','선택됨').find('>input').prop('checked','true').attr('checked','checked');
		//alert(this);
		var index = $(this).find('>input').parent().index();
			//alert(index);
			var dispConts=".dispCont0"+(index+1);
			//alert(dispConts);
			$(dispConts).show();
	});
	
	// 클릭이벤트 on/off 상태
	$(".toggle").on("click",function(){
		if( $(this).is(".on") ){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
	
	$('.custom_design_wrap .design_select .custom_select_val').on('click', function(e){
		e.preventDefault();
		if( !$('.custom_design_wrap .select_menu_wrap').hasClass('on') ){
			$('.custom_design_wrap .select_menu_wrap').addClass('on');			
		} else {
			$('.custom_design_wrap .select_menu_wrap').removeClass('on');
		}
		
	});
	
	$('.custom_design_wrap .select_menu li a').on('click', function(e){		
		e.preventDefault();
		 
		var $account,
			$account_name;		
			$account 	  = $(this).find('.account').text();
			$account_name = $(this).find('.account_name').text();
			
		$('.custom_design_wrap .custom_select_val .account').text( $account );
		$('.custom_design_wrap .custom_select_val .account_name').text( $account_name );		
			$('.custom_design_wrap .select_menu_wrap').removeClass('on');
	});
	
});


$(window).load(function(){
	// var $easing = 'easeInOutQuad';
	
	//fund 검색 높이 영역 조절을 위한 스크립트
	$(".fin_search_wrap").each(function(){
		var fundSearchInit = $(this).find("fieldset > .btn").text();
		if( fundSearchInit == "초기화" ){
			$(this).css({
				"min-height" : 70
			});
		}
	});
	
	if( $("#wrap").is(".myasset") ){
		
		setTimeout(function(){
			var spotTableH = $(".risk_total").height();
			
			$(".myasset .risk_total .spot").css({
				"height" : spotTableH-1
			});
		},700);
		
	}
	
	if( $(".col_type").find("tbody").length > 1 ){
		//$(".col_type").addClass("mult_body");
		
	}
	
	/*setTimeout(function(){
		if( $('div.free span').hasClass('label_free') ){
			$('div.free').css("hasFree");
		}	
	},1000);*/
	

});
