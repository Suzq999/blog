(function($) {
	//以上方法用于匹配IE9一下的浏览器,因为IE中的placeholder字体不美观,因此统一匹配IE浏览器
	/*if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
        alert("您的浏览器版本过低，请下载IE9及以上版本");
    }*/
	if(window.ActiveXObject || "ActiveXObject" in window){
	    var elements = $("input[type=text],input[type=password]");
	    
	    elements.each(function() {
	        var s = $(this);
	        var pValue = s.attr("placeholder");
	        if(pValue){
	        	s.attr("placeholder","");
	        	if(s.parent().find(".import-img").length != 0){
	        		s.before('<span class="input_msg" style="left: 24px;">'+pValue+'</span>');
	        	} else if(s.css("margin-top") == "12px") {
	        		s.before('<span class="input_msg" style="top: 9px;">'+pValue+'</span>');
	        	} else {
	        		s.before('<span class="input_msg">'+pValue+'</span>');
	        	}
	        	var value = s.val();
		    	if(value == null || value == ""){
		    		s.parent().removeClass("h_msg");
		    	}else{
		    		s.parent().addClass("h_msg");
		    	}
	        }
	    });
	    
	    $('input[type=text],input[type=password]').bind("input propertychange",function(){
	    	var $this = $(this);
	    	var value = $this.val();
	    	if(value == null || value == ""){
	    		$this.parent().removeClass("h_msg");
	    	}else{
	    		$this.parent().addClass("h_msg");
	    	}
	    });
	    
	    $('input[type=text],input[type=password]').on("keyup",function(){
	    	var $this = $(this);
	    	var value = $this.val();
	    	if(value == null || value == ""){
	    		$this.parent().removeClass("h_msg");
	    	}else{
	    		$this.parent().addClass("h_msg");
	    	}
	    });
	    $('.input_msg').on("click",function(){
	    	$(this).parent().find('input').focus();
	    })
	    //取消多次点击被选中
	    $('.input_msg').bind("selectstart", function () { return false; });
	}
})(jQuery);