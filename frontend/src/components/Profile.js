import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, setToken } from '../auth';

const API_URL = 'http://localhost:5000/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => {
        setProfile(res.data);
        setUsername(res.data.username);
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.patch(`${API_URL}/settings`, { username }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setMsg('Username updated!');
      setEditing(false);
      setProfile(p => ({ ...p, username }));
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error updating');
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: '1rem 0' }}>
      <h2>Profile</h2>
      <div><b>User ID:</b> {profile.id}</div>
      <div>
        <b>Username:</b> {editing ? (
          <form onSubmit={handleUpdate} style={{ display: 'inline' }}>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
            <button type="submit">Save</button>
            <button type="button" onClick={() => { setEditing(false); setUsername(profile.username); }}>Cancel</button>
          </form>
        ) : (
          <>
            {profile.username} <button onClick={() => setEditing(true)}>Edit</button>
          </>
        )}
      </div>
      {msg && <div style={{ color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</div>}
    </div>
  );
};

export default Profile;
