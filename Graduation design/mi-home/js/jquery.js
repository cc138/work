// var focus=document.querySelector(".focus");//获取轮播区域盒子
// var ulNode=document.querySelector(".ul");//获取轮播ul节点
// var btn_l=document.querySelector(".btn_l");//获取左边按钮
// var btn_r=document.querySelector(".btn_r");//获取右边按钮
// var circle=document.querySelector(".circle");//获取圆圈区节点
// var curIndex=0;
// var num=0;

// $(function () {
//     var W=$(".ul li img")[0].offsetWidth;
//     console.log(W)
//     //克隆节点
//     $(".ul li").eq(0).clone().appendTo($(".ul"));
//     // 创建小圆圈
//     for (i=0;i<$(".ul li").length-1;i++){
//         $("<i></i>").appendTo($(".circle"));
//     }
//     $(".circle i").on("click",$('.circle'),function () {
//         var that=this;
//         // console.log(-W*$(that).index())
//         $(".ul").offset({
//             left:-W*$(that).index()+338.5
//         });
//     $(that).addClass("current").siblings().removeClass("current")
//     });
//     // $(".btn_r").click(function () {
//     //     $(".ul").fadeIn(1000,function () {
//     //         $(this).offset({
//     //             left:$(this).offset().left-W
//     //         })
//     //     })
//     // })
//
//
//
//
// });

// focus.addEventListener("mouseenter",function () {
//     clearInterval(timer);
//     timer=null;
// });
// focus.addEventListener("mouseleave",function () {
//     timer=setInterval(function () {
//         btn_r.click();
//     },3000)
// });
//
//
// //克隆节点
// // var cloneNode=ulNode.children[0].cloneNode(true);
// // ulNode.appendChild(cloneNode);
// //动态创建小圆圈
// //遍历ul孩子 li
// for (i=0;i<ulNode.children.length-1;i++){
//     var iNode=document.createElement("i");
//     circle.appendChild(iNode);
// }
// //为每个i创建点击事件
// // console.log(circle.children)
// var iNodes=circle.children;
// for (i=0;i<iNodes.length;i++){
//     iNodes[i].setAttribute("data_index",i);
//     iNodes[0].className="current";
//     iNodes[i].setAttribute("data_index",i);
//
//     (function (index) {
//         var  onC=function(){
//             //清除current类
//             for (j=0;j<iNodes.length;j++){
//                 iNodes[j].className="";
//             }
//             var index=this.getAttribute("data_index");
//             curIndex=index;
//             num=index;
//             ulNode.style.left=-index*1226+"px";
//             // Action(ulNode,(-num*focus.offsetWidth));
//             // animation(ulNode,5,(-num*focus.offsetWidth),20)
//             //添加current类
//             this.className="current";
//             //设置自定义属性
//             // console.log(num)
//         };
//
//         iNodes[index].addEventListener("click",onC)
//         //     //清除current类
//         //     for (j=0;j<iNodes.length;j++){
//         //         iNodes[j].className="";
//         //     }
//         //     var index=this.getAttribute("data_index");
//         //     curIndex=index;
//         //     num=index;
//         //     ulNode.style.left=-index*1226+"px";
//         //     // Action(ulNode,(-num*focus.offsetWidth));
//         //     // animation(ulNode,5,(-num*focus.offsetWidth),20)
//         //     //添加current类
//         //     this.className="current";
//         //     //设置自定义属性
//         //     // console.log(num)
//         // };
//
//         // index++;
//     })(i);
//
//
// }
// // console.log(num);
// var flag=true;//节流阀
//
// //给两边按钮添加点击事件
// btn_r.onclick=function () {
//     if (flag){
//         flag=false;
//         for (j=0;j<ulNode.children.length;j++){
//             // ulNode.children[j].
//             // ulNode.children[j].removeEventListener("click",onC)
//         }
//         // curIndex=parseInt(num);
//         if (num==ulNode.children.length-1){
//             ulNode.style.left=0;
//             num=0;
//         }
//         num++;
//         Action(ulNode,-num*focus.offsetWidth,function () {
//             flag=true;
//
//         });
//         curIndex++;
//         if (curIndex==ulNode.children.length-1){
//             curIndex=0;
//         }
//         for (i=0;i<iNodes.length;i++){
//             iNodes[i].className="";
//         }
//         iNodes[curIndex].className="current";
//     }
// };
//
//
//
// //左边按钮
// btn_l.onclick=function () {
//     if (flag){
//         flag=false;
//         // curIndex=parseInt(num);
//         if (num==0){
//             num=ulNode.children.length-1;
//             ulNode.style.left=-num*focus.offsetWidth+"px";
//         }
//         num--;
//         Action(ulNode,-num*focus.offsetWidth,function () {
//             flag=true;
//         });
//         curIndex--;
//         if (curIndex<0){
//             curIndex=circle.children.length-1;
//         }
//         for (i=0;i<iNodes.length;i++){
//             iNodes[i].className="";
//         }
//         iNodes[curIndex].className="current";
//     }
// };
//
// var timer=setInterval(function () {
//     btn_r.click();
// },3000);
//
//
//
//
//
//




(function ($) {
    function Slider(options) {
        this.wrapper = options.wrapper;
        this.timer = null;
        this.nowIndex = 0;
        this.itemWidth = parseInt(this.wrapper.css('width'));
        this.itemNum = imgs.length;
        this.locked = false;
        this.imgs = options;

        this.init();
    }
    Slider.prototype.init = function () {
        this.createDom();
        this.bindEvent();
        this.automove();
    },
        Slider.prototype.createDom = function () {
            var imgBox = $('<ul class="img-box"></ul>');
            var imgLi = '';
            var orderListStr = '';
            for (var i = 0; i < this.itemNum; i++) {
                imgLi += '<li><a href="javascript:void(0)">\
                        <img src="'+ this.imgs[i] + '" alt="">\
                    </a></li>';
                orderListStr += '<li></li>'
            }
            imgLi += '<li><a href="javascript:void(0)">\
                        <img src="'+ this.imgs[0] + '" alt="">\
                    </a></li>';

            var btnDiv = '<div class="btn">\
                            <a class="prev"><span></span></a>\
                            <a class="next"><span></span></a>\
                        </div>';
            var orderBox = $('<div class="order"></div>');
            var orderUl = $('<ul></ul>');
            $(this.wrapper).append(imgBox.html(imgLi))
                .append($(btnDiv))
                .append(orderBox.append(orderUl.html(orderListStr)));
            $('#slider .order li').eq(0).addClass('active');
        };
    /**
     * 绑定事件
     */
    Slider.prototype.bindEvent = function() {
        var self = this;
        $('#slider .order li').add('.next').add('.prev').on('click', function () {
            var className = $(this).attr('class')
            if (className == 'prev') {
                self.move('prev');
            } else if (className == 'next') {
                self.move('next');
            } else {
                self.move($(this).index())
            }
        })
        $('#slider')
            .on('mouseenter', function () {
                $('#slider .btn').show();
                clearTimeout(self.timer);
            })
            .on('mouseleave', function () {
                $('#slider .btn').hide();
                self.automove();
            })
    }
    /**
     * 定时调用移动函数，轮播下一张图片
     */
    Slider.prototype.automove = function() {
        clearInterval(this.timer)
        var self = this;
        this.timer = setTimeout(function () {
            self.move('next');
        }, 2000);
    }
    /**
     * 根据方向，更改index，更改后的Index表示我想到哪一张去
     * @param {*} dir 方向
     */
    Slider.prototype.move = function(dir) {
        if (this.locked) {
            return;
        }
        this.locked = true;
        if (dir == 'prev' || dir == 'next') {
            if (dir == 'next') {
                if (this.nowIndex == this.itemNum) {
                    this.nowIndex = 0;
                    $('#slider .img-box').css('left', 0);
                }
                this.nowIndex++;
            } else {
                if (this.nowIndex == 0) {
                    this.nowIndex = this.itemNum;
                    $('#slider .img-box').css('left', -(this.itemNum * this.itemWidth) + 'px');
                }
                this.nowIndex--;
            }
        } else {
            this.nowIndex = dir;
        }
        //先改变索引样式，再滑动
        this.changeStyle();
        this.slider();
    }
    /**
     * 移动到nowindex指向元素的位置
     */
    Slider.prototype.slider = function() {
        var self = this;
        //这个animate必须写成对象形式
        $('#slider .img-box').animate({ left: -(self.nowIndex * self.itemWidth) + 'px' }, function () {
            self.automove();
            self.locked = false;
        })
    }
    /**
     * 修改索引的样式
     */
    Slider.prototype.changeStyle = function() {
        $('#slider .order .active').removeClass('active');
        if (this.nowIndex == this.itemNum) {    //处理多出来一个轮播页的关键！！！
            //这个时候是展示的多出来的那一张，其实是第0张
            $('#slider .order li').eq(0).addClass('active');
        } else {
            $('#slider .order li').eq(this.nowIndex).addClass('active');
        }
    }

    //添加自定义jq插件
    $.fn.extend({
        sliderImg: function (options) {
            options.wrapper = this || $('body');
            new Slider(options);
        }
    })
})(jQuery);
