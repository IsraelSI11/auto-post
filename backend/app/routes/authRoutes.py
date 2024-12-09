from flask import Blueprint, request, jsonify

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    from ..services.auth import register_user
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'email and password are required!'}), 400

    return jsonify(register_user(email, password))

@auth_routes.route('/login', methods=['POST'])
def login():
    from ..services.auth import login_user
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    return jsonify(login_user(email, password))

@auth_routes.route('/protected', methods=['GET'])
def protected():
    from ..services.auth import verify_token
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing!'}), 401

    return jsonify(verify_token(token))
