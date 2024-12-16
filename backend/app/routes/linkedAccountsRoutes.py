from flask import Blueprint, request, jsonify
from functools import wraps

linked_accounts_routes = Blueprint('linked_accounts_routes', __name__)

# Decorador para autenticación
def authenticate_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        from ..services.auth import verify_token  # Para verificar el token
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        result, status_code = verify_token(token)  # Verificar el token y obtener el usuario
        if status_code != 200:
            return jsonify(result), status_code

        user = result['user']

        # Pasar el usuario autenticado a la función de la ruta
        return func(user, *args, **kwargs)
    return wrapper

@linked_accounts_routes.route('/', methods=['GET'])
@authenticate_user
def get_linked_accounts(user):
    from ..models.linkedAccount import LinkedAccount
    from ..services.twitter import get_profile_info
    account = LinkedAccount.query.filter_by(user_id=user.id).first()
    if not account:
        return jsonify({'message': 'No linked account found.'}), 404
    
    profile_info = get_profile_info(account.access_token)
    
    if 'error' in profile_info:
        return jsonify({'message': profile_info['error']}), 500
    
    return jsonify({
        'id': account.id,
        'name': profile_info['name'],
        'image_url': profile_info['profile_image_url']
    }), 200

@linked_accounts_routes.route('/', methods=['POST'])
@authenticate_user
def add_linked_account(user):
    from ..models.linkedAccount import LinkedAccount
    data = request.get_json()
    access_token = data.get('access_token')

    if not access_token:
        return jsonify({'message': 'Access_token is required!'}), 400

    try:
        new_account = LinkedAccount.add_linked_account(
            user_id=user.id,
            access_token=access_token,
        )
        return jsonify({
            'id': new_account.id,
            'access_token': new_account.access_token
        }), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400

"""
@linked_accounts_routes.route('/linked-accounts/<int:account_id>', methods=['PUT'])
@authenticate_user
def update_linked_account(user, account_id):
    account = LinkedAccount.query.get(account_id)
    if not account or account.user_id != user.id:
        return jsonify({'message': 'Account not found or unauthorized!'}), 404

    data = request.get_json()
    account_identifier = data.get('account_identifier')
    if not account_identifier:
        return jsonify({'message': 'account_identifier is required!'}), 400

    account.account_identifier = account_identifier
    db.session.commit()

    return jsonify({
        'id': account.id,
        'platform': account.platform,
        'account_identifier': account.account_identifier
    }), 200

@linked_accounts_routes.route('/linked-accounts/<int:account_id>', methods=['DELETE'])
@authenticate_user
def delete_linked_account(user, account_id):
    account = LinkedAccount.query.get(account_id)
    if not account or account.user_id != user.id:
        return jsonify({'message': 'Account not found or unauthorized!'}), 404

    db.session.delete(account)
    db.session.commit()

    return jsonify({'message': 'Linked account deleted successfully!'}), 200

"""
