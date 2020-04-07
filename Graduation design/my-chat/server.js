// 引入express
var express = require('express');
// 获得express的实例
var app = express();
//引入fs模块
var fs=require("fs");
// 引入http模块
var http = require('http');
// 用http模块创建一个服务并把express的实例挂载上去
var server = http.Server(app);
// 引入socket.io并立即实例化，把server挂载上去
var io = require('socket.io')(server);
var server = server.listen(3000, function () {
    console.log('服务端启动成功！端口3000');
});
var onlieCount=0;
var onlineList = [];
// 新用户连接进来时
io.on('connection', function (socket) {
    onlieCount++;
    console.log('有一个人进来了,'+'现在有'+onlieCount+'人在线！');
    // 当有用户断开时
    socket.on('disconnect', function () {
        onlieCount--;
        //用户下线时删除
        for (let i=0;i<onlineList.length;i++){
            for (key in onlineList[i]){
                if (key=="id"){
                    if (onlineList[i][key]==socket.id){
                        onlineList.splice(i,1);
                    }
                }
            }
        }
        console.log(socket.id+'离开了,'+'现在有'+onlieCount+'人在线！');
        //用户离开时再把用户列表广播道客户端
            //将用户信息广播到所有客户端
            io.emit("outline",onlineList);
    });
   //用户登陆时接受用户信息
    socket.on("user_info",function (info) {
        //将用户信息广播到所有客户端
        onlineList.push(info);
        io.emit("online",onlineList);
    });


    //接受客户端信息   同时替换表情
    socket.on("message",function (msg) {
        //接受客户端传来的emoji数组
        var posi=msg.posi;//[]
        var reg=/(\[([\u4e00-\u9fa5\w]+)\])+?/;//不能用全局模式，只需匹配一次即可
        for (let i=0;i<posi.length;i++) {
            var c = posi[i].Class;
            msg.value = msg.value.replace(reg, "<span style='vertical-align: sub' class='" + c + "' ></span>", 1);
        }
        io.emit("msg",msg)
    })
});