(function(window, $){
	/**
	 * 将form表单元素的值序列化成对象
	 * @example $('#formId').serializeObject()
	 * @author 陈立
	 * @requires jQuery
	 * @returns object
	 */
	$.fn.serializeObject = function() {
		var o = {};
		var value = null;
		$.each($(this).serializeArray(), function(index) {
			value = $.trim(this['value']);
			if (value != undefined && value.length > 0) {// 如果表单项的值非空，才进行序列化操作
				if (o[this['name']]) {
					o[this['name']] = o[this['name']] + "," + value;
				} else {
					o[this['name']] = value;
				}
			}
		});
		return o;
	};

	
	/**
	 * 改变jQuery的AJAX默认属性和方法
	 * 
	 * @author 陈立
	 * @requires jQuery
	 */
	$.ajaxSetup({
		type : 'POST',
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			var status = XMLHttpRequest.status;
			try {
				if (window.top.$(".messager-window").size() == 0){
					if(status == 401){
						window.top.$.messager.alert('错误', "没有操作权限");
					}else if(status == 403){
						window.top.$.messager.confirm('提醒','用户会话失效，请重新登录',function(r){    
							if (r){    
								window.top.location.reload();
							}    
						});
					}
				}
			} catch (e) {
				//alert(XMLHttpRequest.responseText || textStatus);
			}
		}
	});
	/**
	 * 动画类型扩展
	 */
	$.extend($.easing, {
		easeOutBack: function (x, t, b, c, d, s) {
			s = s || 1.3;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
	});
})(window, jQuery);

var encrypt;
try{
	encrypt = new JSEncrypt();
}catch (e) {
}
var pm = pm || {};
pm.encode = {
	config:null,
	/**
	 * 根据系统配置初始化公钥
	 */
	initPK:function(){
		//从后台获取配置
		if(pm.encode.config == null){
			var url = pm.path?pm.path+"publickey":"../publickey";	
			$.ajax({ 
				async:false,
				type:"post",
	  	  		url: url, 
	  	  		success: function(r){
					pm.encode.config = r;
	  	  		}
			})
		}
	},
	/**
	 * 判断是否需要RSA加密
	 */
	isencode:function(){
		pm.encode.initPK();
		var isencode = pm.encode.config && pm.encode.config.code == "0";
		if(isencode){
			var publickey = pm.encode.config.attr;
			encrypt.setPublicKey(publickey);
		}
		return isencode;
	},
	/**
	 * 使用RSA加密，加密之前先获取公钥
	 */
	RSA:function(str){
		pm.encode.initPK();
		if(str && encrypt && pm.encode.isencode()){
			str = encrypt.encrypt(str);
		}
		return str;
	}
}

$(function(){
	$('.num').bind('input propertychange', function(e) {
		if($.syncProcessSign) return ;
        $.syncProcessSign = true;
        var value=$(this).val();
        var placeholder=$(this).attr("placeholder");
        if(value==placeholder){
        	$.syncProcessSign = false;
        	return;
        }
        var reg = new RegExp("^[0-9]*$");  
	    if(reg.test(value)){
	    	$.syncProcessSign = false;
	    	return;
	    }
		value=value.replace(/[^\d]/g,'');
		$(this).val(value);
        $.syncProcessSign = false;
		
	});
	$('.num').keypress(function(e){
		var code = e.keyCode|e.which;
		if(code == 8 || code == 13 || code == 9){
			return true;
		}
		if((code<48 || code>57))
			return false;
	});
	$('.idcard').bind('input propertychange', function() {
		if($.syncProcessSign) return ;
        $.syncProcessSign = true;
        var value=$(this).val();
        var placeholder=$(this).attr("placeholder");
        if(value==placeholder){
        	$.syncProcessSign = false;
        	return;
        }
        var reg = new RegExp("^[0-9|x|X]*$");  
	    if(reg.test(value)){
	    	$.syncProcessSign = false;
	    	return;
	    }
		value=value.replace(/[^\d|x|X]/g,'');
		$(this).val(value);
        $.syncProcessSign = false;
		
		/*
		var value=$(this).val();
		//value=value.replace(/[\W]/g,'');
		value=value.replace(/[^\d|x|X]/g,'');
		$(this).val(value);*/
	});
	$('.idcard').keypress(function(e){
		var code = e.keyCode|e.which;
		if(code == 8 || code == 13 || code == 9){
			return true;
		}
		//数字加X
		if((code>47 && code<58) || code==88 || code == 120)
			return true;
		return false;
	});
	
	$('.loginname').bind('input propertychange', function(e) {
		if($.syncProcessSign) return ;
        $.syncProcessSign = true;
        var value=$(this).val();
        var placeholder=$(this).attr("placeholder");
        if(value==placeholder){
        	$.syncProcessSign = false;
        	return;
        }
        var reg = new RegExp("^/^[A-Za-z][0-9]*$");  
	    if(reg.test(value)){
	    	$.syncProcessSign = false;
	    	return;
	    }
		value=value.replace(/[^\w\d]/g,'');
		$(this).val(value);
        $.syncProcessSign = false;
		
	});
	$('.loginname').keypress(function(e){
		var code = e.keyCode|e.which;
		if(code == 8 || code == 13 || code == 9){
			return true;
		}
		//只能允许填写数字和大小写字符
		if(code<48){
			return false;	
		}else if(code<58){
			return true;		   	  //数字区间
		}else if(code<64){
			return false;			
		}else if(code<91){
			return true;			 //小写字符区间
		}else if(code<96){
			return false;           
		}else if(code<123){
			return true;			  //大写字符区间
		}else{
			return false; 
		}
	});

})