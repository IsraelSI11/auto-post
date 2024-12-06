from flask import Blueprint, request, jsonify
from .auth import register_user, login_user, verify_token

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def get():
    return jsonify({'message': 'Hello, World!'})

@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'email and password are required!'}), 400

    return jsonify(register_user(email, password))

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    return jsonify(login_user(email, password))

@routes.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing!'}), 401

    return jsonify(verify_token(token))
