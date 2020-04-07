var timer=null;
var timer2=null;
var score=0;
var speedLevel=0;
//开始游戏函数,经典模式
function modelOne(callback) {//接机模式
    flag=false;
    if (timer){
        clearInterval(timer);
    }
    //游戏开始先创建一个黑块
    creatDiv();
    timer= setInterval(move,10);
    $("button").prop("disabled","true");
    click();
}

//黑块移动
function move() {
    var wz=document.querySelectorAll(".wz");
    for (let i=0;i<wz.length;i++){
        wz[i].style.top=wz[i].offsetTop+1+"px";
    }
    //判断黑块距离，为0时再创建一个
    if (parseInt($(".wz:last").css("top"))>=0){//大于0时会有空隙
        creatDiv();
    }

    //判断最底部

    if (parseInt($(".wz:first").css("top"))>parseInt($(".box")[0].offsetHeight)){
        if ($(".wz:first").hasClass("hk")){
            alert("游戏结束,您的分数为："+score);
            start(cover());
        }else {
            $(".wz:first").remove();
        }
    }
}
// $(".box").on("click","div",function () { //经典模式
//     creatDiv();
//     var wz=document.querySelectorAll(".wz");
//     for (let i=0;i<wz.length;i++){
//         wz[i].style.top=wz[i].offsetTop+83+"px";
//     }
// });


