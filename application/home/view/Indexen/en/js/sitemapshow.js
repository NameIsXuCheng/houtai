//网点地图信息显示JS文件

//替换规则
function templateFetch(str, obj) {
   // alert(str);
   // alert(obj);
    var retval = str;
    for (i in obj) {
        var re = new RegExp('\\{' + i + '\\}', 'g');
       // alert(re);
      //  alert(obj[i]);
        retval = retval.replace(re, obj[i]);
    }
    return retval;
}
//获得样式
function getRealStyle(node) {
    var RealStyle;
    if (node.currentStyle) {
        RealStyle = node.currentStyle;
    } else if (window.getComputedStyle) {
        RealStyle = window.getComputedStyle(node, null);
    }
    return RealStyle;
}
//拖动窗口
function drag(elementToDrag, event, container) {
    var startX = event.clientX,
        startY = event.clientY;
    var container = container || null;
    if (container) container = $("#" + container);
    var origX = elementToDrag.offsetLeft,
        origY = elementToDrag.offsetTop;
    var deltaX = startX - origX,
        deltaY = startY - origY;
    if (document.addEventListener) {
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) {
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        elementToDrag.attachEvent("onlosecapture", upHandler);
    } else {
        var oldmovehandler = document.onmousemove;
        var olduphandler = document.onmouseup;
        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;
    function moveHandler(e) {
        if (!e) e = window.event;
        var realStyle = getRealStyle(elementToDrag);
        var dragWidth = elementToDrag.offsetWidth;
        var dragHeight = elementToDrag.offsetHeight;
        if (container) {
            var contWidth = container.offsetWidth;
            var contHeight = container.offsetHeight;
        } else {
            var contWidth = getDocumentWidth();
            var contHeight = 0;
        }
        var leftMin = e.clientX - deltaX;
        var leftMax = contWidth - dragWidth;
        var dragLeft = (leftMin < 0) ? 0 : (leftMax < leftMin) ? leftMax : leftMin;
        var topMin = e.clientY - deltaY;
        var topMax = contHeight - dragHeight;
        var dragTop = (topMin < 0) ? 0 : (topMax < topMin) ? topMax : topMin;
        if (dragLeft < 360 && dragTop<415) {
            elementToDrag.style.left = dragLeft + "px";
            elementToDrag.style.top = dragTop + "px";
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;
        }else {
            e.cancelBubble = false;
        }
    }
    function upHandler(e) {
        if (!e) e = window.event;
        if (document.removeEventListener) {
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        } else {
            document.onmouseup = olduphandler;
            document.onmousemove = oldmovehandler;
        }
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
}
//关闭窗口
function closeInfoWindow() {
    $('#maptip').html('').hide();
};
//展示窗口
function showInfoWindow(map,point, result) {
    var infowhtml = templateFetch($('#template_maptip').val(), result);
    var node = $('#maptip');
    node.html(infowhtml);
    node.show();
    var mapNode = $('#mapContainer');
    var mapHeight = mapNode.get(0).offsetHeight;
    var topPx = 0;
    var leftPx = 0;
    var nodeWidth = node.get(0).offsetWidth;
    var nodeHeight = node.get(0).offsetHeight;
    var atLeft = true;
    var pixel = map.pointToPixel(point);
    if (pixel.y > nodeHeight - 27) {
        topPx = pixel.y - nodeHeight + 27;
        if (topPx + nodeHeight > mapHeight) topPx = mapHeight - nodeHeight;
    } else {
        topPx = 3;
    }
    if (pixel.x > nodeWidth) {
        leftPx = pixel.x - nodeWidth;
    } else {
        leftPx = pixel.x;
        atLeft = false;
    }
    node.css("top", topPx).css("left", leftPx);
    //node.style.top = topPx + 'px';
    //node.style.left = leftPx + 'px';
    //alert(infowhtml);
};

//添加Marker
function addMarker(map,i, pointTmp, htmlResult) {
    //var marker = new BMap.pointTmp);
    //map.addOverlay(marker);
    var rmimg = "rm3_image_" + i;
    var html = '<div style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 26px; left: -10px; top: -35px; overflow: hidden;">'
        + '<img id="' + rmimg + '" style="border:none;left:0px; top:0px; position:absolute;" src="/images/back1.png">'
        + '</div>'
        + '<label class="BMapLabel" unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun; z-index: 80; color: rgb(255, 102, 0); left: 15px; top: -35px;">' + datas[i].SITENAME.substring(0, 4) + '</label>';
    var richMarker = new BMapLib.RichMarker(html, pointTmp, { "anchor": new BMap.Size(-18, -27), "enableDragging": false });
    map.addOverlay(richMarker);
    richMarker.addEventListener("onmouseover", function (e) {
        document.getElementById(rmimg).src = "/images/back2.png";
    });
    richMarker.addEventListener("onmouseout", function (e) {
        document.getElementById(rmimg).src = "/images/back1.png";
    });
    richMarker.addEventListener("onclick", function (e) {
        showInfoWindow(map,pointTmp, htmlResult);
        document.getElementById(rmimg).src = "/images/back2.png";
    });
    map.setZoom(10);
}
//创建地图及展示位置
//创建地图及展示位置
var map = new BMap.Map("mapContainer");
//添加地图类型控件
var mapTypeCtrl = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] });
map.addControl(window.mapTypeCtrl);
//地图平移缩放控件 PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
var stdMapCtrl = new BMap.NavigationControl();
map.addControl(window.stdMapCtrl);
//比例尺控件，默认位于地图左下方，显示地图的比例关系。
var scaleCtrl = new BMap.ScaleControl();
map.addControl(window.scaleCtrl);
//缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
var overviewCtrl = new BMap.OverviewMapControl();
map.addControl(window.overviewCtrl);
//版权控件
var copyRightCtrl = new BMap.CopyrightControl();
map.addControl(copyRightCtrl);
map.enableScrollWheelZoom(true);
var bounds = new BMap.Bounds();

var datas = siteMapInfo.Data;
//alert(datas);
function showSites() {
    var points = [];//存放坐标 
    var k = 0;
    var point = new BMap.Point(106.540983, 29.560692);//初始化点坐标  
    map.centerAndZoom(point, 15);   //初始化地图，设置中心点坐标和地图级别
    if (siteMapInfo && siteMapInfo.Result && datas.length > 0) {
        for (var i = 0; i < datas.length; i++) {
            if (!datas[i].BDLONGITUDE && !datas[i].BDLATITUDE) {
                continue;
            }
            var lng = datas[i].BDLONGITUDE;
            var lat = datas[i].BDLATITUDE;
            if (!isNaN(lng) && !isNaN(lat)) {
                var pointTmp = new BMap.Point(lng, lat);
                bounds.extend(pointTmp);
                points[k] = pointTmp;
                var htmlResult = datas[i];
             
                addMarker(map,i, pointTmp, htmlResult);
            }
            k++;
        }
        if (points.length > 0) {
            //display:none了，所以显示在左上角，可通过事件来实现调整
            // map.addEventListener("tilesloaded",function(){
            // });
            map.setViewport(points);
            //加载完成时,触发
            var c = bounds.getCenter();
            map.centerAndZoom(c);
        }
    }
}
showSites();