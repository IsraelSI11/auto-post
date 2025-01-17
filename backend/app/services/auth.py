from ..models.user import User
from werkzeug.security import check_password_hash
import jwt
import datetime
from flask import current_app

def register_user(email, password):
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return {'message': 'User already exists!'}, 400

    User.create_user(email, password)
    return {'message': 'User registered successfully!'}, 201

def login_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {'message': 'Invalid email or password!'}, 401

    token = jwt.encode(
        {'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    return {'token': token}, 200

def logout_user(token):
    return {'message': 'User logged out successfully!'}, 200

def verify_token(token):
    try:
        decoded_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user = User.query.filter_by(email=decoded_token['email']).first()
        if not user:
            return {'message': 'Invalid token!'}, 401
        return {'user': user}, 200
    except jwt.ExpiredSignatureError:
        return {'message': 'Token has expired!'}, 401
    except jwt.InvalidTokenError:
        return {'message': 'Invalid token!'}, 401