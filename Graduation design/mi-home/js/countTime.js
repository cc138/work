var msTime = document.querySelector(".msTime");
var zdTime = msTime.querySelector(".red");
var hour = msTime.querySelector(".hour");
var minute = msTime.querySelector(".minute");
var second = msTime.querySelector(".second");

countTime();
function countTime() {
    //获取现在的时间戳
    var nowTime1 = +new Date();
    // 化为标准时间
    var nowTime2 = new Date(nowTime1);
    var Y = nowTime2.getFullYear();
    var M = nowTime2.getMonth() + 1;
    var D = nowTime2.getDate();
    var hours = nowTime2.getHours();
    // 转换成标准时间格式
    var time = Y + "-" + M + "-" + D + " " + (hours + 1) + ":00:00";
    //转换为时间戳
    var inputTime = +new  Date(time);

    var seconds = parseInt((inputTime - nowTime1) / 1000);
    var s = parseInt(seconds % 60);
    second.innerHTML = s < 10 ? "0" + s : s;
    var m = parseInt(seconds / 60 % 60);
    minute.innerHTML = m < 10 ? "0" + m : m;
    var h = parseInt(seconds / 3660 % 24);
    hour.innerHTML = h < 10 ? "0" + h : h;
    zdTime.innerHTML = (hours)+":00";
}
setInterval(countTime,1000);
