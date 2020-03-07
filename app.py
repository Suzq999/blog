from flask import Flask
from flask_script import Manager
from App.views import bp
from App.ext import db, init_third
from flask_migrate import Migrate, MigrateCommand
from App.ext import login_manager

app = Flask(__name__)

app.config.from_pyfile("settings.py")

init_third(app)

migrate = Migrate(db=db, app=app)

manager = Manager(app)

manager.add_command('db', MigrateCommand)

app.register_blueprint(bp)

if __name__ == '__main__':
    manager.run()
