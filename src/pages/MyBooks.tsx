import React, { useState, useEffect } from 'react';
import { Library, BookOpen, Users, Star } from 'lucide-react';
import MyBookCard from '../components/MyBookCard';
import { myBooksAPI } from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

interface MyBook {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
    description?: string;
    genre?: string;
  };
  status: 'Want to Read' | 'Currently Reading' | 'Read';
  rating: number | null;
}

const MyBooks: React.FC = () => {
  const [myBooks, setMyBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await myBooksAPI.getAll();
      setMyBooks(response.data);
    } catch (error) {
      console.error('Error fetching my books:', error);
      setError('Failed to load your books. Please try again.');
      toast('Failed to load your books. Please try again.', { icon: '📚' });
    } finally {
      setLoading(false);
    }
  };

  const handleBookUpdate = (updatedBook: MyBook) => {
    setMyBooks(prevBooks =>
      prevBooks.map(book =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  const getFilteredBooks = () => {
    if (filter === 'all') return myBooks;
    return myBooks.filter(book => book.status === filter);
  };

  const getStatistics = () => {
    const total = myBooks.length;
    const wantToRead = myBooks.filter(book => book.status === 'Want to Read').length;
    const currentlyReading = myBooks.filter(book => book.status === 'Currently Reading').length;
    const read = myBooks.filter(book => book.status === 'Read').length;
    const avgRating = myBooks.filter(book => book.rating)
      .reduce((sum, book) => sum + (book.rating || 0), 0) / myBooks.filter(book => book.rating).length;

    return { total, wantToRead, currentlyReading, read, avgRating };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-backgroundLight dark:backgroundDark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-backgroundLight dark:backgroundDark flex items-center justify-center">
        <div className="text-center">
          <Library className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-red-600 mb-4">{error}</p>
          <Button onClick={fetchMyBooks}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const filteredBooks = getFilteredBooks();

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-backgroundLight dark:bg-backgroundDark text-textPrimary dark:textSecondary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-textPrimary dark:text-white mb-4">
            My Personal Library
          </h1>
          <p className="text-xl text-textSecondary dark:text-white">
            Track your reading journey and rate your favorite books
          </p>
        </div>

        {myBooks.length === 0 ? (
          <div className="text-center py-12">
            <Library className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-textPrimary dark:text-white mb-4">
              Your library is empty
            </h2>
            <p className="text-textSecondary dark:text-gray-400 mb-6">
              Start building your personal library by adding books from our collection.
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary.dark dark:hover:bg-primary.light transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Browse Books</span>
            </a>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-center transition-colors">
                <Library className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">{stats.total}</p>
                <p className="text-xs sm:text-sm text-textSecondary dark:text-gray-400">Total Books</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-center transition-colors">
                <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">{stats.currentlyReading}</p>
                <p className="text-xs sm:text-sm text-textSecondary dark:text-gray-400">Currently Reading</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-center transition-colors">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">{stats.read}</p>
                <p className="text-xs sm:text-sm text-textSecondary dark:text-gray-400">Books Read</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-center transition-colors">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">
                  {stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}
                </p>
                <p className="text-xs sm:text-sm text-textSecondary dark:text-gray-400">Avg Rating</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'all', label: 'All Books' },
                { key: 'Want to Read', label: 'Want to Read' },
                { key: 'Currently Reading', label: 'Currently Reading' },
                { key: 'Read', label: 'Read' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors border
          ${filter === key
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : 'bg-white dark:bg-gray-800 text-textPrimary dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-300 dark:border-gray-600'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBooks.map((myBook) => (
                <MyBookCard
                  key={myBook._id}
                  myBook={myBook}
                  onUpdate={handleBookUpdate}
                  onDelete={(deletedId) =>
                    setMyBooks(prev => prev.filter(book => book._id !== deletedId))
                  }
                />
              ))}
            </div>

            {filteredBooks.length === 0 && filter !== 'all' && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-textPrimary dark:text-white mb-4">
                  No books found
                </h2>
                <p className="text-textSecondary dark:text-gray-400">
                  No books match the selected filter.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooks;