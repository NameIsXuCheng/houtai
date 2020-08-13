/**
 * MIRAE AJAX 
 * 미래에셋대우 홈페이지 Ajax 호출 공통 함수
 * @author 김대원
 * @update 2016/08/01 By Min
 * 파라미터 :	URL, DATA 는 필수, 나머지는 미설정시 default 적용
 *		(필수)	[optUrl        ] - 서버측 호출 URL
 *		(필수)	[optData       ] - 파라미터 객체. 폼객체를 넘겨도 되고 데이타 인코딩되어 있는 객체도 됨
 *				[optType       ] - 전송타입 (Def : POST)
 *				[optDataType   ] - 리턴 데이터 타입 (Def : json)
 *				[optTimeout    ] - 전송시간 (Def : 10000)
 *				[optSuccess    ] - 성공시 함수
 *				[optError      ] - 에러시 함수
 *				[optLoad       ] - 로딩화면 출력 여부 (Def : true)
 *				[optAsync      ] - 비동기여부 (Def : true)
 *				[optSecure     ] - 보안적용여부(Def : false)
 *				[optErrChk     ] - 에러체크여부(Def : false)
 *				[optretDataType] - 보안적용시 실제 리턴데이터 타입과 다른타입의 리턴타입이 지정됨에 따른 실제 데이터 타입
 *				[optSign	   ] - 공인인증적용여부
 *				[optDebug	   ] - 로그출력여부
 */


;(function($){
	$.callajax = function(options){
		var opts = $.extend({}, $.callajax.defaults, options);
		return doCallajax(opts);
	};
	
	function doCallajax(opts){
		var _lcOpts = {
			optUrl			: opts.url,
			optData			: opts.data,
			optType			: opts.type,
			optDataType		: opts.dataType,
			optTimeout		: opts.timeout,
			optSuccess		: opts.success,
			optError		: opts.error,
			optLoad			: opts.load,
			optAsync		: opts.async,
			optSecure		: opts.secure,
			optErrChk		: opts.errchk,
			optSign			: opts.sign,
			optDebug		: opts.debug
		};

		//** 기존 DataType은 optretDataType 에 저장 하고 Secure적용시 리턴받는 데이터타입이 변경 될경우를 대비 **//
		_lcOpts.optretDataType = opts.dataType.toLowerCase();
		
		//** 공인인증적용여부 판별하여 공인인증 호출 **//
		if(_lcOpts.optSign){
			var cert = new Cert();
			cert.signTrade(_lcOpts.optData,_lcOpts.optData.sessionDN,_lcOpts.optData.sessionEF,function(ret){
	            if(ret){
	            	return ajaxCall(_lcOpts);
	            }
			});
		}else{
			return ajaxCall(_lcOpts);
		}
	};
	
	$.callajax.defaults = {
		url			: "",
		data		: "",
		type		: "POST",
		dataType	: "json",
		timeout		: 100000,
		success		: "",
		error		: defaultErrorMsg,
		load		: true,
		async		: true,
		secure		: false,
		errchk		: false,
		retDataType : "",
		debug		: false				
	};
	
	$.ajaxMultiProcDef = {
		callUrls 	: [],			//호출URL(비교용)
		callback	: function(){},	//호출 완료후 Callback
		compCnt		: 0,			//완료카운트
		isErrAlert	: true,			//오류메시지 표현여부
		isPushMsg	: false,		//오류메시지 입력여부( true인경우 화면에서 별도로 입력해야함)
		errMsg		: ""			//오류메시지
	};
	
	/** 병렬처리시 에러메시지 컨트롤을 위한 변수 선언 **/
	$.ajaxMultiProc = $.ajaxMultiProcDef;
	
	/** 에러프로세스 변수 초기화 **/
	$.initAjaxMultiProc = function(options) {
		if(typeof(options.callback) != "undefined"){
			if(typeof(options.callback) == "string"){
				options["callback"] = eval("("+options.callback+")"); //toObject
			}
		}
		$.ajaxMultiProc = $.extend({}, $.ajaxMultiProcDef, options);
		return this;
	};
})(jQuery);
 
//** Error 메시지 푸쉬 **//
function pushErrMsg(msg, cType){
	if(!isCommonNull(msg)){
		//공통에서 에러메시지 입력시 각화면에서 입력되는 Pushmsg를 받지 않기 위해서 
		if(!$.ajaxMultiProc.isPushMsg && (isCommonNull(cType) || "ajaxCommon" != cType)) return;
		$.ajaxMultiProc.errMsg += (isCommonNull($.ajaxMultiProc.errMsg)?"":"\n") + msg;
	}		
}
//** 병렬처리 완료시 프로세스  **//
function ajaxMultiProcComplet(){
	//병렬처리 URL이 존재할경우 + 병렬처리시 완료카운드와 콜되는 카운트가 같을경우 처리
	if(	$.ajaxMultiProc.callUrls.length > 0 && ($.ajaxMultiProc.callUrls.length == $.ajaxMultiProc.compCnt)){

		$.ajaxMultiProc.compCnt = 0; //완료 카운트 초기화
		
		//로딩바를 없애준다 
		try{ hideLoading(); }catch(e){ try{ parent.hideLoading(); } catch(e) {}; }
		
		//에러가 발생하여 메시지가 입력된경우 Alert
		if(!isCommonNull($.ajaxMultiProc.errMsg)){
			if($.ajaxMultiProc.isErrAlert){ showMsg($.ajaxMultiProc.errMsg); }
			$.ajaxMultiProc.errMsg = ""; //메시지 초기화
		}
		$.ajaxMultiProc.callback(); //콜백처리
	};
}

/**
*  Ajax 전송 함수
*/
function ajaxCall(lcOpts){
	var optUrl			=	lcOpts.optUrl;
	var optData			=	lcOpts.optData;
	var optType			=	lcOpts.optType;
	var optDataType		=	lcOpts.optDataType;
	var optTimeout		=	lcOpts.optTimeout;
	var optSuccess		=	lcOpts.optSuccess;
	var optError		=	lcOpts.optError;
	var optLoad			=	lcOpts.optLoad;
	var optAsync		=	lcOpts.optAsync;
	var optSecure		=	lcOpts.optSecure;
	var optErrChk		=	lcOpts.optErrChk;
	var optretDataType	=	lcOpts.optretDataType;
	var optDebug		=	lcOpts.optDebug;
	__logPrint("=================================================================", optDebug);
	__logPrint("======================== Call Ajax DEBUG ========================", optDebug);
	__logPrint("=================================================================", optDebug);
	__logPrint("= URL 		: "+optUrl				, optDebug);
	__logPrint("= Data		: "+convertObj(optData)	, optDebug);
	__logPrint("= DataType 	: "+optDataType			, optDebug);
	__logPrint("= Load 	: "+optLoad					, optDebug);
	__logPrint("= ErrChk 	: "+optErrChk			, optDebug);
	var ajaxObj = $.ajax({
		url			: (optSecure)? encAjaxCall(optUrl	,true	) : optUrl,
		data		: (optSecure)? encAjaxCall(optData	,false	) : optData,
		type		: optType,
		dataType	: optDataType,
		timeout		: optTimeout,
		async 		: optAsync,
		success		: function(data){
			//** 호출된 URL중 병렬처리 항목에 대해서만 호출카운트 증가  **//
			var callAp = "";
			if($.ajaxMultiProc.callUrls.length > 0){
				$.each($.ajaxMultiProc.callUrls, function(){
					if(optUrl.indexOf(this) > -1){
						callAp = this;
						$.ajaxMultiProc.compCnt++; //호출 성공시 완료 카운트 증가
						return false;
					}
				});
			}
			
			//** 암호화 적용시 **//
			if(optSecure) {
				try{
					data = decAjaxCallback(data ,optretDataType.toUpperCase());
				}catch(e){
					data = {
						result		: "error",
						message		: "[COMMON-ERROR]데이터를 수신할 수 없습니다.\n고객센터에 문의 하세요.(1588-9200)"
					};
				}
			}
			
			//** 호출성공시 Callback **//
			if(optSuccess != "" && typeof(optSuccess) != 'undefined'){
				if(optretDataType.toUpperCase() == "JSON"){
					
					/*
					 * 서버에러체크 - 메시지타입에 따라 구분해야하기때문에 Cliente에서 구분하기로함
					 * 보통 N을 정상으로 보기때문에 N을제외한 항목을 에러로 처리
					 * 대신 각각페이지에서 구분을 하기위하여 에러체크가 필요한경우만 체크
					 */
					if(optErrChk && data.msgType != "N"){
						data.result = "error"; //에러로 치환
					}
					
					//TR호출시 에러가 난경우 로딩바 및 모달 영역을 해제하기 위하여
					if(data.result == "error"){
						if(!$.ajaxMultiProc.isPushMsg) pushErrMsg("["+callAp+"] "+data.message, "ajaxCommon");
						try{
							hideLoading();
						}catch(e){
							try{ parent.hideLoading();} catch(e) {};
						}
					}
				}
				__logPrint("============================ SUCCESS ============================", optDebug);
				__logPrint("= Out Data : "+convertObj(data), optDebug);
				__logPrint("=================================================================", optDebug);
				optSuccess(data, optData);
			}
		},
		error		: function(xhr, status, err){
			if(xhr.readyState != 0 || xhr.status != 0){
				__logPrint("============================= ERROR =============================", optDebug);
				__logPrint("= Out Data : "+convertObj(err), optDebug);
				__logPrint("=================================================================", optDebug);
				if(optError != "" && typeof(optError) != 'undefined')
					optError(err);
			}
			try{
				hideLoading();
			}catch(e){
				try{ parent.hideLoading(); } catch(e) {};
			}
		},
		beforeSend 	: function(){
			if(optLoad){
				try{
					showLoading();
				}catch(e){
					try{ parent.showLoading(); } catch(e) {};
				}
			}
		},
		complete 	: function(){
			if(optLoad){
				try{
					hideLoading();
				}catch(e){
					try{ parent.hideLoading(); } catch(e) {};
				}
			}
			try{
				ajaxMultiProcComplet();  //병렬처리 프로세스 완료
				a_tag_ck();
			}catch(e){}
		}
	});
	return ajaxObj;
}

/**
 *  Ajax 통신 에러시 Default Function
 */
function defaultErrorMsg(data){
	alert("[COMMON-ERROR]데이터를 수신할 수 없습니다.\n고객센터에 문의 하세요.(1588-9200)");
}

/**
 * 메소드명		: Object 형태의 Ajax 호출
 * Object Param :
 *		url			//URL 경로		[필수]
 *		data		//Parameter 정보
 *		type		//Type (기본값:"POST")
 *		dataType	//유형  (기본값:"json")
 *		timeout		//시간  (기본값:100000)
 *		success		//성공 함수
 *		error		//실패 함수
 *		load		//로딩바 출력여부 (기본값:true)
 *		async		//비동기여부(기본값:true) -비동기
 *		secure		//Secure적용 여부(기본값:false) - Secure 미적용
 *		errchk		//에러체크적용 여부(기본값:false)
 */
function ajaxCallObjFn(callObject){
	if(typeof(callObject.data) == "object"){
		//callObject["data"] = convertObj(callObject.data);
	}

	//성공시 콜백함수 설정
	if(typeof(callObject.success) != "undefined"){
		if(typeof(callObject.success) == "string"){
			callObject["success"] = eval("("+callObject.success+")"); //toObject
		}
	}

	//실패시 콜백함수 설정
	if(typeof(callObject.error) != "undefined"){
		if(typeof(callObject.error) == "string"){
			callObject["error"] = eval("("+callObject.error+")"); //toObject
		}
	}

	//서버 호출
	return $.callajax(callObject);
}

/**
 * 메소드명 : Object 형태의 Ajax 호출
 */
function callAjaxObj(callObject){
	if(callObject == null) return;
	callObject["secure"] 	= false;
	callObject["sign"] 		= false;

	return ajaxCallObjFn(callObject);
}

/**
 * 메소드명 : Secure 사용 Object 형태의 Ajax 호출
 */
function callSecureAjaxObj(callObject){
	if(callObject == null) return;
	callObject["secure"]	= true;
	callObject["sign"]		= false;

	return ajaxCallObjFn(callObject);
}

/**
 * 메소드명 : Object 형태의 Ajax 호출 + 공인인증 모듈호출
 */
function callAjaxObjSign(callObject){
	if(callObject == null) return;
	callObject["secure"]	= false;
	callObject["sign"]		= true;

	return ajaxCallObjFn(callObject);
}

/**
 * 메소드명 : Secure 사용 Object 형태의 Ajax 호출 + 공인인증 모듈호출
 */
function callSecureAjaxObjSign(callObject){
	if(callObject == null) return;
	callObject["secure"]	= true;
	callObject["sign"]		= true;

	return ajaxCallObjFn(callObject);
}

/**
 * 가상키패드 관련 클라이언트 Form 확인후 관련 Hidden Data생성 
 * 가상키패드 생성시 __enc_prefix 이름으로 생성된 필드확인하여 해당 폼 및 필드명 확인
 * return : form 확인후 해당 Form data를 Object형태로 return
 */
var __gl_keyPad_param = {
	enc_prefix 		: "__KI_",	//가상키패드 적용 Prefix 단어
	enc_form		: null,		//가상키패드 생성 Form
	enc_fieldArr	: []		//가상키패드 적용 Field Array
};
function keypadFormParam(){
	__gl_keyPad_param.enc_form 		= null; 	//가상키패드 생성 Form
	__gl_keyPad_param.enc_fieldArr	= [];		//가상키패드 적용 Field Array
	var keyParams = null;
	$("form").each(function(){
		//가상키패드 적용필드를 확인하여 해당 Form을 키패드 폼으로 셋팅함
		var enc_field  = $(this).find("input[name^='"+__gl_keyPad_param.enc_prefix+"']");
		if(enc_field.length > 0){
			__gl_keyPad_param.enc_form = eval("document."+$(this).attr("name")); //가상키패드 생성 Form 셋팅
			$(enc_field).each(function(i){
				//가상키패드 적용 Field 확인 - prefix 단어를 제외한 실제 필드명만 셋팅
				__gl_keyPad_param.enc_fieldArr.push($(this).attr("name").substring(__gl_keyPad_param.enc_prefix.length));
			});
			return false;
		}
	});
	
	//가상키패드 적용된 Form 존재시
	if(!isCommonNull(__gl_keyPad_param.enc_form)){
		try{
			//가상키패드에서 생성된 폼데이터를 현재 데이터에 복사
			npPfsCtrl.copy(document.FdsFrm, __gl_keyPad_param.enc_form);
			keyParams = $(__gl_keyPad_param.enc_form).serializeObject(); //keypad form object 생성
		}catch(e){
			keyParams = null; //오류시 keyParams초기화
		}
	}
	return keyParams;
}


/**
 * 메소드명 : 보안사용시 문자열을 암호화
 * 파라미터 : str	: 암호화할 문자열
 *			isUrl : URL여부
 * return : String을 암호화한 후 JSON Object로 변환하여 return
 */
function encAjaxCall(data, isUrl){
	var encData = data;
	if(!isUrl){ 	//파리미터일경우 처리
		var keyParam = keypadFormParam();
		if(keyParam != null){
			encData = $.extend({}, keyParam, data);
			
			//암호화된 두개 필드를 서로 교차하여 입력
			for(var key in encData){
				if(key.toString().indexOf("_wowenc") > -1){
					var fieldNm = encData[key]; //암호화 필드명 확인
					
					/*
					 * 암호화 필드명 데이터가 존재할경우 프로세스
					 * - 실제 서버에서 복호화된 값이 저장되여야하는 기존 필드명으로 가상키패드 정보 치환 
					 * - 기존 AP 필드명정보로 가상키패드 정보 입력후 가상키패드 정보 초기화
					 *   //새로 생성되는 AP필드명		  //기존 암호화 필드명
					 * - encData['prefix'+ AP필드명] = encData['prefix'+암호화 필드명]; 
					 */
					if(!isCommonNull(encData[fieldNm])){
						encData[__gl_keyPad_param.enc_prefix+key] = encData[__gl_keyPad_param.enc_prefix+fieldNm];
						encData[__gl_keyPad_param.enc_prefix+fieldNm] = "";
					}
				}
			}
		}else{
			//암호화 적용시키겠다했는데 실제 가상키패드는 안뜬경우를 대비하여 기존 Value 입력
			for(var key in encData){
				if(key.toString().indexOf("_wowenc") > -1){
					//필드명만 받던부분을 실제 데이터로 치환
					var fieldNm 	= encData[key];
					encData[key] 	= $("#"+fieldNm).val();
				}
			}
		}
	}
	return encData;
}

/**
 * 메소드명 : 보안사용시 문자열을 복호화
 * 파라미터 : encStr	: 복호화할 문자열
 * return  : String을 복호화한 후 return
 */
function decAjaxCallback(encData, retType){
	/*
	//보안적용시 구현
	encData = encData.replace(/\r/g, "");
	encData = encData.replace(/\n/g, "");
	encData = jQuery.trim(encData);
	
	//리턴 데이터 타입이 JSON, XML인경우 Text형태의 문자열을 각각 Object형태로 변환
	if(retType == "JSON")		encData = eval("("+encData+")");
	else if(retType == "XML")	encData = XMLDec(encData);
	 */
	return encData;

}

//XML Object형태로 변환
function XMLDec(text){
	var xmlDoc;
	try{
		// code for IE
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(text);
	}catch(e){
		var parser=new DOMParser();
		xmlDoc = parser.parseFromString(text,"text/xml");
	}
	return xmlDoc;
}

//파라미터 QueryString 형태를 JSON형태로 변경한다
function paramToJson(param){
	var re = /([^\?&=]+)=?([^\?&]*)/g;
	var decodeRE = /\+/g;
	var decode = function (str) {
		var resTxt = "";
		try{
			resTxt = decodeURIComponent( str.replace(decodeRE, " ") );
		}catch(e){resTxt = "";}
		return resTxt;
	};
	var jObject = {}, e;
	while ( e = re.exec(param) ) {
		var k = decode( e[1] ), v = decode( e[2] );
		if (k.substring(k.length - 2) === '[]') {
			k = k.substring(0, k.length - 2);
			(jObject[k] || (jObject[k] = [])).push(v);
		}
		else jObject[k] = v;
	}
	return jObject;
}

function __logPrint(str, isDebug){
	if(isDebug){
		try{console.log("[CallAjax DEBUG] : ["+str+"]");} catch(e){}
	}
}

function convertObj(object) {
	var str = "";
	try{
		if(typeof(object) == 'object'){
			for(var key in object){
				str += key;
				str += " : \"" + object[key] + "\", ";
			}
		}else{
			str = object;
		}
	}catch(e){}
	return str;
}