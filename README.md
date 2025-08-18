
# WeNote

A collaborative note-taking application where multiple users can edit notes in real time.

## Features
- Real-time collaborative editing (React + Flask-SocketIO)
- User authentication (JWT/Flask-Login)
- Notes tied to user accounts
- Modular backend and frontend for easy extension

## Tech Stack
- **Frontend:** React, Socket.IO Client, Axios
- **Backend:** Flask, Flask-SocketIO, Flask-JWT-Extended, Flask-Login, SQLAlchemy, SQLite

## Getting Started

### Backend Setup
1. Navigate to the `backend` folder:
	```sh
	cd backend
	```
2. Create a virtual environment and activate it:
	```sh
	python -m venv venv
	venv\Scripts\activate  # On Windows
	```
3. Install dependencies:
	```sh
	pip install -r requirements.txt
	```
4. Run the backend server:
	```sh
	python app.py
	```

### Frontend Setup
1. Navigate to the `frontend` folder:
	```sh
	cd frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the React app:
	```sh
	npm start
	```

## Usage
- Register or log in to your account.
- Create, view, and edit notes.
- Notes are updated in real time for all users (collaborative editing coming soon).

## Folder Structure
```
WeNote/
  backend/
	 app.py
	 models.py
	 routes.py
	 socketio_events.py
	 requirements.txt
	 .env
  frontend/
	 src/
		App.js
		index.js
		api.js
		auth.js
		socket.js
		components/
		  NoteEditor.js
		  NotesList.js
	 package.json
```

## License
MIT
