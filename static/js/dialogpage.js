(function(window, undefined){
	var index = 0;
	var currPath = getCurrScriptPath();
	
	/**
	 * 获取脚本路径
	 */
	function getCurrScriptPath(){
		var scripts = document.getElementsByTagName("script"),
			script = scripts[scripts.length - 1],
			a =  document.createElement('a');
		a.href = document.querySelector ? script.src : script.getAttribute("src", 4);
		var path = a.pathname.replace(/[\/\\]+([^\/\\]*)$/, ''); 
		return path.charAt(0) == '/' ? path : '/' + path; 
	}
	
	function addStyle(href){
		var style;
		var styleElements = document.getElementsByTagName("link");
		if(styleElements){
			var l = styleElements.length;
			for (var i = 0; i < l; i++) {
				if(styleElements[i].href == href)
					return ;
			}
		}
		style = document.createElement("link");
		style.type = "text/css";
		style.rel="stylesheet";
		style.href = href;
		document.getElementsByTagName("head")[0].appendChild(style);
	}
	//动态增加js
	function addScript(src, loadendCall){
		var script, loaded = false;
		var scriptElements = document.getElementsByTagName("script");
		if(scriptElements){
			var len = scriptElements.length;
			for (var i = 0; i < len; i++) {
				if(scriptElements[i].src == src){
					return;
				}
			}
		}
		script = document.createElement("script");
		script.type = "text/javascript";
		script.onreadystatechange= function () { 
			if ((this.readyState == 'complete' || this.readyState == 'loaded') && !loaded) {
				loaded = true;
				loadendCall(); 
			}
		};
		script.onload= function(){
			if(!loaded){
				loaded = true;
				loadendCall();
			}
		};
		script.src = src;
		document.getElementsByTagName("HEAD")[0].appendChild(script);
	}
	
	function openDialog(options){
		var pageid = 'dialog_page_iframe_' + index++;
		easyDialog.open({
			container : {
				header: '<span>' + (options.title || '') + '</span>',
				content: '<div id="' + pageid + '" style="width:' + (options.width || 300) + 'px;height:' + (options.height || 200) + 'px;"></div>',
				noFn : options.noFn
			},
			fixed : true,
			drag : false,
			overlay : options.overlay,
			callback : callFn //easydialog本身callback事件,页面自身定义
		});
		$('.easyDialog_footer').hide();
		$('<iframe/>', {
			frameborder	: '0',
			css			: {'width': '100%', 'height': '100%'},
			src			: options.url
		}).appendTo($("#" + pageid)).load(function(){
			var cw = this.contentWindow;
			cw.dialogPageCallback = function(){
				if(typeof(options.callback) === 'function'){
					try{
						options.callback.apply(this, arguments);
					}catch(e){
						//ignore
					}
				}
				easyDialog.close();
			};
			if(cw.callback === undefined){
				cw.callback = cw.dialogPageCallback;
			}
		});
	}
	
	function openDialogalert(options){
		easyDialog.open({
			container : {
				header : '<span>' + (options.title || '') + '</span>',
				content : '<div style="width:' + (options.width || 300) + 'px;height:' + (options.height || 200) + 'px;text-align: center;padding-top:' + (options.height || 200)/5*2 + 'px;box-sizing: border-box;">' + options.content + '</div>',
				yesFn : options.yesFn,
				noFn : options.noFn
			},
			fixed : true,
			drag : false,
			overlay : options.overlay,
			callback : callFn //easydialog本身callback事件,页面自身定义
		});
	}
	
	window.openDialogPage = function(options){
		try {
			if(window.top !== window.self && window.top.openDialogPage){
				return window.top.openDialogPage(options);
			}
		} catch (e) {
			// TODO: handle exception
		}
		if(window.easyDialogPage === undefined){
			addStyle(currPath + '/../../styles/client/dialog.css');
			addScript(currPath + '/easydialog.js', function(){
				openDialog(options);
			});
		}else{
			openDialog(options);
		}
	}
	
	window.openDialogAlert = function(options){
		try {
			if(window.top !== window.self && window.top.openDialogAlert){
				return window.top.openDialogAlert(options);
			}
		} catch (e) {
			// TODO: handle exception
		}
		if(window.easyDialogalert === undefined){
			addStyle(currPath + '/../../styles/client/dialog.css');
			addScript(currPath + '/easydialog.js', function(){
				openDialogalert(options);
			});
		}else{
			openDialogalert(options);
		}
	}
})(window, undefined);

var callFn = function(){
	return;
}
