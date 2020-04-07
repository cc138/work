window.onload=function () {

    var focus=document.querySelector(".focus");//获取轮播区域盒子
    var ulNode=document.querySelector(".ul");//获取轮播ul节点
    var btn_l=document.querySelector(".btn_l");//获取左边按钮
    var btn_r=document.querySelector(".btn_r");//获取右边按钮
    var circle=document.querySelector(".circle");//获取圆圈区节点
    var curIndex=0;
    var num=0;


    focus.addEventListener("mouseenter",function () {
        clearInterval(timer);
        timer=null;
    });
    focus.addEventListener("mouseleave",function () {
        timer=setInterval(function () {
            btn_r.click();
        },3000)
    });


//克隆节点
    var cloneNode=ulNode.children[0].cloneNode(true);
    ulNode.appendChild(cloneNode);
//动态创建小圆圈
//遍历ul孩子 li
    for (i=0;i<ulNode.children.length-1;i++){
        var iNode=document.createElement("i");
        circle.appendChild(iNode);
    }
//为每个i创建点击事件
// console.log(circle.children)
    var iNodes=circle.children;
    for (i=0;i<iNodes.length;i++){
        iNodes[i].setAttribute("data_index",i);
        iNodes[0].className="current";
        iNodes[i].setAttribute("data_index",i);

        (function (index) {
            var  onC=function(){
                //清除current类
                for (j=0;j<iNodes.length;j++){
                    iNodes[j].className="";
                }
                var index=this.getAttribute("data_index");
                curIndex=index;
                num=index;
                ulNode.style.left=-index*1226+"px";
                // Action(ulNode,(-num*focus.offsetWidth));
                // animation(ulNode,5,(-num*focus.offsetWidth),20)
                //添加current类
                this.className="current";
                //设置自定义属性
                // console.log(num)
            };

            iNodes[index].addEventListener("click",onC)
            //     //清除current类
            //     for (j=0;j<iNodes.length;j++){
            //         iNodes[j].className="";
            //     }
            //     var index=this.getAttribute("data_index");
            //     curIndex=index;
            //     num=index;
            //     ulNode.style.left=-index*1226+"px";
            //     // Action(ulNode,(-num*focus.offsetWidth));
            //     // animation(ulNode,5,(-num*focus.offsetWidth),20)
            //     //添加current类
            //     this.className="current";
            //     //设置自定义属性
            //     // console.log(num)
            // };

            // index++;
        })(i);


    }
// console.log(num);
    var flag=true;//节流阀

//给两边按钮添加点击事件
    btn_r.onclick=function () {
        if (flag){
            flag=false;
            for (j=0;j<ulNode.children.length;j++){
                // ulNode.children[j].
                // ulNode.children[j].removeEventListener("click",onC)
            }
            // curIndex=parseInt(num);
            if (num==ulNode.children.length-1){
                ulNode.style.left=0;
                num=0;
            }
            num++;
            Action(ulNode,-num*focus.offsetWidth,function () {
                flag=true;

            });
            curIndex++;
            if (curIndex==ulNode.children.length-1){
                curIndex=0;
            }
            for (i=0;i<iNodes.length;i++){
                iNodes[i].className="";
            }
            iNodes[curIndex].className="current";
        }
    };



//左边按钮
    btn_l.onclick=function () {
        if (flag){
            flag=false;
            // curIndex=parseInt(num);
            if (num==0){
                num=ulNode.children.length-1;
                ulNode.style.left=-num*focus.offsetWidth+"px";
            }
            num--;
            Action(ulNode,-num*focus.offsetWidth,function () {
                flag=true;
            });
            curIndex--;
            if (curIndex<0){
                curIndex=circle.children.length-1;
            }
            for (i=0;i<iNodes.length;i++){
                iNodes[i].className="";
            }
            iNodes[curIndex].className="current";
        }
    };

    var timer=setInterval(function () {
        btn_r.click();
    },3000);

    $(function () {
        //返回顶部
        $(window).scroll(function () {
            // console.log($(document).scrollTop())
            if ($(document).scrollTop()>=$(".msTime p:last").offset().top){
                $(".reTop").fadeIn();
            }else {
                $(".reTop").fadeOut()
            }
        });
//经过显示商品
        $(".list>ul>li").hover(function () {
            $(this).find("div.small_shop").toggle();
        });
        //删除广告横幅多余的
        var adNode=document.querySelectorAll(".Ad_banner");
        for (let i=0;i<adNode.length;i++){
            // console.log($(adNode[i].children));
            $(adNode[i].children[i]).siblings().remove();
        }
    });


    //闪购区按钮
    var count=1;
    $(".shanG .icon_r").click(function () {
        if (count>=($(".ms_list li").length/4)){
            return;
        }else {
            $(".ms_list>ul").animate({marginLeft:"-"+count*991});
            count++;
        }
    });
    $(".shanG .icon_l").click(function () {
        if (count<=1){
            return;
        }else {
            var marLeft=parseInt($(".ms_list>ul").css("marginLeft"));
            $(".ms_list>ul").animate({marginLeft:marLeft+991});
            count--;
        }
    });

}