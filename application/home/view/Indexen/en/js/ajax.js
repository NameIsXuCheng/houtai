/**
 * MIRAE AJAX 
 * �̷����´�� Ȩ������ Ajax ȣ�� ���� �Լ�
 * @author ����
 * @update 2016/08/01 By Min
 * �Ķ���� :	URL, DATA �� �ʼ�, �������� �̼����� default ����
 *		(�ʼ�)	[optUrl        ] - ������ ȣ�� URL
 *		(�ʼ�)	[optData       ] - �Ķ���� ��ü. ����ü�� �Ѱܵ� �ǰ� ����Ÿ ���ڵ��Ǿ� �ִ� ��ü�� ��
 *				[optType       ] - ����Ÿ�� (Def : POST)
 *				[optDataType   ] - ���� ������ Ÿ�� (Def : json)
 *				[optTimeout    ] - ���۽ð� (Def : 10000)
 *				[optSuccess    ] - ������ �Լ�
 *				[optError      ] - ������ �Լ�
 *				[optLoad       ] - �ε�ȭ�� ��� ���� (Def : true)
 *				[optAsync      ] - �񵿱⿩�� (Def : true)
 *				[optSecure     ] - �������뿩��(Def : false)
 *				[optErrChk     ] - ����üũ����(Def : false)
 *				[optretDataType] - ��������� ���� ���ϵ����� Ÿ�԰� �ٸ�Ÿ���� ����Ÿ���� �����ʿ� ���� ���� ������ Ÿ��
 *				[optSign	   ] - �����������뿩��
 *				[optDebug	   ] - �α���¿���
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

		//** ���� DataType�� optretDataType �� ���� �ϰ� Secure����� ���Ϲ޴� ������Ÿ���� ���� �ɰ�츦 ��� **//
		_lcOpts.optretDataType = opts.dataType.toLowerCase();
		
		//** �����������뿩�� �Ǻ��Ͽ� �������� ȣ�� **//
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
		callUrls 	: [],			//ȣ��URL(�񱳿�)
		callback	: function(){},	//ȣ�� �Ϸ��� Callback
		compCnt		: 0,			//�Ϸ�ī��Ʈ
		isErrAlert	: true,			//�����޽��� ǥ������
		isPushMsg	: false,		//�����޽��� �Է¿���( true�ΰ�� ȭ�鿡�� ������ �Է��ؾ���)
		errMsg		: ""			//�����޽���
	};
	
	/** ����ó���� �����޽��� ��Ʈ���� ���� ���� ���� **/
	$.ajaxMultiProc = $.ajaxMultiProcDef;
	
	/** �������μ��� ���� �ʱ�ȭ **/
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
 
//** Error �޽��� Ǫ�� **//
function pushErrMsg(msg, cType){
	if(!isCommonNull(msg)){
		//���뿡�� �����޽��� �Է½� ��ȭ�鿡�� �ԷµǴ� Pushmsg�� ���� �ʱ� ���ؼ� 
		if(!$.ajaxMultiProc.isPushMsg && (isCommonNull(cType) || "ajaxCommon" != cType)) return;
		$.ajaxMultiProc.errMsg += (isCommonNull($.ajaxMultiProc.errMsg)?"":"\n") + msg;
	}		
}
//** ����ó�� �Ϸ�� ���μ���  **//
function ajaxMultiProcComplet(){
	//����ó�� URL�� �����Ұ�� + ����ó���� �Ϸ�ī���� �ݵǴ� ī��Ʈ�� ������� ó��
	if(	$.ajaxMultiProc.callUrls.length > 0 && ($.ajaxMultiProc.callUrls.length == $.ajaxMultiProc.compCnt)){

		$.ajaxMultiProc.compCnt = 0; //�Ϸ� ī��Ʈ �ʱ�ȭ
		
		//�ε��ٸ� �����ش� 
		try{ hideLoading(); }catch(e){ try{ parent.hideLoading(); } catch(e) {}; }
		
		//������ �߻��Ͽ� �޽����� �ԷµȰ�� Alert
		if(!isCommonNull($.ajaxMultiProc.errMsg)){
			if($.ajaxMultiProc.isErrAlert){ showMsg($.ajaxMultiProc.errMsg); }
			$.ajaxMultiProc.errMsg = ""; //�޽��� �ʱ�ȭ
		}
		$.ajaxMultiProc.callback(); //�ݹ�ó��
	};
}

/**
*  Ajax ���� �Լ�
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
			//** ȣ��� URL�� ����ó�� �׸� ���ؼ��� ȣ��ī��Ʈ ����  **//
			var callAp = "";
			if($.ajaxMultiProc.callUrls.length > 0){
				$.each($.ajaxMultiProc.callUrls, function(){
					if(optUrl.indexOf(this) > -1){
						callAp = this;
						$.ajaxMultiProc.compCnt++; //ȣ�� ������ �Ϸ� ī��Ʈ ����
						return false;
					}
				});
			}
			
			//** ��ȣȭ ����� **//
			if(optSecure) {
				try{
					data = decAjaxCallback(data ,optretDataType.toUpperCase());
				}catch(e){
					data = {
						result		: "error",
						message		: "[COMMON-ERROR]�����͸� ������ �� �����ϴ�.\n�����Ϳ� ���� �ϼ���.(1588-9200)"
					};
				}
			}
			
			//** ȣ�⼺���� Callback **//
			if(optSuccess != "" && typeof(optSuccess) != 'undefined'){
				if(optretDataType.toUpperCase() == "JSON"){
					
					/*
					 * ��������üũ - �޽���Ÿ�Կ� ���� �����ؾ��ϱ⶧���� Cliente���� �����ϱ����
					 * ���� N�� �������� ���⶧���� N�������� �׸��� ������ ó��
					 * ��� �������������� ������ �ϱ����Ͽ� ����üũ�� �ʿ��Ѱ�츸 üũ
					 */
					if(optErrChk && data.msgType != "N"){
						data.result = "error"; //������ ġȯ
					}
					
					//TRȣ��� ������ ����� �ε��� �� ��� ������ �����ϱ� ���Ͽ�
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
				ajaxMultiProcComplet();  //����ó�� ���μ��� �Ϸ�
				a_tag_ck();
			}catch(e){}
		}
	});
	return ajaxObj;
}

/**
 *  Ajax ��� ������ Default Function
 */
function defaultErrorMsg(data){
	alert("[COMMON-ERROR]�����͸� ������ �� �����ϴ�.\n�����Ϳ� ���� �ϼ���.(1588-9200)");
}

/**
 * �޼ҵ��		: Object ������ Ajax ȣ��
 * Object Param :
 *		url			//URL ���		[�ʼ�]
 *		data		//Parameter ����
 *		type		//Type (�⺻��:"POST")
 *		dataType	//����  (�⺻��:"json")
 *		timeout		//�ð�  (�⺻��:100000)
 *		success		//���� �Լ�
 *		error		//���� �Լ�
 *		load		//�ε��� ��¿��� (�⺻��:true)
 *		async		//�񵿱⿩��(�⺻��:true) -�񵿱�
 *		secure		//Secure���� ����(�⺻��:false) - Secure ������
 *		errchk		//����üũ���� ����(�⺻��:false)
 */
function ajaxCallObjFn(callObject){
	if(typeof(callObject.data) == "object"){
		//callObject["data"] = convertObj(callObject.data);
	}

	//������ �ݹ��Լ� ����
	if(typeof(callObject.success) != "undefined"){
		if(typeof(callObject.success) == "string"){
			callObject["success"] = eval("("+callObject.success+")"); //toObject
		}
	}

	//���н� �ݹ��Լ� ����
	if(typeof(callObject.error) != "undefined"){
		if(typeof(callObject.error) == "string"){
			callObject["error"] = eval("("+callObject.error+")"); //toObject
		}
	}

	//���� ȣ��
	return $.callajax(callObject);
}

/**
 * �޼ҵ�� : Object ������ Ajax ȣ��
 */
function callAjaxObj(callObject){
	if(callObject == null) return;
	callObject["secure"] 	= false;
	callObject["sign"] 		= false;

	return ajaxCallObjFn(callObject);
}

/**
 * �޼ҵ�� : Secure ��� Object ������ Ajax ȣ��
 */
function callSecureAjaxObj(callObject){
	if(callObject == null) return;
	callObject["secure"]	= true;
	callObject["sign"]		= false;

	return ajaxCallObjFn(callObject);
}

/**
 * �޼ҵ�� : Object ������ Ajax ȣ�� + �������� ���ȣ��
 */
function callAjaxObjSign(callObject){
	if(callObject == null) return;
	callObject["secure"]	= false;
	callObject["sign"]		= true;

	return ajaxCallObjFn(callObject);
}

/**
 * �޼ҵ�� : Secure ��� Object ������ Ajax ȣ�� + �������� ���ȣ��
 */
function callSecureAjaxObjSign(callObject){
	if(callObject == null) return;
	callObject["secure"]	= true;
	callObject["sign"]		= true;

	return ajaxCallObjFn(callObject);
}

/**
 * ����Ű�е� ���� Ŭ���̾�Ʈ Form Ȯ���� ���� Hidden Data���� 
 * ����Ű�е� ������ __enc_prefix �̸����� ������ �ʵ�Ȯ���Ͽ� �ش� �� �� �ʵ�� Ȯ��
 * return : form Ȯ���� �ش� Form data�� Object���·� return
 */
var __gl_keyPad_param = {
	enc_prefix 		: "__KI_",	//����Ű�е� ���� Prefix �ܾ�
	enc_form		: null,		//����Ű�е� ���� Form
	enc_fieldArr	: []		//����Ű�е� ���� Field Array
};
function keypadFormParam(){
	__gl_keyPad_param.enc_form 		= null; 	//����Ű�е� ���� Form
	__gl_keyPad_param.enc_fieldArr	= [];		//����Ű�е� ���� Field Array
	var keyParams = null;
	$("form").each(function(){
		//����Ű�е� �����ʵ带 Ȯ���Ͽ� �ش� Form�� Ű�е� ������ ������
		var enc_field  = $(this).find("input[name^='"+__gl_keyPad_param.enc_prefix+"']");
		if(enc_field.length > 0){
			__gl_keyPad_param.enc_form = eval("document."+$(this).attr("name")); //����Ű�е� ���� Form ����
			$(enc_field).each(function(i){
				//����Ű�е� ���� Field Ȯ�� - prefix �ܾ ������ ���� �ʵ�� ����
				__gl_keyPad_param.enc_fieldArr.push($(this).attr("name").substring(__gl_keyPad_param.enc_prefix.length));
			});
			return false;
		}
	});
	
	//����Ű�е� ����� Form �����
	if(!isCommonNull(__gl_keyPad_param.enc_form)){
		try{
			//����Ű�е忡�� ������ �������͸� ���� �����Ϳ� ����
			npPfsCtrl.copy(document.FdsFrm, __gl_keyPad_param.enc_form);
			keyParams = $(__gl_keyPad_param.enc_form).serializeObject(); //keypad form object ����
		}catch(e){
			keyParams = null; //������ keyParams�ʱ�ȭ
		}
	}
	return keyParams;
}


/**
 * �޼ҵ�� : ���Ȼ��� ���ڿ��� ��ȣȭ
 * �Ķ���� : str	: ��ȣȭ�� ���ڿ�
 *			isUrl : URL����
 * return : String�� ��ȣȭ�� �� JSON Object�� ��ȯ�Ͽ� return
 */
function encAjaxCall(data, isUrl){
	var encData = data;
	if(!isUrl){ 	//�ĸ������ϰ�� ó��
		var keyParam = keypadFormParam();
		if(keyParam != null){
			encData = $.extend({}, keyParam, data);
			
			//��ȣȭ�� �ΰ� �ʵ带 ���� �����Ͽ� �Է�
			for(var key in encData){
				if(key.toString().indexOf("_wowenc") > -1){
					var fieldNm = encData[key]; //��ȣȭ �ʵ�� Ȯ��
					
					/*
					 * ��ȣȭ �ʵ�� �����Ͱ� �����Ұ�� ���μ���
					 * - ���� �������� ��ȣȭ�� ���� ����ǿ����ϴ� ���� �ʵ������ ����Ű�е� ���� ġȯ 
					 * - ���� AP �ʵ�������� ����Ű�е� ���� �Է��� ����Ű�е� ���� �ʱ�ȭ
					 *   //���� �����Ǵ� AP�ʵ��		  //���� ��ȣȭ �ʵ��
					 * - encData['prefix'+ AP�ʵ��] = encData['prefix'+��ȣȭ �ʵ��]; 
					 */
					if(!isCommonNull(encData[fieldNm])){
						encData[__gl_keyPad_param.enc_prefix+key] = encData[__gl_keyPad_param.enc_prefix+fieldNm];
						encData[__gl_keyPad_param.enc_prefix+fieldNm] = "";
					}
				}
			}
		}else{
			//��ȣȭ �����Ű�ڴ��ߴµ� ���� ����Ű�е�� �ȶ��츦 ����Ͽ� ���� Value �Է�
			for(var key in encData){
				if(key.toString().indexOf("_wowenc") > -1){
					//�ʵ�� �޴��κ��� ���� �����ͷ� ġȯ
					var fieldNm 	= encData[key];
					encData[key] 	= $("#"+fieldNm).val();
				}
			}
		}
	}
	return encData;
}

/**
 * �޼ҵ�� : ���Ȼ��� ���ڿ��� ��ȣȭ
 * �Ķ���� : encStr	: ��ȣȭ�� ���ڿ�
 * return  : String�� ��ȣȭ�� �� return
 */
function decAjaxCallback(encData, retType){
	/*
	//��������� ����
	encData = encData.replace(/\r/g, "");
	encData = encData.replace(/\n/g, "");
	encData = jQuery.trim(encData);
	
	//���� ������ Ÿ���� JSON, XML�ΰ�� Text������ ���ڿ��� ���� Object���·� ��ȯ
	if(retType == "JSON")		encData = eval("("+encData+")");
	else if(retType == "XML")	encData = XMLDec(encData);
	 */
	return encData;

}

//XML Object���·� ��ȯ
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

//�Ķ���� QueryString ���¸� JSON���·� �����Ѵ�
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