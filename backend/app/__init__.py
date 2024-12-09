import click
from flask import Flask
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv

import os

load_dotenv()

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

def create_app():
    from .routes.authRoutes import auth_routes
    from .routes.linkedAccountsRoutes import linked_accounts_routes
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///autopost.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.register_blueprint(auth_routes, url_prefix='/')
    app.register_blueprint(linked_accounts_routes, url_prefix='/link')
    with app.app_context():
        init_db()
    return app

def init_db():
    db.drop_all()
    db.create_all()

