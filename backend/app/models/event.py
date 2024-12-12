from .linkedAccount import LinkedAccount
from .. import db

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    linked_account_id = db.Column(db.Integer, db.ForeignKey('linked_account.id'), nullable=False)
    title = db.Column(db.String(255), unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    # Define relación inversa
    linked_account = db.relationship('LinkedAccount', back_populates='events')

    @staticmethod
    def add_event(linked_account_id, title, date):
        # Crear nuevo evento
        new_event = Event(linked_account_id=linked_account_id, title=title, date=date)
        db.session.add(new_event)
        db.session.commit()
        return new_event


# Relación en el modelo User
LinkedAccount.events = db.relationship(
    'Event',
    back_populates='linked_account',
    cascade='all, delete-orphan'
)