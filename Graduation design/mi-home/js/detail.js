window.onload=function () {
    // var price=parseInt($(".shop_disc p.p3").text());
    // $(".zongji span").text(price);
    $(function () {
        $(".choose .param>li").eq(0).addClass("selected");
        $(".choose .color>li").eq(0).addClass("selected");
        getParam();
        $(".choose .clear>li").click(function () {
            $(this).addClass("selected").siblings("li").removeClass("selected")
            getParam();
        });
        $(window).scroll(function () {
            // console.log($(document).scrollTop())
            if ($(document).scrollTop()>=205){
                $(".product").css({
                    position:"fixed",
                    top:0,
                    left:0,
                    right:0,
                    zIndex:99
                });
                $(".photo").removeAttr("style").css({
                    position: "fixed",
                    top:97,
                });
                //520
                if ($(window).scrollTop()>=520){
                    $(".photo").removeAttr("style").css({
                        marginTop:476
                    })
                }
            }else {
                $(".product").removeAttr("style");
                $(".photo").removeAttr("style");
            }
        });

        function getParam() {
            //获取图片地址
            var url=$(".img img")[0].src;
            //选择的商品价格总计，属性
            //获取选中的属性
            var price=parseInt($(".param li.selected span.price").text());
            var ram=$("ul.param li.selected span.ram").text();
            var color=$("ul.color li.selected span.color").text();
            var name=$(".shop_disc h1").text();
            //描述
            var des=name+" "+ram+" "+color;

            //给总计部分赋值
            $(".calc div.fl").text(des);
            $(".calc div.fr").text(price+"元");
            $(".zongji span").text(price);
            $(".shop_disc p.p3").text(price+"元");
            $("#goodsDetails").attr({
                "data-id":id,
                "data-name":name,
                "data-url":url,
                "data-price":price,
                "data-des":des,
            })
        }
    });
};