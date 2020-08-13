/**
 *
 */
//-- CCMEDIA Ad-Nibbler Tag Service 1.0
//-- Copyright 2006 CCMEDIA, All Rights Reserved.
// util start

var _BT_SVR = "http://weblog.miraeassetdaewoo.com";
var _BTCC = "dev.miraeassetdaewoo.com";
var _BT_TRK= "/include/tag.jsp";
var _UD='undefined';
var _UN='unknown';
var _BT_wepa_temp = '';

function _IDV(a){return (typeof a!=_UD)?1:0}
if(!_IDV(_ctid)) var _ctid='';
if(!_IDV(_urid)) var _urid='';
if(!_IDV(_imid)) var _imid='';
if(!_IDV(_gset)) var _gset='';

if(!_IDV(_fdcd)) var _fdcd='';
if(!_IDV(_itcd)) var _itcd='';

if(!_IDV(_ll)) var _ll='';
if(!_IDV(_ag)) var _ag=0;
if(!_IDV(_id)) var _id='' ;
if(!_IDV(_mr)) var _mr = _UN;
if(!_IDV(_gd)) var _gd=_UN;
if(!_IDV(_jn)) var _jn='';
if(!_IDV(_jid)) var _jid='';
if(!_IDV(_skey)) var _skey='';
if(!_IDV(_ud1)) var _ud1='';
if(!_IDV(_ud2)) var _ud2='';
if(!_IDV(_ud3)) var _ud3='';

// 개인화 관련 추가 시작.
if(!_IDV(_m)) var _m='';
if(!_IDV(_z)) var _z='';
if(!_IDV(_s)) var _s='';
if(!_IDV(_t)) var _t='';
if(!_IDV(_c)) var _c='';
if(!_IDV(_c)) var _c='';
if(!_IDV(_wepa1)) var _wepa1='';
// 개인화 관련 추가 종료.

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "ko";
}

function _bt_run_track ( ) {
    var _BT_target = _BT_get_simple_tag () ;
    var img = new Image ();
    img.src = _BT_target;
    img.onload = function () { return;};

    if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_target);

}

function _BT_getref () {
    var v_ref = document.referrer;
    if( (v_ref=='undefined')||( v_ref == '' )) {
        eval(" try{ v_ref = parent.document.referrer ;}catch( _error){ v_ref = '';}");
    }
    return v_ref;
}

function _BT_getcurtime () {
    var sdate = new Date();
    var iday = sdate.getDay();
    var imon = sdate.getMonth() + 1;
    var iyea = sdate.getFullYear();
    var ihour = sdate.getHours ();
    var imin = sdate.getMinutes ();
    var isec = sdate.getSeconds ();
    var szret;
    if(iday < 10) iday = '0' + iday;
    if(imon < 10) imon = '0' + imon;
    szret = iyea + "" + imon + "" + iday + (( ihour < 10) ? "0" : "" )  + ihour + (( imin < 10) ? "0" : "" ) + imin + (( isec < 10) ? "0" : "" ) + isec;
    return szret;
}

function _BT_get_simple_call( tab ) {

	if (typeof(_BT_get_simple_inline)!='undefined') {
		_BT_get_simple_inline( _BTCC, tab );
	}

}

function _BT_get_simple_inline ( uid, tab ) {
    var _BT_dim= "&tagtype=1&scr=" + window.screen.width+'x'+window.screen.height;
    var _BT_ref = _BT_getref ();
    var _BT_time = _BT_getcurtime();
    var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + "&_BT_tab=" + tab
                    +  "&url=" + escape(document.location) + _BT_dim + "&ref=" + escape ( _BT_ref )
                    ;
    var img = new Image ();
    img.src = _BT_ret;
    img.onload = function () { return;};

}

function _BT_get_simple_tag () {

    var _BT_dim= "&tagtype=1&scr=" + window.screen.width+'x'+window.screen.height;
    var _BT_query= "&ctid="+_ctid+"&member_key="+_id;
    //var _BT_query= "&ctid="+_ctid+"&member_key="+_id+"&fdcd="+_fdcd+"&itcd="+_itcd;
    var _BT_wepa="&"+_BT_wepa_temp;
	//var _BT_wepa="&_wepa_=&m="+_m+"&z="+_z+"&s="+_s+"&t="+_t+"&c="+_c+"&cmd="+_cmd;
    //var _BT_query= "&ctid="+_ctid+"&urid="+_urid+"&member_key="+_id+"&jid="+_jid+"&udf1="+_ud1+"&udf2="+_ud2+"&udf3="+_ud3;
    //var _BT_query= "&ctid="+_ctid+"&urid="+_urid+"&imid="+_imid+"&gset="+_gset+"&age="+_ag+"&member_key="+_id+"&marry="+_mr+"&gender="+_gd+"&join="+_jn+"&jid="+_jid+"&udf1="+_ud1+"&udf2="+_ud2+"&udf3="+_ud3+"&";
    var _BT_ref = _BT_getref ();
    var _BT_time = _BT_getcurtime();

	var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + _BT_dim + _BT_query + _BT_wepa  + "&ref=" + escape ( _BT_ref ) + "&url=" + escape(document.location);

    return _BT_ret;

}

/**
 * Form 객체로 부터 Query Url 생성
 */
function _BT_get(formId){

     var hmap = new Array();
   var retUrl = '';
   var type;

   var fnode = document.getElementsByName(formId)[0];


   var tagList = ['input', 'select', 'textarea'];
   for (var tagIdx = 0; tagIdx < tagList.length; tagIdx++){

       var childList = fnode.getElementsByTagName(tagList[tagIdx]);


       for (var idx=0; idx<childList.length; idx++ ){
             var childElement = childList.item(idx);

             try {
                    var type = null;
                    //         브라우져 별 parsing
                    var agent = navigator.userAgent.toLowerCase();
                    if (agent.indexOf("chrome") != -1
                                         || agent.indexOf("firefox") != -1
                                         || agent.indexOf("safari") != -1){
                              type = childElement.attributes.item('type').nodeValue;
                    }else if (agent.indexOf("msie") != -1){
                              type = childElement.attributes.getNamedItem('type').nodeValue;
                    }else {
                        //  브라우저 유형이 어느 것에도 속하지 않는 경우, IE로 간주하여  설정
                        if (childElement.attributes.getNamedItem('type')){
                              type = childElement.attributes.getNamedItem('type').nodeValue;
                        }
                    }


                    if (childElement.nodeName.toLocaleLowerCase() == 'input'){

                              if (type.toLowerCase() == 'text'){
                                  if(childElement.value != '') {
                                        hmap.push(childElement.name + '=' + 'Y');
                                  } else {
                                        hmap.push(childElement.name + '=');
                                  }
                              }else if (type.toLowerCase() == 'password'){
                                  if(childElement.value != '') {
                                        hmap.push(childElement.name + '=' + 'Y');
                                  } else {
                                        hmap.push(childElement.name + '=');
                                  }
                              }else if ((type.toLowerCase() == 'checkbox' || type.toLowerCase() == 'radio')

                                                    && childElement.checked){

                                  if(childElement.value != '') {
                                        hmap.push(childElement.name + '=' + 'Y');
                                  } else {
                                        hmap.push(childElement.name + '=');
                                  }

                              }else if (type.toLowerCase() == 'hidden'){
                                         if ( typeof(_BT_TRACK_HIDDEN_) =="undefined" ||   _BT_TRACK_HIDDEN_  == false )  continue;
                                         if(childElement.value != '') {
                                                hmap.push(childElement.name + '=' + 'Y');
                                          } else {
                                                hmap.push(childElement.name + '=');
                                          }

                              }

                    }else if (childElement.nodeName.toLocaleLowerCase() == 'select'){
                             if(childElement.value != '') {
                                    hmap.push(childElement.name + '=' + 'Y');
                              } else {
                                    hmap.push(childElement.name + '=');
                              }


                    }else if (childElement.nodeName.toLocaleLowerCase() == 'textarea'){
                              if(childElement.value != '') {
                                    hmap.push(childElement.name + '=' + 'Y');
                              } else {
                                    hmap.push(childElement.name + '=');
                              }
                    }

             }
             catch ( _e ) {

             }
       }

   }

    for (var idx=0; idx < hmap.length; idx++){
        retUrl += hmap[idx];
        if (idx < hmap.length - 1)
            retUrl += '&';
    }
    return retUrl;
}

function _bt_uinfo () {
    var _f;

    var szret = "";

    try {

        // ccmedia service.
        _BT_TRACK_FORM_ = "all";

        if ( typeof(_BT_TRACK_FORM_) =="undefined" ||  _BT_TRACK_FORM_ == "" )  return;

        szret = "tagtype=2&";

        if ( _BT_TRACK_FORM_ == "all" ) {

            // step1.  make hash for whole forms.
            var formList = document.forms;
            for (var idx=0; idx<formList.length; idx++){
                var form = formList[idx];
                szret = szret + _BT_get(form.name) +"&";
            }
        }
        else {
            szret += _BT_get ( _BT_TRACK_FORM_ );
        }
        var _BT_target =  _BT_TRK + "?" + szret;
        var imgu = new Image ();
        imgu.src = _BT_target;
        imgu.onload = function () { return;};
        if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_target);
    }
    catch(_e){

        // alert ( _e );
    };
}



