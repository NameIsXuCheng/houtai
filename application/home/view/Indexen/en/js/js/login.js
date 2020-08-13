$(function(){

    var LoginRegister = {};

    //登录头
    LoginRegister.login = function(ElassOne,TxtUserPass,TxtUserPass_text){
        TxtUserPass.keyup(function(){
            TxtUserPass.val()!=""?ElassOne.show():ElassOne.hide();
        });

        ElassOne.click(function(){
            if (TxtUserPass.attr("type")=="password") {
                document.querySelector(TxtUserPass_text).type="text";
                ElassOne.css("background-position","-33px 0")
            }else {
                document.querySelector(TxtUserPass_text).type="password";
                ElassOne.css("background-position","0 0")
            }
        });

        LoginRegister.login.llos = function(){
            TxtUserPass.val()!=""?ElassOne.show():ElassOne.hide();
        };

        LoginRegister.login.llos()
    };

    $(window).load(function(){
        var elassOne=  $("#elassOne");
        var elassTwo = $("#elassTwo");
        var elassThe = $("#elassThe");
        var elassfor = $("#elassfor");
        var elassfrew = $("#elassfrew");


        var txtUserPass= $("#txtUserPass");
        var emailPassword = $("#passwd");
        var aginPassword = $("#repasswd");
        var cellPassword = $("#passwd1");
        var aginCellPassword = $("#repasswd1");


        LoginRegister.login(elassOne,txtUserPass,'#txtUserPass');
        LoginRegister.login(elassTwo,emailPassword,'#passwd');
        LoginRegister.login(elassThe,aginPassword,'#repasswd');
        LoginRegister.login(elassfor,cellPassword,'#passwd1');
        LoginRegister.login(elassfrew,aginCellPassword,'#repasswd1');

        LoginRegister.cssFlase();

    });

    $("#kpa").attr("checked",false);     // }
                                         // |>初始化状态
    $("#opa").attr("checked",true);      // }

    $(".ulabe li").click(function(even){
        $(this).siblings().removeClass("actiber");
        $(".app").hide();

        $(this).addClass("actiber");
        $(".ulabe li").each(function(index,element){
            if($(element).hasClass("actiber")){
                $(".app").eq(index).show();
            }
        });
   even.stopPropagation();
    });

//动画动作细节
    LoginRegister.cssFlase=function(){

        var a1 = navigator.userAgent;
        var yesIE = a1.search(/Trident/i);

        $(".login_reg").addClass("magriwebit");

        $("#reg").click(function(){   //注册块

            if(yesIE > 0) {
                $(".cssflase .coemter").show();
                $(".cssmofalse .coemter").hide();
            }

            $("#log").removeClass("action");
            $(this).addClass("action");
            $(".login_da,.login_reg").removeClass("claer");
            $(".login_da,.login_reg").addClass("kosda kosdas");
            $(".login_da").css({
                "z-index":"2"
            });

            $(".login_reg").css({
                "z-index":"10"
            });

            $(".kosda,.kosdas").one("webkitTransitionEnd otransitionend transitionend",function(){  //结束监听
                $(".login_da,.login_reg").removeClass("kosda kosdas").addClass("claer");
                $(".cssflase .coemter").show();
                $(".cssmofalse .coemter").hide();
                $(".login_da").css({
                    "top":"33px"
                });

                $(".login_reg").css({
                    "margin-top": "-437px",
                    "box-shadow": "-7px -9px 32px rgba(0,0,0,0.3）"
                });

            });


        });


        $("#log").click(function(){//登录块

            if(yesIE > 0) {
                $(".cssflase .coemter").hide();
                $(".cssmofalse .coemter").show();
            }

            $("#reg").removeClass("action");
            $(this).addClass("action");
            $(".login_da,.login_reg").removeClass("claer");

            $(".login_da,.login_reg").addClass("xsdloa xsdloas");

            $(".login_reg").css({
                "z-index":"2"
            });
            $(".login_da").css({
                "z-index":"10"
            });

            $(".xsdloa,.xsdloas").one("webkitTransitionEnd otransitionend transitionend",function(){  //结束监听
                $(".login_da,.login_reg").removeClass("xsdloa xsdloas").addClass("claer");
                $(".cssflase .coemter").hide();
                $(".cssmofalse .coemter").show();

                $(".login_reg").css({
                    "margin-top": "-403px",
                    "box-shadow": "7px 9px 32px rgba(0,0,0,0.3)"

                });
                $(".login_da").css({
                    "top":"0",
                    "box-shadow": "7px 9px 32px rgba(0,0,0,0.3）"
                });

            })
        });
    };



});

function chobox(btton){
  var chox = "#" + btton;

    if ($(chox).css("background-color")=="rgb(45, 152, 221)"){
        $(chox).addClass("disabled");
        $(chox).css("background-color","rgb(204, 204, 204)");
    }else {
        $(chox).css("background-color","rgb(45, 152, 221)");
        $(chox).removeClass("disabled");
    }
}


