from app import create_app, db
from app.routes import routes
from backend.app.models.user import *

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
