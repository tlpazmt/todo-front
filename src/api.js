import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000/api';

const api = axios.create();

const token = localStorage.getItem('token');

if (!token) {
  await login();
} else {
  setToken(token);
}

function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

async function login() {
  const response = await api.post('http://localhost:8000/api/login');
  localStorage.setItem('token', response.data.token);
  setToken(response.data.token);
  return response.data;
}

async function getStatuses() {
  const response = await api.get('http://localhost:8000/api/statuses');
  return response.data;
}

async function getTasks() {
  const response = await api.get('http://localhost:8000/api/tasks');
  return response.data;
}

export { api, getStatuses, getTasks };
