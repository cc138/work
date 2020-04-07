//显示隐藏菜单栏
$(function () {
    $(".icon_menu").click(function () {
        $(this).hide().siblings(".icon_out").show().parents().siblings(".menu_list").css({
            display:"block",
            backgroundColor:"rgba(0,0,0,.6)"
        })
    });
    $(".icon_out").click(function () {
        $(this).hide().siblings(".icon_menu").show().parents().siblings(".menu_list").css({
            display:"none",
            backgroundColor:"rgba(66,66,66,0)"
        })
    });
    //鼠标移动添加旋转类、
    $(".menu_list li").hover(function () {
        $(this).toggleClass("rotate")
    }).click(function () {
        $(this).addClass("current").siblings().removeClass("current")
    })
});
