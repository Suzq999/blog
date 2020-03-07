//是否在被输入状态或有内容状态判断
(function(){
	$("input[type=text],input[type=password]").focus(function(){
		var $this = $(this);
		if($this.parent().is(".pub-bottom-border")){
			$this.parent().removeClass("pub-bottom-border");
			$this.parent().addClass("pub-bottom-border-blue");
		}
	});
	$("input[type=text],input[type=password]").blur(function(){
		var $this = $(this);
		var value = $this.val();
		//if(value == null || value == ""){
		$this.parent().removeClass("pub-bottom-border-blue");
		$this.parent().addClass("pub-bottom-border");
		//}
	});
})(jQuery);

//IE也能用textarea 兼容maxlength
$(function(){ 
	$("input[maxlength],textarea[maxlength]").keyup(function(){ 
		var area=$(this); 
		var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值 
		if(max>0){ 
			if(area.val().length>max){ //textarea的文本长度大于maxlength 
				area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值 
			} 
		} 
	}); 
	//复制的字符处理问题 
	$("input[maxlength],textarea[maxlength]").blur(function(){ 
		var area=$(this); 
		var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值 
		if(max>0){ 
			if(area.val().length>max){ //textarea的文本长度大于maxlength 
				area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值 
			}
		} 
	}); 
});

//短信验证码(倒计时)
function time(o, type, wait) {
	if (!wait){
		var wait = 60;
	}
    if (wait == 1) {
    	o.removeClass("disabled");
        o.attr("disabled", false);
		o.val("获取"+type+"验证码");
        wait = 60;
        return;
   } else {
        o.val("重发验证码(" + (wait-1) + "s)");
        wait--;
        setTimeout(function() {time(o, type, wait);},1000);
    }
}

//防止js注入
function htmlEncodeJQ ( str ) {
    return $('<span/>').text( str ).html();
}
function htmlDecodeJQ ( str ) {
	return $('<span/>').html( str ).text();
}

//防止表单重复提交(在未用到validate框架时使用该方法)
var iscommited = false;
function dosubmit(){
	if(iscommited){
		return true;
	}else{
		iscommited = true;
		return false;
	}
}
function finishsubmit(){
	iscommited = false;
}

//检测手机号是否符合规则
function validatemobile(value){
    var pattern1 = /^0{0,1}(13[4-9]|14[478]|15[0-2]|15[7-9]|18[23478]|17[028]|198)[0-9]{8}$/;  
    var pattern2 = /^0{0,1}(13[0-2]|15[56]|14[56]|18[56]|17[156]|166)[0-9]{8}$/;  
    var pattern3 = /^0{0,1}(13[34]|14[19]|153|17[0347]|18[019]|199)[0-9]{8}$/;
	return (pattern1.test(value) || pattern2.test(value) || pattern3.test(value));
}
