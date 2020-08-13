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

/** 2016.08.18 [미래에셋/미래에셋대우 통합] 임수석 - sSelect 오류 수정 start **/
document.writeln('<scr' + 'ipt type="text/javascript" src="/js/jquery.stylish-select.js"></scr' + 'ipt>');
document.writeln('<scr' + 'ipt type="text/javascript" src="/js/jquery.selectbox.js"></scr' + 'ipt>');
$(document).ready(function() {
	// 제목 변경
	parentChangeTitle();
});

/* @author $조민수$ @since $2013-01-28$ frame 자식안에 제목을 부모 제목으로 대처 $  */
function parentChangeTitle() {
    var parentDoc = window.parent.document;
    if(parentDoc != null) {
        var currentTitle = document.title;
        if(currentTitle == null || currentTitle == "" || currentTitle == undefined) {
                return;
        }
        // 최상위 부모 타이틀 교체
        parentDoc.title = currentTitle;
        // 회사 소개 iframe 속성 title 교체
        frameChangeTitle('iframe', currentTitle);
        // 국문 대표사이트 frame 속성 title 교체
        frameChangeTitle('contentframe', currentTitle);
    }
}

// 동적으로 frame 자식안에 제목을 부모 제목으로 대처
function setPageTitle(title) {
    $(document).attr("title", title);
    parentChangeTitle();
}

/* @author $조민수$ @since $2013-02-21$ frame 타이틀 대처 $  */
function frameChangeTitle(frameId, title) {
    var frame = $('#'+frameId, parent.document);
    if(frame) {
        if(!$(frame).attr("src")) {     // src -> false
            title = "빈프레임";
        }
        $(frame).attr("title", title);
    }
}
/**
 * 2016.08.18 [미래에셋/미래에셋대우 통합] 임수석 - sSelect 오류 수정 end
 */
/**************************************************************************************/
/*** menu.js 에서 사용하는 함수 정의 */
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
 * prototype 선언
 * @returns
 */
String.prototype.trim = function() {
	return this.replace(/(^ *)|( *$)/g, "");
};

String.prototype.lTrimZero = function(){
	return this.replace(/(^0+)/, "");
};

/**
 * 메소드명 : 페이지에서 해당 스크립트존재유무
 * 사용방법 : checkScriptExist("ajax.js") >> 페이지에 ajax.js 가 로드된 경우 true, 없는경우 false
 * 파라미터 : [data] 스크립트 파일명 데이터 (String or Array)
 */
function checkScriptExist(data){
	if(data == null || typeof(data) == 'undefined') return;

	//배열인경우
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
 * 메소드명 : 계좌번호 출력 형식 변환
 * 사용방법 : converAccountNo("123-00-456789") => "12300456789"
 * 	         converAccountNo("12300456789") => "123-00-456789"
 * 파라미터 :	[ac_no](필수)- 형식 변환 대상 계좌번호
 */
function converAccountNo(ac_no){
	//"-"가 포함되지 않았을 경우
	if(ac_no.length == 11 || ac_no.length == 12){
		return ac_no.substr(0,3) + "-" + ac_no.substr(3,2) + "-" + ac_no.substr(5);
	}
	//"-"가 포함되어 있을 경우
	return replaceAll(ac_no, "-", "");
}

/**
 * 메소드명 : 계약번호 출력 형식 변환
 * 사용방법 : converContNo("123-00-456789") => "12300456789"
 * 	         converContNo("12300456789") => "123-00-456789"
 * 파라미터 :	[ac_no](필수)- 형식 변환 대상 계좌번호
 */
function converContNo(cont_no){
	//"-"가 포함되지 않았을 경우
	if(cont_no == null) return "";
	if(cont_no.length == 14){
		return cont_no.substr(0,3) + "-" + cont_no.substr(3,5) + "-" + cont_no.substr(8,6);
	}

	//"-"가 포함되어 있을 경우
	return replaceAll(cont_no, "-", "");
}

/**
 * 메소드명 : 문자열 치환
 * 사용방법 : replaceAll("abcada", "a", "1") => "1bc1d1"
 * 파라미터 :	[str](필수)- 치환 대상 문자열
 * 			[org](필수)- 치환대상 문자
 * 			[rep](필수)- 치환문자
 */
function replaceAll(str, org, rep){
	return str.split(org).join(rep);
}
/**
 * 메소드명 : 특정 문자열로 시작하는지 체크
 * 사용방법 : startWith("abcada", "ab") => true
 *           startWith("abcada", "abb") => false
 * 파라미터 :	[str](필수)- 비교 대상 문자열
 * 			[chr](필수)- 비교 문자
 */
function startWith(str, chr){
	//길이 체크
	if(str.length < chr.length){
		return false;
	}
	return str.substr(0, chr.length) == chr;
}
/**
 * 메소드명 : 정해진 길이만큼 문자열 오른쪽을 채운다.
 * 사용방법 : fillRight("mobile", 8, "!") => "mobile!!"
 * 파라미터 :	[ori](필수)- 변환 대상 문자열
 * 			[size](필수)- 문자열 길이
 * 			[chr](필수)- 채울 문자
 */
function fillRight(ori, size, chr){
	//길이 체크
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
 * 메소드명 : 정해진 길이만큼 문자열 왼쪽을 채운다.
 * 사용방법 : fillLeft("mobile", 8, "!") => "!!mobile"
 * 파라미터 :	[ori](필수)- 변환 대상 문자열
 * 			[size](필수)- 문자열 길이
 * 			[chr](필수)- 채울 문자
 */
function fillLeft(ori, size, chr){
	if(typeof(ori) == "number"){
		ori = new String(ori);
	}
	//길이 체크
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
 * 메소드명 : 숫자 형식 변환
 * 사용방법 : numberFormat("12345") => "12,345"
 * 			 numberFormat("12345", "###,###") => "12,345"
 * 			 numberFormat("-12345", "###,###") => "-12,345"
 * 			 numberFormat("345", "00000") => "00345"
 * 			 numberFormat("-12345", "###,###.000") => "-12,345.000"
 * 			 numberFormat("-12345.1234", "###,###.000") => "-12,345.123"
 * 			 numberFormat("-12345.12", "###,###.000") => "-12,345.120"
 * 파라미터 :	[num](필수)- 변환 대상 문자열 또는 숫자
 * 			[format]- 변환 포맷
 */
function numberFormat(num, format,nonSign){
	if(num == null || num == "")  return "";

	//숫자 체크
	if(typeof(num) != "number"){
		if(isNaN(num)){
			return "0";
		}else{
			num = num.replace('+','');  //양수일 경우 '+' 가 들어 오는 경우 예외처리
			num = Number(num);			//00000000... 식으로 올경우 0으로 처리
		}
	}

	//포맷 설정 여부 판별
	if(typeof(format) == "undefined"){
		format = "###,###";
	}

	//부호 설정 여부
	if(typeof(nonSign) == "undefined"){
		nonSign = false;
	}

	//부호 설정
	var sign = "";
	if(num < 0){
		sign = "-";
		num = num * -1;
	}
	num = new String(num);
	//표현형식 소수점 분리
	format = format.split(".");
	//변환대상 숫자 소수점 분리
	num = num.split(".");
	//소수점 이상 변환
	var tmp_fm = replaceAll(format[0], ",", "");
	if(tmp_fm.length > num[0].length){
		if(startWith(tmp_fm, "0")){
			num[0] = fillLeft(num[0], tmp_fm.length, "0");
		}
	}
	//콤마(,)가 있을 경우 콤마 삽입
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
	//소수점 이하 변환
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
 * ,제거
 */
function removeComma(target){
	try{
		return replaceAll(target, ",", "");
	}catch(e){
		return "";
	}
}

/*
 * numberFormat에서 value가 null일때 undefined떠서 추가
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
 * numberFormatWN에서 널일때 default값 추가
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
 * 메소드명 : 현재 날짜 취득
 * 사용방법 : getToday() => "20110101"
 * 파라미터 :
 */

function getToday(){
	var date = commonUtil_param.serverDate;
	if(date == "")	date = new Date();

	return dateFormat(date, "yyyyMMdd");
}

/**
 * 메소드명 : 날짜 기간 구하기
 * param : pEDate	- 마지막일
 * param : pSDate	- 시작일
 * param : pType	- 'D':일수, 'M':개월수
 * param : isWeek	- 일수로 조회할경우 주말(토,일) 포함여부 true 포함, false 미포함
 */
function getDateDiff(pEDate, pSDate, pType, isWeek) {
	if(pSDate == null && pSDate.length < 8 && pEDate == null && pEDate.length < 8) return null;

	if(typeof(pType	) == 'undefined') pType		= "D";
	if(typeof(isWeek) == 'undefined') isWeek	= true;
	pSDate = pSDate.replace(/\/|\.|-|/gi,''); //'-', '/', '.' 제거
	pEDate = pEDate.replace(/\/|\.|-|/gi,''); //'-', '/', '.' 제거
	var strSDT = new Date(pSDate.substring(0,4), pSDate.substring(4,6)-1, pSDate.substring(6,8));
	var strEDT = new Date(pEDate.substring(0,4), pEDate.substring(4,6)-1, pEDate.substring(6,8));
	var strGapDT = 0;

	if(pType == 'D') {  //일수 차이
		strGapDT = (strEDT.getTime()-strSDT.getTime())/(1000*60*60*24);

		var weekandCnt = 0;
		var tmpDate = strSDT;
		while(!isWeek && tmpDate.getTime() <= strEDT.getTime()){
			//해당일 사이에 주말(토,일)의 카운트수
			if(tmpDate.getDay() == 0 || tmpDate.getDay() == 6) weekandCnt++;
			tmpDate.setDate(tmpDate.getDate() + 1);
		}
		strGapDT -= weekandCnt;
	} else {            //개월수 차이
		if(pEDate.substring(0,4) == pSDate.substring(0,4)) {
		   strGapDT = pEDate.substring(4,6) * 1 - pSDate.substring(4,6) * 1;
		} else {
		   strGapDT = Math.floor((strEDT.getTime()-strSDT.getTime())/(1000*60*60*24*365.25/12));
		}
	}
	return strGapDT;
}

/**
 * 메소드명 : 날짜 형식 변환
 * 사용방법 : dateFormat("20110101010101", "yyyy년MM월dd일 hh시mm분ss초") => "2011년01월01일 01시01분01초"
 * 			 dateFormat(new Date(), "yyyy년MM월dd일 hh시mm분ss초") => "2011년01월01일 01시01분01초"
 * 			 dateFormat("110101", "yy/MM/dd") => "11/01/01"
 * 			 dateFormat("20110101010101", "yyyy-MM-dd") => "2011-01-01"
 * 파라미터 :	[date](필수)- 변환 대상 문자열 또는 날짜 객체
 * 			[format](필수)- 변환 포맷(년:yyyy또는yy, 월:MM, 일:dd, 시:hh, 분:mm, 초:ss)
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

	//년도 추출
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
	//월 추출
	if(format.indexOf("MM") >= 0){
		if(!isDate){
			mon = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "MM", fillLeft(mon, 2, "0"));
	}
	//일 추출
	if(format.indexOf("dd") >= 0){
		if(!isDate){
			day = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "dd", fillLeft(day, 2, "0"));
	}
	//시간 추출
	if(format.indexOf("hh") >= 0){
		if(!isDate){
			hour = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "hh", fillLeft(hour, 2, "0"));
	}
	//분 추출
	if(format.indexOf("mm") >= 0){
		if(!isDate){
			min = date.substr(cur_idx, 2);
			cur_idx += 2;
		}
		result = replaceAll(result, "mm", fillLeft(min, 2, "0"));
	}
	//초 추출
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
 * 메소드명 : 소숫점 반올림
 * 사용방법 : roundXL(236.12526, 3) =>236.13
 * 파라미터 :	[n](필수)- 변환 대상 숫자
 * 			[digits](필수)- 반올림할 자릿수
 */
function roundXL(n, digits) {
	  if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림
	  digits = Math.pow(10, digits); // 정수부 반올림
	  var t = Math.round(n * digits) / digits;
	  return parseFloat(t.toFixed(0));
}
/**
 * 메소드명 : 특정 문자열의 바이트 크기 반환
 * 사용방법 : chr_byte("abcde") =>5, chr_byte("테스트") =>6
 * 파라미터 :	[str](필수)- 비교 문자열
 */
function chk_byte(str){
	var cnt = 0;
	for(var i = 0; i < str.length; i++){
		cnt += chr_byte(str.charAt(i));
	}
	return cnt;
}
/**
 * 메소드명 : 문자크기(바이트) 반환
 * 사용방법 : chr_byte('a') =>1, chr_byte("가") =>2
 * 파라미터 :	[chr](필수)- 변환대상 문자
 */
function chr_byte(chr){
	if(escape(chr).length > 4)      return 2;
	else                            return 1;
}
/**
 * 메소드명 : 문자열 자르기
 * 사용방법 : cutStr("abcde", 3) => "abc"
 * 파라미터 :	[str](필수)- 변환대상 문자
 *  			[limit](필수)- 잘라낼 문자 위치
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
 * 메소드명 : 날짜 형변환(stirng => date, date => string)
 * 사용방법 : convertDate("20110101") => "20110101"에 해당하는 Date 객체
 * 			 convertDate("2011/01/01", "yyyy/MM/dd") => "2011/01/01"에 해당하는 날짜 객체
 * 			 convertDate(new Date()) => "20110101"
 * 			 convertDate(new Date(), "yyyy/MM/dd") => "2011/01/01"
 * 파라미터 :	[date](필수)- 변환 대상 문자열 또는 날짜 객체
 * 			[format]- 변환 포맷(년:yyyy또는yy, 월:MM, 일:dd, 시:hh, 분:mm, 초:ss)
 */
function convertDate(date, format){
	if(date == null || date == "")  return "";

	//포맷 설정 여부 판별
	if(typeof(format) == "undefined"){
		format = "yyyyMMdd";
	}

	//date가 Date객체일 경우
	if(typeof(date) == "object"){
		return dateFormat(date, format);
	}

	//date객체가 문자열일 경우
	var year, mon, day, hour, min, sec;
	var date_obj = new Date();

	//년도 추출
	if(format.indexOf("yyyy") >= 0){
		date_obj.setFullYear(parseInt(date.substr(format.indexOf("yyyy"), 4), 10));
	}else if(format.indexOf("yy") >= 0){
		date_obj.setFullYear(2000 + parseInt(date.substr(format.indexOf("yyyy"), 2), 10));
	}
	//월 추출
	if(format.indexOf("MM") >= 0){
		date_obj.setMonth(parseInt(date.substr(format.indexOf("MM"), 2), 10) - 1);
	}
	//일 추출
	if(format.indexOf("dd") >= 0){
		date_obj.setDate(parseInt(date.substr(format.indexOf("dd"), 2), 10));
	}
	//시간 추출
	if(format.indexOf("hh") >= 0){
		date_obj.setHours(parseInt(date.substr(format.indexOf("hh"), 2), 10));
	}
	//분 추출
	if(format.indexOf("mm") >= 0){
		date_obj.setMinutes(parseInt(date.substr(format.indexOf("mm"), 2), 10));
	}
	//초 추출
	if(format.indexOf("ss") >= 0){
		date_obj.setSeconds(parseInt(date.substr(format.indexOf("ss"), 2), 10));
	}
	return date_obj;
}
/**
 * 메소드명 : 날짜 연산
 * 사용방법 : addDate("20110101", "yyyy", 1) => "20120101"
 * 			 addDate("2011/01/01", "MM", -1, "yyyy/MM/dd") => "2010/12/01"
 * 			 addDate(new Date(), "dd", 1, "yy/MM/dd") => "11/01/02"
 * 파라미터 :	[date](필수)- 변환 대상 문자열 또는 날짜 객체
 * 			[mode](필수)- 연산 대상(년:yyyy또는yy, 월:MM, 일:dd)
 * 			[add_num](필수)- 연산치
 * 			[format]- 날짜 형식(년:yyyy또는yy, 월:MM, 일:dd, 시:hh, 분:mm, 초:ss)
 */
function addDate(date, mode, add_num, format){

	var isDate = true;

	//date가 문자열일 경우 형변환
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
	//date가 문자열일 경우 형변환
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
 * 메소드명 : 요일 구하기
 * 사용방법 : getDay(new Date())
 * 			 getDay('20120220')
 * 			 getDay('2012/02/20')
 * 파라미터 :	[date](필수)- 변환 대상 문자열 또는 날짜 객체
 * 			[format]- 날짜 형식(년:yyyy또는yy, 월:MM, 일:dd, 시:hh, 분:mm, 초:ss)
 */
function getDay(date, format){

	var array_day = new Array("일", "월", "화", "수", "목", "금", "토");
	//date가 문자열일 경우 형변환
	if(typeof(date) == "string"){
		isDate = false;
		date = convertDate(date, format);
	}
	return array_day[date.getDay()];
}

/**
 * 메소드명 : null과 length를 체크
 * 사용방법 : nullLengthCheck(param)
 * 파라미터 :	[param](필수)- 파일명
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
 * 메소드명 : null 인경우 Blank("") 리턴
 * 사용방법 : nullToBlank(param)
 * 파라미터 : [param](필수)
 */
function nullToBlank(param){
	return nullToDefault(param, "");
}

/**
 * 메소드명 : null 인경우 Blank("") 리턴
 * 사용방법 : nullToBlank(param)
 * 파라미터 : [param](필수)
 */
function nullToDefault(param, value){
	if(param == null || param == "null" || !nullLengthCheck(String(param)) || typeof(param)=="undefined"){
		return value;
	}else{
		return param;
	}
}

/**
 * 메소드명 : 원하는 팝업레이어를 화면 정중앙에 표출
 * 사용방법 : divCenter("divId")
 *          - 반드시 레이어가 show()되는 시점에 호출 (스크롤 계산을 위함)
 * 파라미터 :	[divId](필수)- 중앙에 표출시킬 DIV의 ID값 (String)
 */
function divCenter(divId) {
	var top  = 0;
	var left = 0;
	//DIV의 높이가 화면보다 클 경우
	if($("#"+divId).height() > $(window).height() ) {
		top = $(window).scrollTop();
	}else{
		top = $(window).scrollTop() + ($(window).height() - $("#"+divId).height()) / 2;
	}

	//DIV의 폭이 화면보다 클 경우
	if($("#"+divId).width() > $(window).width() ) {
		left = 0;
	}else{
		left = ($(window).width() - $("#"+divId).width()) / 2;
	}
	$("#"+divId).css("top", top		);
	$("#"+divId).css("left", left	);
}
/**
 * 메소드명 : 기존에 사용하던 JSON Object형태의 파라메터를 GET스트링으로 변환
 * 사용방법 : convParam(object)
 *          - 실행하면 해당 오브젝트를 ?를 포함한 GET인자 스트링으로 값을 반환함
 * 파라미터 :	[object](필수)- Json Object명
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
			alert("날짜 형식에 맞지 않습니다. \r\nex)2012/01/01");
			obj.value = "";
			return false;
		} else if (obj.value.lenght < 10 && obj.value.length > 8) {
			alert("날짜 형식에 맞지 않습니다. \r\nex)2012/01/01");
			obj.value = "";
			return false;
		} else if (obj.value.length == 8 || obj.value.length == 10) {
			var datevalue = obj.value.replace(/\//g,"");
			var yyyy = datevalue.substring(0,4);
			var mm = datevalue.substring(4,6);
			var dd = datevalue.substring(6,8);
			var dateStr = yyyy+"/"+mm+"/"+dd;
			if (!chkdate(dateStr)) {
				alert("날짜 형식에 맞지 않습니다. \r\nex)2012/01/01");
				obj.value = "";
				return false;
			} else {
				obj.value = yyyy+"/"+mm+"/"+dd;
				return true;
			}
		} else {
			alert("날짜 형식에 맞지 않습니다. \r\nex)2012/01/01");
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
 * 메소드명 : 디버깅용 파람 출력 (승인을 누르면 계속 진행, 취소를 누르면 현재 로직에서 중단)
 * 사용방법 : alertParam(param)
 * 파라미터 :	[param](필수)- ajax호출시 파라미터
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
 * 메소드명 : 특정 항목의 일정길이 값이 입력되면 다음 항목으로 커서 이동- 주로 onkeyup와 같이 사용
 * 사용방법 : onkeyup="next_cursor(this, 4, $('#next'));"
 * 파라미터 :	[param](필수)- ajax호출시 파라미터
 */
function next_cursor(current, length, next){
	if($(current).val().length == length){
		next.focus();
	}
}

/**
 * 특정 필드에 대해서 number만 입력 가능하게 설정
 * 파라미터 :	[target](필수)- 설정할 필드 id
 * */
function numberOnly(target){
	$("#"+target).keypress(function(event){
		if(event.keyCode<48||event.keyCode>57) event.returnValue=false;
	});
}


/**
 * 금액 콤마 찍기 version k
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
 * form Serialize 할경우 Array 에 대한 처리
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

//화면 리사이즈
$.fn.show = function()
{
	var obj;
	try{
		obj = this.css("display", "block");
		resizeCheck();
	}catch(e){}
	return obj;
};

//화면 리사이즈
$.fn.hide = function()
{
	var obj;
	try{
		obj = this.css("display", "none");
		resizeCheck();
	}catch(e){}
	return obj;
};

//화면 리사이즈
$.fn.shownr = function()
{
	var obj;
	try{
		obj = this.css("display", "");
	}catch(e){}
	return obj;
};

//화면 리사이즈
$.fn.hidenr = function()
{
	var obj;
	try{
		obj = this.css("display", "none");
	}catch(e){}
	return obj;
};

//메세제 얼럿
function showMsg(mmsg){
	alert(mmsg);
	//$.msgbox({	msg	: mmsg });
}

/*
 * 0제거
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
 * 상승/하락을 판단하여 해당 색을 표현하는 TAG정보 리턴isNaN(num)
 */
function updownTag(val){
	return updownTagWN(val, val);
}

/**
 * 상승/하락을 판단하여 해당 색을 표현하는 TAG정보 리턴
 * @param disVal 디스플레이되는 Value
 * @param oriVal 상승하락을 비교할수 있는 원문데이터
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
		if(intVal > 0)		updownTag = "<i title='상승'>"+disVal+"</i>";
		else if(intVal < 0) updownTag = "<em title='하락'>"+disVal+"</em>";
		else				updownTag = disVal;
	}
	return updownTag;
}


/**
 * + - 를 다른색으로 표시하는 TAG정보 리턴
 * @param disVal 디스플레이되는 Value
 * @param oriVal + - 를 색으로 표시
 */
function updownTagMP(val){
	return updownTagMPM(val, "");
}
function updownTagMPM(disVal, disMk){
	var updownTag = "";
	if(!isCommonNull(disVal)){
		var rtVal = replaceAll(removeComma(disVal), ".", "");
		if (disMk == null || disMk == ""){
			if(rtVal > 0)		updownTag = "<i title='상승'>"+disVal+"</i>";
			else if(rtVal < 0) updownTag = "<em title='하락'>"+disVal+"</em>";
			else				updownTag = disVal;
		} else {
			if(rtVal > 0)		updownTag = "<i title='상승'>"+disVal+"&nbsp;"+disMk+"</i>";
			else if(rtVal < 0) updownTag = "<em title='하락'>"+disVal+"&nbsp;"+disMk+"</em>";
			else				updownTag = disVal+"&nbsp;"+disMk;
		}
	}
	return updownTag;
}


/*
 * 상승/하락을 판단하여 해당 색을 표현하는 Class값을 리턴
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
 * 상승/하락을 판단하여 해당 색을 표현하는 Class값을 리턴
 * param1 : value
 * param2 : 상승일때 클래스
 * param3 : 하락일때 클래스
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
 * 수익률이 null 또는 999데이터로 올경우 해당 수익률을 '-'로 표현
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
 * 해당 수익률이 'NaN'으로 올경우 '-'로 표현
 */
function removeNaN(str){
	var rVal = str.trim();
	if(rVal == "NaN"){
		rVal = "-";
	}
	return rVal;
}

/*
 * 펀드 초고위험 태그리턴
 */
function getPdClass( pd_class ){
	var rtnClss = "";
	if(pd_class == "05"){
		 rtnClss = "<span class='ico_label lev6'><em>"+'초저위험'+"</em></span>";
	}else if(pd_class == "04"){
		rtnClss  = "<span class='ico_label lev5'><em>"+'저위험'+"</em></span>";
	}else if(pd_class == "03"){
		rtnClss = "<span class='ico_label lev4'><em>"+'중위험'+"</em></span>";
	}else if(pd_class == "06"){
		rtnClss = "<span class='ico_label lev3'><em>"+'고위험'+"</em></span>";
	}else if(pd_class == "02"){
		rtnClss = "<span class='ico_label lev2'><em>"+'고위험'+"</em></span>";
	}else if(pd_class == "01"){
		rtnClss = "<span class='ico_label lev1'><em>"+'초고위험'+"</em></span>";
	}
	return rtnClss;
}

/*
 * 펀드 초고위험 태그리턴
 */
function getPdClassOrg( pd_class ){
	var rtnClss = "";
	if(pd_class == "01"){
		 rtnClss = "<span class='ico_label lev6'><em>"+'초저위험'+"</em></span>";
	}else if(pd_class == "02"){
		rtnClss  = "<span class='ico_label lev5'><em>"+'저위험'+"</em></span>";
	}else if(pd_class == "03"){
		rtnClss = "<span class='ico_label lev4'><em>"+'중위험'+"</em></span>";
	}else if(pd_class == "04"){
		rtnClss = "<span class='ico_label lev3'><em>"+'고위험'+"</em></span>";
	}else if(pd_class == "05"){
		rtnClss = "<span class='ico_label lev1'><em>"+'초고위험'+"</em></span>";
	}
	return rtnClss;
}

/*
 * 위험등급명에 따른 코드 리턴
 */
function getPdClas2(pd_class_txt){
	var pd_class = "";
	if(pd_class_txt == "초저위험 6등급"){
		pd_class = "01";
	}else if(pd_class_txt == "저위험 5등급"){
		pd_class = "02";
	}else if(pd_class_txt == "중위험 4등급"){
		pd_class = "03";
	}else if(pd_class_txt == "고위험 3등급"){
		pd_class = "04";
	}else if(pd_class_txt == "고위험 2등급"){
		pd_class = "05";
	}else if(pd_class_txt == "초고위험 1등급"){
		pd_class = "06";
	}
	
	return getPdClass(pd_class);
}

/* 펀드위험 등급 Text 리턴 */
function getPdClassTxt( pd_class ){
	var rtnTxt = "";
	if(pd_class == "01"){
		rtnTxt = "초저위험(6등급)";
	}else if(pd_class == "02"){
		rtnTxt  = "저위험(5등급)";
	}else if(pd_class == "03"){
		rtnTxt = "중위험(4등급)";
	}else if(pd_class == "04"){
		rtnTxt = "고위험(3등급)";
	}else if(pd_class == "05"){
		rtnTxt = "고위험(2등급)";
	}else if(pd_class == "06"){
		rtnTxt = "초고위험(1등급)";
	}
	return rtnTxt;
}


/**
 * 포트폴리오 진단수준 텍스트
 * @param pType 진단유형 (1:수익진단, 2:위험분석, 3:투자효율, 4:자산배분)
 * @param pLev	진단수준 (1~5)
 * @returns {String}
 */
function portLevelText(pType, pLev){
	var resText = "-";
	if(!isCommonNull(pLev)){
		pLev = new String(pLev);
		if(pType == "1"){
			if("1" == pLev) 		resText = "매우부진";	
			else if("2" == pLev) 	resText = "부진";	
			else if("3" == pLev) 	resText = "보통";	
			else if("4" == pLev) 	resText = "좋음";	
			else if("5" == pLev) 	resText = "매우좋음";
		}else if(pType == "2"){
			if("1" == pLev) 		resText = "매우위험";
			else if("2" == pLev) 	resText = "위험";	
			else if("3" == pLev) 	resText = "보통";	
			else if("4" == pLev) 	resText = "양호";	
			else if("5" == pLev) 	resText = "매우양호";
		}else if(pType == "3"){
			if("1" == pLev) 		resText = "매우낮음";
			else if("2" == pLev) 	resText = "낮음";	
			else if("3" == pLev) 	resText = "보통";	
			else if("4" == pLev) 	resText = "높음";
			else if("5" == pLev) 	resText = "매우높음";
		}else if(pType == "4"){
			if("1" == pLev) 		resText = "매우나쁨";
			else if("2" == pLev) 	resText = "나쁨";	
			else if("3" == pLev) 	resText = "보통";	
			else if("4" == pLev) 	resText = "좋음";	
			else if("5" == pLev) 	resText = "매우좋음";	
		}
	}
	return resText;
}

/**
 * 포트폴리오 진단수준 Label Classs Tag
 * @param pType 진단유형 (1:수익진단, 2:위험분석, 3:투자효율, 4:자산배분)
 * @param pLev	진단수준 (1~5)
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
 * 포트폴리오 진단수준 챠트 Class 지정
 * @param chartId 	챠트 Tag ID
 * @param chartLev	진단수준 (1~5)
 * @returns {String}
 */
function portLevelChart(chartId, chartLev){
	if(!isCommonNull(chartId)){
		if(isCommonNull(chartLev)) 	chartLev = "1";
		else						chartLev = new String(chartLev);
		
		var $chartObj = $("#"+chartId);
		$chartObj.removeClass().addClass("step"+chartLev);			//챠트 Class <!-- D : step1 ~ step5 class 삽입 -->
		$chartObj.find("em").text("그래프 바늘 : "+chartLev+"단계</em>");	//<!-- D : 그래프 바늘 삽입 -->
	}
}
/*
 * default error message
 */
function packetErrorMsg(){
	return "데이터를 수신할 수 없습니다.\n고객센터에 문의 하세요.(1588-9200)";
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

//팝업호출시 클릭이벤트 체크
function a_tag_ck(){
	$("body a").click(function(){
		$("body a").removeClass("a_tag_ck");
		$(this).addClass("a_tag_ck");
	});
};

//** 자동로그아웃 팝업창 호출 **//
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

//** 자동로그아웃 팝업창 종료 **//
function closeLogoutInfo() {
    $.closePopupLayer('alertLogoutInfo');
    try{
        top.contentframe.location.href = '/login/logout.do';
    }catch(e){}
}
//** 자동로그아웃 레이어 HTML **//
function getLogoutInfoHtml() {
    var _html = '';
    _html += '<div id="alertLogoutInfoLayer" style="z-index:100001;display:none;"> \n';
    _html += '<div class="lay-pop" style="width: 516px;">\n';
    _html += '      <div class="lay-content">\n';
    _html += '              <h4><img src="' + image_server + '/login/ti_h4_0802_01.gif" alt="자동 로그아웃 알림" /></h4>\n';
    _html += '              <div class="autologin-out-box">\n';
    _html += '                      <img src="' + image_server + '/login/tx_0802_02.gif" alt="자동으로 로그아웃 되었습니다" />\n';
    _html += '                      <p class="mgt20"><strong>로그인 후 자동로그아웃 설정시간 동안</strong> 화면 이동이 없어<br /> <strong>자동으로 로그아웃</strong> 되었습니다.<br />\n';
    _html += '                      서비스를 계속 이용하시려면 다시 <a href="javascript:doGnbLogin();">로그인</a> 해주시기 바랍니다.</p>\n';
    _html += '              </div>\n';
    _html += '              <p class="dot-type">자세한 안내나 문의사항이 계시면 당사 <strong>고객센터(1588-6800)</strong>를 이용해<br />주시기 바랍니다.</p>\n';
    _html += '              <a href="javascript:closeLogoutInfo();" class="act-close" title="팝업 닫기"><img src="' + image_server + '/common/bts_close.gif" alt="닫기" /></a>\n';
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