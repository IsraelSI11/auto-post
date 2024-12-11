from flask import Blueprint, request, jsonify
from functools import wraps
from pytz import timezone
from flask import current_app as app
from ..services.twitter import post_tweet
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from datetime import datetime
from ..models.linkedAccount import LinkedAccount

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
            job = scheduler.add_job(post_tweet, 'date', run_date=run_date, args=[linked_account.access_token,text])
            print("trabajo añadido") 
            #job.remove()
            return jsonify({
                "message": "Post scheduled successfully!",
            }), 201
    except ValueError as e:
        print(str(e))
        return jsonify({'message': str(e)}), 400