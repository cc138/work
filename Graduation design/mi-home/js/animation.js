function Action(obj,width,callback) {
    // console.log(width)
    var step=50;
    step = obj.offsetLeft > width ? -step : step;

    if (obj.timer){
         clearInterval(obj.timer);
     }
     obj.timer=setInterval(function () {

         // console.log(obj.offsetLeft)
         // var ul_x=Math.abs(parseInt(obj.style.left));
         if (Math.abs(obj.offsetLeft - width) <= Math.abs(step)){
             obj.style.left=width-step+"px";
             clearInterval(obj.timer);
             if (callback){
                 callback();
             }
         }
             obj.style.left=obj.offsetLeft+step+"px";
     },50)
}
// function Action(obj,target,callback) {
//     clearInterval(obj.timer);
//     obj.timer= setInterval(function () {
//         //缓动动画
//         //每次移动距离=（目标值-现在位置）÷10
//         var  step=Math.ceil((target-obj.offsetLeft)/3);
//         step > 0?step=Math.ceil((target-obj.offsetLeft)/3):step=Math.floor((target-obj.offsetLeft)/10)
//         // if (step>=0){
//         //      step=Math.ceil((target-obj.offsetLeft)/10);
//         // }else if (step<0){
//         //      step=Math.floor((target-obj.offsetLeft)/10)
//         // }
//
//         if (obj.offsetLeft==target){
//             clearInterval(obj.timer);
//             //回调函数写在清除定时器后面
//             if (callback){
//                 callback();
//             }
//             //callback&&callback()这样也可以
//         }
//         obj.style.left=obj.offsetLeft+step+"px";
//
//     },50)
// }

