//ajax��������
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
       // console.log('����δ��ʼ������û�е��� open()��');
    }
    if (xhr1.readyState === 1) {
       // console.log('�����Ѿ����������ǻ�û�з��ͣ���û�е��� send()��');
    }
    if (xhr1.readyState === 2) {
       // console.log('�����ѷ��ͣ����ڴ����У�ͨ�����ڿ��Դ���Ӧ�л�ȡ����ͷ����');
    }
    if (xhr1.readyState === 3) {
       // console.log('�����ڴ����У�ͨ����Ӧ�����в������ݿ����ˣ����Ƿ�������û�������Ӧ�����ɡ�');
    }
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            var rtxt = JSON.parse(xhr1.responseText);
           // console.log(rtxt.numOfExercise);
            var ren = rtxt.numOfExercise;
            //console.log(ren);
            //�˴�������forѭ��ÿѭ��һ��lists.length,�����1�����Բ���ֱ����
            //lists.lengthҪ�ȹ̶�ס,���񲻶ԣ�
            //���浽forѭ������ɾ����ǰ�Ľڵ�
            //var llen = lists.length;
            // console.log('llen', llen);
            // for(var i=0;i<llen;i++){
            //     console.log('llen', llen);
            //     list.removeChild(lists[0]);
            //     // llen++;
            // }
            list.innerHTML = '';
            //�˴�Ӧ�ý����µĽڵ�  ʹ��innerHTML
            var tee = '';
            for(var i=1;i<=ren;i++){
                var tet = '<a href="#page-3" data-role="button" onclick="getname(this)" class="pop-ptttui-link ui-btn ui-shadow ui-corner-all" role="button" name="afterc">��������'+i+'</a>';
                tee = tee+tet;
                //console.log(tee);
            }

            list.innerHTML =tee;
            var afterclick = document.getElementsByName('afterc');
            //console.log(afterclick[0].innerHTML);
            //������������ԭ��jsд�����dom�ڵ㣬�������ã������������innerHTML��
            // for(var i=0;i<ren;i++){
            //     var tj = document.createElement('a');
            //     tj.href="#page-3";
            //     // tj.data-role="button";
            //     tj.class="pop-pttt";
            //     tj.innerText='��������'+i;
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
//�˴��ܻ��ǣ��õ�����֮���html֮�󣬽�ȡ�ַ�����
// Ȼ�󽫽�ȡ֮���������Ϊajax�Ĳ������ͳ�ȥ
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
//��ȡ�����ajax
var xhr2 = creatXHR();
var rt2 ='';
var exmpape =0;
xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 0) {
        //console.log('����δ��ʼ������û�е��� open()��');
    }
    if (xhr2.readyState === 1) {
       // console.log('�����Ѿ����������ǻ�û�з��ͣ���û�е��� send()��');
    }
    if (xhr2.readyState === 2) {
       // console.log('�����ѷ��ͣ����ڴ����У�ͨ�����ڿ��Դ���Ӧ�л�ȡ����ͷ����');
    }
    if (xhr2.readyState === 3) {
        //console.log('�����ڴ����У�ͨ����Ӧ�����в������ݿ����ˣ����Ƿ�������û�������Ӧ�����ɡ�');
    }
    if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
            var rtxt2 = JSON.parse(xhr2.responseText);

            rt2 = rtxt2.data;
            exmpape=rt2[0].exampaper_id;
            console.log(rt2);
            //console.log(exmpape);
            updown(0);//�������1/30����
            timetest();//������ʱ������ʵ��Ӧ��������
        }
    }
}
function send2() {
    //console.log(ggn);
    var url = '/JuniorHearing2/exercise/selectExampaperByExampaper_id/'+ggn;
    xhr2.open('get',url, true);
    xhr2.send();
}
//Ҫдһ����һ�⣬��һ��ķ���
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
    }else{//��д���޻ᱨ��
        i_i=0;
    }

}
down.onclick = function (){
    ty(i_i);//�Աȱ����
    i_i++;
    if(i_i<=29){
        updown(i_i);
    }else{
        i_i=29;
    }
}
//var txt = arr[1].exercise_explain;
//ǰ25��ѡ�������������������ʾ  
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
//���5����������������������ʾ
function updowml() {

}
//�������ֲ���js
var imc = document.getElementsByName('lblank');
//console.log(imc[1]);
function lb(index) {  //������ʾ�ĺ���
    for (var i = 0; i < imc.length; i++) {    //�������е�ͼƬ������ʾ,�þ��Զ�λ���ŵ�һ��
        imc[i].style.filter = 'opacity(0)';
    }
    for (var i = 0; i < 21; i++) {
        (function (i) {
            //console.log(i);
            setTimeout('as(' + i + ',' + index + ')', i * 30);  //��ʾִ�к���
            //console.log(index);
        })(i);
    }
}
function as(i, abc) {  //����ǿ��Ƶ����ĺ���
    //console.log(abc);
    //console.log(imc[abc]);
    imc[abc].style.filter = 'opacity(' + i * 0.05 + ')';
    //console.log(index);
}
lb(0); //�ֲ���ʼ��
var count = 1; //�ȶ���һ������
function contr() {  //�����ֲ��ĺ���
    if (count == imc.length) {//�����ֲ������һ��ʱ�����·��ص�һ�š�
        count = 0;
    }
    lb(count);    //������ʾ�ĵڼ���,���ؿ�����ʾ�ĺ�����
    count++;
    // alert(123);
}
setInterval(contr, 3000); //��ʱ�����˺�����ÿ��һ��ʱ�����һ��contr����
//Ӧ���и��õĽ��������ʶ�𵽵��Ǵ������Ǹ���ť
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
//�����ǵ���ʱ��js\
function left(i){
    // if(i<0){  //��һ��if  ��Ϊ���������ǵ���ʱ������Ǹ�����Ҫ���������
       // i= -i;
        if(i<10){ // �ڶ���if  ����λ����0.
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
var timeleft = 6;//����Ϊ30����
function timetest(){
    if(timeleft>=0){
        var m = parseInt(timeleft/60%60);   //Ҳ��ȡ������������Сʱ��Ȼ��ʣ�����ӣ�
        var s = parseInt(timeleft%60);
        m = left(m);
        s = left(s);
        time_l.innerHTML = m+":"+s+"";
        timeleft=timeleft-1;
        var t = setTimeout(timetest,1000);
    }
    if(timeleft===5*60){
        alert('���Ի���5���ӽ���!');
    }
    if (timeleft===-1){
        alert('ʱ�����');
        timeleft=-3;
        time_l.innerHTML = '';
        jsfs();
    }
    if (timeleft===-5){
        time_l.innerHTML = '';
    }
}
//����д����ϵͳ��js
var onl = document.getElementsByName('onlyselect');
//�Ƚ���׼�𰸷ŵ�һ��������
//����Ⱥ�̨����֮���ٵ���
// var bzda = [];
// baza.length = 30;
// for(var i=0;i<30;i++){
//     bzda[i]=rt2[i].exercise_answer;
// }
var bzda = ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b']
//���ݴ�
var ansow =[];
ansow.length = 30;
//�����ݴ�
var cts =0;
var fs = 0;
var fs1_5 = 0;
var fs6_15 = 0;
var fs16_20 = 0;
var fs21_25 = 0;
var fs26_30 = 0;
//���ݴ�
var ans = '';
function ty(b) {
    //���forѭ����ץȡ�𰸵�
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
    //���û�д�Ĵ𰸴浽������
    ansow[i_i]=ans;
}
//���Ǽ�������Ĳ���
function jsfs() {
    timetest(1);
    //�����ܷ�
    for(var i=0;i<30;i++){
        if(ansow[i]===bzda[i]){
            fs=fs+1;
        }
    }
    cts=30-fs;
    //����1-5
    for(var i=0;i<5;i++){
        if(ansow[i]===bzda[i]){
            fs1_5=fs1_5+1;
        }
    }
    console.log(fs1_5);
    //����6-15
    for(var i=5;i<15;i++){
        if(ansow[i]===bzda[i]){
            fs6_15=fs6_15+1;
        }
    }
    console.log(fs6_15);
    //����16-20
    for(var i=15;i<20;i++){
        if(ansow[i]===bzda[i]){
            fs16_20=fs16_20+1;
        }
    }
    console.log(fs16_20);
    //����21-25
    for(var i=20;i<25;i++){
        if(ansow[i]===bzda[i]){
            fs21_25=fs21_25+1;
        }
    }
    console.log(fs21_25);
    //����26-30
    for(var i=25;i<30;i++){
        if(ansow[i]===bzda[i]){
            fs26_30=fs26_30+1;
        }
    }
    console.log(fs26_30);
    //�������֮����ֹһ�в�������ֹͣ��ʱ
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
    //clearTimeout(t);��ʱû���뵽�ȽϺõķ��������
    send4();
    timeleft=-5;
    alert('����ɹ�!');
}
var jiaojuan = document.getElementById('sumt');
jiaojuan.onclick = function () {
    jsfs();
}
//�������ղص�ajax
var shouc = document.getElementById('pg2-2');
var xhr3 = creatXHR();
//��������ʵӦ��д�㶫������֤�Ƿ��ղسɹ���
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
    alert('�ղسɹ�!');
}
//����ɹ�֮��������
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
