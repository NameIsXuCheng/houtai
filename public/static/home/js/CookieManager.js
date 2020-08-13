function getCookie( cookieName )
{
	var search = cookieName + "=";
	var cookie = document.cookie;

	if( cookie.length > 0 )
	{
		startIndex = cookie.indexOf( search );
		if( startIndex != -1 )
		{
			startIndex += cookieName.length;
			endIndex	= cookie.indexOf( ";", startIndex );
			if( endIndex == -1) endIndex = cookie.length;
			return unescape( cookie.substring( startIndex + 1, endIndex ));
		}
		else
		{
			return false; 
		}
	}
	else
	{
		 return false;
	}
}


function setCookie( cookieName, cookieValue, expireDate )
{
	var today		= new Date();
	var totalCookie = "";
	if(getCookie(cookieName) != false) 
	{
		var tempStr		= escape(cookieValue + ";");
		var editedValue = getCookie(cookieName).split(tempStr).join("");
		totalCookie		= editedValue + tempStr;
	}
	else
	{
		totalCookie = escape(cookieValue + ";");
	}
	today.setDate( today.getDate() + parseInt( expireDate ) );
	document.cookie = cookieName + "=" + totalCookie + "; path=/; expires=" + today.toGMTString() + ";";
}


function deleteCookie(cookieName, fudnCode)
{
	var search = cookieName + "=";
	var cookie = document.cookie;

	if( cookie.length > 0 )
	{
		startIndex = cookie.indexOf( search );
		if( startIndex != -1 )
		{
			startIndex += cookieName.length;
			endIndex	= cookie.indexOf( ";", startIndex );
			if( endIndex == -1) endIndex = cookie.length; 

			var currentCookie = unescape( cookie.substring( startIndex + 1, endIndex )); 
			var separator = fudnCode + ";";

			var editedCookie = "";
			editedCookie = currentCookie.split(separator).join("");
			if(editedCookie == "")
			{
				deleteAllCookie(cookieName);
				return false;
			}
			var today = new Date();
			today.setDate( today.getDate() + parseInt( "1" ) );
			document.cookie = cookieName + "=" + escape( editedCookie ) + "; path=/; expires=" + today.toGMTString() + ";";
			
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}


  /**
   * 쿠키 삭제
   * @param cookieName 삭제할 쿠키명
   */
function deleteAllCookie( cookieName )
{
	var expireDate = new Date();

	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}


 /*
  * 자신이 지정한 값으로 쿠키 설정
  */
function setMyCookie()
{
	setCookie( form.setName.value, form.setValue.value, form.expire.value );
	viewCookie(); // 전체 쿠키 출력 갱신
}



 /**
  * 자신이 지정한 쿠키명으로 확인
  */
function getMyCookie()
{
	alert( "쿠키 값 : " + getCookie( form.getName.value ) );
}

/**
  * 자신이 지정한 쿠키명으로 쿠키 삭제
  */
function deleteMyCookie()
{
	deleteCookie( form.deleteName.value );
	alert("쿠키가 삭제되었습니다.");
	viewCookie();
}

/**
  * 전체 쿠키 출력
  */
function viewCookie()
{
	if( document.cookie.length > 0 )
		cookieOut.innerText = document.cookie;
	else
		cookieOut.innerText = "저장된 쿠키가 없습니다.";
}