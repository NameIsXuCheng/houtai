$(function(){

    /*
    author lidp
    todo form 表单验证
    ajax post 方式提交
    time 2016年9月15日15:46:29
    */
    //$("#form").Validform({
    //    tiptype:function(msg,o,cssctl){
    //        var objtip=$("#msg");
    //        cssctl(objtip,o.type);
    //        objtip.text(msg);
    //    },
    //    ajaxPost:true,
    //    callback:function(data){
    //        if(data.status=="y"){
    //            setTimeout(function(){
    //                $.Hidemsg();
    //            },2000);
    //        }
    //    }
    //});


});




function open_layer(width, height, title, url){
    layer.open({
        type: 2,
        title: title,
        fix: false,
        shadeClose: true,
        icon:-1,
        move: true,
        area: [width, height],
        content: url,
        closeBtn:2,
        success: function(layero, index) {
            layer.iframeAuto(index);
        }
    });
}