/** js library **/
document.writeln('<scr' + 'ipt src="/js/ajax.js" 		type="text/javascript"></scr' + 'ipt>\n');
document.writeln('<scr' + 'ipt src="/js/loading.js" 	type="text/javascript"></scr' + 'ipt>\n');
document.writeln('<scr' + 'ipt src="/js/popup.js" 		type="text/javascript"></scr' + 'ipt>\n');

/** load menu ui **/
document.writeln('<scr' + 'ipt src="/js/bestez.menu.ui.js?d=' + new Date().getMilliseconds() + ' type="text/javascript"></scr' + 'ipt>\n');
document.writeln('<scr' + 'ipt src="/js/bestez.menu.ui.new.js?d=' + new Date().getMilliseconds() + ' type="text/javascript"></scr' + 'ipt>\n');

/** load form ui **/
document.writeln('<scr' + 'ipt src="/js/jquery.jmpopups.js" type="text/javascript"></scr' + 'ipt>\n');
document.writeln('<scr' + 'ipt src="/js/bestez.form.js" type="text/javascript"></scr' + 'ipt>\n');

/** 2016.08.18 [�̷�����/�̷����´�� ����] �Ӽ��� - sSelect ���� ���� start **/
document.writeln('<scr' + 'ipt type="text/javascript" src="/js/jquery.stylish-select.js"></scr' + 'ipt>');
document.writeln('<scr' + 'ipt type="text/javascript" src="/js/jquery.selectbox.js"></scr' + 'ipt>');
$(document).ready(function() {
	// ���� ����
	parentChangeTitle();
});

/* @author $���μ�$ @since $2013-01-28$ frame �ڽľȿ� ������ �θ� �������� ��ó $  */
function parentChangeTitle() {
    var parentDoc = window.parent.document;
    if(parentDoc != null) {
        var currentTitle = document.title;
        if(currentTitle == null || currentTitle == "" || currentTitle == undefined) {
                return;
        }
        // �ֻ��� �θ� Ÿ��Ʋ ��ü
        parentDoc.title = currentTitle;
        // ȸ�� �Ұ� iframe �Ӽ� title ��ü
        frameChangeTitle('iframe', currentTitle);
        // ���� ��ǥ����Ʈ frame �Ӽ� title ��ü
        frameChangeTitle('contentframe', currentTitle);
    }
}

// �������� frame �ڽľȿ� ������ �θ� �������� ��ó
function setPageTitle(title) {
    $(document).attr("title", title);
    parentChangeTitle();
}

/* @author $���μ�$ @since $2013-02-21$ frame Ÿ��Ʋ ��ó $  */
function frameChangeTitle(frameId, title) {
    var frame = $('#'+frameId, parent.document);
    if(frame) {
        if(!$(frame).attr("src")) {     // src -> false
            title = "��������";
        }
        $(frame).attr("title", title);
    }
}
/**
 * 2016.08.18 [�̷�����/�̷����´�� ����] �Ӽ��� - sSelect ���� ���� end
 */
/**************************************************************************************/
/*** menu.js ���� ����ϴ� �Լ� ���� */
function isMobile() {
    //alert(navigator.userAgent.toLowerCase());
    var _checkMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    return top.location.href.indexOf('mobile') > -1 || _checkMobile ;
    //return true;
}
/**************************************************************************************/

function refreshSession() {
    if ($("#wrap").attr("class") == null) {
        if (opener != null) {
            try {
                if (opener.document.domain.indexOf('miraeassetdaewoo.com') > -1) {
                    opener.top.sessionCheckFrame.location.href = '/session_update.jsp';
                }
            } catch (e) { }
        } else {
            try {
                if (document.domain.indexOf('miraeassetdaewoo.com') > -1) {
                    top.sessionCheckFrame.location.href = '/session_update.jsp';
                }
            } catch (e) { }
        }
    }
}
/**
 * commonUtil Param
 */
var commonUtil_param = {
	serverDate : ""
};

/**
 * prototype ����
 * @returns
 */
String.prototype.trim = function() {
	return this.replace(/(^ *)|( *$)/g, "");
};

String.prototype.lTrimZero = function(){
	return this.replace(/(^0+)/, "");
};

/**
 * �޼ҵ�� : ���������� �ش� ��ũ��Ʈ��������
 * ����� : checkScriptExist("ajax.js") >> �������� ajax.js �� �ε�� ��� true, ���°�� false
 * �Ķ���� : [data] ��ũ��Ʈ ���ϸ� ������ (String or Array)
 */
function checkScriptExist(data){
	if(data == null || typeof(data) == 'undefined') return;

	//�迭�ΰ��
	var isScript = false;
	if(typeof(data) == 'object'){
		$.each(data, function () {
			var name = this;
			$("script").each(function () {
				var src = $(this).attr("src");
				if(src && src.lastIndexOf(name) > -1){  isScript = true; return false; }
			});
		});
	}else{
		$("script").each(function () {
			var src = $(this).attr("src");
			if(src && src.lastIndexOf(data) > -1){ isScript = true; return false; }
		});
	}
	return isScript;
}


/**
 * �޼ҵ�� : ���¹�ȣ ��� ���� ��ȯ
 * ����� : converAccountNo("123-00-456789") => "12300456789"
 * 	         converAccountNo("12300456789") => "123-00-456789"
 * �Ķ���� :	[ac_no](�ʼ�)- ���� ��ȯ ��� ���¹�ȣ
 */
function converAccountNo(ac_no){
	//"-"�� ���Ե��� �ʾ��� ���
	if(ac_no.length == 11 || ac_no.length == 12){
		return ac_no.substr(0,3) + "-" + ac_no.substr(3,2) + "-" + ac_no.substr(5);
	}
	//"-"�� ���ԵǾ� ���� ���
	return replaceAll(ac_no, "-", "");
}

/**
 * �޼ҵ�� : ����ȣ ��� ���� ��ȯ
 * ����� : converContNo("123-00-456789") => "12300456789"
 * 	         converContNo("12300456789") => "123-00-456789"
 * �Ķ���� :	[ac_no](�ʼ�)- ���� ��ȯ ��� ���¹�ȣ
 */
function converContNo(cont_no){
	//"-"�� ���Ե��� �ʾ��� ���
	if(cont_no == null) return "";
	if(cont_no.length == 14){
		return cont_no.substr(0,3) + "-" + cont_no.substr(3,5) + "-" + cont_no.substr(8,6);
	}

	//"-"�� ���ԵǾ� ���� ���
	return replaceAll(cont_no, "-", "");
}

/**
 * �޼ҵ�� : ���ڿ� ġȯ
 * ����� : replaceAll("abcada", "a", "1") => "1bc1d1"
 * �Ķ���� :	[str](�ʼ�)- ġȯ ��� ���ڿ�
 * 			[org](�ʼ�)- ġȯ��� ����
 * 			[rep](�ʼ�)- ġȯ����
 */
function replaceAll(str, org, rep){
	return str.split(org).join(rep);
}
/**
 * �޼ҵ�� : Ư�� ���ڿ��� �����ϴ��� üũ
 * ����� : startWith("abcada", "ab") => true
 *           startWith("abcada", "abb") => false
 * �Ķ���� :	[str](�ʼ�)- �� ��� ���ڿ�
 * 			[chr](�ʼ�)- �� ����
 */
function startWith(str, chr){
	//���� üũ
	if(str.length < chr.length){
		return false;
	}
	return str.substr(0, chr.length) == chr;
}
/**
 * �޼ҵ�� : ������ ���̸�ŭ ���ڿ� �������� ä���.
 * ����� : fillRight("mobile", 8, "!") => "mobile!!"
 * �Ķ���� :	[ori](�ʼ�)- ��ȯ ��� ���ڿ�
 * 			[size](�ʼ�)- ���ڿ� ����
 * 			[chr](�ʼ�)- ä�� ����
 */
function fillRight(ori, size, chr){
	//���� üũ
	if(ori.length >= size){
		return ori;
	}
	var ori_len = ori.length;
	for(var i = 0; i < size - ori_len; i++){
		ori += chr;
	}
	return ori;
}
/**
 * �޼ҵ�� : ������ ���̸�ŭ ���ڿ� ������ ä���.
 * ����� : fillLeft("mobile", 8, "!") => "!!mobile"
 * �Ķ���� :	[ori](�ʼ�)- ��ȯ ��� ���ڿ�
 * 			[size](�ʼ�)- ���ڿ� ����
 * 			[chr](�ʼ�)- ä�� ����
 */
function fillLeft(ori, size, chr){
	if(typeof(ori) == "number"){
		ori = new String(ori);
	}
	//���� üũ
	if(ori.length >= size){
		return ori;
	}
	var ori_len = ori.length;
	for(var i = 0; i < size - ori_len; i++){
		ori = chr + ori;
	}
	return ori;
}

/**
 * �޼ҵ�� : ���� ���� ��ȯ
 * ����� : numberFormat("12345") => "12,345"
 * 			 numberFormat("12345", "###,###") => "12,345"
 * 			 numberFormat("-12345", "###,###") => "-12,345"
 * 			 numberFormat("345", "00000") => "00345"
 * 			 numberFormat("-12345", "###,###.000") => "-12,345.000"
 * 			 numberFormat("-12345.1234", "###,###.000") => "-12,345.123"
 * 			 numberFormat("-12345.12", "###,###.000") => "-12,345.120"
 * �Ķ���� :	[num](�ʼ�)- ��ȯ ��� ���ڿ� �Ǵ� ����
 * 			[format]- ��ȯ ����
 */
function numberFormat(num, format,nonSign){
	if(num == null || num == "")  return "";

	//���� üũ
	if(typeof(num) != "number"){
		if(isNaN(num)){
			return "0";
		}else{
			num = num.replace('+','');  //����� ��� '+' �� ��� ���� ��� ����ó��
			num = Number(num);			//00000000... ������ �ð�� 0���� ó��
		}
	}

	//���� ���� ���� �Ǻ�
	if(typeof(format) == "undefined"){
		format = "###,###";
	}

	//��ȣ ���� ����
	if(typeof(nonSign) == "undefined"){
		nonSign = false;
	}

	//��ȣ ����
	var sign = "";
	if(num < 0){
		sign = "-";
		num = num * -1;
	}
	num = new String(num);
	//ǥ������ �Ҽ��� �и�
	format = format.split(".");
	//��ȯ��� ���� �Ҽ��� �и�
	num = num.split(".");
	//�Ҽ��� �̻� ��ȯ
	var tmp_fm = replaceAll(format[0], ",", "");
	if(tmp_fm.length > num[0].length){
		if(startWith(tmp_fm, "0")){
			num[0] = fillLeft(num[0], tmp_fm.length, "0");
		}
	}
	//�޸�(,)�� ���� ��� �޸� ����
	if(tmp_fm.length != format[0].length){
		var arr_num = new Array();
		var start_idx = 0;
		for(var i = 0; i < Math.ceil(num[0].length / 3); i++){
			start_idx = num[0].length - (i + 1) * 3;
			if(start_idx < 0){
				arr_num[i] = num[0].substr(0 , num[0].length % 3);
			}else{
				arr_num[i] = num[0].substr(start_idx , 3);
			}
		}
		arr_num.reverse();
		num[0] = arr_num.join(",");
	}
	//�Ҽ��� ���� ��ȯ
	if(format.length > 1){
		if(num.length > 1){
			if(format[1].length > num[1].length){
				num[1] = fillRight(num[1], format[1].length, "0");
			}else{
				num[1] = num[1].substr(0, format[1].length);
			}
		}else{
			num[1] = fillRight("", format[1].length, "0");
		}
	}else{
		if(num.length > 1){
			num.pop();
		}
	}

	if(nonSign)
		return num.join(".");
	else
		return sign + num.join(".");

}

/*
 * ,����
 */
function removeComma(target){
	try{
		return replaceAll(target, ",", "");
	}catch(e){
		return "";
	}
}

/*
 * numberFormat���� value�� null�϶� undefined���� �߰�
 */
function numberFormatWN(value, format){
	var result = numberFormat(value, format);
	if(result==""){
		if(format=="###,###"){
			return 0;
		}else{
			return 0.00;
		}
	}
	return result;
}

/*
 * numberFormatWN���� ���϶� default�� �߰�
 */
function numberFormatWNV2(value, format, nullDefault){
	var result = numberFormat(value, format);
	if(result==""){
		if(!isCommonNull(nullDefault)){
			return nullDefault;
		}
		if(format=="###,###"){
			return 0;
		}else{
			return 0.00;
		}
	}

	return result;
}

function isCommonNull(data){
	if(data == null || typeof(data) == 'undefined' || data == "null" || String(data) == ""  || data.length == 0) return true;
	return false;
}

/**
 * �޼ҵ�� : ���� ��¥ ���
 * ����� : getToday() => "20110101"
 * �Ķ���� :
 */

function getToday(){
	var date = commonUtil_param.serverDate;
	if(date == "")	date = new Date();

	return dateFormat(date, "yyyyMMdd");
}

/**
 * �޼ҵ�� : ��¥ �Ⱓ ���ϱ�
 * param : pEDate	- ��������
 * param : pSDate	- ������
 * param : pType	- 'D':�ϼ�, 'M':������
 * param : isWeek	- �ϼ��� ��ȸ�Ұ�� �ָ�(��,��) ���Կ��� true ����, false ������
 */
function getDateDiff(pEDate, pSDate, pType, isWeek) {
	if(pSDate == null && pSDate.length < 8 && pEDate == null && pEDate.length < 8) return null;

	if(typeof(pType	) == 'undefined') pType		= "D";
	if(typeof(isWeek) == 'undefined') isWeek	= true;
	pSDate = pSDate.replace(/\/|\.|-|/gi,''); //'-', '/', '.' ����
	pEDate = pEDate.replace(/\/|\.|-|/gi,''); //'-', '/', '.' ����
	var strSDT = new Date(pSDate.substring(0,4), pSDate.substring(4,6)-1, pSDate.substring(6,8));
	var strEDT = new Date(pEDate.substring(0,4), pEDate.substring(4,6)-1, pEDate.substring(6,8));
	var strGapDT = 0;

	if(pType == 'D') {  //�ϼ� ����
		strGapDT = (strEDT.getTime()-strSDT.getTime())/(1000*60*60*24);

		var weekandCnt = 0;
		var tmpDate = strSDT;
		while(!isWeek && tmpDate.getTime() <= strEDT.getTime()){
			//�ش��� ���̿� �ָ�(��,��)�� ī��Ʈ��
			if(tmpDate.getDay() == 0 || tmpDate.getDay() == 6) weekandCnt++;
			tmpDate.setDate(tmpDate.getDate() + 1);
		}
		strGapDT -= weekandCnt;
	} else {            //������ ����
		if(pEDate.substring(0,4) == pSDate.substring(0,4)) {
		   strGapDT = pEDate.substring(4,6) * 1 - pSDate.substring(4,6) * 1;
		} else {
		   strGapDT = Math.floor((strEDT.getTime()-strSDT.getTime())/(1000*60*60*24*365.25/12));
		}
	}
	return strGapDT;
}

/**
 * �޼ҵ�� : ��¥ ���� ��ȯ
 * ����� : dateFormat("20110101010101", "yyyy��MM��dd�� hh��mm��ss��") => "2011��01��01�� 01��01��01��"
 * 			 dateFormat(new Date(), "yyyy��MM��dd�� hh��mm��ss��") => "2011��01��01�� 01��01��01��"
 * 			 dateFormat("110101", "yy/MM/dd") => "11/01/01"
 * 			 dateFormat("20110101010101", "yyyy-MM-dd") => "2011-01-01"
 * �Ķ���� :	[date](�ʼ�)- ��ȯ ��� ���ڿ� �Ǵ� ��¥ ��ü
 * 			[format](�ʼ�)- ��ȯ ����(��:yyyy�Ǵ�yy, ��:MM, ��:dd, ��:hh, ��:mm, ��:ss)
 */
function dateFormat(date, format){
	if(date == null || date == "")  return "";
	var year, mon, day, hour, min, sec, isDate = false;

	if(typeof(date) == "object"){
		year = date.getFullYear();
		mon = date.getMonth() + 1;
		day = date.getDate();
		hour = date.getHours();
		min = date.getMinutes();
		sec = date.getSeconds();
		isDate = true;
	}else if(typeof(date) == "undefined"){
		return "";
	}else{
		if(date.length == 0){
			return "";
		}
	}

	var result = format;
	var cur_idx = 0;

	//�⵵ ����
	if(format.indexOf("yyyy") >= 0){
		if(!isDate){
			year = date.substr(0, 4);
			cur_idx = 4;
		}
		result = replaceAll(result, "yyyy", year);
	}else if(format.indexOf("yy") >= 0){
		if(!isDate){
			year = date.substr(0, 2);
			cur_idx = 2;
		}else{
			year = year.substr(0, 2);
		}
		result = replaceAll(result, "yy", year);
	}
	//�� ����
	if(format.indexOf("MM") >= 0){
		if(!isDate){
			mon = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "MM", fillLeft(mon, 2, "0"));
	}
	//�� ����
	if(format.indexOf("dd") >= 0){
		if(!isDate){
			day = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "dd", fillLeft(day, 2, "0"));
	}
	//�ð� ����
	if(format.indexOf("hh") >= 0){
		if(!isDate){
			hour = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "hh", fillLeft(hour, 2, "0"));
	}
	//�� ����
	if(format.indexOf("mm") >= 0){
		if(!isDate){
			min = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "mm", fillLeft(min, 2, "0"));
	}
	//�� ����
	if(format.indexOf("ss") >= 0){
		if(!isDate){
			sec = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "ss", fillLeft(sec, 2, "0"));
	}

	return result;
}
/**
 * �޼ҵ�� : �Ҽ��� �ݿø�
 * ����� : roundXL(236.12526, 3) =>236.13
 * �Ķ���� :	[n](�ʼ�)- ��ȯ ��� ����
 * 			[digits](�ʼ�)- �ݿø��� �ڸ���
 */
function roundXL(n, digits) {
	  if (digits >= 0) return parseFloat(n.toFixed(digits)); // �Ҽ��� �ݿø�
	  digits = Math.pow(10, digits); // ������ �ݿø�
	  var t = Math.round(n * digits) / digits;
	  return parseFloat(t.toFixed(0));
}
/**
 * �޼ҵ�� : Ư�� ���ڿ��� ����Ʈ ũ�� ��ȯ
 * ����� : chr_byte("abcde") =>5, chr_byte("�׽�Ʈ") =>6
 * �Ķ���� :	[str](�ʼ�)- �� ���ڿ�
 */
function chk_byte(str){
	var cnt = 0;
	for(var i = 0; i < str.length; i++){
		cnt += chr_byte(str.charAt(i));
	}
	return cnt;
}
/**
 * �޼ҵ�� : ����ũ��(����Ʈ) ��ȯ
 * ����� : chr_byte('a') =>1, chr_byte("��") =>2
 * �Ķ���� :	[chr](�ʼ�)- ��ȯ��� ����
 */
function chr_byte(chr){
	if(escape(chr).length > 4)      return 2;
	else                            return 1;
}
/**
 * �޼ҵ�� : ���ڿ� �ڸ���
 * ����� : cutStr("abcde", 3) => "abc"
 * �Ķ���� :	[str](�ʼ�)- ��ȯ��� ����
 *  			[limit](�ʼ�)- �߶� ���� ��ġ
 */
function cutStr(str, limit){
	var tmpStr = str;
	var byte_count = 0;
	var len = str.length;
	var dot = "";
	for(i=0; i<len; i++){
		byte_count += chr_byte(str.charAt(i));
		if(byte_count == limit-1){
			if(chr_byte(str.charAt(i+1)) == 2){
				tmpStr = str.substring(0,i+1);
				dot = "...";
			}else {
				if(i+2 != len) dot = "...";
				tmpStr = str.substring(0,i+2);
			}
			break;
		}else if(byte_count == limit){
			if(i+1 != len) dot = "...";
			tmpStr = str.substring(0,i+1);
			break;
		}
	}
	return (tmpStr+dot);
}

/**
 * �޼ҵ�� : ��¥ ����ȯ(stirng => date, date => string)
 * ����� : convertDate("20110101") => "20110101"�� �ش��ϴ� Date ��ü
 * 			 convertDate("2011/01/01", "yyyy/MM/dd") => "2011/01/01"�� �ش��ϴ� ��¥ ��ü
 * 			 convertDate(new Date()) => "20110101"
 * 			 convertDate(new Date(), "yyyy/MM/dd") => "2011/01/01"
 * �Ķ���� :	[date](�ʼ�)- ��ȯ ��� ���ڿ� �Ǵ� ��¥ ��ü
 * 			[format]- ��ȯ ����(��:yyyy�Ǵ�yy, ��:MM, ��:dd, ��:hh, ��:mm, ��:ss)
 */
function convertDate(date, format){
	if(date == null || date == "")  return "";

	//���� ���� ���� �Ǻ�
	if(typeof(format) == "undefined"){
		format = "yyyyMMdd";
	}

	//date�� Date��ü�� ���
	if(typeof(date) == "object"){
		return dateFormat(date, format);
	}

	//date��ü�� ���ڿ��� ���
	var year, mon, day, hour, min, sec;
	var date_obj = new Date();

	//�⵵ ����
	if(format.indexOf("yyyy") >= 0){
		date_obj.setFullYear(parseInt(date.substr(format.indexOf("yyyy"), 4), 10));
	}else if(format.indexOf("yy") >= 0){
		date_obj.setFullYear(2000 + parseInt(date.substr(format.indexOf("yyyy"), 2), 10));
	}
	//�� ����
	if(format.indexOf("MM") >= 0){
		date_obj.setMonth(parseInt(date.substr(format.indexOf("MM"), 2), 10) - 1);
	}
	//�� ����
	if(format.indexOf("dd") >= 0){
		date_obj.setDate(parseInt(date.substr(format.indexOf("dd"), 2), 10));
	}
	//�ð� ����
	if(format.indexOf("hh") >= 0){
		date_obj.setHours(parseInt(date.substr(format.indexOf("hh"), 2), 10));
	}
	//�� ����
	if(format.indexOf("mm") >= 0){
		date_obj.setMinutes(parseInt(date.substr(format.indexOf("mm"), 2), 10));
	}
	//�� ����
	if(format.indexOf("ss") >= 0){
		date_obj.setSeconds(parseInt(date.substr(format.indexOf("ss"), 2), 10));
	}
	return date_obj;
}
/**
 * �޼ҵ�� : ��¥ ����
 * ����� : addDate("20110101", "yyyy", 1) => "20120101"
 * 			 addDate("2011/01/01", "MM", -1, "yyyy/MM/dd") => "2010/12/01"
 * 			 addDate(new Date(), "dd", 1, "yy/MM/dd") => "11/01/02"
 * �Ķ���� :	[date](�ʼ�)- ��ȯ ��� ���ڿ� �Ǵ� ��¥ ��ü
 * 			[mode](�ʼ�)- ���� ���(��:yyyy�Ǵ�yy, ��:MM, ��:dd)
 * 			[add_num](�ʼ�)- ����ġ
 * 			[format]- ��¥ ����(��:yyyy�Ǵ�yy, ��:MM, ��:dd, ��:hh, ��:mm, ��:ss)
 */
function addDate(date, mode, add_num, format){

	var isDate = true;

	//date�� ���ڿ��� ��� ����ȯ
	if(typeof(date) == "string"){
		isDate = false;
		date = convertDate(date, format);
	}

	if(mode == "yy" || mode == "yyyy")
		date.setFullYear(date.getFullYear() + add_num);
	else if(mode == "MM")
		date.setMonth(date.getMonth() + add_num);
	else if(mode == "dd")
		date.setDate(date.getDate() + add_num);

	if(!isDate){
		date = convertDate(date, format);
	}

	return date;
}

function txt2date(date){
	var d = new Date();
	d.setFullYear(Number(date.split('-')[0]));
	d.setMonth(Number(date.split('-')[1])-1);
	d.setDate(Number(date.split('-')[2]));
	return d;
}

function date2txt(ddd){
	var date = ddd.getFullYear()+'.';
	if(ddd.getMonth()<9)		date = date + '0'+(ddd.getMonth()+1)+'-';
	else						date = date + (ddd.getMonth()+1)+'-';
	if(ddd.getDate()<10)		date = date + '0'+ddd.getDate();
	else						date = date + ddd.getDate();
	return date;
}

var tempMMM= false;
function addDate2(date, mode, add_num, format){
	var isDate = true;
	//date�� ���ڿ��� ��� ����ȯ
	var ddd ;
	if(typeof(date) == "string"){
		isDate = false;
		ddd = txt2date(date);
	}else{
		ddd = new Date(date);
	}

	if(mode == "yy" || mode == "yyyy"){
		ddd.setFullYear(ddd.getFullYear()+add_num);
	}else if(mode == "MM"){
		ddd.setMonth(ddd.getMonth()+add_num);
	}else if(mode == "dd"){
		ddd.setDate(ddd.getDate()+add_num);
	}

	if(!isDate){
//					date = convertDate(ddd, format);
		date = date2txt(ddd);
	}
	return date;
}

/**
 * �޼ҵ�� : ���� ���ϱ�
 * ����� : getDay(new Date())
 * 			 getDay('20120220')
 * 			 getDay('2012/02/20')
 * �Ķ���� :	[date](�ʼ�)- ��ȯ ��� ���ڿ� �Ǵ� ��¥ ��ü
 * 			[format]- ��¥ ����(��:yyyy�Ǵ�yy, ��:MM, ��:dd, ��:hh, ��:mm, ��:ss)
 */
function getDay(date, format){

	var array_day = new Array("��", "��", "ȭ", "��", "��", "��", "��");
	//date�� ���ڿ��� ��� ����ȯ
	if(typeof(date) == "string"){
		isDate = false;
		date = convertDate(date, format);
	}
	return array_day[date.getDay()];
}

/**
 * �޼ҵ�� : null�� length�� üũ
 * ����� : nullLengthCheck(param)
 * �Ķ���� :	[param](�ʼ�)- ���ϸ�
 */
function nullLengthCheck(param){
	var retBool = false;
	if( param != null ){
		if( typeof(param) == "object"){
			retBool = true;
		} else {
			var paramTrim = replaceAll(param," ","");
			if ( paramTrim.length > 0 ){
				retBool = true;
			}
		}
	}
	return retBool;
}

/**
 * �޼ҵ�� : null �ΰ�� Blank("") ����
 * ����� : nullToBlank(param)
 * �Ķ���� : [param](�ʼ�)
 */
function nullToBlank(param){
	return nullToDefault(param, "");
}

/**
 * �޼ҵ�� : null �ΰ�� Blank("") ����
 * ����� : nullToBlank(param)
 * �Ķ���� : [param](�ʼ�)
 */
function nullToDefault(param, value){
	if(param == null || param == "null" || !nullLengthCheck(String(param)) || typeof(param)=="undefined"){
		return value;
	}else{
		return param;
	}
}

/**
 * �޼ҵ�� : ���ϴ� �˾����̾ ȭ�� ���߾ӿ� ǥ��
 * ����� : divCenter("divId")
 *          - �ݵ�� ���̾ show()�Ǵ� ������ ȣ�� (��ũ�� ����� ����)
 * �Ķ���� :	[divId](�ʼ�)- �߾ӿ� ǥ���ų DIV�� ID�� (String)
 */
function divCenter(divId) {
	var top  = 0;
	var left = 0;
	//DIV�� ���̰� ȭ�麸�� Ŭ ���
	if($("#"+divId).height() > $(window).height() ) {
		top = $(window).scrollTop();
	}else{
		top = $(window).scrollTop() + ($(window).height() - $("#"+divId).height()) / 2;
	}

	//DIV�� ���� ȭ�麸�� Ŭ ���
	if($("#"+divId).width() > $(window).width() ) {
		left = 0;
	}else{
		left = ($(window).width() - $("#"+divId).width()) / 2;
	}
	$("#"+divId).css("top", top		);
	$("#"+divId).css("left", left	);
}
/**
 * �޼ҵ�� : ������ ����ϴ� JSON Object������ �Ķ���͸� GET��Ʈ������ ��ȯ
 * ����� : convParam(object)
 *          - �����ϸ� �ش� ������Ʈ�� ?�� ������ GET���� ��Ʈ������ ���� ��ȯ��
 * �Ķ���� :	[object](�ʼ�)- Json Object��
 */
function convParam(object) {
	var resultsArr = [];
	for (var p in object) {
		var value = object[p];
		if (value) {
			resultsArr.push(p.toString() + '=' + value);
		}
	}
	return resultsArr.join('&');
}

function dateStringFormat(obj) {
	if(obj.value != "") {
		if (obj.value.length > 10 || obj.value.length < 8) {
			alert("��¥ ���Ŀ� ���� �ʽ��ϴ�. \r\nex)2012/01/01");
			obj.value = "";
			return false;
		} else if (obj.value.lenght < 10 && obj.value.length > 8) {
			alert("��¥ ���Ŀ� ���� �ʽ��ϴ�. \r\nex)2012/01/01");
			obj.value = "";
			return false;
		} else if (obj.value.length == 8 || obj.value.length == 10) {
			var datevalue = obj.value.replace(/\//g,"");
			var yyyy = datevalue.substring(0,4);
			var mm = datevalue.substring(4,6);
			var dd = datevalue.substring(6,8);
			var dateStr = yyyy+"/"+mm+"/"+dd;
			if (!chkdate(dateStr)) {
				alert("��¥ ���Ŀ� ���� �ʽ��ϴ�. \r\nex)2012/01/01");
				obj.value = "";
				return false;
			} else {
				obj.value = yyyy+"/"+mm+"/"+dd;
				return true;
			}
		} else {
			alert("��¥ ���Ŀ� ���� �ʽ��ϴ�. \r\nex)2012/01/01");
			obj.value = "";
			return false;
		}
	}
}

function chkdate(dayStr) {
	var valid = false;
	if(dayStr.search(/\d{4}\/(0[1-9]|1[0-2])\/([0-3][0-9])/) == 0) {
		var arrDay = dayStr.split("/");
		var year = parseInt(arrDay[0]);
		var month = parseInt(arrDay[1].replace(/^0(\d)/g,"$1"));
		var day = parseInt(arrDay[2].replace(/^0(\d)/g,"$1"));
		var d = new Date(year, month-1, day);
		if(d.getMonth() == month-1 && d.getDate() == day) {
			valid = true;
		}
	}
	return valid;
}

/**
 * �޼ҵ�� : ������ �Ķ� ��� (������ ������ ��� ����, ��Ҹ� ������ ���� �������� �ߴ�)
 * ����� : alertParam(param)
 * �Ķ���� :	[param](�ʼ�)- ajaxȣ��� �Ķ����
 */
function alertParam(param){
	var str = "";
	for(var key in param){
		str += key;
		str += " : \"" + param[key] + "\"\n";
	}
	var confirmFlag = confirm(str);
	if(confirmFlag == false) {
		exit();
	}
}

/**
 * �޼ҵ�� : Ư�� �׸��� �������� ���� �ԷµǸ� ���� �׸����� Ŀ�� �̵�- �ַ� onkeyup�� ���� ���
 * ����� : onkeyup="next_cursor(this, 4, $('#next'));"
 * �Ķ���� :	[param](�ʼ�)- ajaxȣ��� �Ķ����
 */
function next_cursor(current, length, next){
	if($(current).val().length == length){
		next.focus();
	}
}

/**
 * Ư�� �ʵ忡 ���ؼ� number�� �Է� �����ϰ� ����
 * �Ķ���� :	[target](�ʼ�)- ������ �ʵ� id
 * */
function numberOnly(target){
	$("#"+target).keypress(function(event){
		if(event.keyCode<48||event.keyCode>57) event.returnValue=false;
	});
}


/**
 * �ݾ� �޸� ��� version k
 * @param str
 * @returns
 */
function utilMakeAmount(str){
	str= ""+str;
	var objRegExp = new RegExp('([0-9]+)([0-9]{3})');
	while(objRegExp.test(str)) {
		str = str.replace(objRegExp, '$1,$2');
	}
	return str;
}

/**
 * form Serialize �Ұ�� Array �� ���� ó��
 */
$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if(this.value == 'all') return true; 
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

var isFnShowHideResizeCheckIng = false;
function setTimeResizeCheck(){
	isFnShowHideResizeCheckIng = false;
}

//ȭ�� ��������
$.fn.show = function()
{
	var obj;
	try{
		obj = this.css("display", "block");
		resizeCheck();
	}catch(e){}
	return obj;
};

//ȭ�� ��������
$.fn.hide = function()
{
	var obj;
	try{
		obj = this.css("display", "none");
		resizeCheck();
	}catch(e){}
	return obj;
};

//ȭ�� ��������
$.fn.shownr = function()
{
	var obj;
	try{
		obj = this.css("display", "");
	}catch(e){}
	return obj;
};

//ȭ�� ��������
$.fn.hidenr = function()
{
	var obj;
	try{
		obj = this.css("display", "none");
	}catch(e){}
	return obj;
};

//�޼��� ��
function showMsg(mmsg){
	alert(mmsg);
	//$.msgbox({	msg	: mmsg });
}

/*
 * 0����
 * gubun (0:left, 1:right, 2:both)
*/
function zeroClear(target, gubun){
	if(gubun==0){
		target = target.replace(/^0+/,"");
	}else if(gubun==1){
		target = target.replace(/0+$/,"");
	}else{
		target = target.replace(/(^0+)|(0+$)/g,"");
	}
	if(isCommonNull(target))	target = 0;
	return target;
}

/*
 * ���/�϶��� �Ǵ��Ͽ� �ش� ���� ǥ���ϴ� TAG���� ����isNaN(num)
 */
function updownTag(val){
	return updownTagWN(val, val);
}

/**
 * ���/�϶��� �Ǵ��Ͽ� �ش� ���� ǥ���ϴ� TAG���� ����
 * @param disVal ���÷��̵Ǵ� Value
 * @param oriVal ����϶��� ���Ҽ� �ִ� ����������
 */
function updownTagWN(disVal, oriVal){
	var updownTag = "";
	if(!isCommonNull(oriVal)){
		var rtVal = replaceAll(removeComma(oriVal), ".", "");
		var intVal = 0;
		try{
			intVal = parseInt(rtVal, 10);
		}catch(e){
			intVal = 0;
		}
		if(intVal > 0)		updownTag = "<i title='���'>"+disVal+"</i>";
		else if(intVal < 0) updownTag = "<em title='�϶�'>"+disVal+"</em>";
		else				updownTag = disVal;
	}
	return updownTag;
}


/**
 * + - �� �ٸ������� ǥ���ϴ� TAG���� ����
 * @param disVal ���÷��̵Ǵ� Value
 * @param oriVal + - �� ������ ǥ��
 */
function updownTagMP(val){
	return updownTagMPM(val, "");
}
function updownTagMPM(disVal, disMk){
	var updownTag = "";
	if(!isCommonNull(disVal)){
		var rtVal = replaceAll(removeComma(disVal), ".", "");
		if (disMk == null || disMk == ""){
			if(rtVal > 0)		updownTag = "<i title='���'>"+disVal+"</i>";
			else if(rtVal < 0) updownTag = "<em title='�϶�'>"+disVal+"</em>";
			else				updownTag = disVal;
		} else {
			if(rtVal > 0)		updownTag = "<i title='���'>"+disVal+"&nbsp;"+disMk+"</i>";
			else if(rtVal < 0) updownTag = "<em title='�϶�'>"+disVal+"&nbsp;"+disMk+"</em>";
			else				updownTag = disVal+"&nbsp;"+disMk;
		}
	}
	return updownTag;
}


/*
 * ���/�϶��� �Ǵ��Ͽ� �ش� ���� ǥ���ϴ� Class���� ����
 */
function updownClass(val){
	var clssNm = "";
	if(typeof(val) != 'undefined' && val != null && val != ""){
		var intVal = 0;
		try{
			intVal = parseInt(val, 10);
		}catch(e){
			intVal = 0;
		}

		if(intVal > 0)		clssNm = "fc_orange";
		else if(intVal < 0) clssNm = "fc_blue";
		else				clssNm = "";
	}
	return clssNm;
}

/*
 * ���/�϶��� �Ǵ��Ͽ� �ش� ���� ǥ���ϴ� Class���� ����
 * param1 : value
 * param2 : ����϶� Ŭ����
 * param3 : �϶��϶� Ŭ����
 */
function updownClassV2(val, upClass, downClass){
	var clssNm = "";
	if(!isCommonNull(val)){
		if(isCommonNull(upClass))	upClass 	= "fc_orange";
		if(isCommonNull(downClass))	downClass 	= "fc_blue";
		var intVal = 0;
		try{
			intVal = Number(val);
		}catch(e){
			intVal = 0;
		}

		if(intVal > 0)		clssNm = upClass;
		else if(intVal < 0) clssNm = downClass;
		else				clssNm = "";
	}
	return clssNm;
}

/*
 * ���ͷ��� null �Ǵ� 999�����ͷ� �ð�� �ش� ���ͷ��� '-'�� ǥ��
 */
function bnfrCheckLogic(val, vformat){
	if(typeof(val) == 'undefined' || val == "") return "-";
	if(typeof(vfm) == 'undefined' || vfm == "") vfm = '###,###.00';

	var resStr = val;
	if(val == -999 || val == '-999' || val == '-999.00'){
		resStr = "-";
	}else{
		resStr = numberFormat(val, vfm);
	}
	return resStr;
}

/*
 * �ش� ���ͷ��� 'NaN'���� �ð�� '-'�� ǥ��
 */
function removeNaN(str){
	var rVal = str.trim();
	if(rVal == "NaN"){
		rVal = "-";
	}
	return rVal;
}

/*
 * �ݵ� �ʰ����� �±׸���
 */
function getPdClass( pd_class ){
	var rtnClss = "";
	if(pd_class == "05"){
		 rtnClss = "<span class='ico_label lev6'><em>"+'��������'+"</em></span>";
	}else if(pd_class == "04"){
		rtnClss  = "<span class='ico_label lev5'><em>"+'������'+"</em></span>";
	}else if(pd_class == "03"){
		rtnClss = "<span class='ico_label lev4'><em>"+'������'+"</em></span>";
	}else if(pd_class == "06"){
		rtnClss = "<span class='ico_label lev3'><em>"+'������'+"</em></span>";
	}else if(pd_class == "02"){
		rtnClss = "<span class='ico_label lev2'><em>"+'������'+"</em></span>";
	}else if(pd_class == "01"){
		rtnClss = "<span class='ico_label lev1'><em>"+'�ʰ�����'+"</em></span>";
	}
	return rtnClss;
}

/*
 * �ݵ� �ʰ����� �±׸���
 */
function getPdClassOrg( pd_class ){
	var rtnClss = "";
	if(pd_class == "01"){
		 rtnClss = "<span class='ico_label lev6'><em>"+'��������'+"</em></span>";
	}else if(pd_class == "02"){
		rtnClss  = "<span class='ico_label lev5'><em>"+'������'+"</em></span>";
	}else if(pd_class == "03"){
		rtnClss = "<span class='ico_label lev4'><em>"+'������'+"</em></span>";
	}else if(pd_class == "04"){
		rtnClss = "<span class='ico_label lev3'><em>"+'������'+"</em></span>";
	}else if(pd_class == "05"){
		rtnClss = "<span class='ico_label lev1'><em>"+'�ʰ�����'+"</em></span>";
	}
	return rtnClss;
}

/*
 * �����޸� ���� �ڵ� ����
 */
function getPdClas2(pd_class_txt){
	var pd_class = "";
	if(pd_class_txt == "�������� 6���"){
		pd_class = "01";
	}else if(pd_class_txt == "������ 5���"){
		pd_class = "02";
	}else if(pd_class_txt == "������ 4���"){
		pd_class = "03";
	}else if(pd_class_txt == "������ 3���"){
		pd_class = "04";
	}else if(pd_class_txt == "������ 2���"){
		pd_class = "05";
	}else if(pd_class_txt == "�ʰ����� 1���"){
		pd_class = "06";
	}
	
	return getPdClass(pd_class);
}

/* �ݵ����� ��� Text ���� */
function getPdClassTxt( pd_class ){
	var rtnTxt = "";
	if(pd_class == "01"){
		rtnTxt = "��������(6���)";
	}else if(pd_class == "02"){
		rtnTxt  = "������(5���)";
	}else if(pd_class == "03"){
		rtnTxt = "������(4���)";
	}else if(pd_class == "04"){
		rtnTxt = "������(3���)";
	}else if(pd_class == "05"){
		rtnTxt = "������(2���)";
	}else if(pd_class == "06"){
		rtnTxt = "�ʰ�����(1���)";
	}
	return rtnTxt;
}


/**
 * ��Ʈ������ ���ܼ��� �ؽ�Ʈ
 * @param pType �������� (1:��������, 2:����м�, 3:����ȿ��, 4:�ڻ���)
 * @param pLev	���ܼ��� (1~5)
 * @returns {String}
 */
function portLevelText(pType, pLev){
	var resText = "-";
	if(!isCommonNull(pLev)){
		pLev = new String(pLev);
		if(pType == "1"){
			if("1" == pLev) 		resText = "�ſ����";	
			else if("2" == pLev) 	resText = "����";	
			else if("3" == pLev) 	resText = "����";	
			else if("4" == pLev) 	resText = "����";	
			else if("5" == pLev) 	resText = "�ſ�����";
		}else if(pType == "2"){
			if("1" == pLev) 		resText = "�ſ�����";
			else if("2" == pLev) 	resText = "����";	
			else if("3" == pLev) 	resText = "����";	
			else if("4" == pLev) 	resText = "��ȣ";	
			else if("5" == pLev) 	resText = "�ſ��ȣ";
		}else if(pType == "3"){
			if("1" == pLev) 		resText = "�ſ쳷��";
			else if("2" == pLev) 	resText = "����";	
			else if("3" == pLev) 	resText = "����";	
			else if("4" == pLev) 	resText = "����";
			else if("5" == pLev) 	resText = "�ſ����";
		}else if(pType == "4"){
			if("1" == pLev) 		resText = "�ſ쳪��";
			else if("2" == pLev) 	resText = "����";	
			else if("3" == pLev) 	resText = "����";	
			else if("4" == pLev) 	resText = "����";	
			else if("5" == pLev) 	resText = "�ſ�����";	
		}
	}
	return resText;
}

/**
 * ��Ʈ������ ���ܼ��� Label Classs Tag
 * @param pType �������� (1:��������, 2:����м�, 3:����ȿ��, 4:�ڻ���)
 * @param pLev	���ܼ��� (1~5)
 * @returns {String}
 */
function portLevelIcon(pType, pLev){
	var rtnText = portLevelText(pType, pLev);
	var rtnTag 	= "";
	if(!isCommonNull(pLev)){
		pLev = new String(pLev);
		if("1" == pLev) 		rtnTag = "<span class='ico_label red01'><em>"+rtnText+"</em></span>";	
		else if("2" == pLev) 	rtnTag = "<span class='ico_label red03'><em>"+rtnText+"</em></span>";		
		else if("3" == pLev) 	rtnTag = "<span class='ico_label green02'><em>"+rtnText+"</em></span>";		
		else if("4" == pLev) 	rtnTag = "<span class='ico_label blue05'><em>"+rtnText+"</em></span>";		
		else if("5" == pLev) 	rtnTag = "<span class='ico_label blue01'><em>"+rtnText+"</em></span>";		
	}
	return rtnTag;
}

/**
 * ��Ʈ������ ���ܼ��� íƮ Class ����
 * @param chartId 	íƮ Tag ID
 * @param chartLev	���ܼ��� (1~5)
 * @returns {String}
 */
function portLevelChart(chartId, chartLev){
	if(!isCommonNull(chartId)){
		if(isCommonNull(chartLev)) 	chartLev = "1";
		else						chartLev = new String(chartLev);
		
		var $chartObj = $("#"+chartId);
		$chartObj.removeClass().addClass("step"+chartLev);			//íƮ Class <!-- D : step1 ~ step5 class ���� -->
		$chartObj.find("em").text("�׷��� �ٴ� : "+chartLev+"�ܰ�</em>");	//<!-- D : �׷��� �ٴ� ���� -->
	}
}
/*
 * default error message
 */
function packetErrorMsg(){
	return "�����͸� ������ �� �����ϴ�.\n�����Ϳ� ���� �ϼ���.(1588-9200)";
}

/*
 * Default Object Set
 */
function setParams(data, isString){
	if(!isCommonNull(data) && typeof(data)=='object' && typeof(isString)!="undefined" && isString){
		data = JSON.stringify(data);
	} 
	top.topframe['reqData'] = data; 
}

/*
 * Default Object Get
 */
function getParams(isString){
	var reqData = top.topframe['reqData'];
	if(typeof(reqData)=="undefined") reqData = "";
	if(typeof(isString)!="undefined" && isString){
		try{
			reqData = JSON.parse(reqData);
		}catch(e){
			reqData = reqData;
		}
	}
	
	top.topframe['reqData'] = "";
	return reqData;
}

/*
 * Retire Object Set
 */
function setRetire(data){
	top.topframe['retireData'] = data; 
}

/*
 * Retire Object Get
 */
function getRetire(){
	var retireData = top.topframe['retireData'];
	top.topframe['retireData'] = "";
	if(typeof(retireData)=="undefined")	retireData = "";
	return retireData;
}

try {
	console;
}catch(e){
	console = {};
	console.log	= function(){};
}

function __cslog(txt){
	try{console.log(txt);}catch(e){}
}

//�˾�ȣ��� Ŭ���̺�Ʈ üũ
function a_tag_ck(){
	$("body a").click(function(){
		$("body a").removeClass("a_tag_ck");
		$(this).addClass("a_tag_ck");
	});
};

//** �ڵ��α׾ƿ� �˾�â ȣ�� **//
function alertLogoutInfo() {
    $.ajax({
        type 		: "POST",
        dataType	: "json",
        url  		: '/login/logoutTime.json',
        success 	: function(data){
        	if(data.isLogout=="0"){
        		$('body').append($(getLogoutInfoHtml()));
        		 $.ajax({
        	            type : "GET",
        	            url  :  '/login/logout.do',
        	            success : function(data){}
        	        });
        	    $.openPopupLayer({
        	    	name	: 'alertLogoutInfo',
        	    	width	: 516,
        	    	target	: 'alertLogoutInfoLayer'
        	    });
        	    $("#popupLayerScreenLocker").click(function() {
        	        $.closePopupLayer();
        	        try{
            	        top.contentframe.location.href = '/login/logout.do';
            	    }catch(e){}
        	    });
        	}
        }
    });
}

//** �ڵ��α׾ƿ� �˾�â ���� **//
function closeLogoutInfo() {
    $.closePopupLayer('alertLogoutInfo');
    try{
        top.contentframe.location.href = '/login/logout.do';
    }catch(e){}
}
//** �ڵ��α׾ƿ� ���̾� HTML **//
function getLogoutInfoHtml() {
    var _html = '';
    _html += '<div id="alertLogoutInfoLayer" style="z-index:100001;display:none;"> \n';
    _html += '<div class="lay-pop" style="width: 516px;">\n';
    _html += '      <div class="lay-content">\n';
    _html += '              <h4><img src="' + image_server + '/login/ti_h4_0802_01.gif" alt="�ڵ� �α׾ƿ� �˸�" /></h4>\n';
    _html += '              <div class="autologin-out-box">\n';
    _html += '                      <img src="' + image_server + '/login/tx_0802_02.gif" alt="�ڵ����� �α׾ƿ� �Ǿ����ϴ�" />\n';
    _html += '                      <p class="mgt20"><strong>�α��� �� �ڵ��α׾ƿ� �����ð� ����</strong> ȭ�� �̵��� ����<br /> <strong>�ڵ����� �α׾ƿ�</strong> �Ǿ����ϴ�.<br />\n';
    _html += '                      ���񽺸� ��� �̿��Ͻ÷��� �ٽ� <a href="javascript:doGnbLogin();">�α���</a> ���ֽñ� �ٶ��ϴ�.</p>\n';
    _html += '              </div>\n';
    _html += '              <p class="dot-type">�ڼ��� �ȳ��� ���ǻ����� ��ø� ��� <strong>������(1588-6800)</strong>�� �̿���<br />�ֽñ� �ٶ��ϴ�.</p>\n';
    _html += '              <a href="javascript:closeLogoutInfo();" class="act-close" title="�˾� �ݱ�"><img src="' + image_server + '/common/bts_close.gif" alt="�ݱ�" /></a>\n';
    _html += '      </div>\n';
    _html += '      <span class="shadow"></span>\n';
    _html += '</div>\n';
    _html += '</div>\n';
    return _html;
}

function initSelect(){
	for(var i = 0; i < $("select").length; i++){

		var sname = $("select")[i].name;
		var sid = $("select")[i].id;
		
		var wsize = "";
		
		if(sname == undefined || sname == ""){
			wsize = $("#"+sid).attr("width");
			if(wsize != undefined){
				 //$("[name='"+sname+"']").closest("span").css("width",wsize+"px");
				$("#"+sid).parent().closest("span").css("width",wsize+"px");
				$("#"+sid).parent().children("span").closest("span").css("width",wsize+"px");
			}
		}else{
			wsize = $("[name='"+sname+"']").attr("width");
			if(wsize != undefined){
				 //$("[name='"+sname+"']").closest("span").css("width",wsize+"px");
				$("[name='"+sname+"']").parent().closest("span").css("width",wsize+"px");
				$("[name='"+sname+"']").parent().children("span").closest("span").css("width",wsize+"px");
			}
		}
	}
}

//tooltip
function initTooltip(tbodyID){	
	
	if(tbodyID == undefined || tbodyID == ""){
		tbodyID = "body";
	}
	
	if(tbodyID != "body"){
		tbodyID = "#"+tbodyID;
	}
	
	
	$(tbodyID).find(".tooltip").each(function(){
		var _this = $(this);
		var txtVal = _this.next(".tooltip_wrap").find("p").text();
		 if( _this.find("ul") ){
			var tooltipWrapWidth =  _this.next(".tooltip_wrap").outerWidth();
			if (tooltipWrapWidth <= 102) {
				_this.next(".tooltip_wrap").css("width",162);
			} else if (tooltipWrapWidth >= 332) {
				_this.next(".tooltip_wrap").css("width", 292);
			} else {
				_this.next(".tooltip_wrap").css("width",tooltipWrapWidth - 40);				
			}
			// _this.next(".tooltip_wrap").css("width",330);
		}
	});
	
	$(tbodyID).find(".tooltip").on("click",function(e){		
		var tooltipBtnWidth = ($(this).width()-1) / 2,
			tooltipBtnWidthR = ($(this).width()-1),
			tooltipBtnHeight = $(this).height(),
			tooltipHeight = $(this).position().top,
			tooltipLeft = $(this).position().left,
			tooltipWrap = ( $(this).next(".tooltip_wrap").outerWidth() - tooltipBtnWidth ) / 2,
			tooltipWrapR = ( $(this).next(".tooltip_wrap").outerWidth() - tooltipBtnWidthR );
		
		

		$(this).next(".tooltip_wrap").css({"top" : tooltipHeight + (tooltipBtnHeight+10)});
		if ($(this).hasClass('l')) 
	    {
			$(this).next(".tooltip_wrap").css({
				"left" : tooltipLeft
			});
	    }
		else if ($(this).hasClass('r')) 
	    {
			$(this).next(".tooltip_wrap").css({
				"left" : tooltipLeft - (tooltipWrapR)
			});
	    }
		else {
			$(this).next(".tooltip_wrap").css({
				"left" : tooltipLeft - tooltipWrap -1
			});
	    };
				
		$(".tooltip_wrap").hide();
		$(this).next(".tooltip_wrap").show();
		
		e.preventDefault();
	});

	$(tbodyID).find(".btn_tooltip_close").on("click",function(e){		
		$(this).parents(".tooltip_wrap").hide();
		$(this).parents(".tooltip_wrap").prev(".tooltip").focus();
		
		e.preventDefault();
	});
}

//calendar Date hoice BTN Event
function btn_calBtn_active(){
	$(".cal_option_wrap .btnWrap.option a.btn, span.guide_txt + .btnWrap.middle.group a.btn").click(function(){
		$("a.btn").removeClass("active");
		$(this).addClass("active");
	});
};

//Load Event
$(function(){
	a_tag_ck();
	btn_calBtn_active();
	if($("select").length > 0) {
		$("select").selectOrDie();
		initSelect();
	}
	initTooltip();
	refreshSession();
});