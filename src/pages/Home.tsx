import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import BookCard from '../components/BookCard';
import { booksAPI } from '../services/api';
import { debounce } from '../utils/debounce';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

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
  const [isSearching, setIsSearching] = useState(false);

  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);


  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setIsSearching(true);
      setError(null);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
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

      if (formattedBooks.length === 0) {
        toast('No books found', { icon: '📚' });
      }

    } catch (error) {
      console.error('Google Books API error:', error);
      setError('Failed to fetch from Google Books');
      toast.error('Failed to fetch from Google Books');
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => handleSearch(query), 500),
    []
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      // You can pick a random common keyword or topic to keep results relevant
      const keywords = ['fiction', 'science', 'adventure', 'development', 'fantasy', 'novel', 'coding', 'design'];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(randomKeyword)}&maxResults=12`
      );
      const data = await res.json();

      const formatted = data.items?.map((item: any) => ({
        _id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown',
        coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
        description: item.volumeInfo.description || '',
        genre: item.volumeInfo.categories?.[0] || 'General',
      })) || [];

      setSuggestedBooks(formatted);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };


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
      <div className="min-h-screen bg-backgroundLight dark:backgroundDark flex items-center justify-center" >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-primary">Loading books...</p>
        </div>
      </div >
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
          <Button onClick={fetchBooks}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundLight dark:bg-backgroundDark text-textPrimary dark:textSecondary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-textPrimary dark:text-white mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-textPrimary dark:text-textSecondary max-w-2xl mx-auto">
            Explore our curated collection of books and build your personal library
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedSearch(e.target.value);
            }}

            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={() => handleSearch(searchTerm)}>
            Search
          </Button>
        </div>

        {/* While searching */}
        {isSearching && searchTerm && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-primary dark:secondary">Searching for "{searchTerm}"...</p>
          </div>
        )}

        {/* Search results */}
        {!isSearching && searchTerm && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {searchResults.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* No search results */}
        {!isSearching && searchTerm && searchResults.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Results Found
            </h2>
            <p className="text-gray-600 mb-6">
              Try searching for a different title or author.
            </p>
          </div>
        )}

        {/* Book Cards */}
        {!searchTerm && (
          <div className="mb-12">
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-textPrimary dark:text-white">
                Discover New Books
              </h2>
              <Button onClick={fetchSuggestions}>
                Show other suggestions
              </Button>
            </div>


            {loadingSuggestions ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading suggestions...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                {suggestedBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No books available */}
        {!searchTerm && books.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Books Available
            </h2>
            <p className="text-gray-600 mb-6">
              Get started by adding some sample books to the library.
            </p>
            <Button onClick={seedBooks}>
              <RefreshCw className="h-5 w-5" />
              <span>Add Sample Books</span>
            </Button>
          </div>
        )}
      </div>
    </div >
  );
};

export default Home;