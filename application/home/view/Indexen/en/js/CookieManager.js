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
   * ��Ű ����
   * @param cookieName ������ ��Ű��
   */
function deleteAllCookie( cookieName )
{
	var expireDate = new Date();

	//���� ��¥�� ��Ű �Ҹ� ��¥�� �����Ѵ�.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}


 /*
  * �ڽ��� ������ ������ ��Ű ����
  */
function setMyCookie()
{
	setCookie( form.setName.value, form.setValue.value, form.expire.value );
	viewCookie(); // ��ü ��Ű ��� ����
}



 /**
  * �ڽ��� ������ ��Ű������ Ȯ��
  */
function getMyCookie()
{
	alert( "��Ű �� : " + getCookie( form.getName.value ) );
}

/**
  * �ڽ��� ������ ��Ű������ ��Ű ����
  */
function deleteMyCookie()
{
	deleteCookie( form.deleteName.value );
	alert("��Ű�� �����Ǿ����ϴ�.");
	viewCookie();
}

/**
  * ��ü ��Ű ���
  */
function viewCookie()
{
	if( document.cookie.length > 0 )
		cookieOut.innerText = document.cookie;
	else
		cookieOut.innerText = "����� ��Ű�� �����ϴ�.";
}