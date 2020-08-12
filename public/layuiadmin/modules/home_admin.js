/**

 @Name：后台统计数据-管理员
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2

 */


layui.define(function(exports){
    var admin = layui.admin;

    //区块轮播切换
    layui.use(['admin', 'carousel'], function(){
        var $ = layui.$
            ,admin = layui.admin
            ,carousel = layui.carousel
            ,element = layui.element
            ,device = layui.device();

        //轮播切换
        $('.layadmin-carousel').each(function(){
            var othis = $(this);
            carousel.render({
                elem: this
                ,width: '100%'
                ,arrow: 'none'
                ,interval: othis.data('interval')
                ,autoplay: othis.data('autoplay') === true
                ,trigger: (device.ios || device.android) ? 'click' : 'hover'
                ,anim: othis.data('anim')
            });
        });

        element.render('progress');

    });

    //营业额和成本对比
    layui.use(['carousel', 'echarts'], function(){
        var $ = layui.$
            ,carousel = layui.carousel
            ,echarts = layui.echarts;

        //默认周
        var inquireType = 'week';
        //请求
        layer.load()
        $.ajax({
            type: 'POST',
            async:true,
            data: {type: inquireType},
            url: SALE_URL,
            success: function (optionData) {
                var options = [
                    {
                        tooltip : {
                            trigger: 'axis'
                        },
                        calculable : true,
                        legend: {
                            data:['销售额','销量']
                        },

                        xAxis : [
                            {
                                type : 'category',
                                data : optionData.xIndex//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name : '销售额',
                                axisLabel : {
                                    formatter: '{value} 元'
                                }
                            },
                            {
                                type : 'value',
                                name : '销量',
                                axisLabel : {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series : [
                            {
                                name:'销售额',
                                type:'line',
                                data:optionData.yIndex_1//[900, 850, 950, 1000, 1100, 1050, 1000, 1150, 1250, 1370, 1250, 1100]
                            },
                            {
                                name:'销量',
                                type:'line',
                                yAxisIndex: 1,
                                data:optionData.yIndex_2//[850, 850, 800, 950, 1000, 950, 950, 1105, 1010, 1024, 1000, 905]
                            }
                        ]
                    }
                ]
                    var echartsApp = []
                    ,elemDataView = $('#LAY-index-pagetwo').children('div')
                    ,renderDataView = function(index){
                    echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                    echartsApp[index].setOption(options[index]);
                    window.onresize = echartsApp[index].resize;
                };
                //没找到DOM，终止执行
                if(!elemDataView[0]) return;
                renderDataView(0);
                layer.closeAll()
            }
        })


    });

    //销售增长图
    layui.use(['carousel', 'echarts'], function() {
        var $ = layui.$
            , carousel = layui.carousel
            , echarts = layui.echarts;
        //日期
        var myDate = new Date;
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        var week = myDate.getDay();
        var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var text = '今日：' + weeks[week];
        var subtext = +year + "年" + mon + "月" + date + "日";

        //请求
        layer.load()
        $.ajax({
            type: 'POST',
            async: true,
            url: SELLER_URL,
            success: function (optionData) {
                var echartsApp = [], options = [
                    {
                        title: {
                            text: text,
                            subtext: subtext
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        dataRange: {
                            orient: 'horizontal',
                            min: 0,
                            max: 60000,
                            text: ['高', '低'],
                            splitNumber: 0
                        },
                        xAxis: {
                            type: 'category',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {show: true, interval: 'auto', formatter: '{value}'}
                        },
                        series: [{
                            data: optionData.data,//[82, 92, 91, 94, 190, 130, 120],
                            type: 'line',
                            smooth: true
                        }]
                    }
                ]
                    , elemDataView = $('#seller_rate').children('div')
                    , renderDataView = function (index) {
                    echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
                    echartsApp[index].setOption(options[index]);
                    window.onresize = echartsApp[index].resize;
                };
                //没找到DOM，终止执行
                if (!elemDataView[0]) return;
                renderDataView(0);
                //layer.closeAll();
            }


        });
    })


    //产品排名
    layui.use('table', function(){
        var $ = layui.$
            ,table = layui.table;

        table.render({
            elem: '#rank_product'
            ,url: PRODUCT_URL
            ,cols: [[
                {field: 'name', title: '产品名称',width: '45%'
                    ,templet: function(d){
                        if(d.LAY_INDEX == 1){
                            return '<span style="color: #FF5722;">'+ d.name +'</span>'//<span class="first">
                        }else if(d.LAY_INDEX == 2){
                            return '<span style="color: #FFB800;">'+ d.name +'</span>'
                        }else if(d.LAY_INDEX == 3){
                            return '<span style="color: #5FB878;">'+ d.name +'</span>'
                        }else{
                            return '<span style="color: #2D93CA;">'+ d.name +'</span>'
                        }
                    }
                }
                ,{field: 'nums', title: '销量',width:'20%'}
                ,{field: 'price', title: '销售额(元)',width:'35%'}
            ]]
            ,skin: 'line'
        });
    });

    //回复留言
    admin.events.replyNote = function(othis){
        var nid = othis.data('id');
        layer.prompt({
            title: '回复留言 ID:'+ nid
            ,formType: 2
        }, function(value, index){
            //这里可以请求 Ajax
            //…
            layer.msg('得到：'+ value);
            layer.close(index);
        });
    };

    exports('home_admin', {})
});