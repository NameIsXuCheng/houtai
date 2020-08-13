//*******************************************************
// LOADING Controller
//*******************************************************

//Load Event
$(function(){
	var loadingHtmlDiv = $("#loading");
	if( isCommonNull(loadingHtmlDiv) ){
		$("body").prepend(loadingLayoutMarkup());
	}	
});

function loadingLayoutMarkup(){
	var loadLayerHtml = "";
	loadLayerHtml += "<div id='loading' name='loading' style='position:fixed;left:50%;top:50%;margin:0px; width:80px; height:80px; z-index: 1099;visibility:visible;display:none;'>";
	loadLayerHtml += "	<p id='loadingImg'><img src='"+image_server+"/common/Loding.gif' alt='�ε���'/></p>";
	loadLayerHtml += "</div>";
	loadLayerHtml += "<div id='loadingEmpty' name='loadingEmpty' style='position:fixed;width:100%;height:100%;left:0;top:0;background:#fff;visibility:hidden;display:none;filter:alpha(opacity=30);-moz-opacity:0.3;-khtml-opacity:0.3;opacity:0.3;z-index: 1098;'></div>";
	return loadLayerHtml;
}

function shoLoadingWait(){
	setTimeout("showLoading()",1000);
}

//** �ε��� Ȱ��ȭ - ����, �˾� �б�ó�� **//
function showLoading(){
	var popupHtmlDiv1  	= $("#popupHtmlDiv1");
	var p_popupHtmlDiv1 = $("#popupHtmlDiv1", parent.document);
	//screenModal(true);
	if( isCommonNull(popupHtmlDiv1) && isCommonNull(p_popupHtmlDiv1) ){
		showLoadingMain();
	} else {
		showLoadingPop();
	}
}

//** �ε��� Ȱ��ȭ - ���� **//
function showLoadingMain(){
	$("#loading"		).show().css("visibility", "visible");
	$("#loadingEmpty"	).show().css("visibility", "visible");
	//$("body").css({margin:"0px",overflow:"hidden"}).attr("scroll","no");
}

//** �ε��� Ȱ��ȭ - �˾�  **//
function showLoadingPop(){
	$("#loading"		,parent.document).show().css("visibility", "visible");
	$("#loadingEmpty"	,parent.document).show().css("visibility", "visible");
	//$("body" ,parent.document).css({margin:"0px",overflow:"hidden"}).attr("scroll","no");
}

//** �ε��� ��Ȱ��ȭ - ����, �˾� �б�ó�� **//
function hideLoading(){
	var popupHtmlDiv1  	= $("#popupHtmlDiv1");
	var p_popupHtmlDiv1 = $("#popupHtmlDiv1", parent.document);
	//screenModal(false);
	if( isCommonNull(popupHtmlDiv1) && isCommonNull(p_popupHtmlDiv1) ){
		hideLoadingMain();
	} else {
		hideLoadingPop();
	}
}

//** �ε��� ��Ȱ��ȭ - ���� **//
function hideLoadingMain(){
	var loadingDiv = $("#loading");
	if( !isCommonNull(loadingDiv)){
		$("#loading"		).hide().css("visibility", "hidden");
		$("#loadingEmpty"	).hide().css("visibility", "hidden");
		//$("body").css({margin:"0 0 0 0px",overflow:"auto"}).attr("scroll","yes");
	}
}

//** �ε��� ��Ȱ��ȭ - �˾� **//
function hideLoadingPop(){
	var loadingDiv = $("#loading", parent.document);
	if( !isCommonNull(loadingDiv)){
		$("#loading"		,parent.document).hide().css("visibility", "hidden");
		$("#loadingEmpty"	,parent.document).hide().css("visibility", "hidden");
	}
}