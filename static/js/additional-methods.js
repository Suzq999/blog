/**
 * validate验证框架的扩展与个性化封装
 *
 * @author wyj
 */

$.validator.setDefaults({
  submitHandler: function() {
    console.log("submitted!");
    //$(form).ajaxSubmit();
  },
  success: function(label) {
      label.html("&nbsp;").addClass("error_right");
  },
  onkeyup:false,
});

/*input去空操作*/
jQuery.validator.addMethod("trim", function(value, element) {
	$(element).val($.trim(value));
	$(element).keyup();
	return true;
});

//去空非空判断
jQuery.validator.addMethod("require", function(value, element) {
	$(element).next().removeClass("error_more");
	value = $.trim(value);
	if(value == $(element).attr('placeholder')){
        value = '';
    }
	return value.length > 0;
});

//手机号码
jQuery.validator.addMethod("mobilePhone", function(value, element) {
    $(element).next().removeClass("error_right");
    var result = "";
    //170是虚拟号段
    /*移动号段
     * 134,135,136,137,138,139,147,150,151,152,157,158,159,178,182,183,184,187,188,1703,1705,1706,198,172,148,1440
     */
    var pattern1 = /^0{0,1}(13[4-9]|14[478]|15[0-2]|15[7-9]|18[23478]|17[028]|198)[0-9]{8}$/;  
    /*联通号段
    130,131,132,145,155,156,171,175,176,185,186,1704,1707,1708,1709,166,146
    */  
    var pattern2 = /^0{0,1}(13[0-2]|15[56]|14[56]|18[56]|17[156]|166)[0-9]{8}$/;  
    /*电信号段 
    133,149,153,173,177,180,181,189,1700,1701,1702,199,1349
    */  
    var pattern3 = /^0{0,1}(13[34]|14[19]|153|17[0347]|18[019]|199)[0-9]{8}$/;
    return this.optional(element) || (pattern1.test(value) || pattern2.test(value) || pattern3.test(value));
});

/*不能是空字符串校验*/
jQuery.validator.addMethod("notBlank", function(value, element) {
    $(element).next().removeClass("error_right");
    var result = "";
    var pattern1 = /(^\s*)|(\s*$)/g;
    if(""===value.replace(pattern1,"")){
    	return false;
    }else{
    	return true;
    }
});

//手机号是否存在
jQuery.validator.addMethod("phoneExist", function(value, element,param) {
    $(element).next().removeClass("error_right");
    var result = "";
    var flag = false;
    $.ajax({
  	  	async:false,
	  	 	type:"post",
	  		url: param[0],
		data:{"mobilephone": pm.encode.RSA(value)},
	  		success: function(r){
  	  		if(r.code != '0'){
    			result = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>"+r.msg+"</span>";
    			flag = false;
    		}else{
    			flag = true;
    		}
    	}
	  	});
	$(element).data('error-msg',result);
	return flag;
},function(params, element) {
    return $(element).data('error-msg');
}) 


// 邮政编码验证   
jQuery.validator.addMethod("isZipCode", function(value, element,params) {
	$(element).next().removeClass("error_right");
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
});


//邮箱地址验证   
jQuery.validator.addMethod("email", function(value, element,params) {
	$(element).next().removeClass("error_right");
	var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return this.optional(element) || (re.test(value));
});



//首字符为字母
jQuery.validator.addMethod("initial", function(value, element) {
    var initial = /^([a-zA-Z].+)$/;
    return this.optional(element) || (initial.test(value));
});

//用户名规则
jQuery.validator.addMethod("accountname", function(value, element) {
	$(element).next().removeClass("error_right");
    var accountname = /^([\x21-\x7E]+)$/;
    return this.optional(element) || (accountname.test(value));
});

//用户名验证
//格式为 username:[min,max]
jQuery.validator.addMethod("username", function( value, element, param ) {
    var result = "";

    $(element).next().removeClass("error_right");
    // check if dependency is met
    if (value.length == 0) {
      result += methods.username.mustfillin;//这是必填字段(值存在于messages_cn.js语言包)
      $(element).data('error-msg',result);
      return value.length > 0;
    }

    var isempty = this.optional(element);
    //长度判断
    var length = $.isArray( value ) ? value.length : this.getLength( value, element );
    var lenresult = isempty || ( length >= param[ 0 ] && length <= param[ 1 ] );
    //首字母判断
    var initial = /^([a-zA-Z].+)$/;
    var initresult = isempty || (initial.test(value));
    //字母,字符,符号组合
    var accountname = /^([\x21-\x7E]+)$/;
    var accountresult = isempty || (accountname.test(value));

    if (lenresult) {
        result += methods_username_lenresult_right(param[0],param[1]); //*-*位字符 
    } else {
        result += methods_username_lenresult_error(param[0],param[1]);
    }
    if (initresult) {
        result += methods.username.initresult.right; //以字母开头
    } else {
        result += methods.username.initresult.error;
    }
    if (accountresult) {
        result += methods.username.accountresult.right; //支持字母、字符、符号组合
    } else {
        result += methods.username.accountresult.error;
    }
    $(element).data('error-msg',result);
    $(element).next().addClass("error_more");
    return lenresult && initresult && accountresult;
}, function(params, element) {
    return $(element).data('error-msg');
});

//中国公民姓名匹配规则(包含少数名族)
jQuery.validator.addMethod("truename", function(value, element) {
	value = $.trim(value);
	var isempty = this.optional(element);
	var truename = /^[\u4E00-\u9FA5]+(?:·[\u4E00-\u9FA5]+)*$/;
	return isempty || (truename.test(value));
});

//身份证号检测
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子  
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X 
/** 
 * 判断身份证号码为18位时最后的验证位是否正确 
 * @param a_idCard 身份证号码数组 
 * @return 
 */ 
var isTrueValidateCodeBy18IdCard = function(idCard) {  
    var sum = 0; // 声明加权求和变量  
    var a_idCard=idCard.split("");
	   if (a_idCard[17].toLowerCase() == 'x') {  
	    	a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作  
	    }
	    for ( var i = 0; i < 17; i++) {  
	        sum += Wi[i] * a_idCard[i];// 加权求和  
	    }
	    if (a_idCard[17] == ValideCode[sum % 11]) {  
	        return true;  
	    } else {  
	        return false;  
	    }  
};
/** 
* 验证18位数身份证号码中的生日是否是有效生日 
* @param idCard 18位书身份证字符串 
* @return 
*/ 
var isValidityBrithBy18IdCard = function(idCard18){  
var year =  idCard18.substring(6,10);  
var month = idCard18.substring(10,12);  
var day = idCard18.substring(12,14);  
temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
// 这里用getFullYear()获取年份，避免千年虫问题  
if(temp_date.getFullYear()!=parseFloat(year)  
      ||temp_date.getMonth()!=parseFloat(month)-1  
      ||temp_date.getDate()!=parseFloat(day)){  
        return false;  
}else{  
	temp_date = year+"-"+month+"-"+day; 
    return true;  
}  
};
/** 
* 验证15位数身份证号码中的生日是否是有效生日 
* @param idCard15 15位书身份证字符串 
* @return 
*/ 
var isValidityBrithBy15IdCard = function(idCard15){  
var year =  idCard15.substring(6,8);  
var month = idCard15.substring(8,10);  
var day = idCard15.substring(10,12);  
var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法  
if(temp_date.getYear()!=parseFloat(year)  
        ||temp_date.getMonth()!=parseFloat(month)-1  
        ||temp_date.getDate()!=parseFloat(day)){  
          return false;  
}else{  
    return true;  
}  
};
var idm = idm||{};
idm.idcard = function(idCard){
if(idCard){
	if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(idCard)){
		if(idCard.length == 15 && isValidityBrithBy15IdCard(idCard)){  
			return true;
		}else if(idCard.length == 18 && isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(idCard)){  
			return true;  
		}else{
			return false; 
		}
	}else{
		return false; 
	}
}
return false;
}

//身份证规则
jQuery.validator.addMethod("idcard", function(value, element) {
	$(element).val(value.toUpperCase());
	$(element).next().removeClass("error_right");
	if(this.optional(element)){
		return true;
	}
	var idCard = value;
	return idm.idcard(idCard);
});

//身份证是否存在校验
jQuery.validator.addMethod("idcardvali", function(value, element,param) {
    $(element).next().removeClass("error_right");
    var result = "";
    $.ajax({
	  	  	async:false,
	  	 	type:"post",
	  		url: param[0],
			data:{"idcard":pm.encode.RSA(value)},
	  		success: function(r){
	    		if(r.code != '0'){
	    			result = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>"+r.msg+"</span>";
	    			flag = false;
	    		}else{
	    			flag = true;
	    		}
     	}
	  	});
    
		$(element).data('error-msg',result);
		return flag;
} ,function(params, element) {
    return $(element).data('error-msg');
})

//密码验证
jQuery.validator.addMethod("pwd",function( value, element, param ){
	$(".pwdpassmsg").text("");
	var result = "";
	var flag = false;
	
	if(!value){
		result = methods.pwd.mustfillin;
		$(element).data('error-msg',result);
		flag = false;
	}else{
		$.ajax({
	  	  	async:false,
	  	 	type:"post",
	  		url: param[0],
			data:{"password":pm.encode.RSA(value)},
	  		success: function(r){
	  			$(element).next().removeClass("error_right");
	  			$(element).next().removeClass("error_more");
		    	if(r.code != '0'){
	    			result = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>"+r.msg+"</span>";
	    			$(element).data('error-msg',result);
	    			flag =  false;
	    		}else{
	    			var attr = r.attr;
	    			var ismust = attr.ismust;
	    			var islenth = attr.islenth;
	    			var isweak = attr.isweak;
	    			var score = attr.score;
	    			if((ismust===0)&&(islenth===0)&&(isweak===0)){
	    				if(score<55){
	    					$(".pwdpassmsg").html(methods.pwd.score.weak);
						}else if(score>=75){
							$(".pwdpassmsg").html(methods.pwd.score.strong);
						}else{
							$(".pwdpassmsg").html(methods.pwd.score.middle);
						}
	    				//手动添加
	    				flag = true;
	    			}else{
	    				$(element).next().removeClass("error_right");
		    			$(element).next().addClass("error_more");
	    				result += methods.pwd.score.low;
	    				if(isweak === 0 ){
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl mb5'>"+attr.weakmsg+"</span><br/>";
	    				}else {
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl mb5'>"+attr.weakmsg+"</span><br/>";
	    				}
	    				if(islenth === 0){
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl mb5'>"+attr.lengthmsg+"</span><br/>";
	    				}else {
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl mb5'>"+attr.lengthmsg+"</span><br/>";
	    				}
	    				if(ismust === 0){
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl mb5'>"+attr.mustmsg+"</span><br/>";
	    				}else {
	    					result += "<img class='fl ml10 mr5 mb5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl mb5'>"+attr.mustmsg+"</span><br/>";
	    				}
	    				$(element).data('error-msg',result);
		    				flag =  false;
		    			}
		    		}
	         	}
	   	  	});
	    	
	    }
    return flag;
}, function(params, element) {
    return $(element).data('error-msg');
})
