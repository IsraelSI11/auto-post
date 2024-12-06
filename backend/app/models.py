from . import db
from werkzeug.security import generate_password_hash

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    @staticmethod
    def create_user(email, password):
        password_hash = generate_password_hash(password)
        new_user = User(email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return new_user
