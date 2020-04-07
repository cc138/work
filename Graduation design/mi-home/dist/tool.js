/**
 * 工具
 *   两种方式 
 *      1） 面向对象 
 *      2） prototype
 */

/*********************************************************
 *  和日期有关的工具类                                                                     *
 *********************************************************/
Date.prototype.formatDate = function(split01, split02, isTime) {
	//	console.dir(this); // this 指代的是函数的调用者
	// this 对象 日期对象
	var year = this.getFullYear();
	var month = this.getMonth() + 1; // 0-11
	var day = this.getDate();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;

	if(!isTime) {
		var hour = this.getHours();
		var minute = this.getMinutes();
		var second = this.getSeconds();
		hour = hour < 10 ? "0" + hour : hour;
		minute = minute < 10 ? "0" + minute : minute;
		second = second < 10 ? "0" + second : second;
		return year + split01 + month + split01 + day + " " + hour + split02 + minute + split02 + second;
	}

	return year + split01 + month + split01 + day;

}

// 静态挂在的方式类似于  Math 这种方式
Date.timeInterval = function(date01, date02) {
	//1 将日期换算成毫秒值 
	var time01 = date01.getTime();
	var time02 = date02.getTime();
	// 2 计算两者相差多少毫秒
	var time = Math.abs(time01 - time02); // 间隔的毫秒 
	// 间隔的秒  
	var second = time / 1000; // 一共有多少秒  有小数
	var day = parseInt(second / 60 / 60 / 24); // 相差多少天
	var hour = parseInt(second / 60 / 60 % 24)
	var minute = parseInt(second / 60 % 60);
	var seconds = parseInt(second % 60);
	// 1 返回数组  可以 但是  不建议

	// 字面创建方式 
	var obj = {
		day: day < 10 ? "0" + day : "" + day,
		hour: hour < 10 ? "0" + hour : "" + hour,
		minute: minute < 10 ? "0" + minute : "" + minute,
		second: seconds < 10 ? "0" + seconds : "" + seconds
	}

	// 返回对象
	return obj;
}

// 构造挂在  先创建对象  对象.函数
// 函数中的this 指代  调用该函数的   这个对象
Date.prototype.timeInterval = function(date) {
	//1 将日期换算成毫秒值 
	var time01 = this.getTime();
	var time02 = date.getTime();
	// 2 计算两者相差多少毫秒
	var time = Math.abs(time01 - time02); // 间隔的毫秒 
	// 间隔的秒  
	var second = time / 1000; // 一共有多少秒  有小数
	var day = parseInt(second / 60 / 60 / 24); // 相差多少天
	var hour = parseInt(second / 60 / 60 % 24)
	var minute = parseInt(second / 60 % 60);
	var seconds = parseInt(second % 60);
	// 1 返回数组  可以 但是  不建议

	// 字面创建方式 
	var obj = {
		day: day < 10 ? "0" + day : "" + day,
		hour: hour < 10 ? "0" + hour : "" + hour,
		minute: minute < 10 ? "0" + minute : "" + minute,
		second: seconds < 10 ? "0" + seconds : "" + seconds
	}

	// 返回对象
	return obj;
}

// 静态的挂在
Math.getRandomMN = function(m, n) {
	if(m > n) {
		var tem = m;
		m = n;
		n = tem;
	}

	return Math.floor(Math.random() * (n - m + 1) + m)
}

/* ***********************************************
 *  关于数组的方法
 * *********************************************/
Array.prototype.getMaxValue = function() {
	return Math.max.apply(null, this);
}

Array.prototype.getMinValue = function() {
	return Math.min.apply(null, this);

}

/**
 * 向数组中添加重复内容  并且改变原数组
 */
Array.prototype.addSet = function() {
	// 遍历可变参数 
	if(arguments.length > 0) {
		for(var i = 0; i < arguments.length; i++) {
			// 判断   传来的值 在原数组中是否存在
			if(this.indexOf(arguments[i]) < 0) {
				this.push(arguments[i])
			}
		}
	}
}
/**
 * 向数组中添加非重复内容 但是不改变原来数据  返回一个新数组
 */
Array.prototype.addSet02 = function() {
	var newArray = [];

	// 新数组和原来数据进行拼接
	var newArray = newArray.concat(this);

	// 遍历可变参数 
	if(arguments.length > 0) {
		for(var i = 0; i < arguments.length; i++) {
			// 判断   传来的值 在原数组中是否存在
			if(newArray.indexOf(arguments[i]) < 0) {
				newArray.push(arguments[i])
			}
		}
	}
	return newArray;
}

/**
 * 统计数组中每个值出现的次数 
 *  返回一个对象  
 */
Array.prototype.valueCount = function() {
	var obj = {}; // key 元素   value 该元素出现的次数
	// 1 遍历数组 
	for(var i = 0; i < this.length; i++) {
		var key = this[i];
		// obj中是否存在 数组中的元素 
		// 如果不存在  说明 该元素是第一次出现   value 应该置为1 
		if(!obj[key]) {
			obj[key] = 1;
		} else {
			obj[key]++;
		}
		// 如果存在  说明 该元素已经出现过了     value 值应该是 原来的数值+1
	}

	return obj;
}

// 改变原数组   直接让原数组的重复数据都清楚
Array.prototype.noRepeatValue = function() {
	// 1 获取统计的内容
	var obj = this.valueCount();
	// 2 让元素添加统计对象的键    清空原数组 
	this.splice(0, this.length);
	// 3 遍统计的对象 
	for(var key in obj) {
		if(isNaN(key)) {
			// 遍历出的key 一次转进老数组中
			this.push(key);
		} else {
			this.push(Number(key))
		}

	}

}

/* ***********************************************
 *  关于字符串的的方法
 * *********************************************/
/**
 * 统计每个字符串出现的个数
 */
String.prototype.getValueCount = function() {
	// 定义一个对象  键 存放字符内容 value 数量
	var obj = new Object();
	// 遍历字符串
	for(var i = 0; i < this.length; i++) {
		var c = this[i];
		// 如果第一个出现   value值为  1 
		if(!obj[c]) {
			obj[c] = 1;
		} else {
			// 如果不是第一次出现 value值自增1
			obj[c]++;
		}

	}
	return obj;
}

/**
 * 找指定字符在字符串中出现的位置
 * 当数组为空的时候 表示 该字符并没有在字符串中出现过
 * @param {Object} str
 */
String.prototype.findValueIndexs = function(str) {
	// 1 设置数组   存储某个字符串在字符串中的位置数组 
	var indexs = [];

	var index = 0; // 从第0个开始查找 

	while((index = this.indexOf(str, index)) >= 0) {
		indexs.push(index);
		index++;
	}
	return indexs;
}

/**
 * 全部替换
 * @param {Object} str
 */
String.prototype.replaceAll = function(oldValue, newValue) {
	var str = "";
	// 1 设置数组   存储某个字符串在字符串中的位置数组
	var index = 0; // 从第0个开始查找 
	var flag = true;
	while((index = this.indexOf(oldValue, index)) >= 0) {
		if(flag) {
			str = this.replace(oldValue, newValue);
		} else {
			str = str.replace(oldValue, newValue);
		}
		flag = false;
		index++;
	}
	return str;
}

/**
 * 去掉所有的空白
 */
String.prototype.trimAll = function() {
	return this.trim().split(" ").join('');
}

/**
 * 将字符串转为一个字符串数组
 */
String.prototype.toCharArray = function() {
	// this 表示字符串
	var newArray = [];
	// 遍历字符串
	for(var i = 0; i < this.length; i++) {
		// 获取字符串中每个字符
		var c = this.charAt(i);
		// 获取的字符 存入到新数组中
		newArray.push(c);
	}

	return newArray;
}

/**
 * 将字符串反转 
 */
String.prototype.reverse = function() {
	// 1  将字符串变成字符数组 
	var charArray = this.toCharArray();
	// 2 将数组倒置 
	charArray.reverse();
	// 3 将倒置的数组转为字符串
	return charArray.join('');
}

/**
 * 获取url 的参数
 */
String.prototype.getUrlParams = function() {
	// this == "http://www.baidu.com?key=value&key2=value2"
	var obj = {};
	// 1 截取字符串 ? 后面的内容
	var params = this.substring(this.indexOf("?") + 1); // key=value&key2=value2
	// 2 获取参数的键值对数组 split('&')
	var paramsArray = params.split("&"); // [key=value,key2=value2]
	// 3 遍历数组
	for(var i = 0; i < paramsArray.length; i++) {
		// 获取每个元素
		var paramsValue = paramsArray[i]; // key=value
		// 方式一  截取
		//		var key = paramsValue.substring(0,paramsValue.indexOf('='));
		//		var value = paramsValue.substring(paramsValue.indexOf('=')+1);
		// 方式二   将字符串转为数组 
		var keyvalue = paramsValue.split('=');
		var key = keyvalue[0];
		var value = keyvalue[1];
		obj[key] = value;

	}

	return obj;
}

// 自定义的函数  主要是用于  不能再内置对象上挂在函数的方法
function Tool() {
	// 返回格式化日期
	this.formatDate = function(date, split01, split02, isTime) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1; // 0-11
		var day = date.getDate();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;

		if(!isTime) {
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			hour = hour < 10 ? "0" + hour : hour;
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return year + split01 + month + split01 + day + " " + hour + split02 + minute + split02 + second;
		}

		return year + split01 + month + split01 + day;

	}
	// 返回m到n之间的随机数
	this.getRandomMN = function(m, n) {

		if(m > n) {
			var tem = m;
			m = n;
			n = tem;
		}

		return Math.floor(Math.random() * (n - m + 1) + m)

	}
	/**
	 * 获取date02 于 date 01 间隔时间
	 *   相差多少天
	 *      小时
	 *      分钟 
	 *      秒
	 */
	this.timeInterval = function(date01, date02) {
		//1 将日期换算成毫秒值 
		var time01 = date01.getTime();
		var time02 = date02.getTime();
		// 2 计算两者相差多少毫秒
		var time = Math.abs(time01 - time02); // 间隔的毫秒 
		// 间隔的秒  
		var second = time / 1000; // 一共有多少秒  有小数
		var day = parseInt(second / 60 / 60 / 24); // 相差多少天
		var hour = parseInt(second / 60 / 60 % 24)
		var minute = parseInt(second / 60 % 60);
		var seconds = parseInt(second % 60);
		// 1 返回数组  可以 但是  不建议
		// 2 返回一个对象 
		//	    var obj = new Object();  // 实例化object 
		//	    obj.day = day < 10 ? "0"+day : ""+day;   // 01 天  02天
		//	    obj.hour = hour  < 10 ? "0"+hour : ""+hour;
		//	    obj.minute = minute < 10 ? "0"+minute : ""+minute;
		//	    obj.second = seconds< 10 ? "0"+seconds : ""+seconds;
		// 字面创建方式 
		var obj = {
			day: day < 10 ? "0" + day : "" + day,
			hour: hour < 10 ? "0" + hour : "" + hour,
			minute: minute < 10 ? "0" + minute : "" + minute,
			second: seconds < 10 ? "0" + seconds : "" + seconds
		}

		// 返回对象
		return obj;

	}
	/**
	 * 获取对象中 最大的值
	 */
	this.getObjectMaxValue = function(obj) {

		//找到最大的个数 
		var max;
		var count = 0;
		//遍历对象 
		for(var key in obj) {
			var value = obj[key];
			if(count === 0) {
				max = value;
			} else {
				if(value > max) {
					max = value;
				}
			}
			count++;
		}
		return max;
	}

	// 通过id 获取节点 
	this.getId = function(id) {
		return document.getElementById(id);
	}

	// 设置文本内容 
	this.setContent = function(node, value) {

		if(node.textContent) {
			node.textContent = value;
		} else if(node.innerText) {
			node.innerText = value;
		}

	}
	// 获取文本内容
	this.getContent = function(node) {
		if(node.textContent) {
			return node.textContent.trim();
		} else if(node.innerText) {
			return node.innerText.trim();
		}
		return "";
	}

	// 绑定事件
	/**
	 * eventName 事件函数 去掉  on
	 */
	this.bind = function(node, eventName, callback) {
		// 有这个属性或方法 
		if(!!window.addEventListener) {
			node.addEventListener(eventName, callback);
		} else if(!!window.attachEvent) {
			node.attachEvent('on' + eventName, callback);
		} else {
			node['on' + eventName] = callback;
		}
	}

	// 解绑事件  该函数指定解绑  bind 注册的事件
	/**
	 * eventName 事件函数 去掉  on
	 */
	this.unbind = function(node, eventName, callback) {

		if(!!window.addEventListener) {
			node.removeEventListener(eventName, callback);
		} else if(window.attachEvent) {
			node.detachEvent('on' + eventName, callback);
		} else {
			node['on' + eventName] = null;
		}
	}

	/**
	 * 
	 * @param {Object} ele   移动的元素 
	 * @param {Object} endPosition 移动的位置 
	 * @param {Object} step  步长  默认  5
	 * @param {Object} time  事件   默认  20
	 */
	this.animate = function(ele, endPosition, step, time) {
		// 为参数设置默认值 
		step = step || 10;
		time = time || 10;
		// 判断   动画向前还是向后 
		// 初始的位置 >  最大的位置  向左走 否则向右走   向左走  step 应位负数  向右走 step 就为正数 
		step = ele.offsetLeft > endPosition ? -step : step;
		// 当动画存在的时候   清除动画
		if(ele.timer) {
			clearInterval(ele.timer);
		}

		// sNode.style.left = 700+'px';
		ele.timer = setInterval(function() {

			if(Math.abs(ele.offsetLeft - endPosition) < Math.abs(step)) {
				//console.info(left);
				ele.style.left = endPosition + 'px';
				//console.info(1);
				// 当达到最大值的时候  清除动画 
				clearInterval(ele.timer);
				return false;
			}

			ele.style.left = ele.offsetLeft + step + 'px';

			//console.info(sNode.style.left);
		}, time);

	}

	/**
	 * 对象的拷贝  浅考别
	 */
	this.objCopy = function(father, son) {

		for(var key in father) {
			if(son[key]) {
				continue;
			}
			son[key] = father[key];

		}
	}

	/**
	 * 深度拷贝
	 */
	this.objDeepCopy = function(father, son) {

		// 遍历父节点
		for(var key in father) {
			var value = father[key];

			// 判断类型
			if(value instanceof Array) {
				// 让孩子重新生成一个数组  将父亲的内容拷贝到空数组中
				son[key] = []
				//this.objDeepCopy(value, son[key])
				arguments.callee(value, son[key])
			} else if(value instanceof Object) {
				son[key] = {}
				//this.objDeepCopy(value, son[key])
				arguments.callee(value, son[key])
			} else {
				son[key] = father[key];
			}

		}
	}
	/**
	 * 深度复制 返回一个新的子对象
	 */
	this.objDeepCopy2 = function(father, son) {
		son = JSON.parse(JSON.stringify(father));
		return son;
	}
	/**
	 * 全局搜索 
	 *    regObj 正则对象 
	 *    value 字符串
	 */

	this.find = function(regObj, value) {
		var result = []; // 想要的结果
		var r = null;
		while((r = regObj.exec(value)) != null) {
			result.push(r[0])
		}
		return result;
	}

	/**
	 * 设置cookie
	 */
	this.setCookie = function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}

	/**
	 * 获取cookie值
	 */
	this.getCookie = function(name) { 
		var strcookie = document.cookie; //获取cookie字符串  key=value;key2 =value
		   
		var arrcookie = strcookie.split("; "); //分割
		    //遍历匹配
		   
		for(var i = 0; i < arrcookie.length; i++) {      
			var arr = arrcookie[i].split("=");      
			if(arr[0] == name) {         
				return arr[1];      
			}   
		}   
		return "";

	}

	/**
	 * ajax  提供外部调用的ajax
	 */
	this.ajax = function(options) {

		// 定义默认项
		var defaults = {
			url: "#",
			method: "GET",
			data: {},
			dataType: "text",
			async: true,
			success: function() {

			}
		}
		// 遍历 自定义项 将自定义项赋值诶默认向
		for(var key in options) {
			defaults[key] = options[key];
		}

		if(defaults.dataType.toLowerCase() == 'jsonp') {
			this.myJsonp(defaults);
		} else {
			this.myAjax(defaults);
		}

	}

	/**
	 * 外部最好不要调用
	 */
	this.myJsonp = function(defaults) {
		// 1 创建script 标签
		var scriptNode = document.createElement('script');

		// 设置请求的url 
		var url = defaults.url; // 请求访问的地址 
		// jsonp还有两个对象  jsonp  jsonCallback
		var time = +new Date();
		var jsonp = defaults.jsonp ? defaults.jsonp : 'callback'; // 回调函数的键的名字 
		var jsonCallback = defaults.jsonCallback ? defaults.jsonCallback : "jQuery" + ("1122" + Math.random()).replace(/\D/g, "") + "_" + time; // 真正的回调函数

		url += "?" + jsonp + "=" + jsonCallback + "&_=" + time;
		//  携带参数   data  {name:'小明'}
		var params = "";
		// 遍历参数
		for(var key in (defaults.data || {})) {
			params += "&" + key + '=' + defaults.data[key];
		}

		url += params;
		scriptNode.src = url;

		// 2 获取头部标签 
		var hredNode = document.querySelector('head');
		// 3 将script 载入到 头部标签中
		hredNode.appendChild(scriptNode);

		window[jsonCallback] = function(data) {
			defaults.success(data);
		}

	}

	this.myAjax = function(defaults) {
		// 1 创建ajax 对象
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		// 判断当前请求是get 还是post 
		var isGet = false;
		// 判断该请求是 get 还是 post 
		if(defaults.method.toUpperCase() == 'GET') {
			isGet = true;
		}

		// 2 准备发送数据
		var url = defaults.url;

		// 定义参数
		var time = +new Date();
		var params = "_=" + time;

		for(var key in (defaults.data || {})) {
			params += "&" + key + '=' + defaults.data[key]; // &name=小明&age=18&key=value
		}

		// 如果是get请求  拼接参数
		if(isGet) {
			url += "?" + params;
		}
		// 准备发送请求
		xhr.open(defaults.method, url, defaults.async);
		// 3. 发送请求
		if(!isGet) {
			// 设置响应头
			xhr.setRequestHeader("content-type", 'application/x-www-form-urlencoded');
			xhr.send(params)
		} else {
			xhr.send(null)
		}

		// 同步操作 
		if(!defaults.async) {
			var data; // 回调数据
			// 判断 响应类型  script text html json xml
			if(defaults.dataType.toLowerCase() == 'script') {
				data = xhr.responseText;
				eval(data);
			} else if(defaults.dataType.toLowerCase() == 'json') {
				data = xhr.responseText;
				data = JSON.parse(data);
			} else if(defaults.dataType.toLowerCase() == 'xml') {
				data = xhr.responseXML;
			} else {
				data = xhr.responseText;
			}

			defaults.success(data);

			return;
		}

		// 4 监听状态  
		// 异步的操作
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					// 判断 响应类型  script text html json xml
					if(defaults.dataType.toLowerCase() == 'script') {
						data = xhr.responseText;
						eval(data);
					} else if(defaults.dataType.toLowerCase() == 'json') {
						data = xhr.responseText;
						data = JSON.parse(data);
					} else if(defaults.dataType.toLowerCase() == 'xml') {
						data = xhr.responseXML;
					} else {
						data = xhr.responseText;
					}

					defaults.success(data);
				}
			}
		}

	}

}

// 创建一个对象  
var $$ = new Tool();