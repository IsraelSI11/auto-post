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

        user = verify_token(token)  # Verificar el token y obtener el usuario
        if not user:
            return jsonify({'message': 'Invalid or expired token!'}), 401

        # Pasar el usuario autenticado a la función de la ruta
        return func(user, *args, **kwargs)
    return wrapper

@linked_accounts_routes.route('/linked-accounts', methods=['GET'])
@authenticate_user
def get_linked_accounts(user):
    from ..models.linkedAccount import LinkedAccount
    accounts = LinkedAccount.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'id': account.id,
        'platform': account.platform,
        'account_identifier': account.account_identifier
    } for account in accounts]), 200

@linked_accounts_routes.route('/linked-accounts', methods=['POST'])
@authenticate_user
def add_linked_account(user):
    from ..models.linkedAccount import LinkedAccount
    data = request.get_json()
    platform = data.get('platform')
    account_identifier = data.get('account_identifier')

    if not platform or not account_identifier:
        return jsonify({'message': 'Platform and account_identifier are required!'}), 400

    try:
        new_account = LinkedAccount.add_linked_account(
            user_id=user.id,
            platform=platform,
            account_identifier=account_identifier
        )
        return jsonify({
            'id': new_account.id,
            'platform': new_account.platform,
            'account_identifier': new_account.account_identifier
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
