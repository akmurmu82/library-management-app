import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import BookCard from '../components/BookCard';
import { booksAPI } from '../services/api';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  description?: string;
  genre?: string;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      const formattedBooks = data.items?.map((item: any) => ({
        _id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown',
        coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
        description: item.volumeInfo.description || '',
        genre: item.volumeInfo.categories?.[0] || 'General',
      })) || [];

      setSearchResults(formattedBooks);
    } catch (error) {
      console.error('Google Books API error:', error);
      setError('Failed to fetch from Google Books');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getAll();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const seedBooks = async () => {
    try {
      setLoading(true);
      await booksAPI.seed();
      await fetchBooks();
    } catch (error) {
      console.error('Error seeding books:', error);
      setError('Failed to seed books. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="h-16 w-16 mx-auto mb-2" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
          <button
            onClick={fetchBooks}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of books and build your personal library
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>


        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Books Available
            </h2>
            <p className="text-gray-600 mb-6">
              Get started by adding some sample books to the library.
            </p>
            <button
              onClick={seedBooks}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Add Sample Books</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))} */}
            {(searchResults.length > 0 ? searchResults : books).map((book) => (
              <BookCard key={book._id} book={book} />
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;