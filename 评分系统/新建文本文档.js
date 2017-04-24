//ajax发送数据
function creatXHR(){
    if (typeof XMLHttpRequest !='undefind'){
        return new XMLHttpRequest();
    }
}
var shiti = document.getElementById('pop-1-1');
var list = document.getElementById('pop-b');
var lists = list.getElementsByClassName('pop-pttt');
//console.log(lists.length);
var xhr1 = creatXHR();
xhr1.onreadystatechange = function() {
    if (xhr1.readyState === 0) {
       // console.log('请求未初始化（还没有调用 open()）');
    }
    if (xhr1.readyState === 1) {
       // console.log('请求已经建立，但是还没有发送（还没有调用 send()）');
    }
    if (xhr1.readyState === 2) {
       // console.log('请求已发送，正在处理中（通常现在可以从响应中获取内容头）。');
    }
    if (xhr1.readyState === 3) {
       // console.log('请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。');
    }
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            var rtxt = JSON.parse(xhr1.responseText);
           // console.log(rtxt.numOfExercise);
            var ren = rtxt.numOfExercise;
            //console.log(ren);
            //此处，下面for循环每循环一次lists.length,便减少1，所以不能直接用
            //lists.length要先固定住,好像不对，
            //下面到for循环是先删除以前的节点
            //var llen = lists.length;
            // console.log('llen', llen);
            // for(var i=0;i<llen;i++){
            //     console.log('llen', llen);
            //     list.removeChild(lists[0]);
            //     // llen++;
            // }
            list.innerHTML = '';
            //此处应该建立新的节点  使用innerHTML
            var tee = '';
            for(var i=1;i<=ren;i++){
                var tet = '<a href="#page-3" data-role="button" onclick="getname(this)" class="pop-ptttui-link ui-btn ui-shadow ui-corner-all" role="button" name="afterc">听力试题'+i+'</a>';
                tee = tee+tet;
                //console.log(tee);
            }

            list.innerHTML =tee;
            var afterclick = document.getElementsByName('afterc');
            //console.log(afterclick[0].innerHTML);
            //下面是正经的原生js写的添加dom节点，但不好用，还是用上面的innerHTML吧
            // for(var i=0;i<ren;i++){
            //     var tj = document.createElement('a');
            //     tj.href="#page-3";
            //     // tj.data-role="button";
            //     tj.class="pop-pttt";
            //     tj.innerText='听力试题'+i;
            //     list.appendChild(tj);
            // }

        }
    }
}
function send1() {
    xhr1.open('get', '/JuniorHearing2/exercise/selectNumberOfExercise', true);
    xhr1.send(null);
}
var ggn = '';
//此处很机智，得到创建之后的html之后，截取字符串，
// 然后将截取之后的数字作为ajax的参数发送出去
function getname(thisp) {
    var gn = thisp.innerHTML;
    //console.log(gn);
    // console.log(typeof gn)
    ggn = gn.substring(4);
    //console.log(ggn);
    send2();
}
document.getElementById('pop-1-1').onclick = function () {
    send1();
}
//获取试题的ajax
var xhr2 = creatXHR();
var rt2 ='';
var exmpape =0;
xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 0) {
        //console.log('请求未初始化（还没有调用 open()）');
    }
    if (xhr2.readyState === 1) {
       // console.log('请求已经建立，但是还没有发送（还没有调用 send()）');
    }
    if (xhr2.readyState === 2) {
       // console.log('请求已发送，正在处理中（通常现在可以从响应中获取内容头）。');
    }
    if (xhr2.readyState === 3) {
        //console.log('请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。');
    }
    if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
            var rtxt2 = JSON.parse(xhr2.responseText);

            rt2 = rtxt2.data;
            exmpape=rt2[0].exampaper_id;
            console.log(rt2);
            //console.log(exmpape);
            updown(0);//给下面的1/30计算
            timetest();//启动计时器，其实不应该在这里
        }
    }
}
function send2() {
    //console.log(ggn);
    var url = '/JuniorHearing2/exercise/selectExampaperByExampaper_id/'+ggn;
    xhr2.open('get',url, true);
    xhr2.send();
}
//要写一个上一题，下一题的方法
var up = document.getElementById('up_1');
var down = document.getElementById('down_1');
var sa = document.getElementById('select_a');
var sb = document.getElementById('select_b');
var sc = document.getElementById('select_c');
var saa = document.getElementById('select_a_a');
var sbb = document.getElementById('select_b_b');
var scc = document.getElementById('select_c_c');
var exeme = document.getElementById('exme');
var sta = document.getElementById('startt');
var p130 = document.getElementById('pg2-3');
var inpu = document.getElementById('inp');
var i_i = 0;
up.onclick = function (){

    alert(1);
    i_i--;
    if(i_i>=0){
        updown(i_i);
    }else{//不写下限会报错
        i_i=0;
    }

}
down.onclick = function (){
    ty(i_i);//对比本题答案
    i_i++;
    if(i_i<=29){
        updown(i_i);
    }else{
        i_i=29;
    }
}
//var txt = arr[1].exercise_explain;
//前25个选择题用这个方法控制显示  
function updown(i_i) {
    var i_p = i_i+1;
    p130.innerHTML =  i_p+'/30';
    if (25<=i_i){
        inpu.innerHTML = '<input type="text" name="onlyselect" style="height: 7rem;width: 20rem;">';
    }else{
        exeme.innerHTML =rt2[i_i].exercise_question;
        // console.log(rt2[i_i].exercise_question);
        saa.innerHTML ='A:'+rt2[i_i].option_A;
        sbb.innerHTML ='B:'+rt2[i_i].option_B;
        scc.innerHTML ='C:'+rt2[i_i].option_C;
    }
}
//最后5个填空题用这个方法控制显示
function updowml() {

}
//下面是轮播的js
var imc = document.getElementsByName('lblank');
//console.log(imc[1]);
function lb(index) {  //控制显示的函数
    for (var i = 0; i < imc.length; i++) {    //先让所有的图片都不显示,用绝对定位都放到一起
        imc[i].style.filter = 'opacity(0)';
    }
    for (var i = 0; i < 21; i++) {
        (function (i) {
            //console.log(i);
            setTimeout('as(' + i + ',' + index + ')', i * 30);  //演示执行函数
            //console.log(index);
        })(i);
    }
}
function as(i, abc) {  //这个是控制淡出的函数
    //console.log(abc);
    //console.log(imc[abc]);
    imc[abc].style.filter = 'opacity(' + i * 0.05 + ')';
    //console.log(index);
}
lb(0); //轮播初始化
var count = 1; //先定义一个数字
function contr() {  //控制轮播的函数
    if (count == imc.length) {//控制轮播到最后一张时，重新返回第一张。
        count = 0;
    }
    lb(count);    //将该显示的第几张,传回控制显示的函数。
    count++;
    // alert(123);
}
setInterval(contr, 3000); //定时器，此函数会每隔一段时间调用一次contr函数
//应该有更好的解决方法来识别到底是触摸了那个按钮
function mouseover1() {
    lb(0);
    clearInterval(time);
    time = setInterval(contr, 3000);
}
function mouseover2() {
    lb(1);
    clearInterval(time);
    time = setInterval(contr, 3000);
}
function mouseover3() {
    lb(2);
    clearInterval(time);
    time = setInterval(contr, 3000);
}
function mouseover4() {
    lb(3);
    clearInterval(time);
    time = setInterval(contr, 3000);
}
//下面是倒计时的js\
function left(i){
    // if(i<0){  //第一个if  因为我们做的是倒计时，结果是负数，要变成正数。
       // i= -i;
        if(i<10){ // 第二个if  给个位数补0.
            i='0'+i;
        }
    //}
    return i;
}
function zheng(i){
    if(i<0){
        i= -i;
    }
}
var time_l = document.getElementById('time_leftt');
var timeleft = 6;//设置为30分钟
function timetest(){
    if(timeleft>=0){
        var m = parseInt(timeleft/60%60);   //也是取余数，除以整小时，然后看剩几分钟，
        var s = parseInt(timeleft%60);
        m = left(m);
        s = left(s);
        time_l.innerHTML = m+":"+s+"";
        timeleft=timeleft-1;
        var t = setTimeout(timetest,1000);
    }
    if(timeleft===5*60){
        alert('测试还有5分钟结束!');
    }
    if (timeleft===-1){
        alert('时间结束');
        timeleft=-3;
        time_l.innerHTML = '';
        jsfs();
    }
    if (timeleft===-5){
        time_l.innerHTML = '';
    }
}
//下面写评分系统的js
var onl = document.getElementsByName('onlyselect');
//先将标准答案放到一个数组里
//这里等后台给答案之后再调用
// var bzda = [];
// baza.length = 30;
// for(var i=0;i<30;i++){
//     bzda[i]=rt2[i].exercise_answer;
// }
var bzda = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b']
//答案暂存
var ansow =[];
ansow.length = 30;
//分数暂存
var cts =0;
var fs = 0;
var fs1_5 = 0;
var fs6_15 = 0;
var fs16_20 = 0;
var fs21_25 = 0;
var fs26_30 = 0;
//答案暂存
var ans = '';
function ty(b) {
    //这个for循环是抓取答案的
    if(b<26){
        for(var i=0;i<onl.length;i++){
            if (onl[i].checked){
                ans = onl[i].value;
                //console.log(ans);
            }
        }
    }else{
        ans = onl[0].value;
        console.log(ans);
    }
    //将用户写的答案存到数组中
    ansow[i_i]=ans;
}
//这是计算分数的部分
function jsfs() {
    timetest(1);
    //计算总分
    for(var i=0;i<30;i++){
        if(ansow[i]===bzda[i]){
            fs=fs+1;
        }
    }
    cts=30-fs;
    //计算1-5
    for(var i=0;i<5;i++){
        if(ansow[i]===bzda[i]){
            fs1_5=fs1_5+1;
        }
    }
    console.log(fs1_5);
    //计算6-15
    for(var i=5;i<15;i++){
        if(ansow[i]===bzda[i]){
            fs6_15=fs6_15+1;
        }
    }
    console.log(fs6_15);
    //计算16-20
    for(var i=15;i<20;i++){
        if(ansow[i]===bzda[i]){
            fs16_20=fs16_20+1;
        }
    }
    console.log(fs16_20);
    //计算21-25
    for(var i=20;i<25;i++){
        if(ansow[i]===bzda[i]){
            fs21_25=fs21_25+1;
        }
    }
    console.log(fs21_25);
    //计算26-30
    for(var i=25;i<30;i++){
        if(ansow[i]===bzda[i]){
            fs26_30=fs26_30+1;
        }
    }
    console.log(fs26_30);
    //点击胶卷之后终止一切操作，并停止计时
    console.log(fs);
    exeme.innerHTML ='';
    saa.innerHTML ='';
    sbb.innerHTML ='';
    scc.innerHTML ='';
    i_i=60;
    p130.innerHTML = '';
    jiaojuan.innerHTML = '';
    up.disabled = 'disabled';
    down.disabled = 'disabled';
    //clearTimeout(t);暂时没有想到比较好的方法来清除
    send4();
    timeleft=-5;
    alert('交卷成功!');
}
var jiaojuan = document.getElementById('sumt');
jiaojuan.onclick = function () {
    jsfs();
}
//下面是收藏的ajax
var shouc = document.getElementById('pg2-2');
var xhr3 = creatXHR();
//这里面其实应该写点东西来验证是否收藏成功的
xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4) {
        if (xhr3.status === 200) {
            var rtxt3 = JSON.parse(xhr3.responseText);
        }
    }
}
function send3() {
    var ct = rt2[i_i].exercise_id;
    var cy = rt2[i_i].exercise_type;
    //console.log(ct);
    //console.log(cy);
    var url = '/JuniorHearing2/exerciseCollect/insertCollectOfExercise/'+ct+'/'+cy;
    xhr3.open('get',url, true);
    xhr3.send();
}
shouc.onclick = function () {
    send3();
    alert('收藏成功!');
}
//交卷成功之后发送数据
var xhr4 = creatXHR();
xhr4.onreadystatechange = function() {
    if (xhr4.readyState === 4) {
        if (xhr4.status === 200) {
            var rtxt4 = JSON.parse(xhr4.responseText);
            console.log(rtxt4);
        }
    }
}
function send4() {
    var iuy = new Date;
    var iu_y = iuy.toString();
    console.log(typeof iu_y);
    var postdata = {
        examinfo_id: null,
        examinfo_score: fs,
        examinfo_date:'2017-03-28 20:20:41',
        examinfo_time:'ttttxe',
        examinfo_mistakenumber:cts,
        examinfo_firstscore: fs1_5,
        examinfo_secondscore: fs6_15,
        examinfo_thirdscore: fs16_20,
        examinfo_fourthscore: fs21_25,
        examinfo_fifthscore: fs26_30,
        exampaper_id: exmpape,
        user_id: null
    };
    console.log(postdata);
    var post_data = JSON.stringify(postdata);
    console.log(post_data);
    var url = '/JuniorHearing2/examInfo/addExamInfo/';
    xhr4.open('post',url, true);
    xhr4.setRequestHeader("Content-type","application/json");
    xhr4.send(post_data);
}
