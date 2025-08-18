from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_login import login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User, Note

bp = Blueprint('api', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'msg': 'Username already exists'}), 400
    user = User(username=data['username'], password=generate_password_hash(data['password']))
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User registered'})

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        login_user(user)
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token})
    return jsonify({'msg': 'Invalid credentials'}), 401

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    logout_user()
    return jsonify({'msg': 'Logged out'})

@bp.route('/notes', methods=['GET', 'POST'])
@jwt_required()
def notes():
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        note = Note(content=data['content'], user_id=user_id)
        db.session.add(note)
        db.session.commit()
        return jsonify({'msg': 'Note created'})
    else:
        notes = Note.query.filter_by(user_id=user_id).all()
        return jsonify([{'id': n.id, 'content': n.content, 'timestamp': n.timestamp} for n in notes])
