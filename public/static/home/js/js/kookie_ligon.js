usname = document.getElementById("txtUserName");
ispswtd = document.getElementById("txtUserPass");
function logobuue() {
    userLogin();
    if ($(this).hasClass('disabled')) {
        return false;
    }
    $(this).addClass("disabled");
}

function addCookie(name,value,days,path){
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + days * 3600000 * 24);
    path = path == "" ? "" : ";path=" + path;
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;

}
function getCookieValue(name){
    var name = escape(name);
    var allcookies = document.cookie;


    name += "=";
    var pos = allcookies.indexOf(name);
    if (pos != -1){
        var start = pos + name.length;
        var end = allcookies.indexOf(";",start);
        if (end == -1) end = allcookies.length;
        var value = allcookies.substring(start,end);
        return (value);
    }else{
        return "";
    }
}
function deleteCookie(name,path){
var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;

}
window.onload = function(){
var userNameValue = getCookieValue("userName");
    var userPassValue = getCookieValue("userPass");
    var usvalue = decodeURIComponent(userPassValue);
    usname.value = $.trim(userNameValue);
    ispswtd.value = usvalue;
   if(userNameValue == ''){
       $("#chkRememberPass").attr("checked", false);
   }else{
       $("#chkRememberPass").attr("checked", true);
   }

};

$(function () {

    /*$(".login-title,.header").click(function () {
        return false;
    });
    $("#lo").click(function () {
        window.location.href=login;
    });

    $("#re").click(function () {
        window.location.href=register;
    });

    $("#psw").click(function () {
        window.location.href=regIt;
    });

    $("#pwd").click(function () {
        window.location.href=regdit;
    });*/

    // haibo
    //20170714
    var n =0;
    var k= $.cookie('loginCookie');

    $("body").click(function () {
        n++;
        if(n>7){
            n=1;
            $.cookie('loginCookie',1,{ expires: 3 });
        }

        $.cookie('loginCookie',n,{ expires: 3 });

        k = $.cookie('loginCookie');

        switch (parseInt(k))
        {
            case 1:
                $(this).css({
                    background:'#313541',
                    transition:'background 1.4s ease 0s'
                });
                break;
            case 2:
                $(this).css({
                    background:'#608CCF',
                    transition:'background 1.4s ease 0s'
                });
                break;
            case 3:
                $(this).css({
                    background:'#6D5EB3',
                    transition:'background 1.4s ease 0s'
                });
                break;
            case 4:
                $(this).css({
                    background:'#36386C',
                    transition:'background 1.4s ease 0s'
                });
                break;
            case 5:
                $(this).css({
                    background:'#357A4B',
                    transition:'background 1.4s ease 0s'
                });
                break;
            case 6:
                $(this).css({
                    background:'#39579A',
                    transition:'background 1.4s ease 0s'
                });
                break;

            default:
                $(this).css({
                    background:'#364760',
                    transition:'background 1.4s ease 0s'
                });
                break;

        }

    });




//        if (k==NaN||k==undefined){
//            k = $.cookie('loginCookie',1,{ expires: 3 });
//            n=k;
//        }


    n=k;

    switch (parseInt(k))
    {
        case 1:
            $("body").css({
                background:'#4987c2',
                transition:'background 1.4s ease 0s'
            });
            break;
        case 2:
            $("body").css({
                background:'#4b81aa',
                transition:'background 1.4s ease 0s'
            });
            break;
        case 3:
            $("body").css({
                background:'#3f79a5',
                transition:'background 1.4s ease 0s'
            });
            break;
        case 4:
            $("body").css({
                background:'#36719d',
                transition:'background 1.4s ease 0s'
            });
            break;
        case 5:
            $("body").css({
                background:'#2e6b98',
                transition:'background 1.4s ease 0s'
            });
            break;
        case 6:
            $("body").css({
                background:'#28628d',
                transition:'background 1.4s ease 0s'
            });
            break;

        default:
            $("body").css({
                background:'#184d74',
                transition:'background 1.4s ease 0s'
            });
            break;

    }

    $(".main_text").click(function () {

        return false;
    });

});
