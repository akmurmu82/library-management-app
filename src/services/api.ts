import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

// myBooksAPI
export const myBooksAPI = {
  getAll: () =>
    api.get('/mybooks'),

  add: (bookId: string, bookData: {
    title: string;
    author: string;
    coverImage: string;
    description?: string;
    genre?: string;
  }) =>
    api.post(`/mybooks/${bookId}`, bookData),

  updateStatus: (bookId: string, status: string) =>
    api.patch(`/mybooks/${bookId}/status`, { status }),

  updateRating: (bookId: string, rating: number) =>
    api.patch(`/mybooks/${bookId}/rating`, { rating }),

  delete: (bookId: string) => api.delete(`/mybooks/${bookId}`)

};


export default api;