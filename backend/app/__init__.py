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
    from .models.linkedAccount import LinkedAccount
    from .models.user import User
    from .routes.authRoutes import auth_routes
    from .routes.postRoutes import post_routes
    from .routes.linkedAccountsRoutes import linked_accounts_routes
    from .routes.generateRoutes import generate_routes
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///autopost.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.register_blueprint(auth_routes, url_prefix='/')
    app.register_blueprint(linked_accounts_routes, url_prefix='/link')
    app.register_blueprint(post_routes, url_prefix='/post')
    app.register_blueprint(generate_routes, url_prefix='/generate')
    with app.app_context():
        init_db()
    return app

def init_db():
    db.drop_all()
    db.create_all()

