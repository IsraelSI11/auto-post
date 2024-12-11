from .user import User
from .. import db
from sqlalchemy.orm import validates

class LinkedAccount(db.Model):
    __tablename__ = 'linked_account'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    access_token = db.Column(db.String(255), unique=True, nullable=False)

    # Define relación inversa
    user = db.relationship('User', back_populates='linked_accounts')

    @staticmethod
    def add_linked_account(user_id, access_token):
        # Verificar si ya existe una cuenta de esta plataforma para el usuario
        existing_account = LinkedAccount.query.filter_by(user_id=user_id).first()
        if existing_account:
            raise ValueError(f"El usuario ya tiene una cuenta enlazada.")

        # Crear nueva cuenta enlazada
        new_account = LinkedAccount(user_id=user_id, access_token = access_token )
        db.session.add(new_account)
        db.session.commit()
        return new_account


# Relación en el modelo User
User.linked_accounts = db.relationship(
    'LinkedAccount',
    back_populates='user',
    cascade='all, delete-orphan'
)
