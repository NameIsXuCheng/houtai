/**
* @desc 브라우저의 종류 및 IE의 경우 버전까지 체크해주는 함수.
*
* @method browserCheck
* @param {Boolean} compatibilityView, 호환성보기 사용 여부
* @param {Boolean} returnText, 현재 브라우저 명을 반환할 것인지 여부
* @return {String} return_text 변수를 반환하며 returnText 매개변수의 여부에 따라 출력하지 않을 수 있다.

*/

window.browserCheck = function (compatibilityView, returnText) {
	'use strict';
	var _ua, trident, rv, css_class, return_text;
	_ua = navigator.userAgent.toLowerCase();
	trident = _ua.match(/trident\/(\d.\d)/i) || _ua.match(/rv:(\d.\d)/i);
	rv = -1;
	css_class = '';
	return_text = '';

	if ( compatibilityView === undefined || trident === null ) compatibilityView = false;

	if ( compatibilityView && trident != null ) {
			//IE 11,10,9,8
    	switch (trident[1]) {
    		case '7.0': css_class = "ie11 msie";
    		break;
    		case '6.0': css_class = "ie10 msie";
    		break;
    		case '5.0': css_class = "ie9 msie";
    		break;
    		case '4.0': css_class = "ie8 msie";
    		break;
    		default: css_class = "ie7 msie";
    	}
	}
	else
	{
		if ( _ua.indexOf('msie 7') != -1 ) css_class = 'ie7 msie';
		else if ( _ua.indexOf('msie 8') != -1 ) css_class = 'ie8 msie';
		else if ( _ua.indexOf('msie 9') != -1 ) css_class = 'ie9 msie';
		else if ( _ua.indexOf('msie 10') != -1 ) css_class = 'ie10 msie';
		else if (_ua.indexOf('msie') == -1 && trident && trident[1] == '7.0' ) css_class = 'ie11 msie';
	}

    //other
    if (_ua.indexOf("safari") != -1 && _ua.indexOf('version') != -1) css_class = 'safari';
    else if (_ua.indexOf("chrome") != -1 && _ua.indexOf("opr") == -1) css_class = 'chrome';
    else if (_ua.indexOf("opera") != -1 || _ua.indexOf("opr") != -1 || _ua.indexOf("opera") != -1) css_class = 'opera';
    else if (_ua.indexOf("firefox") != -1) css_class = 'firefox';


    if ( document.body.className.length >= 1 ) {
    	document.body.className += ' '+css_class;
    } else {
    	document.body.className += css_class;	}
    
    
};

//$('body.ie*').addClass('msIE');

$(window).load(function(){
	browserCheck();	
});


$(function(){
	//Table Summary // caption
	/* table에 data-th-collect="false" 속성을 적용하면 th에 있는 텍스트를 수집하지 않음 : th의 수집정보로 summary의 내용을 자동으로 구성하지 않도록 하고 싶을때 적용 */
	var c = addTableCaption('table');
	
	function addTableCaption ( table ) {
	
		var thStr = '',
			htmlDoctype = doctypeCheck();
	
		function doctypeCheck () {
			var doctype = document.doctype,
				htmlVersion = '';
	
			if ( doctype ) {
				var v = doctype.publicId;
	
				if ( !v ) htmlVersion = '5';
				else if ( v.indexOf('HTML 4.01') > -1) htmlVersion = '4.01';
				else if ( v.indexOf('XHTML 1.0') > -1 ) htmlVersion = 'XHTML 1.0';
				else if ( v.indexOf('XHTML 1.1') > -1 ) htmlVersion = 'XHTML 1.1';
			} else {
				htmlVersion = 'Quirks mode';
			}
			return htmlVersion;
		}
	
		$(table).each(function( idx, value ){
			
			if ( $(value).data('th-collect') !== false ) {
				thStr = '';
				for( var i=0; i<$(value).find('th').length; i+=1 ) {
					if ( $(value).find(' > * > * > th').eq(i).text() !== '' ) {
						thStr += $(value).find(' > * > * > th').eq(i).text() + ', ';
					}
				}
				thStr = thStr.slice(0, thStr.length-2);
				if ( htmlDoctype !== '5' ) {
					$(value).attr('summary', thStr + '로 구성된 표 입니다.' );
				} else if ( htmlDoctype === '5' ) {
					$(value).find(' > caption > p').text( thStr + '에 대한 표 입니다.' );
				}
			}
	
		});
	
	}
});