window.onload=function () {
    clear()

    //自定义添加删除按钮索引
    var flag=null;

    $(function () {
        clear();
        allSum();
        var reg = /^[1-9]\d*|0$/;
// 选择框
        $(".checkedAll").change(function () {
            $(".checkedList").prop("checked", $(".checkedAll").prop("checked"));
            checkedSum();
            allSum();
            tip()
        });
        $(".checkedList").change(function () {
            if ($(".checkedList:checked").prop("checked", true).length == $(".checkedList").length) {
                $(".checkedAll").prop("checked", true)
            } else {
                $(".checkedAll").prop("checked", false);
            }
            checkedSum();
            allSum();
            tip()
        });

//    加减数量
        $(".jia").click(function () {
            jia(this);
            checkedSum();
            allSum()
        });

        $(".jian").click(function () {
            jian(this);
            checkedSum();
            allSum()
        });

        //文本框失去焦点事件
        $(".number .num").change(function () {
            if (!reg.test($(this).val()) || $(this).val() == 0) {
                alert("请输入正确的数字")
            } else {
                $(this).val(parseInt($(this).val()));
                var n = $(this).val();
                var p = parseInt($(this).parent().siblings(".price").text());
                var price = n * p;

                //    计算价格
                $(this).parent().siblings(".subtotal").text(price + "元");
                checkedSum();
                allSum()
            }
        });

        /*确认框*/
        var del_index=0;
        $(".del").click(function () {

            var that=this;
            del_index=$(this).prop("data_index");
            var H=document.body.offsetHeight;
            $(".del_confirm").slideDown(200).css("top","32%");
            $(".mask").css("height",H).fadeIn(500);


            $(".determine").click(function () {
                $(".cancel,.del_confirm>a").click();
                // $(".del").eq(del_index).parents("li").remove();
                $(that).parents("li").remove();
                checkedSum();
                allSum();
                tip();
                clear();
            })

        });

        $(".cancel,.del_confirm>a").click(function () {
            $(".del_confirm").slideUp(200).css("top","-50%");
            $(".mask").fadeOut(1000);
            // flag=false;
        });

        $(".tuijian_list li").hover(function () {
            $(this).find(".jiaG").toggle()
        });





    });

//减少数量
    function jian(obj) {
        var n = $(obj).parents().siblings(".num").val();
        var p = $(obj).parents().siblings(".price").text();
        if (n == 1) {
            return false;
        }
        //截取数字
        p = parseInt(p);
        n--;
        $(obj).parents().siblings(".num").val(n);
//    计算数量
        var price = n * p;

        //    计算价格
        $(obj).parents().siblings(".subtotal").text(price + "元");
    }

//增加数量
    function jia(obj) {
        var n = $(obj).parents().siblings(".num").val();
        var p = $(obj).parents().siblings(".price").text();
        //截取数字
        p = parseInt(p);
        n++;
        $(obj).parents().siblings(".num").val(n);
//    计算数量
        var price = n * p;
//    计算价格
        $(obj).parents().siblings(".subtotal").text(price + "元");
    }


//选中的价格，数量
    function checkedSum() {
        var num = 0;
        var money = 0;
        $(".checkedList:checked").each(function () {
            num += parseInt($(this).siblings(".number").find(".num").val());
            money += parseInt($(this).siblings(".subtotal").text())
        });
        $(".jieSuan .sum").text(num);
        $(".jieSuan .combined").text(money)
    }

//所有的数量
    function allSum() {
        var num = 0;
        $(".checkedList").each(function () {
            num += parseInt($(this).siblings(".number").find(".num").val());
        });
        $(".jieSuan .totalSum").text(num)
    }

//结算tip
    function tip() {
        if ($(".checkedList:checked").length != 0) {
            $(".jieSuan_btn").css({
                backgroundColor: "#FF6700",
                color: "#fff"
            }).parent().siblings(".tip").css("display", "none")
        } else {
            $(".jieSuan_btn").removeAttr("style").parent().siblings(".tip").css("display", "block")
        }
    }
//判断商品有没有清空
//有则显示空购物车
    function clear() {
        if($(".second").length===0){
            $(".shop").css("display","none").siblings(".jieSuan").css("display","none").siblings(".spaceCats").css("display","block");
            $(".tuiJian p").text("为您推荐")
        }
    }
// alert(document.documentElement.offsetHeight)
// document.getElementsByClassName('mask')[0].style.height = document.documentElement.offsetHeight+ 'px'



}