(function( factory ) {
  if ( typeof define === "function" && define.amd ) {
    define( ["jquery", "../jquery.validate"], factory );
  } else {
    factory( jQuery );
  }
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend($.validator.messages, {
  required: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>这是必填字段</span>",
  remote: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请修正此字段</span>",
  email: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的电子邮件地址</span>",
  url: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的网址</span>",
  date: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的日期</span>",
  dateISO: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的日期 (YYYY-MM-DD)</span>",
  number: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的数字</span>",
  digits: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>只能输入数字</span>",
  creditcard: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的信用卡号码</span>",
  equalTo: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>输入不一致</span>",
  extension: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入有效的后缀</span>",
  maxlength: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>最多可以输入{0}个字符</span>"),
  minlength: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>最少要输入{0}个字符</span>"),
  rangelength: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入长度在{0}到{1}之间的字符串</span>"),
  range: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入范围在{0}到{1}之间的数值</span>"),
  max: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入不大于{0}的数值</span>"),
  min: $.validator.format("<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请输入不小于{0}的数值</span>"),
  
  //自定义返回错误结果 -- 为additional-methods.js提供
  require: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>这是必填字段</span>",
  mobilePhone: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请正确填写您的手机号码</span>",
  notBlank: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>值不能为空</span>",
  isZipCode: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请正确填写您的邮政编码</span>",
  email: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>请正确填写您的邮箱地址</span>",
  initial: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>以字母开头</span>",
  accountname: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>支持字母、字符、符号组合</span>",
  truename: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>姓名错误，须与身份证的姓名相同</span>",
  idcard: "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>身份证号码错误，须与身份证上保持相同</span>"
});

}));

/**选择使用全局变量来处理一些无法通过上述方法返回的错误字符串**/
//validate--username认证相关语言
var methods = {};
methods.username = {};
methods.username.mustfillin = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>这是必填字段</span>";
function methods_username_lenresult_right(small,large){
	return "<img class='fl mr5 mb5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl mb5'>"+small+"-"+large+"位字符</span><br/>";
}
function methods_username_lenresult_error(small,large){
	return "<img class='fl mr5 mb5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl mb5'>"+small+"-"+large+"位字符</span><br/>";
}
methods.username.initresult = {};
methods.username.initresult.right = "<img class='fl mr5 mb5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl mb5'>以字母开头</span><br/>";
methods.username.initresult.error = "<img class='fl mr5 mb5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl mb5'>以字母开头</span><br/>";
methods.username.accountresult = {};
methods.username.accountresult.right = "<img class='fl mr5' src='../static/images/client/pc/errorright_icon.png'/><span class='fl'>支持字母、字符、符号组合</span>";
methods.username.accountresult.error = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>支持字母、字符、符号组合</span>";

//validate--pwd认证相关语言
methods.pwd = {};
methods.pwd.mustfillin = "<img class='fl mr5' src='../static/images/client/pc/errormsg_icon.png'/><span class='fl'>这是必填字段</span>";
methods.pwd.score = {};
methods.pwd.score.weak = "强度：<img src='../static/images/client/pc/pwdverify_low_icon.png'/> 弱";
methods.pwd.score.strong = "强度：<img src='../static/images/client/pc/pwdverify_high_icon.png'/> 强";
methods.pwd.score.middle = "强度：<img src='../static/images/client/pc/pwdverify_middle_icon.png'/> 中";
methods.pwd.score.low = "<span class='fl ml10 mr5 mb5' style='width:200px;'>强度：<img src='../static/images/client/pc/pwdverify_low_icon.png'/><span class='ml10' style='color:#ef6664'>低</span></span>";


