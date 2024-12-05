from .models import User
from werkzeug.security import check_password_hash
import jwt
import datetime
from flask import current_app

def register_user(username, password):
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return {'message': 'User already exists!'}, 400

    User.create_user(username, password)
    return {'message': 'User registered successfully!'}, 201

def login_user(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {'message': 'Invalid username or password!'}, 401

    token = jwt.encode(
        {'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    return {'token': token}, 200

def verify_token(token):
    try:
        decoded_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return {'username': decoded_token['username']}, 200
    except jwt.ExpiredSignatureError:
        return {'message': 'Token has expired!'}, 401
    except jwt.InvalidTokenError:
        return {'message': 'Invalid token!'}, 401