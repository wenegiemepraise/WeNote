import React, { useState, useEffect } from 'react';
import './darkmode.css';
import { register, login, getNotes, createNote } from './api';
import { setToken, getToken, removeToken, getUserFromToken } from './auth';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import Profile from './components/Profile';

  const [user, setUser] = useState(getUserFromToken());
  const [notes, setNotes] = useState([]);
  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('darkmode') === 'true';
  });
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkmode', dark);
  }, [dark]);

  useEffect(() => {
    if (user) {
      getNotes(getToken())
        .then(res => setNotes(res.data))
        .catch(() => setNotes([]));
    }
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (authMode === 'register') {
        await register(form.username, form.password);
        setAuthMode('login');
      } else {
        const res = await login(form.username, form.password);
        setToken(res.data.access_token);
        setUser(getUserFromToken());
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error');
    }
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setNotes([]);
  };

  const handleSaveNote = async (content) => {
    await createNote(content, getToken());
    const res = await getNotes(getToken());
    setNotes(res.data);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: '2rem auto', position: 'relative' }}>
        <button className="dark-toggle" onClick={() => setDark(d => !d)}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <h1>WeNote</h1>
        <form onSubmit={handleAuth}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <button type="submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={() => setAuthMode(m => m === 'login' ? 'register' : 'login')}>
          {authMode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', position: 'relative' }}>
      <button className="dark-toggle" onClick={() => setDark(d => !d)}>
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
      <h1>WeNote</h1>
      <button onClick={handleLogout}>Logout</button>
      <Profile />
      <NoteEditor onSave={handleSaveNote} />
      <NotesList notes={notes} />
    </div>
  );
}

export default App;
