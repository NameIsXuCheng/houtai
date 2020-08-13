/** js library **/
var popupManager_param = {
	url 	: "",
	width 	: "",
	height 	: "",
	isModal : "",
	isAppend: false,
	level	: "2"
};

/**
 * 레이어 팝업 매니져
 * @returns {PopupManager}
 */
function PopupManager()
{
	// HTML 보이기
	this.showHTML = function(url, width, height, isModal, id){
		popupManager_param.isAppend = false;
		
		var popupHtmlDiv1  	= $("#popupHtmlDiv1");
		var p_popupHtmlDiv1 = $("#popupHtmlDiv1");
		try{
			p_popupHtmlDiv1 = $("#popupHtmlDiv1", parent.document);
		}catch(e){}
		
		if( isNull(popupHtmlDiv1) && isNull(p_popupHtmlDiv1) ){
			if(isModal) screenModal(true);
			
			//** 팝업이 하나도 존재하지 않는경우 레이어영역을 생성후 팝업 호출 **/
			var popLayerHtml = "<div id='popupHtmlDiv1' name='popupHtmlDiv1' align='center' style='display:none;visibility:hidden;z-index: 1002;overflow-y:auto;'></div>";
			if(!isNull(id))	$("#"+id).closest("div").after(popLayerHtml);
			else			$("body").prepend(popLayerHtml);
			showHTMLPopFunc(url, width, height);
		}else{
			//** 팝업이 존재하는경우 showAppendHTMLPop 호출 **//
			this.showAppendHTMLPop(url, width, height, isModal, "2", id);
		}
	};
	
	// HTML 감추기
	this.hideHTML = function(level){
		var popupHtmlAppend = $("#popupHtmlDiv2", parent.document);
		if(!isNull(popupHtmlAppend)){
			if(isNull(level)) level = "2";
			this.hideAppendHTML(level);
			return;
		}

		var popupHtml = $("#popupHtmlDiv1", parent.document);
		if(!isNull(popupHtml)){
			screenModal(false);
			
			if( navigator.appVersion.indexOf("Chrome") > -1 ){ //크롬일경우
				$("body",parent.document).css({overflow:"auto"}).attr("scroll","yes").scrollTop(0).find(".a_tag_ck").focus();
			} else {
				$("body",parent.document).css({overflow:"auto"}).attr("scroll","yes").find(".a_tag_ck").focus();
			}
			
			$(popupHtml).remove();
		}else{
			//자기 자신페이지에서 호출할경우
			var popupHtml = $("#popupHtmlDiv1");
			if(!isNull(popupHtml)){
				screenModal(false);
				
				if( navigator.appVersion.indexOf("Chrome") > -1 ){ //크롬일경우
					$("body").css({overflow:"auto"}).attr("scroll","yes").scrollTop(0).find(".a_tag_ck").focus();
				} else {
					$("body").css({overflow:"auto"}).attr("scroll","yes").find(".a_tag_ck").focus();
				}
				
				$(popupHtml).remove();
			}
		}
	};

	// HTML 보이기
	this.showAppendHTMLPop = function(url, width, height, isModal, level, id){
		popupManager_param.isAppend = true;
		if(isNull(level)) level = "2";
		if(isModal) {
			var sZindex = Number($("#screenMask",parent.document).css("z-index")) + 2;
			$("#screenMask", parent.document).css("z-index",sZindex);
		}
		var popupHtmlID 	= "popupHtmlDiv"+level;
		var iZindex 		= Number($("#popupHtmlDiv1",parent.document).css("z-index")) + (2*Number(level)-1);
		var p_popupHtmlDiv 	= $("#"+popupHtmlID, parent.document);
		if( isNull(p_popupHtmlDiv) ){
			var popLayerHtml = "<div id='"+popupHtmlID+"' name='"+popupHtmlID+"' align='center' style='display:none;visibility:hidden;z-index: "+iZindex+";overflow-y:auto;'></div>";
			if(!isNull(id)) $("#"+id).closest("div").after(popLayerHtml);
			else			$("body", parent.document).prepend(popLayerHtml);
		}
		showHTMLPopFunc(url, width, height, level);
	};

	// HTML 감추기
	this.hideAppendHTML = function(level){
		if(isNull(level)) level = "2";
		var modalChk = isNull($("#screenMask",parent.document));
		if(!modalChk){
			var iZindex = Number($("#screenMask",parent.document).css("z-index")) - 2;
			$("#screenMask",parent.document).css("z-index",iZindex);
		}
		var popupHtml = $("#popupHtmlDiv"+level, parent.document);
		if(!isNull(popupHtml)){
			// $("#popupHtmlDiv"+Number(level)-1,parent.document).css({overflow:"auto",margin:"0 0 0 0px"}).attr("scroll","yes");
			$("#popupHtmlDiv"+Number(level)-1,parent.document).css({margin:"0"});
			$("#popIframe"+Number(level)-1,parent.document).contents().find(".a_tag_ck").focus();
			$(popupHtml).remove();
		}
	};
}

/**
 * 레이어 팝업 컨트롤러
 * @param url
 * @param width
 * @param height
 * @param level
 */
function showHTMLPopFunc(url, width, height, level){
	if(isNull(level)) level = "2";
	var popupHtml = null;
	var iframeId  = "";
	if(popupManager_param.isAppend){
		popupHtml = parent.document.getElementById("popupHtmlDiv"+level);
		iframeId  = "popIframe"+level;
	}else{
		popupHtml = document.getElementById("popupHtmlDiv1");
		iframeId  = "popIframe";
	}
	
	var pIframe;
	pIframe = parent.document.createElement("iframe");
	pIframe.setAttribute("id" 					, iframeId	);
	pIframe.setAttribute("name" 				, iframeId	);
	pIframe.setAttribute("frameBorder"			, 0			);
	pIframe.setAttribute("tabindex"				, 0			);
	pIframe.setAttribute("scrolling"			, "no"		);
	pIframe.setAttribute("allowTransparency"	, true		);
	pIframe.setAttribute("width"				, width		);
	pIframe.setAttribute("height"				, height	);
	pIframe.src = url;

	popupHtml.innerHTML = "";
	popupHtml.appendChild(pIframe);

	getDocumentSize();
	getScrollXY();
	
	$(popupHtml).css({position:"fixed",left:"0",top:"0",width:"100%",height:"100%",overflow:"auto"});
	/* $(popupHtml).css({position:"absolute",left:"0",top:"0",width:"100%"}); */
	if(myHeight <= height){
		$(popupHtml).children("iframe").css({margin:"0 auto"});
	}else{
		var top = (myHeight - height)/2;
		$(popupHtml).children("iframe").css({margin:top+"px auto 0"});
	}
	popupHtml.style.visibility	= "visible";
	popupHtml.style.display		= "block";
	
	if( navigator.appVersion.indexOf("Chrome") > -1 ){ //크롬일경우
		$("body").css({overflow:"hidden"}).attr("scroll","no").scrollTop(0);
	} else {
		$("body").css({overflow:"hidden"}).attr("scroll","no");
	}
	 
	
	
	//** 포커스 컨트롤 By.Lim Su Suk**//
	frameFocusCtrl($(popupHtml), $("#"+iframeId));
}

/**
 * focus Controller
 */
function frameFocusCtrl(popupObj, iframeObj){
	//layer popup 마지막에 포커스를 체크하기 위한 Tag
	$(popupObj).append("<span class='layerLastFocus' tabindex='0'></span>'");
	
	$(iframeObj).focus();
	$(iframeObj).focus(function(){
		try{console.log("popIframe");}catch(e){}
	});
	
	$("body", $(iframeObj)).focusin(function(){			
		try{console.log("popIframe body");}catch(e){}
	});
	
	$("span.layerLastFocus", $(popupObj)).focusin(function(){			
		try{console.log(popupObj.attr("id")+" span.layerLastFocus");}catch(e){}
		$(iframeObj).focus();
	});
}

/**
 * popup BODY resize
 */
function resizeCheckPop(params){
	var params = jQuery.extend({
		divObj	: "div.layer_popup_wrap",
		level	: "2",
		isWidth	: true
	}, params);
	var level 		= params.level;
	var orgheight 	= 0;
	var orgwidth  	= 0;
	var popIframe		= $("#popIframe"		,parent.document).contents().find("body").html();
	var appendPopIframe = $("#popIframe"+level	,parent.document).contents().find("body").html();
	if( !isNull(popIframe) || !isNull(appendPopIframe)){
		getDocumentSize();
		getScrollXY();
		if(!isNull(appendPopIframe)){
			var relativePopIframe = $("#popIframe"+level,parent.document).contents().find("body").html();
			$(relativePopIframe).contents().find("div:eq(0)").css({position: "relative !",left:" 0 ",top:" 0 "});
			
			var popIframe 	= $(params.divObj); //클래스가 있을경우를 우선으로
			var view_div 	= div_visiable(popIframe);
			orgheight 	= $(view_div).height();
			orgwidth 	= $(view_div).width();
			
			if( orgheight == null ){//layer_popup_wrap 클래스가 없을경우
				view_div 	= div_visiable($("div:eq(0)"));
				orgheight 	= $(view_div).height();
				orgwidth 	= $(view_div).width();
			}
			
			var topVal 	= scrOfY + (screen.availHeight - (orgheight + 140))/2;
			if(topVal < 0) topVal = 50;

			if(params.isWidth)	$("#popIframe"+level,parent.document).css({margin: topVal+"px auto 0",height:orgheight+10,width:orgwidth,opacity:""});
			else				$("#popIframe"+level,parent.document).css({margin: topVal+"px auto 0",height:orgheight+10,opacity:""});
		} else {
			var popIframe = $(params.divObj); //클래스가 있을경우를 우선으로
			$(popIframe).contents().find("div:eq(0)").css({position: "relative !",left:" 0 ",top:" 0 "});
			var view_div = div_visiable(popIframe);
			orgheight 	= $(view_div).height();
			orgwidth 	= $(view_div).width();

			if( orgheight == null ){//layer_popup_wrap 클래스가 없을경우
				view_div 	= div_visiable($("div:eq(0)"));
				orgheight 	= $(view_div).height();
				orgwidth 	= $(view_div).width();
			}
			var topVal 	= scrOfY + (screen.availHeight - (orgheight + 140))/2;
			if(topVal < 0) topVal = 50;

			if(params.isWidth)	$("#popIframe",parent.document).css({margin: topVal+"px auto 0",height:orgheight+10,width:orgwidth,opacity:""});
			else				$("#popIframe",parent.document).css({margin: topVal+"px auto 0",height:orgheight+10,opacity:""});
		}
	}
}

//활성화된 영역 리턴
function div_visiable( div_obj ){
	var obj = "";
	if( $(div_obj).length > 1 ) {
		$(div_obj).each(function (){
			if( $(this).css("display")=="block" ){
				obj = $(this) ;
				return false;
			}
		});
	} else {
		obj = div_obj;
	}
	return obj;
}


/**
 * 화면에 Modal Mask 생성
 * @param flag (true : 생성, false : 삭제)
 */
function screenModal(flag) { // 지정한 색깔로 모달창 띄움
	/*
	if($("#screenMask").length == 0) {
		$("body").prepend("<div id='screenMask' style='display:none;'></div>");
		$('#screenMask').css('position'		, 'absolute'			);
		$("#screenMask").css('background'	, '#000'				);
		$("#screenMask").css('opacity'		, '0.7'					);
		$("#screenMask").css('left'			, '0'					);
		$("#screenMask").css('top'			, '0'					);
		$("#screenMask").css('width'		, '100%'				);
		$("#screenMask").css('height'		, $(document).height()	);
		$("#screenMask").css('z-index'		, '1001'				);
	}
	
	//스크롤을 움직인 상태에서 팝업 호출시 스크린마스크 Top 위치 변경
	if( navigator.appVersion.indexOf("Chrome") == -1 ){ //크롬이 아닐경우
		var pos = $(window).scrollTop();
		if(Number(pos) > 0) $("#screenMask").css('top', pos+"px");
	}
	*/
	
	if($("#screenMask").length == 0) {
		$("body").prepend("<div id='screenMask' style='display:none;'></div>");
		$('#screenMask').css({'position':'fixed', 'background':'#000', 'opacity':'0.7', 'left':'0', 'top':'0', 'width':'100%', 'height': $(document).height(),'z-index':'1001'});
	}
	
	if(flag == true) {
		// $("#screenMask",document).css({"visibility":"visible"});
		$("#screenMask",document).css({"display":"block"});
		$("#screenMask",document).show();
	} else {
		// $("#screenMask",parent.document).css({"visibility":"hidden"})
		$("#screenMask",parent.document).css({"display":"none"});
		$("#screenMask",document).css({"display":"none"});
		$("#screenMask",document).hide();
	}
}

/**
*	팝업 생성
*	생성할 url, width, height
*	팝업창에서 닫기 누를때 screenModal(false) 호출 해주세요.
*/
function showCommonPopup(url, width, height, id){
	var popup = new PopupManager();
	popup.showHTML(url, width, height, true, id);
}

/**
 * 팝업 닫기
 */
function closeCommonPopup(){
	var popup = new PopupManager();
	popup.hideHTML();
}

/**
* NullCheck
*/
function isNull(data){
	if(data == null || data == "null" || data == "" || typeof(data) == 'undefined' || data.length == 0) return true;
	return false;
}