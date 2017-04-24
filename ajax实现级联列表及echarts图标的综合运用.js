//这是一个用jquery写的配合echarts（一个图表的插件）的级联列表
//用ajax实现



 // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echart'));
myChart.setOption({
    title: {
        text: '职位比较'
    },
    tooltip: {},
    legend: {
        data:['数量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: []
    }]
});
//初始化好了之后用get方式获取数据
$.get('/offershow/ajax?type=chart&cityId=1').done(function (data) {
    // 填入数据
    var ab = JSON.parse(data);
    //console.log(abc);
    myChart.setOption({
        xAxis: {
            data: ab.job
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '销量',
            data: ab.salary
        }]
    });
});


//级联列表的js

function sheng () {
    var asd = $('#shengfen').val(); //获取选择框的值
    //console.log(asd);
     $.ajax({     //发ajax
        url:"/offershow/ajax?type=adress",
        type:"get",
        data:'term='+asd,
        success:function (data) {   //成功之后的回调函数
           //console.log(data);
            var d = JSON.parse(data);  //解析json数据
            // console.log(d);
            for (var j =0;j<d.length;j++){  //解析完先遍历一次
               var s = d[j].text;
               var ss = d[j].value;
                // console.log(s);
            }
            $("#shi").empty();  //此句话是每次ajax发完请求都清除一下第二级的列表里面的选项
            for(var i=0;i<d.length;i++){  //利用for循环给二级列表添加option选项
                $("<option></option>").val(d[i].text).text(d[i].value).appendTo("#shi");
                //console.log(d[i].text);
            }
        }
    })
}
//确定提交按钮的js   
//选完之后还用ajax发给服务器

function update() {
    var ff = $('#shi').val();
    console.log(ff);
    $.get('/offershow/ajax?type=chart&cityId='+ff).done(function (two){
        // 填入数据

        var tw = JSON.parse(two);
        //console.log(tw);
        myChart.setOption({
            xAxis: {
                data: tw.job
            },
            series: [{
                // 根据名字对应到相应的系列
                name: '销量',
                data: tw.salary
            }]
        });
    });
}
