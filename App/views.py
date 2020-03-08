from random import randint

from flask import Blueprint, render_template, request, redirect, url_for, session, make_response, jsonify, flash
from flask_login import login_user

from App.models import *
from App.forms import RegisterForm
from App.verifycode import vc
from App.sms import sms

bp = Blueprint('bp', __name__)


# 1.首页
@bp.route("/")
def home():
    articles = Article.query.all()
    user = User.query.first()
    print(user.username)

    three_articles = Article.query.order_by(-Article.create_time).all()[:3]

    # articles = db.session.query(Article, Category).filter(Article.cid == Category.cid, Category.cid == aid).all()
    # categories = Category.query.all()
    return render_template("index.html", **locals())

# 2.1 tag跳转
@bp.route('/tag/')
@bp.route('/tag/<int:tid>')
def tag(tid=1):
    articles = db.session.query(Article, Tag).filter(Article.aid == Tag.aid, Tag.tid == tid).all()
    print(articles)
    article_num = len(articles)

    categories = Category.query.all()

    three_articles = Article.query.order_by(-Article.create_time).all()[:3]

    tags = Tag.query.all()
    print(tags)
    user = User.query.first()
    return render_template('blog.html', **locals())


# 2.分类的博客 cid
@bp.route("/list/")
@bp.route("/list/<int:cid>")
def list_article(cid=-1):
    if cid < 0:  # 查询默认
        category = Category.query.first()
        cid = category.cid

    articles = db.session.query(Article, Category).filter(Article.cid == Category.cid, Category.cid == cid).all()
    article_num = len(articles)
    print(articles)

    categories = Category.query.all()
    print(categories)
    for i in categories:
        print(i)
    user = User.query.first()

    # 最近3篇文章
    three_articles = Article.query.order_by(-Article.create_time).all()[:3]

    # 标签
    tags = Tag.query.all()
    # 改进 以下看是否有错
    # print(tags1)
    # for tag in tags1:
    #     print(tag)
    # article_tag = db.session.query(Article, Tag).filter(Article.aid == Tag.aid, Tag.tid == tid).all()
    return render_template("blog.html", **locals())

# 3.1 tag跳转
@bp.route('/tag1/')
@bp.route('/tag1/<int:tid1>')
def tag1(tid1=1):
    articles = db.session.query(Article, Tag).filter(Article.aid == Tag.aid, Tag.tid == tid1).all()
    print(articles)
    article_num = len(articles)

    categories = Category.query.all()

    three_articles = Article.query.order_by(-Article.create_time).all()[:3]

    tags1 = Tag.query.all()
    print(tags1)
    user = User.query.first()
    return render_template('post.html', **locals())


# 3.详细的一篇博客
@bp.route("/one/")
@bp.route("/one/<int:aid>")
def one_article(aid=-1):
    if aid < 0:  # 查询默认
        article = Article.query.first()
        aid = article.aid
    articles = db.session.query(Article).filter(Article.aid == aid).first()
    tags = db.session.query(Article, Tag).filter(Article.aid == Tag.aid, Article.aid == aid).first()
    print(tags)
    user = User.query.all()
    print(user)
    articles1 = Article.query.all()
    num = len(articles1)
    # print(articles1)
    mark = Mark.query.all()
    # 最近三篇
    three_articles = Article.query.order_by(-Article.create_time).all()[:3]
    # 分类
    categories = Category.query.all()
    print(categories)
    for i in categories:
        print(i)
    # 标签
    tags1 = Tag.query.all()
    print(categories)
    return render_template("post.html", **locals())


# 4.注册
@bp.route("/register/", methods=['GET', 'POST'])
def register_user():
    # 实例化表单类
    form = RegisterForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            # 验证
            username = request.values.get("username")
            password = request.values.get("password")
            phone = request.values.get("phone")
            print(username, password, phone)
            # 符合，存入。
            user = User(username=username, password=password, phone=phone)
            db.session.add(user)
            db.session.commit()
            # 去登陆
            return redirect(url_for('bp.login_user'))

    return render_template("register.htm", **locals())


# 图形验证码
@bp.route("/verify/")
def verify_code():
    result = vc.generate()
    # 把验证码字符串保存到session
    session['code'] = vc.code
    # 创建响应对象
    response = make_response(result)
    response.headers["Content-Type"] = "image/png"
    return response


# 短信验证码
@bp.route("/send/", methods=['GET', 'POST'])
def send_sms():
    phone = request.values.get('phone')
    print(phone)
    if phone:
        num = randint(10000, 99999)
        para = "{'number':'%d'}" % num
        session['sms'] = str(num)
        res = sms.send(phone, para)
        print(res, type(res))
        return jsonify({'code': 1, 'msg': '发送成功'})
    return jsonify({'code': 0, 'msg': '电话号码不存在'})


# 5.登录
@bp.route("/login/", methods=['GET', 'POST'])
def user_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        print(username, password)
        us = User.query.filter(User.username == username, User.password == password).first()
        if us:
            login_user(us)
            return redirect(url_for('bp.home'))
        else:
            flash('用户名或密码错误!')
    return render_template('login.htm')
