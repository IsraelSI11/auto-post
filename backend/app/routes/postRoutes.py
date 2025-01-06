from flask import Blueprint, request, jsonify
from functools import wraps
from pytz import timezone
from flask import current_app as app
from ..services.twitter import post_tweet
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from datetime import datetime
from ..models.linkedAccount import LinkedAccount
from ..models.event import Event
import uuid

post_routes = Blueprint('post_routes', __name__)

jobstores = {
    'default': SQLAlchemyJobStore(url='sqlite:///jobs.sqlite')
}
job_defaults = {
    'replace_existing': True
}

scheduler = BackgroundScheduler(jobstores=jobstores, job_defaults=job_defaults, timezone=timezone('Europe/Madrid'))

scheduler.start()

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

@post_routes.route('/', methods=['GET'])
@authenticate_user
def get_scheduled_posts(user):
    linked_account = LinkedAccount.query.filter_by(user_id=user.id).first()
    if not linked_account:
        return jsonify({'message': 'No linked Twitter account found.'}), 404

    events = Event.query.filter_by(linked_account_id=linked_account.id).all()
    return jsonify([{
        'id': event.id,
        'title': event.title,
        'date': event.date
    } for event in events]), 200

@post_routes.route('/', methods=['POST'])
@authenticate_user
def schedule_post(user):

    data = request.get_json()
    text = data.get('text')
    date = data.get('date')
    
    # Convertir la cadena a un objeto datetime
    dt = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
    run_date = dt.strftime("%Y-%m-%d %H:%M:%S")
    print(run_date)

    if not text or not date:
        return jsonify({'message': 'Text And Date are required!'}), 400

    try:
        with app.app_context():
            linked_account = LinkedAccount.query.filter_by(user_id=user.id).first()
            if not linked_account or not linked_account.access_token:
                print("No linked Twitter account found.")
                return
            job_id = str(uuid.uuid4())
            job = scheduler.add_job(post_tweet, 'date', run_date=run_date, id=job_id, args=[linked_account.access_token, text])
            Event.add_event(id=job_id,linked_account_id=linked_account.id, title=text, date=dt)
            #job.remove()
            return jsonify({
                "message": "Post scheduled successfully!",
                "job_id": job_id
            }), 201
    except ValueError as e:
        print(str(e))
        return jsonify({'message': str(e)}), 400

@post_routes.route('/<job_id>', methods=['DELETE'])
@authenticate_user
def delete_scheduled_post(user, job_id):
    try:
        with app.app_context():
            linked_account = LinkedAccount.query.filter_by(user_id=user.id).first()
            if not linked_account:
                print("No linked Twitter account found.")
                return jsonify({'message': 'No linked Twitter account found.'}), 404
            job = scheduler.get_job(job_id)
            if not job:
                print("Job not found.")
                return jsonify({'message': 'Job not found.'}), 404
            # Comprobamos que el evento está asociado a la cuenta de Twitter del usuario
            event = Event.query.filter_by(id=job_id, linked_account_id=linked_account.id).first()
            if not event:
                print("Job not foundasdasd.")
                return jsonify({'message': 'Job not found.'}), 404
            Event.delete_event(job_id)
            job.remove()
            return jsonify({'message': 'Job deleted successfully!'}), 200
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    
@post_routes.route('/<job_id>', methods=['PUT'])
@authenticate_user
def update_scheduled_post(user, job_id):
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'message': 'Text is required!'}), 400

    try:
        with app.app_context():
            linked_account = LinkedAccount.query.filter_by(user_id=user.id).first()
            if not linked_account or not linked_account.access_token:
                print("No linked Twitter account found.")
                return jsonify({'message': 'No linked Twitter account found.'}), 404
            job = scheduler.get_job(job_id)
            if not job:
                print("Job not found.")
                return jsonify({'message': 'Job not found.'}), 404
            # Comprobamos que el evento está asociado a la cuenta de Twitter del usuario
            event = Event.query.filter_by(id=job_id, linked_account_id=linked_account.id).first()
            if not event:
                print("Job not found.")
                return jsonify({'message': 'Job not found.'}), 404
            # Update the job with the new text
            job.modify(args=[linked_account.access_token, text])
            Event.update_event(event_id=job_id, title=text)
            return jsonify({'message': 'Job updated successfully!'}), 200
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
