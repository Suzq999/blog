from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()

login_manager = LoginManager()


def init_third(app):
    db.init_app(app)

    login_manager.init_app(app)
    login_manager.login_view = '/login/'
