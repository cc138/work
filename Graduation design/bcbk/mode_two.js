function modelTwo(callback) {//经典模式
      flag=true;
    if (timer){
        clearInterval(timer);
    }
    for (let i=0;i<6;i++){
        $("<div class='hk'></div>").css({
            left:Random()+"px",
            top:$("p")[0].offsetHeight*i+1.5,
            // transition: "all "+10000-parseInt(score/100)+"ms"
        }).addClass("wz").appendTo($(".box"));
    }
    $("button").prop("disabled","true");
    click();
}



