from flask_socketio import emit, join_room, leave_room
from flask_jwt_extended import decode_token
from models import Note, db

# Example: handle note update events

def register_socketio_events(socketio):
    @socketio.on('join')
    def on_join(data):
        room = data['room']
        join_room(room)
        emit('status', {'msg': f'Joined room {room}'}, room=room)

    @socketio.on('leave')
    def on_leave(data):
        room = data['room']
        leave_room(room)
        emit('status', {'msg': f'Left room {room}'}, room=room)

    @socketio.on('note_update')
    def on_note_update(data):
        note_id = data['note_id']
        content = data['content']
        token = data.get('token')
        if not token:
            emit('error', {'msg': 'No token provided'})
            return
        try:
            user_id = decode_token(token)['sub']
        except Exception:
            emit('error', {'msg': 'Invalid token'})
            return
        note = Note.query.filter_by(id=note_id, user_id=user_id).first()
        if note:
            note.content = content
            db.session.commit()
            emit('note_updated', {'note_id': note_id, 'content': content}, broadcast=True)
