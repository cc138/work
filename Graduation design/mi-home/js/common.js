// 显示导航栏
$(function () {
    //导航栏下滑
    $(".head_nav li").hover(function () {
        $(this).children(".xmsj").stop().slideToggle();
    });
    //下载APP下滑
    $(".xz").hover(function () {
       $(this). children(".xiaZai").stop().slideToggle();
    });

//    固定位置app下载
    $(".shouj").hover(function () {
        $(this).children(".saoYS").stop().fadeToggle();
    });
    $(".fixed li").hover(function () {
        $(this).find(".img img").toggleClass("show")
    });
    $(".search input").focus(function () {
        $(this).siblings(".hot_tip").css("display","none");
    }).blur(function () {
        $(this).siblings(".hot_tip").css("display","block");
    })
//   logo翻转
    $(".logo").hover(function () {
        $(this).find("h1::before").toggleClass("mi_logo")
    })
});