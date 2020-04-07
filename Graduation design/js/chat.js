$(function () {
    //左边li
    $(".nav_left li").click(function () {
        $(this).find("img:first").css("display","none").siblings("").css("display","block");
        $(this).siblings("li").find("img:first").css("display","block").siblings("").css("display","none");
    });
    //更多栏
    $(".more").click(function () {
        $(".more_box").toggle();
    });
    //中间li
    $(".friends").on("click","li",function () {
        $(this).addClass("current").siblings().removeClass("current");
    }).mouseenter(function () {
        $(this).addClass("selected")
    }).mouseleave(function () {
        $(this).removeClass("selected")
    });
    //× 退出，返回首页
    $(".quit").click(function () {
        window.location.href="../index.html"
    });

    //暂时无法解决textarea框  回车发送不提示的问题

    //textarea聚焦,键盘监听
    $("#words").focus(function () {
        $(this).css("backgroundColor","#fff").parent().css("backgroundColor","#fff")
    }).blur(function () {
        $(this).css("backgroundColor","#F5F5F5").parent().css("backgroundColor","#F5F5F5")
    });
// .keyup(function (e) {
//         if (e.keyCode==13){
//             if ($("#words").val()!=""){
//                 alert(1)
//             }
//         }
//     })
    //表情框
    $("body").on("click",".emoji",function (e) {
        //阻止冒泡
        e.stopPropagation();
        $(".emoji_detail").css("display","block")
    });
    $("body").click(function (e) {
            $(".emoji_detail").css("display","none")
    });
    //emoji处理
    $(".emoji_detail li").click(function () {
        posi={};
        var text=$("#words").val();
        posi.Class=$(this).attr("class");
        posi.Title=$(this).attr("title");
        posi.Position=window.getComputedStyle($(this)[0],"::after");
        posi_arr.push(posi);
        var title="["+$(this)[0].title+"]";
        text+=title;
        $("#words").val(text);
        //点击表情后隐藏表情栏
           setTimeout(hide)
    });
    function hide() {
        $("body").click();
    }
});


//