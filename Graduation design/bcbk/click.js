function click() {
    //模式判断，falg为true 经典模式

    if (flag==false) {
        $(".box").off("click","div:first");
        $(".box").on("click", "div", function () { //接机模式
            //点击时判断黑块颜色是否改变
            if ($(this).hasClass("hk")) {
                score += 10;
                $("span").text(score);
            }
            //黑块点击后改变背景色,清除hk类
            $(this).removeClass("hk").css("background", "pink");
            $(this).off("click");
            speedAdd()
        })
    }else {
        $(".box").off("click","div:first");
        $(".box").on("click","div",function () { //经典模式
            if ($(this).hasClass("hk")) {
                score += 10;
                $("span").text(score);
            }
            $(this).removeClass("hk").css("background", "pink");
            $(this).off("click");
            creatDiv();
            var wz=document.querySelectorAll(".wz");
            for (let i=0;i<wz.length;i++){
                wz[i].style.top=wz[i].offsetTop+parseInt($("p").outerHeight())+"px";
            }
        });
    }
}
