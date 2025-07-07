import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth API
export const authAPI = {
  register: (email: string, password: string) => 
    api.post('/auth/register', { email, password }),
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  logout: () => 
    api.post('/auth/logout'),
  me: () => 
    api.get('/auth/me')
};

// Books API
export const booksAPI = {
  getAll: () => 
    api.get('/books'),
  seed: () => 
    api.post('/books/seed')
};

// MyBooks API
export const myBooksAPI = {
  getAll: () => 
    api.get('/mybooks'),
  add: (bookId: string) => 
    api.post(`/mybooks/${bookId}`),
  updateStatus: (bookId: string, status: string) => 
    api.patch(`/mybooks/${bookId}/status`, { status }),
  updateRating: (bookId: string, rating: number) => 
    api.patch(`/mybooks/${bookId}/rating`, { rating })
};

export default api;