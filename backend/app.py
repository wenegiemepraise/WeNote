import os
from flask import Flask

from flask_cors import CORS
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

from models import db
from routes import bp as api_bp
from socketio_events import register_socketio_events

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wenote.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
jwt = JWTManager(app)
login_manager = LoginManager(app)
db.init_app(app)

app.register_blueprint(api_bp, url_prefix='/api')

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def index():
    return {'msg': 'WeNote backend running!'}

if __name__ == '__main__':
    register_socketio_events(socketio)
    socketio.run(app, debug=True)
