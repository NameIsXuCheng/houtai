

var funcs = {};
funcs['nospace'			] = isNoSpace;					/* 공백없이 */
funcs['email'			] = isValidEmail;				/* 이메일검사 */
funcs['emailfirst'		] = isValidEmailFirst;			/* 이메일 앞자리 */
funcs['phone'			] = isValidPhone;				/* 전화번호 */
funcs['userid'			] = isValidUserid;				/* 아이디 */
funcs['hangul'			] = hasHangul;					/* 한글 */
funcs['number'			] = isNumeric;					/* 숫자 */
funcs['engonly'			] = alphaOnly;					/* 영문 */
funcs['hangulonly'		] = hangulOnly;					/* 한글 */
funcs['jumin'			] = isValidJumin;				/* 주민번호 */
funcs['bizno'			] = isValidBizNo;				/* 사업자번호 */
funcs['pw'				] = isValidPassword;			/* 비밀번호 */
funcs['accountpw'		] = isValidAccountPassword;		/* 계좌 비밀번호 */
funcs['accountpw_en'	] = isValidAccountPasswordEn;	/* 영문홈페이지에서 사용 계좌 비밀번호 */
funcs['yyyy'			] = isValidYYYY;				/* 년월일 날자 체크 */
funcs['yyyymm'			] = isValidYYYYMM;				/* 년월 날자 체크 */
funcs['yyyymmdd'		] = isValidYYYYMMDD;			/* 년, 날자 체크 */
funcs['money'			] = isValidMoney;				/* 금액 패턴 체크 (공백, 0, 소숫점 이하는 유효하지 않음) */
funcs['price'			] = isValidPrice;				/* 단가 패턴 체크 (공백, 0, 소수점 3자리 이하는 유효하지 않음) */
funcs['jongmokcode'		] = isValidJongmokCode;			/* 주식 종목코드 check(Null 체크, 숫자/영문자 6자리) */
funcs['jongmokcode_en'	] = isValidJongmokCodeEn;		/* 영문홈페이지에서 사용 주식 종목코드 check(Null 체크, 숫자/영문자 6자리) */
funcs['todayover'		] = isValidTodayOver;			/* YYYYMMDD형태의 값을 오늘날자와 비교하여 오늘, 오늘 이후인지 체크 */
funcs['numberalpha'		] = isValidNumberAlpha;			/* 숫자, 영문 문자열만 사용 체크 */

var NO_BLANK 	= "{name+을를} 입력하여 주십시오";
var NO_SELECT 	= "{name+을를} 선택하여주십시오";
var NOT_VALID 	= "{name+이가} 올바르지 않습니다";
var TOO_LONG 	= "{name}의 길이가 초과되었습니다 (최대 {maxbyte}바이트)";
var TOO_SHORT 	= "{name}의 길이가 부족합니다 (최소 {minbyte}바이트)";

String.prototype.hasFinalConsonant = function(str) {
	str = this != window ? this : str; 
	var strTemp = str.substr(str.length-1);
	return ((strTemp.charCodeAt(0)-16)%28!=0);
};

String.prototype.getBytes = function() {
	var cnt = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127) {
			cnt += 2;
		} else {
			cnt++;
		}
	}
	return cnt;
};

String.prototype.trim = function () {
	var s = (this!=null) ? this : "";
	s = s.replace(/^\s+/g,"");
	s = s.replace(/\s+$/g,"");
	return s;
};

function josa(str,tail) {
	if (str != null && str != undefined)
		return (str.hasFinalConsonant()) ? tail.substring(0,1) : tail.substring(1,2);
	return '';
}

function validate(form) {
	var i=0;
	for (i = 0; i < form.elements.length; i++ ) {
		var el = form.elements[i];
		if (el != null && el != undefined && el.tagName != null && el.tagName != 'undefined'  && el.disabled != true) { 
		
			if(el.tagName.toUpperCase() != "OBJECT") {
				if (el.value != null && el.value != "" && el.type!="file") {//2016.09.05 고은정 추가
					el.value = el.value.trim();
				}
				
				//$REQUIRED : 필수값
				if (el.getAttribute("REQUIRED") != null) {
					if(el.type.indexOf("select")>-1){
						if (el.selectedIndex==0 ) {
							return doError(el,NO_SELECT);
						}
					}else{
						if (el.value == null || el.value == "") {
							return doError(el,NO_BLANK);
						}
					}
				}
				
				//$MAXBYTE : 최대 바이트 설정
				if (el.getAttribute("NAME") != null && (
						el.getAttribute("NAME").toUpperCase() != 'ACCOUNTPASSWORD' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPW1' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPW2' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPASSWORD' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPASSWORD2' &&
						el.getAttribute("NAME").toUpperCase() != 'QQPASSWD' &&
						el.getAttribute("NAME").toUpperCase() != 'QQPASSWD_NEW' &&
						el.getAttribute("NAME").toUpperCase() != 'QQPASSWD_NEW2' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPW_NEW1' &&
						el.getAttribute("NAME").toUpperCase() != 'USERPW_NEW2' &&
						el.getAttribute("NAME").toUpperCase() != 'PASSWORD' &&
						el.getAttribute("NAME").toUpperCase() != 'NEW_PASSWORD_1' &&
						el.getAttribute("NAME").toUpperCase() != 'NEW_PASSWORD_2' &&
						el.getAttribute("NAME").toUpperCase() != 'PASSWD' 
						)&& el.getAttribute("MAXBYTE") != null && el.value != "") {
					var len = el.value.getBytes();
					if (len > parseInt(el.getAttribute("MAXBYTE"))) {
						maxbyte = el.getAttribute("MAXBYTE");
						return doError(el,TOO_LONG,"",maxbyte);
					}
				}
				//$MINBYTE : 최소 바이트 설정
				if (el.getAttribute("MINBYTE") != null && el.value != "") {
					var len = el.value.getBytes();
					if (len < parseInt(el.getAttribute("MINBYTE"))) {
						minbyte = el.getAttribute("MINBYTE");
						return doError(el,TOO_SHORT,"",minbyte);
					}
				}
				
				//option="" : 소스 맨위 옵션 리스트 참고.
				if (el.getAttribute("OPTION") != null && el.value != "") {
					if (el.getAttribute("NAME") != null && el.getAttribute("NAME").toUpperCase() == 'ACCOUNTPASSWORD' && el.value == '****') { 
						return true;
					}
					if (funcs[el.getAttribute("OPTION").toLowerCase()] != undefined && !funcs[el.getAttribute("OPTION").toLowerCase()](el)) 
						return false;
				}
				
				//$FILETYPE : input file일 경우 파일 확장자 체크.
				if (el.getAttribute("FILETYPE") != null && el.value != "") {
					var validFileType = el.getAttribute("FILETYPE").split(",");
					var nFileType = el.value.substring(el.value.lastIndexOf(".")+1,el.length);
					var isValidFileType = false;
					for (j=0; j<validFileType.length ; j++) {
						if (nFileType.toUpperCase()==validFileType[j].toUpperCase().replace(/\s/g,"")) {
							isValidFileType = true;
						}
					}
					if (!isValidFileType) {
						var nameString = "";
						if (el.getAttribute("$name") != null && el.getAttribute("$name") != "") {
							nameString = "{name+이가} ";
						}
						return doError(el,nameString+"적절한 파일 포맷이 아닙니다.");
					}
				}
				if( el.getAttribute("type") == "file" && el.value != "") {
					//if( !isNoHangulbyValue(el) ) return false;
				}
			}
		}
	}
	return true;
}

function doError(el,type,action,byte) { 
	var pattern = /{([a-zA-Z0-9_]+)\+?([가-힝]{2})?}/;
	var name 	= ($name = el.getAttribute("$NAME")) ? $name : el.getAttribute("NAME");
	pattern.exec(type);
	
	var tail 	= (RegExp.$2 && RegExp.$1) ? josa(eval(RegExp.$1),RegExp.$2) : "";
	alert(type.replace(pattern,eval(RegExp.$1) + tail).replace(pattern,byte));
	
	if (action == "sel") 		el.select();
	else if (action == "del")	el.value = "";
	if (el.getAttribute("UNFOCUSED") == null) {
		if(el.type!="hidden"&&el.style.display.toUpperCase()!="NONE"){		
			el.focus();
		}
	}	
	return false;
}	


/**
* 패턴 검사 함수들
******************************************************************************/

function isValidAccountPassword(el) {
	var strformat = /^[0-9]{4}$/;
	if(!el.value=="****"){
		ckresult = el.value.match(strformat);
		if( ckresult == null )
		{
			return doError(el,"계좌 비밀번호가 비어 있거나 유효하지 않는 문자가 있습니다. (숫자4자리)");
		}
	}
	return true;
}

function isValidAccountPasswordEn(el) {
	var strformat = /^[0-9]{4}$/;
	ckresult = el.value.match(strformat);
	if( ckresult == null )
	{
		return doError(el,"Unfilled Account Password or uncountable letter");
	}
	return true;
}

function isValidJongmokCode(el) { 
	strformat = /^[A-Za-z0-9]{6}$/;
	ckresult = el.value.match(strformat);
	if ( (ckresult == null) )
	{
		return doError(el,"종목코드 항목이 비어 있거나 유효하지 않는 문자가 있습니다");
	}
	return true;
}

function isValidTodayOver(el) { 
	var currentday = new Date();
    curry = currentday.getFullYear();
    currm = currentday.getMonth() + 1;
    currd = currentday.getDate();
    var currdate = curry + "/" + currm + "/" + currd;

    var _c = new Date(currdate);
    var _d = new Date(el.value.substring(0,4) + "/" + el.value.substring(4,6) + "/" + el.value.substring(6,8));
    
    if (_c > _d) { 
    	return doError(el,"{name}은 오늘 이전의 날짜를 선택하실 수 없습니다.");
    }
    return true;
}

function isValidJongmokCodeEn(el) { 
	strformat = /^[A-Za-z0-9]{6}$/;
	ckresult = el.value.match(strformat);
	if ( (ckresult == null) )
	{
		return doError(el,"Unfilled Issue No or uncountable letter");
	}
	return true;
}

function isValidPrice(el) { 
	re = /(^[0-9](\d{0,2})?(,\d{3})*(\.\d{1,2})?$)|(^\d+(\.\d{0,2})?$)/;	// 1,000.53 or 1000.32 or 0.53
	if ( ! re.exec(el.value) )
		return doError(el,"{name} 단가금액에 유효하지 않는 문자가 있습니다.");
	return true;
}

function isValidMoney(el) { 
	re = /(^[0-9](\d{0,2})?(,\d{3})*$)|(^\d+$)/;	// 12,000,000 or 12000000
	if ( ! re.exec(el.value) )
		return doError(el,"{name} 금액에 유효하지 않는 문자가 있습니다.");
	return true;
}

function isValidYYYYMMDD(el) { 
	var s = el.value;
	
	dateformat1 = /^[1-2][0-9][0-9][0-9]\.[0-1][0-9]\.[0-3][0-9]$/;  // 2000.04.01
	dateformat2 = /^[1-2][0-9][0-9][0-9]\.[1-9]\.[0-3][0-9]$/;       // 2000.4.01
	dateformat3 = /^[1-2][0-9][0-9][0-9]\.[0-1][0-9]\.[1-9]$/;       // 2000.04.1
	dateformat4 = /^[1-2][0-9][0-9][0-9]\.[1-9]\.[1-9]$/;            // 2000.4.1

	ckdate1 = s.match(dateformat1);
	ckdate2 = s.match(dateformat2);
	ckdate3 = s.match(dateformat3);
	ckdate4 = s.match(dateformat4);

	if ( (ckdate1 == null) && (ckdate2 == null) && (ckdate3 == null) && (ckdate4 == null) )  
		return doError(el,"날자형식이 올바르지 않습니다");

	return true;
}

function isValidYYYYMM(el) { 
	var s = el.value;
	dateformat1 = /^[1-2][0-9][0-9][0-9]\.[0-1][0-9]$/;  // 2000.04
	dateformat2 = /^[1-2][0-9][0-9][0-9]\.[1-9]$/;       // 2000.4

	ckdate1 = s.match(dateformat1);
	ckdate2 = s.match(dateformat2);

	if ( (ckdate1 == null) && (ckdate2 == null)  )
		return doError(el,"날자형식이 올바르지 않습니다");

	return true;
}

function isValidYYYY(el) { 
	var s = el.value;
	dateformat1 = /^[1-2][0-9][0-9][0-9]$/;  // 2000.04
	ckdate1 = s.match(dateformat1);

	if (ckdate1 == null)
		return doError(el,"날자형식이 올바르지 않습니다");

	return true;
}

	
function isNoSpace(el) {
	var pattern = /[\s]/;
	return (!pattern.test(el.value)) ? true : doError(el,"{name+은는} 띄어쓰기 없이 입력해주시기 바랍니다");
}

function isValidEmail(el) {
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}

function isValidEmailFirst(el) {
	var pattern = /^[_a-zA-Z0-9-\.]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}

function isValidUserid(el) {
	var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,11}$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 4자이상 12자 미만이어야 하고,\n 영문,숫자, _ 문자만 사용할 수 있습니다");
}

function isNoHangulbyValue(el) {
	var pattern = /[가-힝]/;
	var splitValue = el.value.split('\\');
	var filename = splitValue[splitValue.length-1];
	
	return (!pattern.test(filename)) ? true : doError(el,"첨부파일명(" + filename + ")에는 한글을 사용할 수 없습니다.");
}

function hasHangul(el) {
	var pattern = /[가-힝]/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 한글을 포함해야 합니다");
}
function hangulOnly(el) {
	var pattern = /^[가-힝]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 한글만 입력가능 합니다");
}

function alphaOnly(el) {
	var pattern = /^[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}

function isNumeric(el) {
	var pattern = /^[0-9]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자로만 입력해야 합니다");
}


function isValidJumin(el) {
    var pattern = /^([0-9]{6})-?([0-9]{7})$/; 
	var num = el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID); 
    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))) return doError(el,NOT_VALID);
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : doError(el,NOT_VALID);
}

function isValidBizNo(el) { 
	var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/; 
	var num = el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID); 
    num = RegExp.$1 + RegExp.$2 + RegExp.$3;
    var cVal = 0; 
    for (var i=0; i<8; i++) { 
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7); 
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10; 
    } 
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0'; 
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2)); 
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10) ? true : doError(el,NOT_VALID); 
}


function isValidPhone(el) {
	var pattern = /^[0-9-]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자로만 입력해야 합니다");
}

function isValidDate(el) {
	var oDateStr 	= el.value;
	var oDate 		= new Date(oDateStr.substr(0,4),oDateStr.substr(4,2)-1,oDateStr.substr(6,2));
	var oYearStr	= oDate.getFullYear();
	var oMonthStr	= (oDate.getMonth()+1).toString();
	oMonthStr 		= (oMonthStr.length ==1) ? "0"+ oMonthStr: oMonthStr; 
	var oDayStr		= oDate.getDate().toString();
	oDayStr = (oDayStr.length ==1) ? "0"+ oDayStr: oDayStr;
	return  (oDateStr == oYearStr+oMonthStr+oDayStr) ? true : doError(el,NOT_VALID); 
}

function isValidPassword(el) {
	var i		= 0;
	var cnt		= 0;
	var chk		= "";
	var passwd 	= el.value;
	
	// 동일숫자 또는 문자 검사
	chk = el.value.charAt(0);
	for(i=1;i<passwd.length;i++){
	    if(chk == passwd.charAt(i)) cnt++;
	}

	if ( cnt == passwd.length-1 ){
		return true;
	}
	cnt = 0;

	// 연속숫자 또는 문자 검사
	chk = passwd.charAt(0);
	var cnt1 = 0; //역순서용
	for(i=1;i<passwd.length;i++){
		// 정순서
	    if( (chk.charCodeAt(0)+i) == passwd.charCodeAt(i) ) cnt++;

	    // 역순서
	    if( (chk.charCodeAt(0)-i) == passwd.charCodeAt(i) )cnt1++;
	}

	if ( cnt == passwd.length-1 || cnt1 == passwd.length -1){
		return true;
	}
	return doError(el,"비밀번호가 올바른 형식이 아닙니다.");
}


function isValidFileName(_s) {
	var returnValue = true;
	if (_s==undefined) _s = "";
	if (_s!="") {
		var startIndex = _s.lastIndexOf("\\");
		var fileName = _s.substring(startIndex+1);
		if (fileName.length>15) {
			returnValue = false;
		}
	}
	return returnValue;
}

function checkBoxLength(obj, maxlen, arr) {
	Tobj = eval('$("form").' + obj);	
	var count = 0;
	for(i=0;i<Tobj.length;i++) {
		if(Tobj[i].checked) count++;
	}
	
	if (count > maxlen) {alert('최대 ' + maxlen + '개까지 선택 가능 합니다'); 
		arr.checked = false; 
	}	
}

// 사용자 id 유효성 체크
function isValidUserId(obj){
	
    var i = 0;
    var j = 0;
    var k = 0;
    var nchkcnt = 0;
    var checkbit = 0;
    var seq = 0;
    var digit = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   
    var objStr = obj.val();

    if ( objStr == null || objStr == "" ){
        alert("고객님께서 사용하고자 하는 ID를 입력하세요!");
        obj.focus();
        return false;
    }

    //특수 아이디 사용 금지
    if (! specificUseridCheck(obj) ) {
        alert("해당 ID는 사용이 제한된 ID입니다. \n\n새로운 ID를 입력해 주시기 바랍니다!");
        obj.val("");
        obj.focus();
        return false;
    }

    //자리수 제한   (6~8자리) -> (4~8자리: 통합 (2016.10.30 김정숙))
    if (objStr.length < 4 || objStr.length > 8){
        alert("사용자 ID는 영문자와 숫자 조합으로 4~8자리를 입력하셔야 합니다!");
        obj.focus();
        return false ;
    }

    //숫자로만 된 아이디 사용금지
    var numCnt = 0;
    for(i=0;i<objStr.length;i++){
        if(objStr.charAt(i) >= '0' && objStr.charAt(i) <= '9')
            numCnt++;
        else
            break;
    }
    if (numCnt == objStr.length) {
        alert("사용자 ID는 영문자와 숫자 조합으로 구성되어야 합니다!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //동일한 문자와 숫자 사용 불가
    for(i=0;i<objStr.length;i++) {
        for(j=0;j<objStr.length;j++) {
            if(objStr.charAt(i) == objStr.charAt(j)){
                k++;
            }
        }
    }

    checkbit = objStr.length * objStr.length;

    if(k == checkbit) {
        alert("사용자 ID는 동일한 문자와 숫자 사용하실 수 없습니다!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //연속문자 사용불가
    for(j=0;j<digit.length;j++) {
        if(objStr.charAt(0) == objStr.charAt(j)) {
            seq = j;
            break;
        }
    }

    for(i=0;i<objStr.length-1;i++) {
        if(objStr.charAt(i+1) == (digit.charAt(seq+1))) {
            nchkcnt++;
        }
		seq++;
    }

    if(nchkcnt == (objStr.length - 1)){
        alert("사용자 ID는 연속된 문자나 숫자를 사용하실 수 없습니다!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //특수문자 사용금지
    for(i=0;i<objStr.length;i++){
        if(!((objStr.charAt(i) >= '0' &&  objStr.charAt(i) <= '9') || (objStr.charAt(i) >= 'a' &&  objStr.charAt(i) <= 'z')|| (objStr.charAt(i) >= 'A' &&  objStr.charAt(i) <= 'Z'))){
            alert("사용자 ID는 특수문자를 사용하실 수 없습니다!");
            obj.val("");
            obj.focus();
            return false ;
        }
    }

    return true;
}

function ichePassWdCheck(obj){
    var i = 0;
    var j = 0;
    var k = 0;
    var nchkcnt = 0;
    var checkbit = 0;
    var seq = 0;
    var digit = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var frm = obj.val();

    //특수 문자 사용 금지
    if ( ! specificUseridCheck(obj) ) {
        alert("은행이체비밀번호로 특수문자를 사용하실 수 없습니다.\n\n다시 한번 입력해 주시기 바랍니다.");
        obj.val("");
        obj.focus();
        return false;
    }

    //자리수 제한   (8자리)
    if (obj.val().length != 8){
        alert("은행이체비밀는 8자리로 입력하셔야 합니다.\n\n다시 한번 입력해 주시기 바랍니다.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //숫자로만 된 아이디 사용금지
    var numCnt = 0;
    for(i=0;i<obj.val().length;i++) {
        if(obj.val().charAt(i) >= '0' && obj.val().charAt(i) <= '9'){
            numCnt++;
        }
        else {
            break;
        }
    }
    if (numCnt == obj.val().length) {
        alert("은행이체비밀번호는 영문자와 숫자 조합으로 구성되어야 합니다.\n\n다시 한번 입력해 주시기 바랍니다.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //동일한 문자와 숫자 사용 불가
    for(i=0;i<obj.val().length;i++) {
        for(j=0;j<obj.val().length;j++) {
            if(obj.val().charAt(i) == obj.val().charAt(j)){
                k++;
            }
        }
    }
    checkbit = obj.val().length * obj.val().length;

    if(k == checkbit) {
        alert("은행이체비밀번호는 동일한 문자와 숫자 사용하실 수 없습니다.\n\n다시 한번 입력해 주시기 바랍니다.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //연속문자 사용불가
    for(j=0;j<digit.length;j++) {
        if(obj.val().charAt(0) == digit.charAt(j)) {
            seq = j;
            break;
        }
    }

    for(i=0;i<obj.val().length-1;i++)   {
        if(obj.val().charAt(i+1) == (digit.charAt(seq+1))) {
            nchkcnt++;
        }
            seq++;
    }

    if(nchkcnt == (obj.val().length - 1)){
        alert("은행이체비밀번호는 연속된 문자나 숫자를 사용하실 수 없습니다.\n\n다시 한번 입력해 주시기 바랍니다.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //특수문자 사용금지
    for(i=0;i<obj.val().length;i++){
        if(!((obj.val().charAt(i) >= '0' &&  obj.val().charAt(i) <= '9') || (obj.val().charAt(i) >= 'a' &&  obj.val().charAt(i) <= 'z')|| (obj.val().charAt(i) >= 'A' &&  obj.val().charAt(i) <= 'Z'))){
            alert("은행이체비밀번호는 특수문자를 사용하실 수 없습니다.\n\n다시 한번 입력해 주시기 바랍니다.");
            obj.val("");
            obj.focus();
            return false ;
        }
    }
    return true;
}


// 사용자 id/비밀번호 사용 제한 문자열 체크
function specificUseridCheck(obj){
    specificUseridList = new Array("guest", "gilson", "sonnim", "bestez", "qway", "test");

    for ( var i=0;i<specificUseridList.length;i++  ) {
        if ( obj.val().toLowerCase().substring(0, specificUseridList[i].length) == specificUseridList[i] ) {
            return false;
        }
    }
    return true;
}

// 숫자와 알파벳 만 사용 체크
function isValidNumberAlpha(el) { 
	strformat =  /^[A-Za-z0-9]*$/
	ckresult = el.value.match(strformat);
	if ( (ckresult == null) )
	{
		return doError(el,"숫자, 영문 문자만 사용할 수 있습니다.");
	}
	return true;
}

/**
 * 투자자적합성 체크 및 팝업
 * 
 * @param myInvest 내투자성향 (01:성장형,02:성장추구형,03:위험중립형,04:안정추구형,05:안정형) - 필수
 * @param myNoti 투자권유등급 (1:투자권유희망(고객정보제공),2:투자권유불원(고객정보제공),3:투자권유불원(고객정보미제공)) - 필수
 * @param goodNm	상품명, 없으면 ''
 * @param goodInvest	상품위험등급(01:초고위험,02:고위험,03:중위험,04:저위험,05:초저위험),  - 선물옵션계좌 개설,해외파생계좌 개설,ELW매매거래신청/해지 은 강제로 01, 분산투자가 있는 종목은 가장높은등급
 * @param isDiv	파생여부(Y:파생상품,N:일반상품) - 선물옵션계좌 개설,해외파생계좌 개설,ELW매매거래신청/해지 은 강제로 Y, 분산투자가 있는 종목은 파생이 하나라도 있으면 Y
 * @param ctnd_id		컨텐츠 아이디
 * @param itemParam		분산투자정보 파람, 없으면 ''
 * @param procEnblYn		AP(M01OI07  금융상품 계좌 종목별 투자적합성 체크)에서 전달해주는 작업 가능여부(등급 over여부, 있는 경우만,없으면 '')
 * @param backLink			화면 막을때 넘겨야할 주소 url, 없으면 '' , 메인으로 넘김
 * @param goodInvest	 상품위험등급 화면에서 넘길때 06(3고위험) -> 02(2고위험)으로 컨버팅해서 넘겨야함
 */
function investCheck(myInvest,myNoti,goodNm,goodInvest,isDiv,ctnd_id,itemParam,procEnblYn,backLink){
	/*
	hks4317c04_4	miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞연금저축 약관동의
	hks4317c04_5	miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞파워적립식펀드 약관동의
	hks4317c04_6	miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞파워적립식주식 약관동의
	hks4317c04_7	miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞재형저축펀드 약관동의
	hks4317c04_9	miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞소득공제장기펀드 약관동의
	hku4104c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞선물옵션계좌 개설
	hku4106c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞해외파생계좌 개설
	hku4107c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞EUREX연계 코스피200 옵션선물계좌 개설
	hku4003c12  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞파워적립식펀드 개설
	hku4170c01  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞연금저축투자신탁계좌 개설
	hku4192c01  	miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞해외주식투자전용펀드저축계좌개설
	
	hku4029c01_1	miraeassetdaewoo＞뱅킹관리/대출/청약＞매매거래신청/해지＞ELW매매거래신청/해지＞ELW매매거래신청/해지 투자설명서 확인
	hku4033c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞대출＞약정등록＞신용거래
	
	hku4028c02  	miraeassetdaewoo＞뱅킹관리/대출/청약＞고객정보관리＞투자자정보확인서＞투자자정보확인서 확인
	
	hku4189c02  	miraeassetdaewoo＞금융상품＞연금저축/IRP＞연금저축 신용카드 서비스＞연금저축 신용카드 서비스
	
	hks4049v03_03	miraeassetdaewoo＞금융상품＞펀드＞펀드매수
	
	hku4044c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞청약＞공모주청약＞공모주청약 신청
	hku4046c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞청약＞실권주청약＞실권주청약
	hku4047c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞청약＞ELS/DLS청약＞ELS/DLS청약 취소/거래내역
	hku4048c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞청약＞사채청약＞사채청약
	hku4150c03  	miraeassetdaewoo＞뱅킹관리/대출/청약＞청약＞유상청약＞유상청약 완료
	
	*/
	var isOver = false;
	
	// 펀드 상품등급 06 추가 2016.11.25
	if( goodInvest == '06') goodInvest = '02';
	
	if(myInvest=='')		myInvest='05';
	if(goodInvest=='') 	goodInvest='05';
	if(myInvest>goodInvest) isOver = true;
	if(procEnblYn!='')	isOver=(procEnblYn=='Y');
	if(backLink=='')		backLink='/main.do';
	
	/*신용약정시*/
	/*신용약정시 업무프로세스 변경 2등급 미만 불가 -> 전체가능으로 변경(2등급 부적합-> 2~5등급 부적합) 2017.05.10 조남준 */
	if(ctnd_id=='hku4033c03'){	
		/*성장형-팝업없음 , 그외 부적합팝업 후 약정가능*/
		if(myNoti=='1' || myNoti=='2'){
			if(myInvest=='01'){
			}
			else{
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
			/*else{
				investPopFail('투자자 정보확인서가 성장추구형 이하인 고객님은 신용약정을 진행하실 수 없습니다.\n투자자정보확인서를 수정하시겠습니까?','/hku/hku4033/c01.do');
				return;
			}*/
		}
		else if( myNoti=='3'){
			investPopFail('투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다. 정보미제공의 경우 신용약정이 불가능합니다\n투자자정보확인서를 수정하시겠습니까?','/hku/hku4033/c01.do');
			return;
		}
	}
	/*ELW매매거래신청*/
	else if(ctnd_id=='hku4029c01_1'){	
		/*투자권유희망 성장형 popup없음, 그외 부적합 파생상품*/
		if(myNoti=='1' ){
			if(myInvest!='01'){
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		}
		/*투자권유불원 성장형 popup없음, 그외 부적정 파생상품*/
		else if(myNoti=='2' ){
			if(myInvest!='01'){
				investPop('2',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		}
		else if( myNoti=='3'){
			investPopFail('투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다. 정보미제공의 경우 ELW매매거래신청이 불가능합니다.\n투자자정보확인서를 수정하시겠습니까?','/hku/hku4033/c01.do');
			return;
		}
	}
	/*계좌개설시*/
	/*
	else if(
		ctnd_id=='hks4317c04_4'	||	//miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞연금저축 약관동의
		ctnd_id=='hks4317c04_5'	||	//miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞파워적립식펀드 약관동의
		ctnd_id=='hks4317c04_6'	||	//miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞파워적립식주식 약관동의
		ctnd_id=='hks4317c04_7'	||	//miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞재형저축펀드 약관동의
		ctnd_id=='hks4317c04_9'	||	//miraeassetdaewoo＞금융상품＞추천상품＞법인서비스, 다함께＞상품별동의 분기＞소득공제장기펀드 약관동의
		ctnd_id=='hku4104c03'		||	//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞선물옵션계좌 개설
		ctnd_id=='hku4106c03'		||	//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞해외파생계좌 개설
		ctnd_id=='hku4107c03'		||	//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞EUREX연계 코스피200 옵션선물계좌 개설
		ctnd_id=='hku4003c12'		||	//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞파워적립식펀드 개설
		ctnd_id=='hku4170c01'		||	//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞연금저축투자신탁계좌 개설
		ctnd_id=='hku4192c01'				//miraeassetdaewoo＞뱅킹관리/대출/청약＞계좌개설/ID＞온라인 계좌개설＞해외주식투자전용펀드저축계좌개설			
	){	
		//성장형 popup없음, 상장추구형>부적합팝업, 그외 약정불가
		if(myNoti=='1'){
			if(isOver){
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		} 
		else if(myNoti=='2'){
			if(isOver && isDiv == 'Y' ){
				investPop('2',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		}
		else if(myNoti=='3'){
			if( isDiv == 'Y' ){
				investPopFail('투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다. 정보미제공의 경우 파생상품의 매수 및 매수예약이 불가능합니다.\n투자자정보확인서를 수정하시겠습니까?','/hku/hku4033/c01.do');
				return;
			}
		}
	}
	*/
	/*공통*/
	else{
		/*성장형 popup없음, 상장추구형>부적합팝업, 그외 약정불가*/
		console.log("============myNoti============="+myNoti);
		console.log("============investCheck 1============="+typeof backLink);
		
		// myNoti : 투자권유등급 (1:투자권유희망(고객정보제공),2:투자권유불원(고객정보제공),3:투자권유불원(고객정보미제공))
		if(myNoti=='1'){
			if(isOver){
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}else{
				// 펀드에서 backLink 에 callback 함수 받는경우				
				if(typeof backLink == "function"){					
					backLink(true);
					return;
				}
			}				
		} 
		else if(myNoti=='2'){
			if(isOver && isDiv == 'Y' ){
				investPop('2',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}else{
				if(typeof backLink == "function"){					
					backLink(true);
					return;
				}
			}
		}
		else if(myNoti=='3'){
			if( isDiv == 'Y' ){ //파생상품
				var msgTxt = ''; //페이지별 메시지분기
				if(ctnd_id=='hku4047v02_2') msgTxt = '투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다.\n정보미제공의 경우 청약이 불가능합니다.\n투자자정보확인서를 다시 작성해주세요.';
				else						msgTxt = '투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다.\n정보미제공의 경우 파생상품펀드의 매수 및 매수예약이 불가능합니다.\n투자자정보확인서를 다시 작성해주세요.';
				investPopFail(msgTxt,backLink);
				return;
			}else{				//일반 상품
				if(typeof backLink == "function"){					
					backLink(true);
					return;
				}		
			}
		}
		// 그 외 경우 //
		else	{
			alert("투자권유등급이 잘못되었습니다.");
			console.log("M01OI07 투자권유 등급 값 오류 : " + myNoti);
		}
	}
}

function investPop(popsect,myInvest,myNoti,goodNm,goodInvest,itemParam){
	var otp = 'width:517px; height:460px;';
	//부적합
	if(popsect=='1'){
		if(myInvest!=''&&goodNm!='') otp = 'width:720px; height:830px;'; // otp = 'width:517px; height:630px;';
		else otp = 'width:720px; height:730px;'; //otp = 'width:517px; height:550px;';
		//window.open('/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam, 'info', 'width=500,height=448,scrollbars=no,location=0,status=0');
        //addLayerPop('investPopLayer','/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+encodeURIComponent(itemParam),otp);
        addLayerPop('investPopLayer','/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam,otp);
	} 
	//부적정 
	else if(popsect=='2'){
		if(myInvest!=''&&goodNm!='') otp = 'width:720px; height:830px;'; // otp = 'width:517px; height:630px;';
		else otp = 'width:720px; height:730px;'; // otp = 'width:517px; height:550px;';
		//window.open('/hku/hku4033/p04.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam, 'info', 'width=500,height=448,scrollbars=no,location=0,status=0');
        addLayerPop('investPopLayer','/hku/hku4033/p04.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam,otp);
	}
}

function investPopFail(msg,link){
	if(msg=='') msg ='투자자정보 확인 등급에 따라 거래가 제한됩니다.\n투자자정보확인서를 작성하시겠습니까?';
	if(link=='') link ='/main.do';
	if(link!='isQway'){
		if(confirm(msg)){
			if(typeof link == "function"){					
				link(false);
				return;
			}else{
				openHp('/hku/hku4028/c01.do',true);
			}
		}else{
			if(typeof link == "function"){					
				link(false);
				return;
			}else{
				openHp(link,true);
			}
		}
	}else{
		try{
			alert("투자자정보확인서의 투자권유여부를 정보미제공으로 입력하셨습니다. 정보미제공의 경우 파생상품의 매수 및 매수예약이 불가능합니다.");
			location.href="downflag=N";
		}catch(e){}
	}
}

function addLayerPop(title,link,otp){
	if(title=='') title='investPopLayer';
	
	var popHtml ='<div id="'+title+'" style="z-index:100001 ;overflow:hidden;' +otp+ ' position:absolute; left:50%; margin-left:-200px; top:300px; background:#fff;display:none">';
	popHtml 	+='<iframe id="iframePop" src="'+link+'" style="' +otp+ '" frameborder="0" scroll="no">';
	popHtml 	+='</div>';

	$('#contents').append(popHtml);
	
	$.openPopupLayer({
		name: title,
		width: 720,
		top: 300,
		target: title
	});
}


function removeLayerPop(title){	
	if(title=='' || title == 1 || title == 2){	
		title='investPopLayer';
	}	
	$.closePopupLayer(title);
}

