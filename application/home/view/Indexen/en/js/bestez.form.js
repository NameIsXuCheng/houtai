

var funcs = {};
funcs['nospace'			] = isNoSpace;					/* ������� */
funcs['email'			] = isValidEmail;				/* �̸��ϰ˻� */
funcs['emailfirst'		] = isValidEmailFirst;			/* �̸��� ���ڸ� */
funcs['phone'			] = isValidPhone;				/* ��ȭ��ȣ */
funcs['userid'			] = isValidUserid;				/* ���̵� */
funcs['hangul'			] = hasHangul;					/* �ѱ� */
funcs['number'			] = isNumeric;					/* ���� */
funcs['engonly'			] = alphaOnly;					/* ���� */
funcs['hangulonly'		] = hangulOnly;					/* �ѱ� */
funcs['jumin'			] = isValidJumin;				/* �ֹι�ȣ */
funcs['bizno'			] = isValidBizNo;				/* ����ڹ�ȣ */
funcs['pw'				] = isValidPassword;			/* ��й�ȣ */
funcs['accountpw'		] = isValidAccountPassword;		/* ���� ��й�ȣ */
funcs['accountpw_en'	] = isValidAccountPasswordEn;	/* ����Ȩ���������� ��� ���� ��й�ȣ */
funcs['yyyy'			] = isValidYYYY;				/* ����� ���� üũ */
funcs['yyyymm'			] = isValidYYYYMM;				/* ��� ���� üũ */
funcs['yyyymmdd'		] = isValidYYYYMMDD;			/* ��, ���� üũ */
funcs['money'			] = isValidMoney;				/* �ݾ� ���� üũ (����, 0, �Ҽ��� ���ϴ� ��ȿ���� ����) */
funcs['price'			] = isValidPrice;				/* �ܰ� ���� üũ (����, 0, �Ҽ��� 3�ڸ� ���ϴ� ��ȿ���� ����) */
funcs['jongmokcode'		] = isValidJongmokCode;			/* �ֽ� �����ڵ� check(Null üũ, ����/������ 6�ڸ�) */
funcs['jongmokcode_en'	] = isValidJongmokCodeEn;		/* ����Ȩ���������� ��� �ֽ� �����ڵ� check(Null üũ, ����/������ 6�ڸ�) */
funcs['todayover'		] = isValidTodayOver;			/* YYYYMMDD������ ���� ���ó��ڿ� ���Ͽ� ����, ���� �������� üũ */
funcs['numberalpha'		] = isValidNumberAlpha;			/* ����, ���� ���ڿ��� ��� üũ */

var NO_BLANK 	= "{name+����} �Է��Ͽ� �ֽʽÿ�";
var NO_SELECT 	= "{name+����} �����Ͽ��ֽʽÿ�";
var NOT_VALID 	= "{name+�̰�} �ùٸ��� �ʽ��ϴ�";
var TOO_LONG 	= "{name}�� ���̰� �ʰ��Ǿ����ϴ� (�ִ� {maxbyte}����Ʈ)";
var TOO_SHORT 	= "{name}�� ���̰� �����մϴ� (�ּ� {minbyte}����Ʈ)";

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
				if (el.value != null && el.value != "" && el.type!="file") {//2016.09.05 ������ �߰�
					el.value = el.value.trim();
				}
				
				//$REQUIRED : �ʼ���
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
				
				//$MAXBYTE : �ִ� ����Ʈ ����
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
				//$MINBYTE : �ּ� ����Ʈ ����
				if (el.getAttribute("MINBYTE") != null && el.value != "") {
					var len = el.value.getBytes();
					if (len < parseInt(el.getAttribute("MINBYTE"))) {
						minbyte = el.getAttribute("MINBYTE");
						return doError(el,TOO_SHORT,"",minbyte);
					}
				}
				
				//option="" : �ҽ� ���� �ɼ� ����Ʈ ����.
				if (el.getAttribute("OPTION") != null && el.value != "") {
					if (el.getAttribute("NAME") != null && el.getAttribute("NAME").toUpperCase() == 'ACCOUNTPASSWORD' && el.value == '****') { 
						return true;
					}
					if (funcs[el.getAttribute("OPTION").toLowerCase()] != undefined && !funcs[el.getAttribute("OPTION").toLowerCase()](el)) 
						return false;
				}
				
				//$FILETYPE : input file�� ��� ���� Ȯ���� üũ.
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
							nameString = "{name+�̰�} ";
						}
						return doError(el,nameString+"������ ���� ������ �ƴմϴ�.");
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
	var pattern = /{([a-zA-Z0-9_]+)\+?([��-��]{2})?}/;
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
* ���� �˻� �Լ���
******************************************************************************/

function isValidAccountPassword(el) {
	var strformat = /^[0-9]{4}$/;
	if(!el.value=="****"){
		ckresult = el.value.match(strformat);
		if( ckresult == null )
		{
			return doError(el,"���� ��й�ȣ�� ��� �ְų� ��ȿ���� �ʴ� ���ڰ� �ֽ��ϴ�. (����4�ڸ�)");
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
		return doError(el,"�����ڵ� �׸��� ��� �ְų� ��ȿ���� �ʴ� ���ڰ� �ֽ��ϴ�");
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
    	return doError(el,"{name}�� ���� ������ ��¥�� �����Ͻ� �� �����ϴ�.");
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
		return doError(el,"{name} �ܰ��ݾ׿� ��ȿ���� �ʴ� ���ڰ� �ֽ��ϴ�.");
	return true;
}

function isValidMoney(el) { 
	re = /(^[0-9](\d{0,2})?(,\d{3})*$)|(^\d+$)/;	// 12,000,000 or 12000000
	if ( ! re.exec(el.value) )
		return doError(el,"{name} �ݾ׿� ��ȿ���� �ʴ� ���ڰ� �ֽ��ϴ�.");
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
		return doError(el,"���������� �ùٸ��� �ʽ��ϴ�");

	return true;
}

function isValidYYYYMM(el) { 
	var s = el.value;
	dateformat1 = /^[1-2][0-9][0-9][0-9]\.[0-1][0-9]$/;  // 2000.04
	dateformat2 = /^[1-2][0-9][0-9][0-9]\.[1-9]$/;       // 2000.4

	ckdate1 = s.match(dateformat1);
	ckdate2 = s.match(dateformat2);

	if ( (ckdate1 == null) && (ckdate2 == null)  )
		return doError(el,"���������� �ùٸ��� �ʽ��ϴ�");

	return true;
}

function isValidYYYY(el) { 
	var s = el.value;
	dateformat1 = /^[1-2][0-9][0-9][0-9]$/;  // 2000.04
	ckdate1 = s.match(dateformat1);

	if (ckdate1 == null)
		return doError(el,"���������� �ùٸ��� �ʽ��ϴ�");

	return true;
}

	
function isNoSpace(el) {
	var pattern = /[\s]/;
	return (!pattern.test(el.value)) ? true : doError(el,"{name+����} ���� ���� �Է����ֽñ� �ٶ��ϴ�");
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
	return (pattern.test(el.value)) ? true : doError(el,"{name+����} 4���̻� 12�� �̸��̾�� �ϰ�,\n ����,����, _ ���ڸ� ����� �� �ֽ��ϴ�");
}

function isNoHangulbyValue(el) {
	var pattern = /[��-��]/;
	var splitValue = el.value.split('\\');
	var filename = splitValue[splitValue.length-1];
	
	return (!pattern.test(filename)) ? true : doError(el,"÷�����ϸ�(" + filename + ")���� �ѱ��� ����� �� �����ϴ�.");
}

function hasHangul(el) {
	var pattern = /[��-��]/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+����} �ݵ�� �ѱ��� �����ؾ� �մϴ�");
}
function hangulOnly(el) {
	var pattern = /^[��-��]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+����} �ѱ۸� �Է°��� �մϴ�");
}

function alphaOnly(el) {
	var pattern = /^[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}

function isNumeric(el) {
	var pattern = /^[0-9]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+����} �ݵ�� ���ڷθ� �Է��ؾ� �մϴ�");
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
	return (pattern.test(el.value)) ? true : doError(el,"{name+����} �ݵ�� ���ڷθ� �Է��ؾ� �մϴ�");
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
	
	// ���ϼ��� �Ǵ� ���� �˻�
	chk = el.value.charAt(0);
	for(i=1;i<passwd.length;i++){
	    if(chk == passwd.charAt(i)) cnt++;
	}

	if ( cnt == passwd.length-1 ){
		return true;
	}
	cnt = 0;

	// ���Ӽ��� �Ǵ� ���� �˻�
	chk = passwd.charAt(0);
	var cnt1 = 0; //��������
	for(i=1;i<passwd.length;i++){
		// ������
	    if( (chk.charCodeAt(0)+i) == passwd.charCodeAt(i) ) cnt++;

	    // ������
	    if( (chk.charCodeAt(0)-i) == passwd.charCodeAt(i) )cnt1++;
	}

	if ( cnt == passwd.length-1 || cnt1 == passwd.length -1){
		return true;
	}
	return doError(el,"��й�ȣ�� �ùٸ� ������ �ƴմϴ�.");
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
	
	if (count > maxlen) {alert('�ִ� ' + maxlen + '������ ���� ���� �մϴ�'); 
		arr.checked = false; 
	}	
}

// ����� id ��ȿ�� üũ
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
        alert("���Բ��� ����ϰ��� �ϴ� ID�� �Է��ϼ���!");
        obj.focus();
        return false;
    }

    //Ư�� ���̵� ��� ����
    if (! specificUseridCheck(obj) ) {
        alert("�ش� ID�� ����� ���ѵ� ID�Դϴ�. \n\n���ο� ID�� �Է��� �ֽñ� �ٶ��ϴ�!");
        obj.val("");
        obj.focus();
        return false;
    }

    //�ڸ��� ����   (6~8�ڸ�) -> (4~8�ڸ�: ���� (2016.10.30 ������))
    if (objStr.length < 4 || objStr.length > 8){
        alert("����� ID�� �����ڿ� ���� �������� 4~8�ڸ��� �Է��ϼž� �մϴ�!");
        obj.focus();
        return false ;
    }

    //���ڷθ� �� ���̵� ������
    var numCnt = 0;
    for(i=0;i<objStr.length;i++){
        if(objStr.charAt(i) >= '0' && objStr.charAt(i) <= '9')
            numCnt++;
        else
            break;
    }
    if (numCnt == objStr.length) {
        alert("����� ID�� �����ڿ� ���� �������� �����Ǿ�� �մϴ�!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //������ ���ڿ� ���� ��� �Ұ�
    for(i=0;i<objStr.length;i++) {
        for(j=0;j<objStr.length;j++) {
            if(objStr.charAt(i) == objStr.charAt(j)){
                k++;
            }
        }
    }

    checkbit = objStr.length * objStr.length;

    if(k == checkbit) {
        alert("����� ID�� ������ ���ڿ� ���� ����Ͻ� �� �����ϴ�!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //���ӹ��� ���Ұ�
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
        alert("����� ID�� ���ӵ� ���ڳ� ���ڸ� ����Ͻ� �� �����ϴ�!");
        obj.val("");
        obj.focus();
        return false ;
    }

    //Ư������ ������
    for(i=0;i<objStr.length;i++){
        if(!((objStr.charAt(i) >= '0' &&  objStr.charAt(i) <= '9') || (objStr.charAt(i) >= 'a' &&  objStr.charAt(i) <= 'z')|| (objStr.charAt(i) >= 'A' &&  objStr.charAt(i) <= 'Z'))){
            alert("����� ID�� Ư�����ڸ� ����Ͻ� �� �����ϴ�!");
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

    //Ư�� ���� ��� ����
    if ( ! specificUseridCheck(obj) ) {
        alert("������ü��й�ȣ�� Ư�����ڸ� ����Ͻ� �� �����ϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
        obj.val("");
        obj.focus();
        return false;
    }

    //�ڸ��� ����   (8�ڸ�)
    if (obj.val().length != 8){
        alert("������ü��д� 8�ڸ��� �Է��ϼž� �մϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //���ڷθ� �� ���̵� ������
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
        alert("������ü��й�ȣ�� �����ڿ� ���� �������� �����Ǿ�� �մϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //������ ���ڿ� ���� ��� �Ұ�
    for(i=0;i<obj.val().length;i++) {
        for(j=0;j<obj.val().length;j++) {
            if(obj.val().charAt(i) == obj.val().charAt(j)){
                k++;
            }
        }
    }
    checkbit = obj.val().length * obj.val().length;

    if(k == checkbit) {
        alert("������ü��й�ȣ�� ������ ���ڿ� ���� ����Ͻ� �� �����ϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //���ӹ��� ���Ұ�
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
        alert("������ü��й�ȣ�� ���ӵ� ���ڳ� ���ڸ� ����Ͻ� �� �����ϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
        obj.val("");
        obj.focus();
        return false ;
    }

    //Ư������ ������
    for(i=0;i<obj.val().length;i++){
        if(!((obj.val().charAt(i) >= '0' &&  obj.val().charAt(i) <= '9') || (obj.val().charAt(i) >= 'a' &&  obj.val().charAt(i) <= 'z')|| (obj.val().charAt(i) >= 'A' &&  obj.val().charAt(i) <= 'Z'))){
            alert("������ü��й�ȣ�� Ư�����ڸ� ����Ͻ� �� �����ϴ�.\n\n�ٽ� �ѹ� �Է��� �ֽñ� �ٶ��ϴ�.");
            obj.val("");
            obj.focus();
            return false ;
        }
    }
    return true;
}


// ����� id/��й�ȣ ��� ���� ���ڿ� üũ
function specificUseridCheck(obj){
    specificUseridList = new Array("guest", "gilson", "sonnim", "bestez", "qway", "test");

    for ( var i=0;i<specificUseridList.length;i++  ) {
        if ( obj.val().toLowerCase().substring(0, specificUseridList[i].length) == specificUseridList[i] ) {
            return false;
        }
    }
    return true;
}

// ���ڿ� ���ĺ� �� ��� üũ
function isValidNumberAlpha(el) { 
	strformat =  /^[A-Za-z0-9]*$/
	ckresult = el.value.match(strformat);
	if ( (ckresult == null) )
	{
		return doError(el,"����, ���� ���ڸ� ����� �� �ֽ��ϴ�.");
	}
	return true;
}

/**
 * ���������ռ� üũ �� �˾�
 * 
 * @param myInvest �����ڼ��� (01:������,02:�����߱���,03:�����߸���,04:�����߱���,05:������) - �ʼ�
 * @param myNoti ���ڱ������ (1:���ڱ������(����������),2:���ڱ����ҿ�(����������),3:���ڱ����ҿ�(������������)) - �ʼ�
 * @param goodNm	��ǰ��, ������ ''
 * @param goodInvest	��ǰ������(01:�ʰ�����,02:������,03:������,04:������,05:��������),  - �����ɼǰ��� ����,�ؿ��Ļ����� ����,ELW�ŸŰŷ���û/���� �� ������ 01, �л����ڰ� �ִ� ������ ����������
 * @param isDiv	�Ļ�����(Y:�Ļ���ǰ,N:�Ϲݻ�ǰ) - �����ɼǰ��� ����,�ؿ��Ļ����� ����,ELW�ŸŰŷ���û/���� �� ������ Y, �л����ڰ� �ִ� ������ �Ļ��� �ϳ��� ������ Y
 * @param ctnd_id		������ ���̵�
 * @param itemParam		�л��������� �Ķ�, ������ ''
 * @param procEnblYn		AP(M01OI07  ������ǰ ���� ���� �������ռ� üũ)���� �������ִ� �۾� ���ɿ���(��� over����, �ִ� ��츸,������ '')
 * @param backLink			ȭ�� ������ �Ѱܾ��� �ּ� url, ������ '' , �������� �ѱ�
 * @param goodInvest	 ��ǰ������ ȭ�鿡�� �ѱ涧 06(3������) -> 02(2������)���� �������ؼ� �Ѱܾ���
 */
function investCheck(myInvest,myNoti,goodNm,goodInvest,isDiv,ctnd_id,itemParam,procEnblYn,backLink){
	/*
	hks4317c04_4	miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�������� �������
	hks4317c04_5	miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�Ŀ��������ݵ� �������
	hks4317c04_6	miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�Ŀ��������ֽ� �������
	hks4317c04_7	miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾���������ݵ� �������
	hks4317c04_9	miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�ҵ��������ݵ� �������
	hku4104c03  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°����������ɼǰ��� ����
	hku4106c03  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������ؿ��Ļ����� ����
	hku4107c03  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°�����EUREX���� �ڽ���200 �ɼǼ������� ����
	hku4003c12  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������Ŀ��������ݵ� ����
	hku4170c01  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°����������������ڽ�Ź���� ����
	hku4192c01  	miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������ؿ��ֽ����������ݵ�������°���
	
	hku4029c01_1	miraeassetdaewoo����ŷ����/����/û�ࣾ�ŸŰŷ���û/������ELW�ŸŰŷ���û/������ELW�ŸŰŷ���û/���� ���ڼ��� Ȯ��
	hku4033c03  	miraeassetdaewoo����ŷ����/����/û�ࣾ���⣾������ϣ��ſ�ŷ�
	
	hku4028c02  	miraeassetdaewoo����ŷ����/����/û�ࣾ����������������������Ȯ�μ�������������Ȯ�μ� Ȯ��
	
	hku4189c02  	miraeassetdaewoo��������ǰ����������/IRP���������� �ſ�ī�� ���񽺣��������� �ſ�ī�� ����
	
	hks4049v03_03	miraeassetdaewoo��������ǰ���ݵ壾�ݵ�ż�
	
	hku4044c03  	miraeassetdaewoo����ŷ����/����/û�ࣾû�ࣾ������û�ࣾ������û�� ��û
	hku4046c03  	miraeassetdaewoo����ŷ����/����/û�ࣾû�ࣾ�Ǳ���û�ࣾ�Ǳ���û��
	hku4047c03  	miraeassetdaewoo����ŷ����/����/û�ࣾû�ࣾELS/DLSû�ࣾELS/DLSû�� ���/�ŷ�����
	hku4048c03  	miraeassetdaewoo����ŷ����/����/û�ࣾû�ࣾ��äû�ࣾ��äû��
	hku4150c03  	miraeassetdaewoo����ŷ����/����/û�ࣾû�ࣾ����û�ࣾ����û�� �Ϸ�
	
	*/
	var isOver = false;
	
	// �ݵ� ��ǰ��� 06 �߰� 2016.11.25
	if( goodInvest == '06') goodInvest = '02';
	
	if(myInvest=='')		myInvest='05';
	if(goodInvest=='') 	goodInvest='05';
	if(myInvest>goodInvest) isOver = true;
	if(procEnblYn!='')	isOver=(procEnblYn=='Y');
	if(backLink=='')		backLink='/main.do';
	
	/*�ſ������*/
	/*�ſ������ �������μ��� ���� 2��� �̸� �Ұ� -> ��ü�������� ����(2��� ������-> 2~5��� ������) 2017.05.10 ������ */
	if(ctnd_id=='hku4033c03'){	
		/*������-�˾����� , �׿� �������˾� �� ��������*/
		if(myNoti=='1' || myNoti=='2'){
			if(myInvest=='01'){
			}
			else{
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
			/*else{
				investPopFail('������ ����Ȯ�μ��� �����߱��� ������ ������ �ſ������ �����Ͻ� �� �����ϴ�.\n����������Ȯ�μ��� �����Ͻðڽ��ϱ�?','/hku/hku4033/c01.do');
				return;
			}*/
		}
		else if( myNoti=='3'){
			investPopFail('����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�. ������������ ��� �ſ������ �Ұ����մϴ�\n����������Ȯ�μ��� �����Ͻðڽ��ϱ�?','/hku/hku4033/c01.do');
			return;
		}
	}
	/*ELW�ŸŰŷ���û*/
	else if(ctnd_id=='hku4029c01_1'){	
		/*���ڱ������ ������ popup����, �׿� ������ �Ļ���ǰ*/
		if(myNoti=='1' ){
			if(myInvest!='01'){
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		}
		/*���ڱ����ҿ� ������ popup����, �׿� ������ �Ļ���ǰ*/
		else if(myNoti=='2' ){
			if(myInvest!='01'){
				investPop('2',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}
		}
		else if( myNoti=='3'){
			investPopFail('����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�. ������������ ��� ELW�ŸŰŷ���û�� �Ұ����մϴ�.\n����������Ȯ�μ��� �����Ͻðڽ��ϱ�?','/hku/hku4033/c01.do');
			return;
		}
	}
	/*���°�����*/
	/*
	else if(
		ctnd_id=='hks4317c04_4'	||	//miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�������� �������
		ctnd_id=='hks4317c04_5'	||	//miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�Ŀ��������ݵ� �������
		ctnd_id=='hks4317c04_6'	||	//miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�Ŀ��������ֽ� �������
		ctnd_id=='hks4317c04_7'	||	//miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾���������ݵ� �������
		ctnd_id=='hks4317c04_9'	||	//miraeassetdaewoo��������ǰ����õ��ǰ�����μ���, ���Բ�����ǰ������ �б⣾�ҵ��������ݵ� �������
		ctnd_id=='hku4104c03'		||	//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°����������ɼǰ��� ����
		ctnd_id=='hku4106c03'		||	//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������ؿ��Ļ����� ����
		ctnd_id=='hku4107c03'		||	//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°�����EUREX���� �ڽ���200 �ɼǼ������� ����
		ctnd_id=='hku4003c12'		||	//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������Ŀ��������ݵ� ����
		ctnd_id=='hku4170c01'		||	//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°����������������ڽ�Ź���� ����
		ctnd_id=='hku4192c01'				//miraeassetdaewoo����ŷ����/����/û�ࣾ���°���/ID���¶��� ���°������ؿ��ֽ����������ݵ�������°���			
	){	
		//������ popup����, �����߱���>�������˾�, �׿� �����Ұ�
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
				investPopFail('����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�. ������������ ��� �Ļ���ǰ�� �ż� �� �ż������� �Ұ����մϴ�.\n����������Ȯ�μ��� �����Ͻðڽ��ϱ�?','/hku/hku4033/c01.do');
				return;
			}
		}
	}
	*/
	/*����*/
	else{
		/*������ popup����, �����߱���>�������˾�, �׿� �����Ұ�*/
		console.log("============myNoti============="+myNoti);
		console.log("============investCheck 1============="+typeof backLink);
		
		// myNoti : ���ڱ������ (1:���ڱ������(����������),2:���ڱ����ҿ�(����������),3:���ڱ����ҿ�(������������))
		if(myNoti=='1'){
			if(isOver){
				investPop('1',myInvest,myNoti,goodNm,goodInvest,itemParam);
			}else{
				// �ݵ忡�� backLink �� callback �Լ� �޴°��				
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
			if( isDiv == 'Y' ){ //�Ļ���ǰ
				var msgTxt = ''; //�������� �޽����б�
				if(ctnd_id=='hku4047v02_2') msgTxt = '����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�.\n������������ ��� û���� �Ұ����մϴ�.\n����������Ȯ�μ��� �ٽ� �ۼ����ּ���.';
				else						msgTxt = '����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�.\n������������ ��� �Ļ���ǰ�ݵ��� �ż� �� �ż������� �Ұ����մϴ�.\n����������Ȯ�μ��� �ٽ� �ۼ����ּ���.';
				investPopFail(msgTxt,backLink);
				return;
			}else{				//�Ϲ� ��ǰ
				if(typeof backLink == "function"){					
					backLink(true);
					return;
				}		
			}
		}
		// �� �� ��� //
		else	{
			alert("���ڱ�������� �߸��Ǿ����ϴ�.");
			console.log("M01OI07 ���ڱ��� ��� �� ���� : " + myNoti);
		}
	}
}

function investPop(popsect,myInvest,myNoti,goodNm,goodInvest,itemParam){
	var otp = 'width:517px; height:460px;';
	//������
	if(popsect=='1'){
		if(myInvest!=''&&goodNm!='') otp = 'width:720px; height:830px;'; // otp = 'width:517px; height:630px;';
		else otp = 'width:720px; height:730px;'; //otp = 'width:517px; height:550px;';
		//window.open('/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam, 'info', 'width=500,height=448,scrollbars=no,location=0,status=0');
        //addLayerPop('investPopLayer','/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+encodeURIComponent(itemParam),otp);
        addLayerPop('investPopLayer','/hku/hku4033/p02.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam,otp);
	} 
	//������ 
	else if(popsect=='2'){
		if(myInvest!=''&&goodNm!='') otp = 'width:720px; height:830px;'; // otp = 'width:517px; height:630px;';
		else otp = 'width:720px; height:730px;'; // otp = 'width:517px; height:550px;';
		//window.open('/hku/hku4033/p04.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam, 'info', 'width=500,height=448,scrollbars=no,location=0,status=0');
        addLayerPop('investPopLayer','/hku/hku4033/p04.do?Layer=Y&myInvest='+myInvest+'&goodNm='+goodNm+'&goodInvest='+goodInvest+'&itemParam='+itemParam,otp);
	}
}

function investPopFail(msg,link){
	if(msg=='') msg ='���������� Ȯ�� ��޿� ���� �ŷ��� ���ѵ˴ϴ�.\n����������Ȯ�μ��� �ۼ��Ͻðڽ��ϱ�?';
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
			alert("����������Ȯ�μ��� ���ڱ������θ� �������������� �Է��ϼ̽��ϴ�. ������������ ��� �Ļ���ǰ�� �ż� �� �ż������� �Ұ����մϴ�.");
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

