import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (username, password) =>
  axios.post(`${API_URL}/register`, { username, password });

export const login = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });

export const getNotes = (token) =>
  axios.get(`${API_URL}/notes`, { headers: { Authorization: `Bearer ${token}` } });

export const createNote = (content, token) =>
  axios.post(`${API_URL}/notes`, { content }, { headers: { Authorization: `Bearer ${token}` } });
