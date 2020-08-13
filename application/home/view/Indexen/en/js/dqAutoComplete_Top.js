
	//설정값
	var dq_searchForm_Top = document.topSearch;
	var dq_searchTextbox_Top = dq_searchForm_Top.q;

	var dq_resultDivID_Top = "quick_autolist_Top";               //자동완성레이어 ID
	var dq_hStartTag_Top = "<span class=\"blue\">";                    //하이라이팅 시작 테그
	var dq_hEndTag_Top = "</span>";                     //하이라이팅 끝 테그
	var dq_bgColor_Top = "#eee";                  //선택빽그라운드색
	var dq_intervalTime_Top = 500;                   //자동완성 입력대기 시간
	
	//고정값
	var dq_acResult_Top = new Object();              //결과값
	var dq_acLine_Top = 0;                           //자동완성 키워드 선택  위치(순번)	
	var dq_searchResultList = "";                //자동완성결과리스트	
	var dq_searchKeyword = "";	                 //검색어(한영변환안된)
	var dq_ajaxReqObj_Top = "";                      //ajax request object

	var dq_keyStatus_Top = 1;                        //키상태구분값
	var dq_acuse_Top = 1;                            //자동완성사용여부
	var dq_engFlag_Top = 0;                          //자동완성한영변환체크
	var dq_acDisplayFlag_Top = 0;                    //자동완성 display 여부
	var dq_acArrowFlag_Top = 0;                      //마우스이벤트용 flag	
	var dq_acArrowOpenFlag_Top = 0;                  //마우스이벤트용 flag
	var dq_acFormFlag_Top = 0;                       //마우스이벤트용 flag
	var dq_acListFlag_Top = 0;                       //자동완성 레이어 펼쳐진 상태 여부
	var dq_browserType_Top = dqc_getBrowserType();	 //브라우져타입
	var dq_keywordBak_Top = "";                      //키워드빽업
	var dq_keywordOld_Top = "";                      //키워드빽업
	
	dq_keywordBak_Top = dq_keywordOld_Top = dq_searchTextbox_Top.value;
	
	//GNB영역 검색 실행
	function fn_topSearch(){
		var keyword = dqc_trimSpace(dq_searchTextbox_Top.value); 
		if(keyword == ''){
			alert('검색어를 입력해 주세요.');
			dq_searchTextbox_Top.focus();
			return false;
		}
		else{
			dq_searchTextbox_Top.value = keyword;
			dq_searchForm_Top.query.value = keyword;
			dq_searchForm_Top.submit();
		}
		return true;
	}
	
	//엔터체크
	function dq_handleEnter_Top(event)
	{		
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode; 

		if (keyCode == 13)
		{
			//검색스크립트
			fn_topSearch();				
			return false;
		}	
		else
		{
			return true;
		}	
	}
	
	//마우스클릭시검색
	function dq_keywordSearch_Top(keyword)
	{
		dq_searchTextbox_Top.value = keyword;
		fn_topSearch();
		//dq_searchForm_Top.submit();
	}
	
	//입력값 체크 - setTextbox
	function dq_setTextbox_Top(flag, ev) 
	{		
		var _event; 
		var key;
				
		dq_stateChange_Top();
		
		switch(dq_browserType_Top)
		{
			case 1 : // IE
				_event = window.event;				
				key = _event.keyCode;
				break;
			case 2 : // Netscape
				key = ev.which;
				break;
			default :				
				key = _event.keyCode;
				break;
		}
							
		if(dq_keyStatus_Top == 1 && flag && key != 13)
			dq_keyStatus_Top = 2;	
	}
		
	//자동완성레이어 상태변경 - wd
	function dq_stateChange_Top() 
	{			
		dq_searchTextbox_Top.onclick = dq_acDisplayView_Top;
		//dq_searchTextbox_Top.onblur = dq_acDisplayCheck_Top;
		document.body.onclick = dq_acDisplayCheck_Top;				
	}
	
	//자동완성레이어 보여 주기 - req_ipc
	function dq_acDisplayView_Top() 
 	{ 
		dq_acDisplayFlag_Top = 1;
		dq_acFormFlag_Top = 0;
		dq_reqAcResultShow_Top();
 	}

	//자동완성레이어 감추기전  체크 - dis_p
 	function dq_acDisplayCheck_Top() 
 	{
		if(dq_acDisplayFlag_Top) 
		{ 
			dq_acDisplayFlag_Top=0;			
			return ;
		} 
			
		if(dq_acArrowFlag_Top)		
			return;
				
	
		if(dq_acFormFlag_Top)
			return;
		
		dq_acDisplayHide_Top();
	}
 	
 	//자동완성레이어 감추기 - ac_hide
 	function dq_acDisplayHide_Top()
 	{  		
 		var resultDiv = document.getElementById(dq_resultDivID_Top);
 		
		if(resultDiv.style.display == "none") 
			return ;
		
		dq_setDisplayStyle_Top(0);
		dq_acListFlag_Top = 0;
		dq_acLine_Top = 0;
	}
 	
 	//자동완성레이어 display style 설정 - popup_ac
 	function dq_setDisplayStyle_Top(type)
 	{	 		
 		var resultDiv = document.getElementById(dq_resultDivID_Top);

 		if(type==0)
		{
			resultDiv.style.display = "none";
			//dq_switchImage(0);				//500 line 자동완성 이미지 펼치기 닫기
		}

		else if(type==1)
		{
			resultDiv.style.display = "block";
			//dq_switchImage(1);				//500 line 자동완성 이미지 펼치기 닫기
		}
		else if(type==2)
		{
			resultDiv.style.display = "none";
			dq_switchImage(1);
		}		
 	}
 	
 	//자동완성 결과 보기 요청 - req_ac2
 	function dq_reqAcResultShow_Top() 
	{		
 		var resultDiv = document.getElementById(dq_resultDivID_Top);
 		
		if(dq_searchTextbox_Top.value == "" || dq_acuse_Top == 0)
			return ;
			
	 	if(dq_acListFlag_Top && dq_acDisplayFlag_Top)
	 	{ 
	 		dq_acDisplayHide_Top();
			return;
		} 
	
		var o = dq_getAcResult_Top();
	 
	 	if(o && o[1][0] != "") 
	 		dq_acResultShow_Top(o[0], o[1]);
	 	else
	 		dq_reqSearch_Top();
 	}
 	
 	//자동완성 결과 object 리턴 - get_cc
 	function dq_getAcResult_Top()
 	{ 
		var ke = dqc_trimSpace(dq_searchTextbox_Top.value);
		
	 	return typeof(dq_acResult_Top[ke])=="undefined" ? null : dq_acResult_Top[ke];
 	} 
 	
 	//자동완성 결과 object 생성 - set_cc
 	function dq_setAcResult_Top(aq, al)
 	{
 		dq_acResult_Top[aq] = new Array(aq, al);
 	}
 	
 	//자동완성 결과 보기 - ac_show
 	function dq_acResultShow_Top(aq, al)
 	{
		if(aq != dqc_trimSpace(dq_searchTextbox_Top.value))
			dq_engFlag_Top = 1;
 		else
			if(aq && aq != "" && aq != dqc_trimSpace(dq_searchTextbox_Top.value)) 			
				return ;

	 	dq_searchKeyword = aq;
	 	dq_searchResultList = al;	 	
	 		 									
	 	dq_printAcResult_Top();
								
	 	if(dq_searchResultList.length)
		 	dq_acListFlag_Top = 1;
	 	else
			dq_acListFlag_Top = 0;
		
	 	if(dq_acListFlag_Top)
	 	{ 
	 		dq_setAcPos_Top(0);
			
			if(dq_browserType_Top == 1)
				dq_searchTextbox_Top.onkeydown = dq_acKeywordTextViewIE_Top;
			else if(dq_browserType_Top == 2)
				dq_searchTextbox_Top.onkeydown = dq_acKeywordTextViewFF_Top;
		} 
	} 
 	
 	//자동완성결과 라인 위치 지정 - set_acpos
 	function dq_setAcPos_Top(v)
 	{
 		dq_acLine_Top = v;
		setTimeout('dq_setAcLineBgColor_Top();', 10);
 	}
 	
 	//자동완성레이어에 결과 출력 - print_ac
 	function dq_printAcResult_Top() 
 	{ 
 		var resultDiv = document.getElementById(dq_resultDivID_Top);
 			 				 		 		
		if(dq_searchResultList[0] == "")
			resultDiv.innerHTML = dq_getAcNoResultList_Top();
	 	else
	 		resultDiv.innerHTML = dq_getAcResultList_Top();
	 			 	
		dq_setDisplayStyle_Top(1); //자동완성창 보여줌.
	 	
	 	setTimeout('dq_setAcLineBgColor_Top();', 10); 		
 	}
 	
 	//자동완성 키워드 라인의 백그라운드색 설정 - set_ahl
 	function dq_setAcLineBgColor_Top()
 	{
 		var o1, o2, qs_ac_len;
 		
		if(!dq_acListFlag_Top)
			return;
		
		qs_ac_len = dq_searchResultList.length;
		
	 	for(i=0;i<qs_ac_len;i++)
	 	{
			o1 = document.getElementById('dq_acTop' + (i+1));
			
			if(o1 != null)
			{			
				if((i+1) == dq_acLine_Top)
					o1.style.backgroundColor = dq_bgColor_Top;
				else
					o1.style.backgroundColor = '';
			}
		}
 	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
 	function dq_acKeywordTextViewIE_Top()
	{
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(dq_resultDivID_Top);
		var qs_ac_len = dq_searchResultList.length;
		
	 	if(e.keyCode==39)
	 		dq_reqAcResultShow_Top();	 	 
	 	
	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey))
	 	{
		 	if(!dq_acListFlag_Top)
		 	{
				dq_reqAcResultShow_Top();
			 	return;
			}
			
			if(dq_acLine_Top < qs_ac_len)
			{
				if(dq_acLine_Top == 0)
					dq_keywordBak_Top = dq_searchTextbox_Top.value;
				
				dq_acLine_Top++;
						 
			 	ac = eval('dq_acTop' + dq_acLine_Top);
			 	acq = eval('dq_acqTop' + dq_acLine_Top);
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = acq.outerText;
			 	dq_searchTextbox_Top.focus();
			 	dq_setAcLineBgColor_Top();
			 	e.returnValue = false;
		 	}
	 	}
	 	
	 	if(dq_acListFlag_Top && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey)))
	 	{		 			 	
			if(!dq_acListFlag_Top) 
				return;
		 
		 	if(dq_acLine_Top <= 1)
		 	{ 
		 		dq_acDisplayHide_Top();
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = dq_keywordBak_Top;
		 	} 
		 	else
		 	{
				dq_acLine_Top--;
							
			 	ac = eval('dq_acTop'+ dq_acLine_Top);
			 	acq = eval('dq_acqTop' + dq_acLine_Top);
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = acq.outerText;
			 	dq_searchTextbox_Top.focus();
			 	dq_setAcLineBgColor_Top();
			 	e.returnValue = false;
			}
		}
	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE외 브라우져) - ackhl_ff
 	function dq_acKeywordTextViewFF_Top(fireFoxEvent)
	{		
		var ac, acq;
		var resultDiv = document.getElementById(resultDiv);
		var qs_ac_len = dq_searchResultList.length;
		
	 	if(fireFoxEvent.keyCode==39)
	 		dq_reqAcResultShow_Top();
	 		 
	 	if(fireFoxEvent.keyCode==40 || fireFoxEvent.keyCode==9)
	 	{			
		 	if(!dq_acListFlag_Top)
		 	{
		 		dq_reqAcResultShow_Top();
			 	return;
			}
			
			if(dq_acLine_Top < qs_ac_len)
			{ 
				if(dq_acLine_Top == 0) 
					dq_keywordBak_Top = dq_searchTextbox_Top.value;
					
				dq_acLine_Top++;
						 
			 	ac = document.getElementById('dq_acTop' + dq_acLine_Top);
			 	acq = document.getElementById('dq_acqHiddenTop' + dq_acLine_Top);
			 	
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = acq.value;
			 	
			 	dq_searchTextbox_Top.focus();
			 	dq_setAcLineBgColor_Top();
			 	fireFoxEvent.preventDefault();
		 	}
	 	}
	 	
	 	if(dq_acListFlag_Top && (fireFoxEvent.keyCode==38 || fireFoxEvent.keyCode==9))
	 	{
			if(!dq_acListFlag_Top) 
				return;
		 
		 	if(dq_acLine_Top <= 1)
		 	{ 
		 		dq_acDisplayHide_Top();
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = dq_keywordBak_Top;
		 	} 
		 	else
		 	{
		 		dq_acLine_Top-- ;
			 
			 	ac = document.getElementById('dq_acTop' + dq_acLine_Top);
			 	acq = document.getElementById('dq_acqHiddenTop' + dq_acLine_Top);
			 	
			 	dq_keywordOld_Top = dq_searchTextbox_Top.value = acq.value;
			 	dq_searchTextbox_Top.focus() ;
			 	dq_setAcLineBgColor_Top() ;
			 	fireFoxEvent.preventDefault();
			}
		}						
	}
 	
 	//검색요청 - reqAc
 	function dq_reqSearch_Top() 
 	{	 				
		var sv;
		var ke = dqc_trimSpace(dq_searchTextbox_Top.value);
		
		ke = ke.replace(/ /g, "%20");
		
		while(ke.indexOf("\\") != -1)
			ke = ke.replace(/ /g, "%20").replace("\\", "");
		
		while(ke.indexOf("\'") != -1)
			ke = ke.replace(/ /g, "%20").replace("\'", "");
	 
	 	if(ke == "")
	 	{ 
	 		dq_acDisplayHide_Top();
			return;
		} 
					
	 	sv = "/srh/autoComplete/getAutoComplete_Top.jsp?q=" + escape(encodeURIComponent(ke));
	 	//sv = "get_ac_2.jsp?q=" + escape(encodeURIComponent(ke));
	 	dq_ajaxReqObj_Top = dqc_getXMLHTTP();
	 	
	 	if(dq_ajaxReqObj_Top)
	 	{ 		 		
	 		//alert("2");
			dq_ajaxReqObj_Top.open("GET", sv, true);
		 	dq_ajaxReqObj_Top.onreadystatechange = dq_acShow_Top;
	 	} 
	 
	 	try
	 	{		 	
			dq_ajaxReqObj_Top.send(null);
	 	}
	 	catch(e)
	 	{		
			return 0;
		} 
	}
 
 	//자동완성 결과 보기 - showAC
 	function dq_acShow_Top() 
 	{	 		
		if(dq_acuse_Top == 1)
	 	{		 		
	 		//alert("dq_ajaxReqObj_Top.readyState :" + dq_ajaxReqObj_Top.readyState);
			if(dq_ajaxReqObj_Top.readyState==4 && dq_ajaxReqObj_Top.responseText && dq_ajaxReqObj_Top.status==200)
			{
				//alert(dq_ajaxReqObj_Top.responseText);
				eval(dq_ajaxReqObj_Top.responseText);
				//alert("dq_ajaxReqObj_Top.responseText :" + dq_ajaxReqObj_Top.responseText);
				dq_setAcResult_Top(dq_searchKeyword, dq_searchResultList);
				dq_acResultShow_Top(dq_searchKeyword, dq_searchResultList);
			}
	 	}
	 	else
	 	{
	 		dq_setDisplayStyle_Top(2);
	 	}
 	}
 	
 	//선택키워드저장 - set_acinput
 	function dq_setAcInput_Top(keyword) 
 	{	 		
		if(!dq_acListFlag_Top) 
			return;				
		
	 	dq_keywordOld_Top = dq_searchTextbox_Top.value = keyword;		 			 	
	 	dq_searchTextbox_Top.focus();
	 	dq_acDisplayHide_Top();		 
 	}
 	
 	//기능끄기 버튼을 눌렀을때 - ac_off
	function dq_acOff_Top() 
	{		
		if(dq_searchTextbox_Top.value == "")
			dq_setDisplayStyle_Top(0);
		else
			dq_acDisplayHide_Top();
	
		dq_acuse_Top = 0;
 	}

	//화살표클릭 - show_ac
	function dq_acArrow_Top()
	{			
		var resultDiv = document.getElementById(dq_resultDivID_Top);
		
		if(dq_acuse_Top == 0)
		{

			dq_keywordOld_Top = "";
			dq_acuse_Top = 1;		
			
			if(dq_searchTextbox_Top.value == "")			
				resultDiv.innerHTML = dq_getAcOnNoKeyword_Top();			
		}
		else
		{
			if(dq_searchTextbox_Top.value == "")
				resultDiv.innerHTML = dq_getAcNoKeyword_Top();						
		}
		
		if(dq_searchTextbox_Top.value == "" && (resultDiv.style.display == "block"))
			dq_setDisplayStyle_Top(0);
		else
			dq_setDisplayStyle_Top(1);
		
		dq_acDisplayView_Top();
		dq_searchTextbox_Top.focus();
		dq_wi_Top();
		
		document.body.onclick=null;
	}
	
	//검색어입력창의 자동완성 화살표를 위, 아래로 변경한다. - switch_image	
	/*
	function dq_switchImage(type)
	{			
		var arrow_obj = document.getElementById("dq_autoImg").src;			
		var former_part = arrow_obj.substring(0,arrow_obj.length-6);
		
		if(type==0)
		{
			document.getElementById("dq_autoImg").src = former_part+"Dn.gif";
			document.getElementById("dq_autoImg").title = "자동완성 펼치기";
		}
		else if(type==1)
		{			
			document.getElementById("dq_autoImg").src = former_part+"Up.gif";
			document.getElementById("dq_autoImg").title = "자동완성 닫기";
		}
 	}
 	*/
	
	//자동완성 레이어 mouse on
	function dq_setMouseon_Top() 
 	{ 		
	 	dq_acFormFlag_Top = 1;
 	}

	//자동완성 레이어 mouse out
 	function dq_setMouseoff_Top()
 	{		
	 	dq_acFormFlag_Top = 0;		
		dq_searchTextbox_Top.focus();
 	}
 	
 	//자동완성 결과 코드 - get_aclist
 	function dq_getAcResultList_Top()
 	{ 	 		 	
 		var keyword = "";
 		var keywordOrign = "";
 		var keywordLength = 0;
 		var lenValue = 20;
 		var text = "";
 		var count = 0;
 		
 		var pos = 0;
 		var result = "";
		if(dq_searchResultList != null && dq_searchResultList.length > 0)
		{
 			//text += "<div class='auto_list'>";
 			//text += "<ul>";
			
			//text += "<div class='auto_btn'> </div>"
			//text += "	<ul>";

		 	for(i=0;i<dq_searchResultList.length;i++)
		 	{
		 		result = dq_searchResultList[i].split(";;");
		 		//keyword = keywordOrign = result[0];
		 		keyword = keywordOrign = result[0].replace(/\'/gi, "");
				count = result[1];
				
				keywordLength = dqc_strlen(keywordOrign);
				
				if(keywordLength > lenValue)
					keyword = dqc_substring(keywordOrign, 0, lenValue) + "..";
				 
				if(dq_engFlag_Top == 0)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox_Top.value.toLowerCase());
				else if(dq_engFlag_Top == 1)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());
			
				if(pos >= 0)
				{
					//alert(keyword+', '+dq_searchTextbox_Top.value+', '+0+', '+dq_hStartTag_Top+', '+dq_hEndTag_Top);
					if(pos == 0)
					{
						if(dq_engFlag_Top == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox_Top.value, 0, dq_hStartTag_Top, dq_hEndTag_Top);
						else if(dq_engFlag_Top == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag_Top, dq_hEndTag_Top);
					}
					else if(pos == keywordOrign.length - 1)
					{
						if(dq_engFlag_Top == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox_Top.value, -1, dq_hStartTag_Top, dq_hEndTag_Top);
						else if(dq_engFlag_Top == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag_Top, dq_hEndTag_Top);													
					}												
					else
					{						
						if(dq_engFlag_Top == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox_Top.value, pos, dq_hStartTag_Top, dq_hEndTag_Top);
						else if(dq_engFlag_Top == 1)
							keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag_Top, dq_hEndTag_Top);
					}
					//alert(keyword);
				}
							 	
				text += "<li id='dq_acTop" + (i+1) + "' onmouseover=\"dq_setAcPos_Top('" + (i+1) + "')\" onfocus=\"dq_setAcPos_Top('" + (i+1) + "');\" onmouseout=\"dq_setAcPos_Top(0);\"  onmousedown=\"dq_setAcInput_Top('" + keywordOrign + "');dq_keywordSearch_Top('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput_Top('" + keywordOrign + "');\" ><a href=\"javascript:dq_keywordSearch_Top('" + keywordOrign + "');\">"+ keyword +"</a>";
				text += "<input type=\"hidden\" id=\"dq_acqHiddenTop" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";				 					 				 	
				text += "<span id='dq_acqTop" + (i+1) + "' style='display:none'>" + keywordOrign + "</span></li>";
				
			
		 	}
		 	
		 	//text += "</ul>";
		 	//text += "<span class='btn_off'><a onclick=\"javascript:dq_acOff_Top();\" >끄기</a></span>";
		 	//text += "</div>";
	 	}
 		return text;
	}
 	
 	//자동완성 결과 없는 경우 - get_ac0
 	function dq_getAcNoResultList_Top() 
 	{ 	 		
 		var text = "";
 	    var ment = "<a href=\"javascript:;\">관련 검색어가 없습니다.</a>";
 	    
 	    //text += "<ul>";
 	    text += "	<li >" + ment + "</li>";
 	    //text += "</ul>";
 	    //text += "	<span class=\"btn_off\"><a href=\"#search_form2\" onmousedown=\"javascript:dq_acOff();return false;\"><img src=\"images/search_2013/btn_off.gif\" alt=\"기능끄기\" /></a></span>";
 		
	 	return text;
 	}
 	
 	//자동완성 키워드 없는 경우
 	function dq_getAcNoKeyword_Top() 
 	{ 	 		
 		var text = "";
 		var ment = "현재 자동완성 기능을 사용하고 계십니다.";
	 	
 		text += "<div class='auto_list'>";
		text += "<ul>";
		text += "	<li>";	
 		text += ment;
 		text += "	</li>";
		text += "</ul>";
	 	text += "<span class='btn_off'><a onclick=\"javascript:dq_acOff_Top();\" >끄기</a></span>";
	 	text += "</div>";
	 	
	 	return text;
 	}
 	
 	//자동완성 복구시 키워드 없는 경우
 	function dq_getAcOnNoKeyword_Top() 
 	{ 	 		
 		var text = "";
 		var ment = "자동완성기능이 활성화 되었습니다.";
	 	
 		//text += "<div class='auto_list'>";
		//text += "<ul>";
		text += "	<li>";	
 		text += ment;
 		text += "	</li>";
		//text += "</ul>";
	 	//text += "<span class='btn_off'><a onclick=\"javascript:dq_acOff_Top();\" >끄기</a></span>";
	 	//text += "</div>";
	 	
	 	return text;
 	}

 	//검색박스 키워드 처리 루프 - wi()
 	function dq_wi_Top() 
 	{	 		
		if(dq_acuse_Top==0)
			return;
		
		var keyword = dq_searchTextbox_Top.value;

	 	if(keyword == "" && keyword != dq_keywordOld_Top)
	 		dq_acDisplayHide_Top();
	 	
		if(keyword != "" && keyword != dq_keywordOld_Top && dq_keyStatus_Top != 1)
		{
			var o = null;
			
			o = dq_getAcResult_Top();
			
			if(o && o[1][0] != "") 
				dq_acResultShow_Top(o[0], o[1]);
			else
				dq_reqSearch_Top();
		}
		
		dq_keywordOld_Top = keyword;		
		setTimeout("dq_wi_Top()", dq_intervalTime_Top);
 	}
 	
	setTimeout("dq_wi_Top()", dq_intervalTime_Top);
