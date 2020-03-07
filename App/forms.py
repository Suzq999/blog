import re
from flask import session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, Email, Regexp, ValidationError
from App.models import User


def check_phone(form, field):
    if not re.match(r'1[35678]\d{9}$', field.data):
        raise ValidationError("电话号码不符合规则")

# 表单注册类
class RegisterForm(FlaskForm):
    phone = StringField("电话", validators=[check_phone])
    username = StringField('用户名', validators=[DataRequired('请输入昵称')])
    password = PasswordField('密码', validators=[DataRequired('密码必须输入'), Length(min=8, max=20, message='密码必须为8-20位')])
    confirm = PasswordField('密码', validators=[EqualTo('password', message='两次密码不一致')])
    sms = StringField()
    code = StringField()

    # 字段验证
    def validate_sms(self, field):
        print(field.data, session.get("sms"))
        if field.data != session.get("sms"):
            raise ValidationError("短信验证失败")

    def validate_code(self, field):
        print(field.data, session.get('code'))
        if field.data != session.get('code'):
            raise ValidationError("验证码错误")

    # 重名
    def validate_username(self, field):
        # value是一个对象，获取用户输入的值应该是field.data
        print(field.data, "33333333")
        user = User.query.filter(User.username == field.data).first()
        if user:
            raise ValidationError('用户名重名')
        print('666666')
        return field
