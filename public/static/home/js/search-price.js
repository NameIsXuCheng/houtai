//2014-07-23
//刘平
//js压缩  压缩引擎：uglifyjs
$("#weight,#chang,#kuan,#gao").bind('keyup focus blur', function (obj) {
    $(this).val($(this).val().replace(/[^\d.]/g, ""));
});


function selectProvince(id, tid) {
    var v = $("#" + id + "").val();
    var resultData = start[v];
    var option = "";
    if (resultData.length > 0) {
        for (var i = 0; i < resultData.length; i++) {
            option += "<option value=\"" + resultData[i] + "\">" + resultData[i] + "</option>";
        }
        $("#" + tid + "").html(option);
    } else {
        $("#" + tid + "").html("<option selected=\"selected\" value=\"没有找到数据\">没有找到数据</option>");
    }
}

$(function () {
    $("#priceSearch").click(function () {
        var option = "<table width=\"100%\" border=\"0\" align=\"center\" cellspacing=\"0\" class=\"tbl2\">";
        var StartCity = $("#StartCity").val();
        var StartProvince = $("#StartProvince").val();

        var TargetCity = $("#TargetCity").val();
        var TargetProvince = $("#TargetProvince").val();

        var weight = $("#weight").val();
        var w = weight;
        //0.5进位
        if (w.indexOf(".") > -1) {
            wd = "0." + w.substr(w.indexOf(".") + 1, w.length - w.indexOf("."));
            if (Number(wd) > 0.5) {
                w = Math.ceil(w);
            } else {
                if (Number(wd) > 0) {
                    w = w.substr(0, w.indexOf(".")) + ".5";
                }
            }
        }
        if ($("#weight").val() == "" && ($("#chang").val() == "" && $("#kuan").val() == "" && $("#gao").val() == "")) {
            mess("red", "物品重量或者体积不能同时为空！");
            document.getElementById("weight").focus();
            return;
        }
        if ($("#chang").val().length > 5 || $("#kuan").val().length > 5 || $("#gao").val().length > 5) {
            mess("red", "物品长宽高太大！");
            document.getElementById("chang").focus();
            return;
        }
        if ($("#weight").val() < 0) {
            mess("red", "重量不能小于0！");
            document.getElementById("weight").focus();
            return;
        }
        if ($("#weight").val() == "" && ($("#chang").val() != "" || $("#kuan").val() != "" || $("#gao").val() != "")) {
            if ($("#chang").val() == "") {
                mess("red", "物品长度不能为空！");
                document.getElementById("chang").focus();
                return;
            }
            if ($("#kuan").val() == "") {
                mess("red", "物品宽度不能为空！");
                document.getElementById("kuan").focus();
                return;
            }
            if ($("#gao").val() == "") {
                mess("red", "物品高度不能为空！");
                document.getElementById("gao").focus();
                return;
            }
        }
        if (TargetCity == "请选择") {
            TargetCity = "";
        }
        if (StartCity == "请选择") {
            StartCity = "";
        }
        if (StartProvince == "请选择或输入省份" && TargetProvince == "请选择或输入省份") {
            StartProvince = "";
            TargetProvince = "";
        }
        //计算体积重量，并判断
        var v = toDecimal($("#chang").val() * $("#kuan").val() * $("#gao").val() / 6000);
        if (v > weight) {
            v = "" + v + "";
            if (v.indexOf(".") > -1) {
                wt = "0." + v.substr(v.indexOf(".") + 1, v.length - v.indexOf("."));
                if (Number(wt) > 0.5) {
                    w = Math.ceil(v);
                } else {
                    if (Number(wt) > 0) {
                        w = v.substr(0, v.indexOf(".")) + ".5";
                    }
                    else {
                        w = v;
                    }
                }
            }
            else {
                w = v;
            }
        }
        if (w <= 0 || w == "" || w == null) {
            mess("red", "重量不能为空！");
            document.getElementById("weight").focus();
            return;
        }
        if (StartProvince != "" && TargetProvince != "") {
            $.ajax({
                type: "get",   //请求的方法
                url: "/GuestService/GetPrice",
                dataType: "text",   //返回的数据类型
                data: "code=" + $("#TextBoxCode").val() + "&dispProv=" + encodeURI(TargetProvince) + "&dispCity=" + encodeURI(TargetCity) + "&sendProv=" + encodeURI(StartProvince) + "&sendCity=" + encodeURI(StartCity) + "&weight=" + encodeURI(w),
                cache: false,
                timeout: 20000,
                beforeSend: function () { $("#s_r").html("<br/><img src=\"http://img.zto.cn/images/load.gif\"/><br/><br/><br/>"); },
                success: function (res) {
                    var resultJson = eval("(" + res + ")");
                    if (res.Status == false) {
                        mess("red", res.Msg);
                    } else {
                        
                        var resultData = resultJson.Data;

                        option += "<tr><td width=\"15%\" height=\"30\" bgcolor=\"#ECECEC\">&nbsp;体积重量</td><td width=\"85%\" height=\"30\">" + v + "Kg <font color='#767676'>(国际航协规定：体积重量即根据最长*最宽*最高(CM)/6000=重量(Kg))</font></td></tr>";
                        option += "<tr><td height=\"30\" bgcolor=\"#ECECEC\">&nbsp;实际重量</td><td height=\"30\">" + weight + "Kg</td></tr>";
                        option += "<tr><td height=\"30\" bgcolor=\"#ECECEC\">&nbsp;计费重量</td><td height=\"30\">" + w + "Kg <font color='#767676'>(体积重量大于实际重量时，根据体积重量结算)</font></td></tr>";
                        option += "<tr><td height=\"30\" bgcolor=\"#ECECEC\">&nbsp;报价</td><td height=\"30\">";
                        option += "<font color='red'>" + resultData.price + "元</font></td></tr>";

                        option += "<tr><td height=\"30\" bgcolor=\"#ECECEC\">&nbsp;预计运输时长</td><td height=\"30\"><font color='red'>" + Math.floor(resultData.hour) + "小时</font></td></tr>";

                        option += "</table>";
                        $("#s_r").html(option);
                    }
                },
                error: function () {
                    mess("red", "请求数据失败，请重试或刷新本页");

                }
            });
        } else {
            mess("red", "请选择始发地省份和目的地省份");
        }



    });
    //错误信息
    function mess(color, text) {
        $("#s_r").html("<font color='" + color + "'>" + text + "</font><br/><br/><br/>");
    }
    //四舍五入
    function toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return null;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }
});