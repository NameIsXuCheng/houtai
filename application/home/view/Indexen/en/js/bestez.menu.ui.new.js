var setSubMenuHTML = function(currentMenuCode, target){
	var subMenuCode = getParentCode_OneStep();
	var target = $('#'+target);

	target.html(getSubMenuHTML(subMenuCode));
	function getParentCode_OneStep() {
	    var _subMenuCode = '';
		var currentMenu = getMenuFromMenuCode(currentMenuCode);
		if(!currentMenu) {
			return _subMenuCode;
		}
	    if (currentMenu!=null && currentMenu.depth > 1) {
	    	 var parentMenus = currentMenu.parentMenuCodes;
	         var parentRootMenu = getMenuFromMenuCode(parentMenus[0]);

	         for (var i=0; i<currentMenu.parentMenuCodes.length; i++) {
	        	 if(i == 0){
		             var parentMenu = getMenuFromMenuCode(currentMenu.parentMenuCodes[i]);
		             _subMenuCode = parentMenu.menuCode;
	        	 }
	         }

	    } else if (currentMenu.depth == 1) {
	    	if (currentMenu.secure) {
	    		_subMenuCode = currentMenu.menuCode;
	        }else {
	        	_subMenuCode = parentMenu.menuCode;
	        }
	    }

	    return _subMenuCode;
	};

	function getSubMenuHTML(oneDepthMenuCode) { //getFlyHtml
		var currentMenu = getMenuFromMenuCode(oneDepthMenuCode);
	try{
	    var childMenus = currentMenu.childMenu;
	    var codes = [];
	    var _arr = [], _draw_arr = [], obj, className, i;
	    
	    _arr.push("<ul class='sub_depth_wrap'>");
	    
	    for(i = 0, len = childMenus.length ; i < len ; i++) {
	    	obj = childMenus[i];
	    	if(obj) {
	    		_draw_arr.push(obj);
	    	}
	    }
	    
	    var depthClass = "";
	    var depth = 1;
	    depth = parseInt(_draw_arr.length / 5);
	    var menuInfo = _draw_arr.length % 5;
	    if (menuInfo > 0) {
	    	depth = depth + 1;
	    }
	    
	    if (depth > 1) {
	    	depthClass = "class='group" + depth + "'";
	    }
	    
	    var cntDL = 0;
	    var cntLI = 0;
	    for(i = 0, len = _draw_arr.length ; i < len ; i++) {
	    	
	    	obj = _draw_arr[i];
	    	
	    	if (menuInfo > 0 && menuInfo == cntLI) {
	    		menuInfo = 0;
	    		depth = depth - 1;
	    		depthClass = "class='group" + depth + "'";
	    	}

	    	if (cntDL == 0) {
	    		//if (oneDepthMenuCode == 'hks4000m01' && i == 2) {  // 예외 처리 (금융상품 > 펀드 아래에 메뉴 표시를 하지 않을 경우)
	    		//	_arr.push("<li>");
	    		//} else {
	    			_arr.push("<li " + depthClass + ">");
	    		//}
	    	}
	    	
    		_arr.push("<dl class='sub_depth'>" + getMenuHTML(obj) + "</dl>");
    		cntDL++;

			if (cntDL == depth) {
				_arr.push("</li>");
				cntDL = 0;
				cntLI++;
			}
			
			// 예외 처리 (금융상품 > 펀드 아래에 메뉴 표시를 하지 않을 경우)
			//if (oneDepthMenuCode == 'hks4000m01' && i == 2) {
			//	_arr.push("</li>");
			//	cntDL = 0;
			//	cntLI++;
			//}
	    }
	    
	    _arr.push("</ul>");
	    
	    return _arr.join('\n');
	}catch(err){}
	}
	
	function getMenuHTML(menu, class_yn) {//getChildLIHtml
	    var _html = '';
	    if(!menu) {
	    	return _html;
	    }
	    var childMenus = menu.childMenu;

	    if(//menu.menuCode=="0000000309" ||
	       menu.menuCode =="0000000617" ) {}
	    else {
		    if (childMenus) {
		    	_html += '<dt>' + getTitle(menu, class_yn) + '</dt>';
		        _html +='   <dd><ul>\n';

	            for (var i=0; i<childMenus.length; i++) {
	                var childMenu = childMenus[i];
	                if(childMenu) {
	                    if (childMenu.url == '' || childMenu.url == '#') {
	                        if (childMenu.childMenu) {
	                        	if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1) continue;
	                            _html += '              <li><a href="javascript:openHp(\'' + childMenu.childMenu[0].url + '\',' + childMenu.childMenu[0].secure + ');">' + brTitle(childMenu.title) + ((childMenu.childMenu[0].gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        } else {
	                        	 if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1) continue;
	                            _html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\', ' + childMenu.secure + ');">' + brTitle(childMenu.title) + ((childMenu.gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        }
	                    } else {
	                        if (childMenu.url.indexOf('javascript') > -1  ){
	                            _html += '              <li><a href="' + childMenu.url + '" title="새창">' + brTitle(childMenu.title) + ((childMenu.gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        }
	                        else if ( childMenu.url.indexOf('http://') > -1 ){
	                            _html += '              <li><a href="' + childMenu.url + '" target="_blank" title="새창">' + brTitle(childMenu.title) + ((childMenu.gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        }
	                        else {
	                        	// guide (hkr1001m02: 해외주식/선물안내)
	                        	if(childMenu.parentMenuCode=='0000004000_1' || childMenu.parentMenuCode=='hkr1001m02')
	                        	    _html += '              <li><a href="javascript:openGuide(\'' + childMenu.url  + '\');" title="새창">' + brTitle(childMenu.title) + ((childMenu.gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        	else {
	                        		if(childMenu.parentMenuCode=='0000000519' && childMenu.url.indexOf('giroType=') == -1) continue;
	                        		_html += '              <li><a href="javascript:openHp(\'' + childMenu.url + '\',' + childMenu.secure + ');">' + brTitle(childMenu.title) + ((childMenu.gestOpen == "false") ? "<span class='mb'>로그인필요</span>" : "") + '</a></li>\n';
	                        	}

	                        }
	                    }
	                }
	            }

		        _html +='   </ul></dd>\n';
		    }else {
		    	_html += '<dt>' + getTitle(menu, class_yn) + '</dt>';
		        _html +='   <dd>&nbsp;</dd>';
		    }
	    }

	    return _html;
	}

	function getTitle(menu, class_yn) {
		var _html = '';
		if (menu.menuCode == "hkp1001r01" || menu.menuCode == "hkp2009m01" || menu.menuCode == "hki3096r01") { // 하위 메뉴가 존재하지 않는 경우
			_html += '<a href="javascript:openHp(\'' + menu.url + '\',' + menu.secure + ');">'+menu.title+'</a>';
		} else if (menu.menuCode == "hkp2010m01" || menu.menuCode == "0000002011") {
			_html += '<a href="' + menu.url + '">'+menu.title+'</a>';
		} else {
			//_html += '<a href="javascript:void(0)">'+menu.title+'</a>';
			_html += '<strong>'+menu.title+'</strong>';
		}
			
		return _html;
	}
}
