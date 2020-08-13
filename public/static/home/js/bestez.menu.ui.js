document.writeln('<scr' + 'ipt src="/site_variable.jsp?d=' + new Date().getMilliseconds() + '" type="text/javascript" charset="euc-kr" ></scr' + 'ipt>\n');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/js/bestez.menu.js"></scr'+'ipt>');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/js/bestez.menu.data.js"></scr'+'ipt>');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/js/bestez.banner.data.js"></scr'+'ipt>');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/js/bestez.specialmenu.data.js"></scr'+'ipt>');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/js/bestez.guide.data.js"></scr'+'ipt>');
document.writeln('<scr'+'ipt type="text/javascr'+'ipt" src="/advancement/html/com/js/cm.jQuery.browser.check.js"></scr'+'ipt>');

var Request =
{
	getParameter : function( name )
	{
		var rtnval = '';
		var nowAddress = unescape(location.href);
		var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');

		for(var i = 0 ; i < parameters.length ; i++)
		{
			var varName = parameters[i].split('=')[0];
			if(varName.toUpperCase() == name.toUpperCase())
			{
				rtnval = parameters[i].split('=')[1];
				break;
			}
		}
		return rtnval;
	}
}

var body = Request.getParameter("body");
var bodyOnly = (body == 'Y');

function cp_ready()
{
	alert('제휴사 화면 개발중입니다.');
}

var _url = '/';
var _wtsMode = false;
var _wtsCode = '';
var _ordertype = '';

function openWts(code, ordertype)
{
	if (code != null)
		closeFlying();

	if ( isMobile() )
	{
		alert('모바일에서는 제공되지 않는 서비스입니다.');
		return;
	}
	else
	{
		//trading domain
		var tDomain = "https://trading.miraeassetdaewoo.com";
		if(document.location.href.indexOf('dev') > -1 || document.location.href.indexOf('dvp') > -1 )
			tDomain = "https://tradingdvp.miraeassetdaewoo.com";
		if(document.location.href.indexOf('ace') > -1 )
			tDomain = "https://tradingace.miraeassetdaewoo.com";

		//full url
		var tradeUrl = tDomain;
		if (code != null && code != undefined && code != "")
			tradeUrl = tradeUrl + '/index.jsp?screenId=' + code
		if (ordertype != null && ordertype != undefined && ordertype!="")
			tradeUrl = tradeUrl + '&ordertype=' + ordertype;
		window.open(tradeUrl,'trade');        //, width='+screen.width+', height='+screen.heigth
	}
}

function openWts2(code)
{
	//trading domain
	var tDomain = "https://trading.miraeassetdaewoo.com";
	if(document.location.href.indexOf('dev') > -1 || document.location.href.indexOf('dvp') > -1 )
		tDomain = "https://tradingdvp.miraeassetdaewoo.com";
	if(document.location.href.indexOf('ace') > -1 )
		tDomain = "https://tradingace.miraeassetdaewoo.com";

	_url = tDomain+'/?url=/wts/flash/wtsPopup.jsp';

	if (code != null && code != undefined)
	{
		_url = _url + '?screenId='+code;
		_url = _url + '&amp;moveButton=Y&amp;wmode=transparent';
	}

	window.open(_url);
}

function openWts_old(code, ordertype)
{
	if (code != null)
		closeFlying();

	if ( isMobile() )
	{
		alert('모바일에서는 제공되지 않는 서비스입니다.');
		return;
	}
	else
	{
		_wtsMode = true;

		if (ordertype == null)
			ordertype = '';

		var _code = '';
		if (code != '1519' && !_isLogin)
		{
			_url = '/login.do?url=/wts/flash/wtsMain.jsp?screenId=' + code + '&ordertype=' + ordertype;
		}
		else
		{
			if (code == null || code == undefined)
				_code = '';
			else
				_code = code;

			if (ordertype == null || ordertype == undefined)
				ordertype = '';
				_url = '/wts/flash/wtsMain.jsp?screenId=' + _code + '&ordertype=' + ordertype;
		}

		_ordertype = ordertype;
		_wtsCode = _code;
		//천창환 2015.10.28 initech 관련 제거
		//checkIniplugin();
	}
}

/*천창환 secureframe 제거
function checkIniplugin()
{
	if (opener == null && top.secureframe.location.href.indexOf('/blank.html') > -1)
	{
		try
		{
			if ( isMobile() )
				top.secureframe.location.href = '/IniPluginM.jsp';
			else
				top.secureframe.location.href = '/IniPlugin.jsp';
		}
		catch (e)
		{
			bINIinstallSuccess (true);
		}
	}
	else
	{
		bINIinstallSuccess(true);
	}
}
*/

function clearWts()
{
	top.wtsFrame.location.href = '/blank.html';
}

function clearHp()
{
	top.contentframe.location.href = '/blank.html';
}

function openHp(url, isSecure)
{
	if (url.indexOf('login') < 0 && isMobile() && isSecure)
	{
		alert('모바일에서는 제공되지 않는 서비스입니다.');
		return;
	}

	_wtsMode = false;
	_url = url;

	if ( isMobile() )
	{
		if( url.indexOf('/bbs/board/') > -1 && url.indexOf('/login.do') < 0 )
		{
			//제외대상
			if( url == '/bbs/board/message/list.do?categoryId=8&dataType=2' ||
					url == '/bbs/board/message/list.do?categoryId=8&dataType=3' ||
					url == '/bbs/board/message/list.do?categoryId=8&dataType=5' ||
					url == '/bbs/board/message/list.do?categoryId=8&dataType=6' ||
					url.indexOf('categoryId=14') > -1 ||
					url.indexOf('categoryId=15') > -1 ||
					url.indexOf('categoryId=16') > -1 ||
					url.indexOf('categoryId=17') > -1 ||
					url.indexOf('categoryId=18') > -1 ||
					url.indexOf('categoryId=19') > -1 ||
					url.indexOf('categoryId=20') > -1 ||
					url.indexOf('categoryId=24') > -1 ||
					url.indexOf('categoryId=25') > -1 ||
					url.indexOf('categoryId=27') > -1 ||
					url.indexOf('categoryId=28') > -1 ||
					url.indexOf('categoryId=29') > -1 ||
					url.indexOf('categoryId=30') > -1 ||
					url.indexOf('categoryId=31') > -1 ||
					url.indexOf('categoryId=32') > -1 ||
					url.indexOf('categoryId=33') > -1 ||
					url.indexOf('categoryId=34') > -1 ||
					url.indexOf('categoryId=35') > -1 ||
					url.indexOf('categoryId=36') > -1 )
			{
				
				if (!_isLogin){
					openHp('/login.do?url=' + escape(_url), false);
				}
			}
		}
	}
	else
	{
		if ( url == '/bbs/board/message/list.do?categoryId=8&dataType=2' ||
				url == '/bbs/board/message/list.do?categoryId=8&dataType=3' ||
				url == '/bbs/board/message/list.do?categoryId=8&dataType=5' ||
				url == '/bbs/board/message/list.do?categoryId=8&dataType=6' )
		{
			if (!_isLogin){
				openHp('/login.do?url=' + escape(_url), true);
			}
		}
	}
	// 천창환 2015.10.19
	document.location.href=_url;
	/*
	if (isSecure == null || !isSecure)
		bINIinstallSuccess(false);
	else
		checkIniplugin();

	closeFlying();      //20120508 최준호 추가
	*/
}

/*천창환 2015.10.28 initech 관련 제거
function bINIinstallSuccess(isSecure)
{
	if (_url != '' && _url != '/')
	{
		if (!_wtsMode)
		{
			if (isSecure == null || !isSecure)
				top.contentframe.location.href = _url;
			else
			{
				// 지로/공과금예외처리
				if(_url.indexOf('/hku/hku4161/a01.do') > -1)
					top.contentframe.location.href = _url + "#contents" + _url.substring(_url.length-1);//bestez.encrypt encryptUrl
				else
					top.contentframe.location.href = _url;//bestez.encrypt encryptUrl
			}

			$("#topFrame", top.document).attr("rows", "0, *, 0, 0");

			if (_url.indexOf('logout.do') > -1)
				top.wtsFrame.location.href = '/blank.html';
		}
		else
		{
			if (top.wtsFrame.location.href.indexOf('/blank.html') > -1)
			{
				if (_url.indexOf('login.do') > -1)
					top.wtsFrame.location.href = _url;
				else
				{
					if ( isMobile() )
						top.wtsFrame.location.href = _url+'&screenId=' + _wtsCode + '&ordertype=' + _ordertype;
					else
						top.wtsFrame.location.href = _url+'&screenId=' + _wtsCode + '&ordertype=' + _ordertype;//bestez.encrypt encryptUrl
				}
				clearHp();
			}
			else
			{
				if ( _wtsCode == '1519' || (_wtsCode != '1519' && _isLogin))
				{
					top.wtsFrame.openWindow(_wtsCode, 'ordertype=' + _ordertype);
				}
				else
				{
					if (_url.indexOf('login.do') > -1)
						top.wtsFrame.location.href = _url;
					else
					{
						if ( isMobile() )
							top.wtsFrame.location.href = _url;
						else
							top.wtsFrame.location.href = _url;//bestez.encrypt encryptUrl
					}
					clearHp();
				}
			}
			$("#topFrame", top.document).attr("rows", "0, 0, *, 0");
		}
	}
}
*/

function openLnbByMenuCode(currentMenuCode)
{
	var currentMenu = getMenuFromMenuCode(currentMenuCode);

	if (currentMenu!=null)
	{
		for (var i=0; i<currentMenu.parentMenuCodes.length; i++)
		{
			var parentMenu = getMenuFromMenuCode(currentMenu.parentMenuCodes[i]);
			if (parentMenu.depth == 1)
				$('#menu_body_' + parentMenu.menuCode).slideToggle('fast');
			if (parentMenu.depth == 2)
				$('#menu_head_sub_' + parentMenu.menuCode).slideToggle('fast');
		}
	}
}

var _currentSelOneDepthMenuCode = '';

function openFlying(oneDepthMenuCode, _target)
{
	if (_currentSelOneDepthMenuCode != oneDepthMenuCode)
	{
		_currentSelOneDepthMenuCode = oneDepthMenuCode;
		printFlying(oneDepthMenuCode, _target);
		$("#submenu-box").show();
		$('#layer_bg').css({'opacity': 0.70}).show();

		if (top.wtsFrame && top.wtsFrame.location.href.indexOf('/blank.html') < 0)
		{
			try
			{
				if (oneDepthMenuCode == 'hks4000m01')
					top.wtsFrame.resizeWTS(385);
				else if (oneDepthMenuCode == 'nkr1001m01')
					top.wtsFrame.resizeWTS(237);
				else if (oneDepthMenuCode == 'hki3001m01')
					top.wtsFrame.resizeWTS(470);
				else if (oneDepthMenuCode == 'hkt1001m01')
					top.wtsFrame.resizeWTS(575);
			}
			catch (e)
			{
			}
		}
	}
}

function doMain()
{
	try
	{
		top.contentframe.location.href = '/main.do';
		$("#topFrame", top.document).attr("rows", "0, *, 0, 0");
	}
	catch(e)
	{
		location.href = "/";
	}
}

function run_speedway()
{
	if(navigator.appVersion.indexOf("MSIE") != -1)
	{
		window.open('http://www.bestez.com/SpeedWay/SpeedWayStart.jsp','speedway','top=100,left=230,width=580,height=650,toolbar=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0');
		return;
	}
	else
	{
		alert('Internet Explorer를 사용하여 주시기 바랍니다.');
	}
}

function closeFlying()
{
	try
	{
		if (top.wtsFrame && top.wtsFrame.location.href.indexOf('/blank.html') < 0)
		{
			top.wtsFrame.resizeWTS(0);
		}
	}
	catch (e)
	{
	}

	_currentSelOneDepthMenuCode = '';
	$("#submenu-box").hide();
	$('#layer_bg').hide();
	$('#submenu-box-gnb dd').hide();
	$('#submenu-box-gnb dt').removeClass('on');
}

var _mallFlyHtml = '';
var _researchFlyHtml = '';
var _bankingFlyHtml = '';
var _wtsFlyHtml = '';

function printFlying(oneDepthMenuCode, _target)
{
	var _html = getFlyHtml(oneDepthMenuCode);
	_target.next().html(_html).show();
	return;
	$(".boxin").html(getFlyHtml(oneDepthMenuCode));
	return;

	if (oneDepthMenuCode == 'hks4000m01') //금융상품
		$(".boxin").html(_mallFlyHtml);
	else if (oneDepthMenuCode == 'nkr1001m01') // 투자정보
		$(".boxin").html(_researchFlyHtml);
	else if (oneDepthMenuCode == 'hki3001m01') // 온라인지점/뱅킹
		$(".boxin").html(_bankingFlyHtml);
	else if (oneDepthMenuCode == 'hkt1001m01') // 트레이딩
		$(".boxin").html(_wtsFlyHtml);
}

function getFlyHtml(oneDepthMenuCode)
{
	var currentMenu = getMenuFromMenuCode(oneDepthMenuCode);
	if(!currentMenu)
	{
		return '';
	}

	var childMenus = currentMenu.childMenu;
	var _str = '', print_cnt = 0, wClassName = '', lineCnt = (oneDepthMenuCode == 'hku2001t01' ? 4 : 5)

	for(var i = 0, len = childMenus.length ; i < len ; i++)
	{
		if(	childMenus[i]	)
		{
			//이용안내문의-FAQ
			if(oneDepthMenuCode == '0000004000')
			{
				if(/^(0000000617)$/.test(childMenus[i].menuCode))
				{
					continue;
				}
			}

			wClassName = ' w' + childMenus[i].menuCode;// smenu.width 예외처리

			_str += '<div class="smenu ' + wClassName + '">\n';
			_str += getChildLIHtml(childMenus[i]);
			_str += '</div>\n';

			print_cnt++;

			if(print_cnt%lineCnt ==0)
			{
				_str += '<p class="cb"></p>';
			}
		}
	}
	return _str;
}

function brTitle(s)
{
	if (s.indexOf('br') > -1)
		return s;

	if (s == '이용자비밀번호재등록/변경')
		return '이용자비밀번호 재등록/변경';//'이용자비밀번호<br/>재등록/변경'
	if (s == 'Asset Tracker Report')
		return 'Asset Tracker Report';
	else if (s == 'Asset Tracker 서비스')
		return s;

	return s;
}

function getChildLIHtml(menu, class_yn)
{
	var _html = '';
	if(!menu)
	{
		return _html;
	}
	
	var childMenus = menu.childMenu;
	if (childMenus)
	{
		_html += '  <img  src="' + image_server + '/common/gnb_new/fly/gnb_' + menu.menuCode + '.gif" alt="' + menu.title + '" />\n';
		_html +='   <ul>\n';

		for (var i=0; i<childMenus.length; i++)
		{
			var childMenu = childMenus[i];
			if(childMenu)
			{
				if (childMenu.url == '' || childMenu.url == '#')
				{
					if (childMenu.childMenu)
					{
						if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1)
							continue;
						_html += '              <li><a href="javascript:openHp(\'' + childMenu.childMenu[0].url + '\',' + childMenu.childMenu[0].secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
					}
					else
					{
						if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1)
							continue;
						_html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\', ' + childMenu.secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
					}
				}
				else
				{
					if (childMenu.url.indexOf('javascript') > -1  )
					{
						_html += '              <li><a href="' + childMenu.url + '" title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
					}
					else if ( childMenu.url.indexOf('https://') > -1 )
					{
						_html += '              <li><a href="' + childMenu.url + '" target="_blank" title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
					}
					else
					{
						// guide
						if(childMenu.parentMenuCode=='0000004000_1')
						{
							_html += '              <li><a href="javascript:openGuide(\'' + childMenu.url   + '\');" title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
						}
						else
						{
							if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1)
								continue;
							_html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\',' + childMenu.secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
						}
					}
				}
			}
		}
		_html +='   </ul>\n';
	}
	else
	{
		if (menu.url.indexOf('javascript') > -1  || menu.menuCode == '0000000501')
		{
			_html += '<a href="' + menu.url + '" title="새창">';
		}
		else if (  menu.url.indexOf('https://') > -1 )
		{
			_html += '<a href="' + menu.url + ' target="_blank" " title="새창">';
		}
		else
		{
			_html += '<a href="javascript:openHp(\'' + menu.url + '\',' + menu.secure + ');">';
		}

		_html += '<img  src="' + image_server + '/common/gnb_new/fly/gnb_' + menu.menuCode + '.gif" alt="' + menu.title + '" />';
		_html += '</a>';
	}
	return _html;
}

function openGuide(url)
{
	var _guidewin = window.open(url, 'guidepop', 'width=900,height=700,location=0,status=0');
	_guidewin.focus();
}

function printLnb()
{
	var guides = BestEzGuide.guide;
	var guideCnt = 0;
	if (guides)	{
		for (var i=0; i<guides.length; i++)	{
			var _guide = guides[i];
			if (_guide)	{
				// giro
				if ((_currentMenuCode == '0000000519' && _currentMenuCode==_guide.parentMenuCode) || getMenuFromMenuCode(_currentMenuCode).parentMenuCodes[1] == _guide.parentMenuCode)
				{
					guideCnt++;
				}
			}
		}		
	}
	
	var _lnbHtml = '<dt class="snbTit" id="lnbTitle"></dt><dd><ul class="snbMenu" id="lnbUL"></ul></dd>';
	if (guideCnt > 0 || _bannerUrl != '') {
		_lnbHtml += '<dd class="snbBanner">';
		if (guideCnt > 0) {
			_lnbHtml += '<ul class="bannerLst" id="guideUL"></ul>';
		}
		if (_bannerUrl != '') {
			_lnbHtml += '<ul class="lnb-etc" id="bannerUL"></ul>';
		}
		_lnbHtml += '</dd>';
	}
		
	$('#lnbMenuLayer').html(_lnbHtml);

	var currentMenu = getMenuFromMenuCode(_currentMenuCode);
	if(currentMenu == null || typeof(currentMenu) == "undefined" || currentMenu == "null" || currentMenu == "") return;
	var parentIndex = currentMenu.depth > 2 ? 1 : 0;
	var twoDepthLink = false;
	var _html = '';
	var parentMenu = getMenuFromMenuCode(currentMenu.parentMenuCode);
	var parentMenus = currentMenu.parentMenuCodes;
	var parentRootMenu = getMenuFromMenuCode(parentMenus[0]);
	if(parentRootMenu != null && typeof(parentRootMenu)!="undefined"){
		if(parentRootMenu.menuCode=="hks4000m01"){
			$("#gnbMenuLI02").addClass("active");
		}else if(parentRootMenu.menuCode=="hkp0001m01"){
			$("#gnbMenuLI03").addClass("active");
		}else if(parentRootMenu.menuCode=="nkr1001m01"){
			$("#gnbMenuLI04").addClass("active");
		}else if(parentRootMenu.menuCode=="hki3001m01"){
			$("#gnbMenuLI05").addClass("active");
		}else if(parentRootMenu.menuCode=="0000000531"||parentRootMenu.menuCode=="hku4000m01"){
			$("#gnbMenuLI06").addClass("active");
		}else if(parentRootMenu.menuCode=="0000002000"){
			$("#gnbMenuLI07").addClass("active");
		}
	}
	if (currentMenu.depth == 1)
	{
		$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + currentMenu.menuCode + '.gif" alt="' + currentMenu.title + '" border="0" />');
		if (currentMenu.menuCode != 'login' || (parentRootMenu && parentRootMenu.menuCode != 'login'))
		{
			if (currentMenu.childMenu)
			{
				parantChildMenus = currentMenu.childMenu;
				if (parantChildMenus)
				{
					for (var i=0; i<parantChildMenus.length; i++)
					{
						var menu = parantChildMenus[i];

						if (menu && currentMenu.menuCode == "hks4200n01" && ( getMenuUrl(menu).url.indexOf("openWts") > -1 ||   getMenuUrl(menu).url.indexOf("cp.do") > -1)  )
							continue;
						if (menu)
						{
							_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							_html += '</li>\n';
						}
					}
				}
			}
		}
	}
	else if (currentMenu && currentMenu.depth > 1)
	{
		var parentRootMenu2 = getMenuFromMenuCode(parentMenus[1]);
		var twoDepthMenuCode = currentMenu.parentMenuCodes[1];

		if (parentRootMenu.menuCode == 'hku2001t01' || parentRootMenu.menuCode == '0000001000' )
		{
			parentIndex = 0;
			twoDepthLink = true;
		}
		
		if (parentRootMenu.menuCode == '0000001000'){
			$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + parentRootMenu.menuCode + '.gif" alt="' + parentRootMenu.title + '" border="0" />');
		}else if (parentRootMenu.menuCode != 'login'  && currentMenu.depth == 2 && !currentMenu.childMenu){
			$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + currentMenu.menuCode + '.gif" alt="' + currentMenu.title + '" border="0" />');
		}else if (currentMenu.menuCode == '0000002001' || currentMenu.menuCode == '0000002002'){
			$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + currentMenu.menuCode + '.gif" alt="' + currentMenu.title + '" border="0" />');
		}else{
			// 지로공과금
			if(currentMenu.url == '/hku/hku4161/a01.do')
				$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + currentMenu.menuCode + '.gif" alt="' + currentMenu.title + '" border="0" />');
			else 
				$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + getMenuFromMenuCode(parentMenus[parentIndex]).menuCode + '.gif" alt="' + getMenuFromMenuCode(parentMenus[parentIndex]).title + '" border="0" />');
		}
		
		var parantChildMenus;

		if (currentMenu.depth == 1)
		{
			parantChildMenus = currentMenu.childMenu;
		}
		else if (currentMenu.depth == 2)
		{
			parantChildMenus = parentRootMenu.childMenu;
		}
		else
		{
			parantChildMenus = parentRootMenu2.childMenu;
		}

		if (parentRootMenu.menuCode == 'hku2001t01')
		{
			parantChildMenus = parentRootMenu.childMenu;
		}

		var _html = '';

		if (twoDepthMenuCode != '0000000519' && currentMenu.menuCode != "hkp1001r01")
		{
			if (currentMenu.depth > 2 || twoDepthLink)
			{
				if (parantChildMenus)
				{
					for (var i=0; i<parantChildMenus.length; i++)
					{
						var menu = parantChildMenus[i];

						if (menu && !menu.special)
						{
							//if (menu.title == 'RP형CMA 보유잔고 매도/취소')
							//	menu.title = 'RP형CMA 보유잔고<br/>매도/취소';
							if (menu.title == 'Wrap형CMA 이자금액조회') {
								menu.title = 'Wrap형CMA<br/>이자금액조회';
							} else if (menu.title == '신탁형 ISA 분산투자입력') {
								menu.title = '신탁형 ISA<br/>분산투자입력';
							} else if (menu.title == '신탁형 ISA 납입한도 정정') {
								menu.title = '신탁형 ISA<br/>납입한도 정정';
							} else if (menu.title == 'Wrap Account 가입/운용') {
								menu.title = 'Wrap Account<br/>가입/운용';
							} else if (menu.title == '연금저축계좌납입내역조회') {
								menu.title = '연금저축계좌<br/>납입내역조회';
							} else if (menu.title == '연금저축 전환/종목 교체') {
								menu.title = '연금저축 전환/<br/>종목 교체';
							} else if (menu.title == 'Global Company Analysis') {
								menu.title = 'Global Company<br/>Analysis';
							} else if (menu.title == '사이버트레이딩 등록/해지') {
								menu.title = '사이버트레이딩<br/>등록/해지';
							} else if (menu.title == '이용자비밀번호재등록/변경') {
								menu.title = '이용자비밀번호<br/>재등록/변경';
							} else if (menu.title == '개인(신용)정보 수집이용제공 등록/조회') {
								menu.title = '개인(신용)정보 수집<br/>이용제공 등록/조회';
							} else if (menu.title == '본인정보 이용/제공 조회') {
								menu.title = '본인정보 이용/제공<br/>조회';
							} else if (menu.title == '펀드 잔고통보처 등록/변경') {
								menu.title = '펀드 잔고통보처<br/>등록/변경';
							} else if (menu.title == '계좌단위 증거금 변경신청') {
								menu.title = '계좌단위 증거금<br/>변경신청';
							} else if (menu.title == 'USD RP 자동매수 서비스') {
								menu.title = 'USD RP 자동매수<br/>서비스';
							} else if (menu.title == '온라인매체 동시접속 신청/해지') {
								menu.title = '온라인매체 동시접속<br/>신청/해지';
							} else if (menu.title == '금융거래 주소 일괄변경 신청') {
								menu.title = '금융거래 주소<br/>일괄변경신청';
							} else if (menu.title == '오토퀀트 서비스 가입/해지') {
								menu.title = '오토퀀트 서비스<br/>가입/해지';
							} else if (menu.title == '오토퀀트 My 포트폴리오') {
								menu.title = '오토퀀트<br/>My 포트폴리오';
							} else if (menu.title == '금융소비자보호부서 안내') {
								menu.title = '금융소비자보호부서<br/>안내';
							} else if (menu.title == '문의하기/칭찬하기/불편,제안') {
								menu.title = '문의하기/칭찬하기/<br/>불편,제안';
							} else if (menu.title == '민원 프로세스/환류시스템') {
								menu.title = '민원 프로세스/<br/>환류시스템';
							} else if (menu.title == '해외주식투자전용펀드저축<br />매수가능종목') {
								menu.title = '해외주식투자전용펀드저축 매수가능종목';
							} else if (menu.title == '해외주식투자전용펀드저축<br />잔고/수익률') {
								menu.title = '해외주식투자전용펀드저축 잔고/수익률';
							} else if (menu.title == '해외주식투자전용펀드저축  출금신청/조회(자동매매)') {
								menu.title = '해외주식투자전용펀드저축 출금신청/조회<br />(자동매매)';
							} else if (menu.title == '해외주식투자전용펀드저축<br />환매/취소(자동매매)') {
								menu.title = '해외주식투자전용펀드저축환매/취소<br />(자동매매)';
							} else if (menu.title == '민원신청/부정비리신문고') {
								menu.title = '민원신청/<br />부정비리신문고';
							}

							if (twoDepthLink)
								_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							else if (getMenuUrl(menu).url != '')
							{
								if(( menu.parentMenuCode=='0000000519'   )|| menu.parentMenuCode=='0000000521')
									continue;
								_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							}
							else
								_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="#">' + menu.title + '</a>\n';

							if (menu.menuCode == '0000000700' || parentRootMenu.menuCode == '0000001000' || parentRootMenu2.menuCode == '0000000253' || 
									parentRootMenu.menuCode == 'hks4200n01' || parentRootMenu2.menuCode == 'hks4300n01' || parentRootMenu2.menuCode == 'hkr1114m01')
							{
								var childMenus = menu.childMenu;

								if (childMenus)
								{
									if (!twoDepthLink)
									{
										_html += '<ul class="submenu" style="display:none;">\n';
										for (var j=0; j<childMenus.length; j++)
										{
											var childMenu = childMenus[j];
											if (childMenu)
											{
												if (childMenu.url != '' && childMenu.url != '#')
												{
													_html += '<li id="lnb_li2_' + childMenu.menuCode + '"><a href="javascript:openHp(\'' + getMenuUrl(childMenu).url + '\', ' + getMenuUrl(childMenu).secure + ');">' + childMenu.title + '</a></li>\n';
												}
												else if (childMenu.childMenu)
												{
													_html += '<li id="lnb_li2_' + childMenu.menuCode + '"><a href="javascript:openHp(\'' + getMenuUrl(childMenu.childMenu[0]).url + '\', ' + getMenuUrl(childMenu.childMenu[0]).secure + ');">' + childMenu.title + '</a></li>\n';
												}
												else
												{
													_html += '<li id="lnb_li2_' + childMenu.menuCode + '"><a href="javascript:openHp(\'' + getMenuUrl(childMenu).url + '\', ' + getMenuUrl(childMenu).secure + ');">' + childMenu.title + '</a></li>\n';
												}
											}
										}
										_html += '</ul>\n';
									}
								}
							}
							_html += '</li>\n';
						}
					}
				}
			}
			else if (currentMenu.depth == 2 && currentMenu.childMenu)
			{
				if (currentMenu.menuCode == '0000000519'){
					$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + currentMenu.menuCode + '.gif" alt="' + currentMenu.title + '" border="0" />');
				}else{
					$("#lnbTitle").html('<img src="' + image_server + '/common/lnb/lnb_title_' + parentRootMenu.menuCode + '.gif" alt="' + parentRootMenu.title + '" border="0" />');
				}
				parantChildMenus = currentMenu.childMenu;
				if (parantChildMenus)
				{
					for (var i=0; i<parantChildMenus.length; i++)
					{
						var menu = parantChildMenus[i];
						if (menu)
						{
							if(menu.parentMenuCode=='0000000519'  )
								continue;
							_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							_html += '</li>\n';
						}
					}
				}
			}
			else if (currentMenu.depth == 2 && currentMenu.childMenu)
			{
				parantChildMenus = parentMenu.childMenu;
				if (parantChildMenus)
				{
					for (var i=0; i<parantChildMenus.length; i++)
					{
						var menu = parantChildMenus[i];
						if (menu)
						{
							_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							_html += '</li>\n';
						}
					}
				}
			}
			else if (currentMenu.depth == 2)
			{
				parantChildMenus = parentMenu.childMenu;
				if (parantChildMenus)
				{
					for (var i=0; i<parantChildMenus.length; i++)
					{
						var menu = parantChildMenus[i];
						if (menu)
						{
							_html += '<li><a id="lnb_li1_' + menu.menuCode + '" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a>\n';
							_html += '</li>\n';
						}
					}
				}
			}
		}
	}

	if (parentMenu.menuCode != 'login')
	{
		$("#lnbUL").html(_html);
	}

	if(currentMenu.menuCode=='hks4200n01' || (parentRootMenu && parentRootMenu.menuCode == '000000400'))
	{
		$("#lnbTitle").remove();
	}

	if (currentMenu.depth == 1)
	{
		parentRootMenu = currentMenu;
	}

	var _guideHtml = '';
	var _guideLastId = '';

	//var guides = BestEzGuide.guide;
	//if (guides)
	if (guideCnt > 0)
	{
		for (var i=0; i<guides.length; i++)
		{
			var _guide = guides[i];
			if (_guide)
			{
				// giro
				if ((_currentMenuCode == '0000000519' && _currentMenuCode==_guide.parentMenuCode) || getMenuFromMenuCode(_currentMenuCode).parentMenuCodes[1] == _guide.parentMenuCode)
				{
					var guide_menu = getMenuFromMenuCode(_guide.menuCode);// 추가
					var guide_menu_title = _guide.menuCode;
					if(guide_menu !=null && guide_menu.title !="")
					{
						guide_menu_title = guide_menu.title;
					}

					_guideHtml += '<li id="guide_li_' + _guide.menuCode + '" ><a href="' + _guide.url + '" title="새창"><img src="' + image_server + '/common/guide/' + _guide.menuCode + '.gif" alt="' + guide_menu_title + '" /></a></li>\n';
					_guideLastId = _guide.menuCode;
				}
			}
		}
		$("#guideUL").html(_guideHtml);
	}

	//$(".faq").html(_guideHtml);
	//$("#guide_li_" + _guideLastId).addClass("last");
	
	var _bannerHtml = '';

	var _selectedLi = currentMenu.depth == 4 ? $("#lnb_li2_" + parentMenu.menuCode) : $("#lnb_li2_" + currentMenu.menuCode);

	$("#lnb_li1_" + currentMenu.menuCode).parent('li').addClass("on");
	$("#lnb_li1_" + currentMenu.menuCode).parent('li').children('ul').show();
	$("#lnb_li1_" + parentMenu.menuCode).parent('li').addClass("on");
	$("#lnb_li1_" + parentMenu.menuCode).parent('li').children('ul').show();

	if($("#lnb_li1_" + parentMenu.menuCode).parent('li').children('ul').size() == 0)
		$("#lnb_li1_" + parentMenu.menuCode).parent('li').addClass('on_only');

	if (parentRootMenu.menuCode == 'hku2001t01')
	{
		$("#lnb_li1_" + parentMenus[1]).parent('li').addClass("on");
		$("#lnb_li1_" + parentMenus[1]).parent('li').children('ul').show();
	}

	_selectedLi.parent().parent('li').addClass("on");
	_selectedLi.addClass("on");
	_selectedLi.parent('ul').show();

	$("#lnb_li2_" + currentMenu.menuCode).addClass("on");
	$("#lnb_li2_" + parentMenu.menuCode).addClass("on");
}

function printMyBalaceLnb()
{
	$('#lnbMenuLayer').html('<dt class="snbTit blind" id="lnbTitle"></dt><dd><ul class="snbMenu" id="lnbUL"></ul></dd>');

	var currentMenu 	= getMenuFromMenuCode(_currentMenuCode);
	if(currentMenu == null || typeof(currentMenu) == "undefined" || currentMenu == "null" || currentMenu == "") return;
	var _html = '';
	var parentRootMenu 	= getMenuFromMenuCode("hkd1001m01"); //My자산 항목만 보여주기 위하여 코드셋팅
	
	$("#lnbTitle").html(parentRootMenu.title);
	if (parentRootMenu && parentRootMenu.menuCode == 'hkd1001m01'){
		var parantChildMenus = parentRootMenu.childMenu;
		if (parantChildMenus){
			for (var i=0; i<parantChildMenus.length; i++){
				if(i == 7) break; //6개만 보이게 하기 위하여 
				var menu = parantChildMenus[i];
				if (menu){
					if (getMenuUrl(menu).url != '' && getMenuUrl(menu).url != '#'){
						_html += '<li><a id="lnb_li1_' + menu.menuCode + '" class="blind dep02_'+(i+1)+'" href="javascript:openHp(\'' + getMenuUrl(menu).url + '\', ' + getMenuUrl(menu).secure + ');">' + menu.title + '</a></li>\n';
					}else{
						_html += '<li><a id="lnb_li1_' + menu.menuCode + '" class="blind dep02_'+(i+1)+'" href="#">' + menu.title + '</a></li>\n';
					}
				}
			}
		}
	}
	$("#lnbUL").html(_html);
	
	//하단에 알림 및 투자성향 정보 영역 지정
	$('#lnbMenuLayer').append('<dd class="snbInfo"><span class="alim" id="alimCount"></span><span class="inv_type" id="investType"></span><span class="service_type" id="serviceType"></span></dd>\n');
	//하단에 배너 추가
	$('#lnbMenuLayer').append('<dd class="snbBanner"><dd class="snbBanner"><ul class="bannerLst"><li><a href="javascript:openHp(\'' + "/hks/hks4200/n05.do" + '\',false);" title="새창" class="lb01"><span>재무진단</span></a></li></ul></dd>\n');
	//<li><a href="javascript:openHp(\'' + "/cp.do?comCd=02&cpId=101&id=hku4063n01" + '\');" title="새창" class="lb02"><span>세무정보</span></a></li> 2017.07.03 요청으로 제거 조남준
	
	var activeCode = currentMenu.menuCode;
	if(currentMenu.depth == 3) activeCode = currentMenu.parentMenuCode;
	$("#lnb_li1_" + activeCode).addClass("on"); //메뉴 영역 활성화
}

function openLnbMenu()
{
	$("#lnb_tab1").attr("src", $("#lnb_tab1").attr("src").replace("off.gif", "on.gif"));
	$("#lnb_tab2").attr("src", $("#lnb_tab2").attr("src").replace("on.gif", "off.gif"));

	$("#lnbTitle").show();
	$(".qnaview").hide();
	$(".lnb").show();
}

function openLnbGuide()
{
	$("#lnb_tab1").attr("src", $("#lnb_tab1").attr("src").replace("on.gif", "off.gif"));
	$("#lnb_tab2").attr("src", $("#lnb_tab2").attr("src").replace("off.gif", "on.gif"));
	$("#lnbTitle").hide();
	$(".lnb").hide();
	$(".qnaview").show();
}

function getSitemapHtml(menuCode)
{
	var currentMenu = getMenuFromMenuCode(menuCode);
	var _html = '';
	
	if (currentMenu)
	{
		var childMenus = currentMenu.childMenu;
		if (childMenus)
		{
			for (var i=0; i<childMenus.length; i++)
			{
				_html += '<li><a href="' + childMenus[i].url + '">' + childMenus[i].title + '</a></li>\n';
			}
		}
	}

	return _html;
}

function printHistory(currentMenuCode)
{
	var currentMenu = getMenuFromMenuCode(currentMenuCode);
	var parentMenu = getMenuFromMenuCode(currentMenu.parentMenuCode);

	var _html = '';

	if (currentMenu!=null && currentMenu.depth > 1)
	{
		var parentMenus = currentMenu.parentMenuCodes;
		var parentRootMenu = getMenuFromMenuCode(parentMenus[0]);

		// hku2001t01 : 공인인증/OTP
		var twoDepthLink = parentRootMenu.menuCode == 'hku2001t01' ;

		for (var i=0; i<currentMenu.parentMenuCodes.length; i++)
		{
			_html = '';
			var parentMenu = getMenuFromMenuCode(currentMenu.parentMenuCodes[i]);
			_html += getText(parentMenu);
			// 금융상품 -> 추천상품 -> 특판상품 3번에서 text 나옴.
			if (i < 2 || (i == 2 && !twoDepthLink))
			{
				$("#gnb_title" + (i+1)).prepend(_html);
			}
			parentMenu = null;
		}

		// 0000000900 : 사이트맵
		if (currentMenu.parentMenuCodes.length == 1 && parentRootMenu.menuCode != '0000000900' && parentRootMenu.menuCode != 'login')
		{
			_html = getText(currentMenu);
			$("#gnb_title2").prepend(_html);
		}

		// 0000000519 : 지로/공과금 납부
		if (currentMenu.parentMenuCodes.length == 2 && !twoDepthLink && parentMenus[1] != '0000000519')
		{
			_html = getText(currentMenu);
			$("#gnb_title3").prepend(_html);
		}
	}
	else if (currentMenu.depth == 1)
	{
		var parentRootMenu = getMenuFromMenuCode(currentMenu.menuCode);
		if (currentMenu.secure)
			_html = getText(currentMenu);
		else
			_html = getText(parentMenu);
		$("#gnb_title1").prepend(_html);
	}

	var lastTitle = $();
	var arr = ['#gnb_title1', '#gnb_title2', '#gnb_title3'];

	for(var i = 0 ; i < arr.length ; i ++)
	{
		if($(arr[i]).html() !== "")
		{
			$(arr[i]).prev(".gt").show();
			lastTitle = $(arr[i]);
		}
		else
		{
			$(arr[i]).prev(".gt").hide();
		}
	}
	lastTitle.addClass('last')

	function getText(_menu)
	{
		return '<a href="javascript:openHp(\''+ getMenuUrl(_menu).url +'\',' + getMenuUrl(_menu).secure + ');">' + _menu.title + '</a>';
	}
}

var _bbsCategoryId = Request.getParameter("categoryId");
var _bbsDataType = Request.getParameter("dataType");
var _type = Request.getParameter("type");
var _clasCd = Request.getParameter("clasCd");

function getMenuUrlParameter(s, name)
{
	var rtnval = '';
	var nowAddress = unescape(s);
	var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');

	for(var i = 0 ; i < parameters.length ; i++)
	{
		var varName = parameters[i].split('=')[0];
		if(varName.toUpperCase() == name.toUpperCase())
		{
			rtnval = parameters[i].split('=')[1];
			break;
		}
	}
	return rtnval;
}

function getMenuCodeByUrl(menus)
{
	if (menus)
	{
		for (var i=0; i<menus.length; i++)
		{
			var menu = menus[i];
			var menuCategoryIdParameter = getMenuUrlParameter(menu.url, 'categoryId');
			var menuDataTypeParameter   = getMenuUrlParameter(menu.url, 'dataType');
			var menuTypeParameter       = getMenuUrlParameter(menu.url, 'type');
			var menuClassCdParameter    = getMenuUrlParameter(menu.url, 'clasCd');
			// 이용안내가이드 예외처리
			if(menu.parentMenuCode=="0000004000_1")
				continue;
			if (menuCategoryIdParameter != '')
			{
				if (menuDataTypeParameter != '')
				{
					if (menuCategoryIdParameter == _bbsCategoryId && _bbsDataType == menuDataTypeParameter)
					{
						_currentMenuCode =  menu.menuCode;
						break;
					}
				}
				else
				{
					if (menuCategoryIdParameter == _bbsCategoryId)
					{
						_currentMenuCode =  menu.menuCode;
						break;
					}
				}
			}
			else if (menuTypeParameter != '')
			{
				if (menuTypeParameter == _type)
				{
					_currentMenuCode =  menu.menuCode;
					break;
				}
			}
			else if (menuClassCdParameter != '')
			{
				if (menuClassCdParameter == _clasCd)
				{
					_currentMenuCode =  menu.menuCode;
					break;
				}
			}
			else if (menu.url == location.pathname)
			{
				_currentMenuCode =  menu.menuCode;
				break;
			}
			else if (menu.url == getUri())
			{
				_currentMenuCode =  menu.menuCode;
				break;
			}
			else
			{
				getMenuCodeByUrl(menu.childMenu);
			}
		}
	}
}

function getUri()
{
	var _href = location.href;
	var _hrefs = _href.split('/');

	var _uri = '';

	for (var i=3; i<_hrefs.length; i++)
	{
	  	_uri += '/';
		_uri += _hrefs[i];
	}
	return _uri;
}

function getMenuUrl(menu)
{
	if (menu && menu.url && menu.url != '' && menu.url != '#')
		return menu;

	if (menu && menu.childMenu && menu.childMenu.length > 0 && menu.childMenu[0].url != 'undefined' && menu.childMenu[0].url != '' && menu.childMenu[0].url != '#')
	{
		return menu.childMenu[0];
	}
	else if (menu && menu.childMenu && menu.childMenu[0] && menu.childMenu[0].childMenu && menu.childMenu[0].childMenu.length > 0 && menu.childMenu[0].childMenu[0].url != '' && menu.childMenu[0].childMenu[0].url != '#')
	{
		return menu.childMenu[0].childMenu[0];
	}

	return menu;
}

function getMenuFromMenuCode(_menuCode)
{
	return getMenuFromMenuIndex(getMenuIndexFromMenuCode(_menuCode));
}

function getMenuIndexFromMenuCode(_menuCode)
{
	return BestEzMenu.menuCodeMap[_menuCode];
}

function getMenuFromMenuIndex(_menuIndex)
{
	var menu = null;
	try
	{
		if (_menuIndex!=undefined)
		{
			menu = eval("BestEzMenu.menu["+_menuIndex.replace(/,/g,"].childMenu[")+"]");
		}
	}
	catch(e)
	{
		menu = null;
	}
	return menu;
}

function doSecure(_url)
{
	location.href = _url;//bestez.encrypt encryptUrl
}

function normalize(url)
{
	var prefix = url.indexOf('.do') > -1 ? url.substring(0, url.indexOf('.do')): url;
	var postfix = prefix != url ? ('/' + url.substring(url.indexOf('domethod=') + 9, url.indexOf('domethod=') + 12)) : '';
	return prefix + postfix;
}

function getSitemapLIHtml(menu)
{
    var _html = '';

    var childMenus = menu.childMenu;
    if (childMenus) {

        for (var i=0; i<childMenus.length; i++) {
            var childMenu = childMenus[i];
            if(childMenu) {
                if (childMenu.url == '' || childMenu.url == '#') {
                    if (childMenu.childMenu) {
                    	if(childMenu.childMenu[0].parentMenuCode=='0000000521' && childMenu.childMenu[0].url.indexOf('giroType=') == -1) continue;
                        _html += '              <li><a href="javascript:openHp(\'' + childMenu.childMenu[0].url + '\',' + childMenu.childMenu[0].secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
                    } else {
                        _html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\', ' + childMenu.secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
                    }
                } else {
                    if (childMenu.url.indexOf('javascript') > -1 ){
                        _html += '              <li><a href="' + childMenu.url + '"  title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
                    } else if (childMenu.url.indexOf('https://') > -1 ) {
                        _html += '              <li><a href="' + childMenu.url + '" target="_blank" title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
                    } else {
                    	if(childMenu.parentMenuCode=='0000004000_1')
                    		_html += '              <li><a href="javascript:openGuide(\'' + childMenu.url  + '\');" title="새창">' + brTitle(childMenu.title) + '</a></li>\n';
                    	else {
                    		if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1) continue;
                    		_html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\',' + childMenu.secure + ');">' + brTitle(childMenu.title) + '</a></li>\n';
                    	}
                    }
                }
            }
        }

        if (menu.menuCode == 'hkt2004n01') {
            _html += '      <li><a href="javascript:openCommonPopup(\'http://www.presdaq.co.kr/bestez_2011/sb_list_1.asp\', 800, 800);">장외주식 시세</a></li>\n';
            _html += '      <li><a href="javascript:openCommonPopup(\'http://www.presdaq.co.kr/bestez_2011/sihwang_list.asp\', 800, 800);">장외주식시황</a></li>\n';
            _html += '      <li><a href="javascript:openCommonPopup(\'http://www.presdaq.co.kr/bestez_2011/sb_list_3.asp\', 800, 600);">IPO시세</a></li>\n';
        }

    }

    return _html;
}

$(function()
{
	$('.search-type').sSelect({width: '110px', ddMaxHeight: '300px'});
    $('.year').sSelect({width: '70px', ddMaxHeight: '300px'});
    $('.month').sSelect({width: '55px', ddMaxHeight: '300px'});
    $('.month2').sSelect({width: '67px', ddMaxHeight: '300px'});
    $('.number').sSelect({width: '190px', ddMaxHeight: '300px'});
    $('.semail').sSelect({width: '160px', ddMaxHeight: '300px'});
    $('.phone').sSelect({width: '90px', ddMaxHeight: '300px'});
    $('.w130').sSelect({width: '130px', ddMaxHeight: '300px'});
    $('.w170').sSelect({width: '167px', ddMaxHeight: '300px'});
    $('.w190').sSelect({width: '180px', ddMaxHeight: '300px'});
    $('.w215').sSelect({width: '215px', ddMaxHeight: '300px'});
    $('.w35').sSelect({width: '35%', ddMaxHeight: '300px'});
    $('.w90').sSelect({width: '90%', ddMaxHeight: '300px'});
    $('.w96').sSelect({width: '96%', ddMaxHeight: '300px'});
    $('.w100').sSelect({width: '100%', ddMaxHeight: '300px', ddMarginRight: '0px'});
    $('.w180').sSelect({width: '186px' , ddMaxHeight: '300px', ddMarginRight: '0px'});

    $('#show_menu').data('flying', 'hks4000m01'); // test
    $('#wts_title').data('flying', 'hkt1001m01'); // 트레이딩
    $('#mall_title').data('flying', 'hks4000m01');  // 금융상품
    $('#invest_title').data('flying', 'nkr1001m01'); // 투자정보
    $('#online_title').data('flying', 'hki3001m01'); // 온라인지점/뱅킹
    $('#ask_title').data('flying', '0000002000'); // 이용안내/문의
    $('#my_title').data('flying', '0000000301'); // My자산/재테크
    $('#advice_title').data('flying', 'ocq1001m01'); // 투자상담
    $('#opt_title').data('flying', 'hku2001t01'); // 공인인증/OPT
    $('#event_title').data('flying', '0000000500'); // 공지/이벤트

    $('#submenu-box-gnb dt a').click(function(){
    	var parent = $(this).parent();
            closeFlying();
            openFlying(parent.data('flying'), parent);
            parent.addClass('on');

            parent.next().find('a:first').focus();
    });

    $('#show_menu').click(function(){
    	$('#submenu-box-gnb dt:first a').click();
    	$('#submenu-box-gnb').find('a:first').focus();
    });

    var _time = null;
    $('#submenu-box-gnb').find('a.close')
	    .click(function(){
	    	closeFlying();
	    	$('#show_menu').focus();
	    });

    if (location.href.indexOf('login.do') > -1 && location.href.indexOf('wts') < 0) {

        try {
            clearWts();
        } catch (e) { }
    }

});

function openCommonPopup(url, w, h)
{
	if (url == '/kdbresearch/index.jsp') {
		window.open(url, '_commpopup', 'width=' + w + ',height=' + h + ',location=0,status=0,scrollbars=1');
	} else {
		if (!_isLogin)
		{
			if ( isMobile() )
			{
				alert("로그인 후 이용 가능합니다.");
				openHp('/login.do?url=/main.do', false);
			}
			else
			{
				/*천창환 secureframe 제거
				try {
					top.secureframe.location.href = '/IniPlugin.jsp';
				} catch (e) { bINIinstallSuccess (true); }
				*/
				window.open('/login/pop.do?allow=customer&url=' + url, 'loginpopup', 'width=700,height=700,location=0,status=0,scrollbars=0');
			}
		} else {
			if (loginUserSect != '1') {
				alert('본 서비스는 미래에셋대우 계좌 고객에게만 제공되는 서비스입니다.');
				return;
			} else {
				window.open(url, '_commpopup', 'width=' + w + ',height=' + h + ',location=0,status=0,scrollbars=1');
			}
		}
	}
}

function openFuturesPopup(url)
{
/*    if (!_isLogin)
    {
        if ( isMobile() )
        {
            alert("로그인 후 이용 가능합니다.");
            if ( !opener.closed ) {
                opener.openHp('/login.do', false);
            } else {
                window.open('https://www.miraeassetdaewoo.com/mframe.jsp?url=/login.do');
            }
        }
        else
        {
            var tmpfrom = 'futures';
            if (url.indexOf('categoryId=262') > -1)
            {
                tmpfrom = 'futuresbbs';
            }
            //천창환 secureframe 제거
            //try {
            //    top.secureframe.location.href = '/IniPlugin.jsp';
            //} catch (e) { bINIinstallSuccess (true); }
            //
            window.open('/frame.jsp?url=%2Flogin%2Fpop.do%3Ffrom%3D' + tmpfrom + '%26url%3D' + url, 'loginpopup', 'width=700,height=700,location=0,status=0,scrollbars=0');
        }
    }
    else
    {
        if (url.indexOf('categoryId=262') > -1)
        {
            location.href = url;
        }
        else
        {
        	location.href = url;//bestez.encrypt encryptUrl
        }
    }*/
    
    var tmpfrom = 'futures';
    if (url.indexOf('categoryId=262') > -1)
    {
        tmpfrom = 'futuresbbs';
    }
    window.open('/frame.jsp?url=%2Flogin%2Fpop.do%3Ffrom%3D' + tmpfrom + '%26url%3D' + url, 'loginpopup', 'width=700,height=700,location=0,status=0,scrollbars=0');
}

function doKTLogin()
{
	var url = 'http://www.ollehmns.com/kdbdw';

	if ( !_isLogin )
	{
		if ( isMobile() )
		{
			alert("로그인 후 이용 가능합니다.");
			openHp('/login.do?url=/main.do', false);
		}
		else
		{
			/*천창환 secureframe 제거
			try {
				top.secureframe.location.href = '/IniPlugin.jsp';
			} catch (e) { bINIinstallSuccess (true); }
			*/
			window.open('/login/pop.do?allow=customer&from=kt&url=' + url, 'loginpopup', 'width=700,height=700,location=0,status=0,scrollbars=0');
		}
	}
	else
	{
		if( loginUserSect!='1' )
		{
			alert('본 서비스는 미래에셋대우 계좌 고객에게만 제공되는 서비스입니다.');
			return;
		}
		else
		{
			window.open(url);
		}
	}
}

function openWts2(code)
{
	//trading domain
	var tDomain = "https://trading.miraeassetdaewoo.com";
	if(document.location.href.indexOf('dev') > -1 || document.location.href.indexOf('dvp') > -1 )
		tDomain = "https://tradingdvp.miraeassetdaewoo.com";
	if(document.location.href.indexOf('ace') > -1 )
		tDomain = "https://tradingace.miraeassetdaewoo.com";

	_url = tDomain+'/?url=/wts/flash/wtsPopup.jsp';

	if (code != null && code != undefined)
	{
		_url = _url + '?screenId='+code;
		_url = _url + '&amp;moveButton=Y&amp;wmode=transparent';
	}

	window.open(_url);
}

// 클릭도우미 관리자 로그인
/**
 * 취약성점검 대응
 * 2017.04.17 김대원
 */
function hc0_admin() {
	if (loginUserSect == '9') {
	} else {
		alert('접근 권한이 없습니다.');
	}
}