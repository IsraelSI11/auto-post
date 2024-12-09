from .user import User
from .. import db
from sqlalchemy.orm import validates

class LinkedAccount(db.Model):
    __tablename__ = 'linked_account'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    platform = db.Column(db.String(20), nullable=False)
    account_identifier = db.Column(db.String(80), unique=True, nullable=False)  # e.g., username or ID

    # Define relación inversa
    user = db.relationship('User', back_populates='linked_accounts')

    @validates('platform')
    def validate_platform(self, key, value):
        allowed_platforms = ['twitter', 'tiktok', 'instagram']
        if value not in allowed_platforms:
            raise ValueError(f"Plataforma no permitida: {value}")
        return value

    @staticmethod
    def add_linked_account(user_id, platform, account_identifier):
        # Verificar si ya existe una cuenta de esta plataforma para el usuario
        existing_account = LinkedAccount.query.filter_by(user_id=user_id, platform=platform).first()
        if existing_account:
            raise ValueError(f"El usuario ya tiene una cuenta enlazada de {platform}.")

        # Crear nueva cuenta enlazada
        new_account = LinkedAccount(user_id=user_id, platform=platform, account_identifier=account_identifier)
        db.session.add(new_account)
        db.session.commit()
        return new_account


# Relación en el modelo User
User.linked_accounts = db.relationship(
    'LinkedAccount',
    back_populates='user',
    cascade='all, delete-orphan'
)
