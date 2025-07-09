# Books Library Management App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing a personal book library, similar to Goodreads.

## Features

### User Authentication
- User registration and login using JWT
- Secure password hashing with bcryptjs
- HTTP-only cookies for session management
- Protected routes for authenticated users

### Book Management
- Browse a curated collection of books
- Add books to personal library with "Want to Read" status
- Track reading progress with status updates (Want to Read, Currently Reading, Read)
- Rate books with a 5-star rating system
- View personal library statistics

### User Interface
- Responsive design that works on all devices
- Modern, clean interface with smooth animations
- Book cards with hover effects and transitions
- User-friendly navigation and status indicators
- Loading states and error handling

## Tech Stack

### Frontend
- **React** - User interface library
- **TypeScript** - Type safety and better developer experience
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse HTTP cookies

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd books-library-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/books-library
   JWT_SECRET=your-super-secret-jwt-key-here
   ALLOWED_ORIGINS=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   
   Start the backend server:
   ```bash
   npm run server:dev
   ```
   
   In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Sample Data

To populate the database with sample books, visit the home page and click the "Add Sample Books" button, or make a POST request to `/api/books/seed`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Books
- `GET /api/books` - Get all books
- `POST /api/books/seed` - Seed sample books (development)

### My Books (Protected)
- `GET /api/mybooks` - Get user's books
- `POST /api/mybooks/:bookId` - Add book to user's library
- `PATCH /api/mybooks/:bookId/status` - Update reading status
- `PATCH /api/mybooks/:bookId/rating` - Update book rating

## Database Schema

### Users Collection
```javascript
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "password": "hashed_password",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Books Collection
```javascript
{
  "_id": "ObjectId",
  "title": "Book Title",
  "author": "Author Name",
  "coverImage": "Image URL",
  "availability": true,
  "description": "Book description",
  "genre": "Genre",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### MyBooks Collection
```javascript
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "bookId": "ObjectId (ref: Book)",
  "status": "Want to Read | Currently Reading | Read",
  "rating": 1-5,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Features in Detail

### User Authentication
- Secure registration and login system
- JWT tokens stored in HTTP-only cookies
- Password validation and hashing
- Protected routes for authenticated users

### Book Discovery
- Browse all available books
- Beautiful book cards with cover images
- Add books to personal library
- Smart handling of duplicate additions

### Personal Library Management
- View all books in your library
- Filter books by reading status
- Update reading progress
- Rate books with star ratings
- View library statistics

### Responsive Design
- Mobile-first design approach
- Smooth transitions and animations
- Intuitive user interface
- Loading states and error handling

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies to prevent XSS
- CORS configuration
- Input validation and sanitization
- Protected API routes

## Future Enhancements

- Book search and filtering
- Book recommendations
- Reading goals and progress tracking
- Social features (friends, reviews)
- Book details and reviews
- Advanced statistics and analytics
- Email notifications
- Social media integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.