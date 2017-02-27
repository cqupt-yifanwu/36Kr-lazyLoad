window.onload = function () {

alert("因为时间原因跨域问题还没有得到解决，以至于后面看不到效果，请您看代码！");
/*	// 跨域问题，不使用ajax
function ajax (url, fnSucc, fnFail) {              //fnSucc是成功时的处理程序，fnFail是失败时的处理程序
	    //1.创建Ajax对象
	    if (window.XMLHttpRequest) {
	        var oAjax = new XMLHttpRequest();
	    }
	    else{       //针对ie6
	        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");  
	    }

	    //2.链接服务器   open 三个参数（方法，文件名，是否异步）
	    oAjax.open("GET",url,true);

	    oAjax.setRequestHeader("Origin","Access-Control-Allow-Origin");
	    //3.发送请求
	    oAjax.send();

	    //4.接受返回
	    oAjax.onreadystatechange = function () {
	        // oAjax.readyState 提供信息浏览器和服务器进行到哪一步了
	        if (oAjax.readyState == 4) { //读取完成
	            if(oAjax.status == 200) {
	                fnSucc(oAjax.responseText);
	            }
	            else{
	                if (fnFail) {       //此函数存在
	                    fnFail(oAjax.status);
	                }
	            }
	        } 
	    }
	}
	ajax("http://36kr.com/feed", function (data) {
		console.log(data);
	})*/


	/*
		这里数据跨域的问题没有解决，不知道如何在一个没有设置CROS的XML资源中进行跨越
		我这里有大概的一些想法：用nodejs暴露一个和我前端的同源请求，然后把请求的内容返回给前端
	*/
	var head = document.getElementsByTagName('head')[0];
	function callback (data) {
		//  这一步使用给定的接口将XML数据解析成javascript对象
		//  因为给定的接口是一次性请求数据，我想如果能指定每次请求十条就可以完美的做成延迟加载，这里有待实现
		var str = '',
		      i = 0,
		      j;
		//  首屏渲染
		for (; i < 10; i++) {
			str += 		"<div class='msg'>" +
			"<h2>" + data.tatle + "</h2>" +    // 标题
			"<div class="tip">" +
				"<span>" + data.author + "</span>" +  // 数据
				"<span>" + data.tip + "</span>" +    // 类别
				"<div class='time'>" + data.date + "</div>" +  // 时间
			"</div>" +
			"<div class='mainctext'>" +
				"<p class="artical">"+ data.context +"</p>" +  // 文章内容
				"<img class='img' src='" + data.img" +' alt='" + data.alt + "'>" +
			"</div>" 
		"</div>" 
		}
		document.getElementById("content").innerHTML = str;

		var element = document.getElementsByClass('msg'),
			lastElement = element[element.length-1],
			viweHeight = getViewPort();
		// 通过监听下拉事件来进行下一页的加载
		// ps: 因为时间原因，这里本应该每下拉一次进行一次请求，这里没有进行过多的思考
		window.onscroll = function (e) {
			// 如果最后一个元素的低端距离页面的低端大于10px ，渲染新的十条数据
			if (viewHeight - elementToTop(lastElement) - lastElement.clientHeight > 10px) {
				for (var j = i; i < j + 10; j ++) {
					str += 		"<div class='msg'>" +
					"<h2>" + data.tatle + "</h2>" +    // 标题
					"<div class="tip">" +
						"<span>" + data.author + "</span>" +  // 数据
						"<span>" + data.tip + "</span>" +    // 类别
						"<div class='time'>" + data.date + "</div>" +  // 时间
					"</div>" +
					"<div class='mainctext'>" +
						"<p class="artical">"+ data.context +"</p>" +  // 文章内容
						"<img class='img' src='" + data.img" +' alt='" + data.alt + "'>" +
					"</div>" +
				"</div>" 
				}
				document.getElementById("content").innerHTML = str;
				var lastElement = element[element.length-1];
			}

		}

		/*

		 	这里我想了一下，最好还是用插入元素和代码片段来做，对性能友好，否则每次都会将全部数据渲染
		 	但是因为时间原因无法再做修改。
			
		*/

	};

	function getViewPort () {
		if(document.compatMode == "BackCompat") {
            var Height = document.body.clientHeight;
        } else {
            var Height = document.documentElement.clientHeight;
        }
		return Height;		
	}

	function elementToTop (ele) {
        if (ele) {
            var totalTop = ele.offsetTop;
            var current = ele.offsetParent;
                while (current !== null) {
                    totalTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return totalTop - this.ScrollTop();
            }
	}

	// 本意是使用jsonp进行跨域请求，但是jsonp请求XML数据时报错
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "http://36kr.com/feed/?fn=callback";
	head.appendChild(script);



}