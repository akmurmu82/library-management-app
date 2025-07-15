import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { myBooksAPI } from '../services/api';
import toast from 'react-hot-toast';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  description?: string;
  genre?: string;
}

interface BookCardProps {
  book: Book;
  onAddToLibrary?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToLibrary }) => {
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToLibrary = async () => {
    if (!isAuthenticated) {
      toast('Please log in to add books to your library', { icon: '🔒' });
      return;
    }

    setIsAdding(true);
    try {
      await myBooksAPI.add(book._id, {
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        description: book.description,
        genre: book.genre
      });
      setIsAdded(true);
      onAddToLibrary?.(book._id);
      setTimeout(() => setIsAdded(false), 2000);
      toast('Book added to your library!', { icon: '📚' });
    } catch (error: any) {
      console.error('Error adding book:', error);
      if (error.response?.data?.message === 'Book already in your library') {
        setIsAdding(false);
        toast('Book already in your library', { icon: '📚' });
        setTimeout(() => setIsAdded(false), 2000);
      } else {
        toast('Failed to add book', { icon: '❌' });
      }
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div className="p-2 overflow-hidden bg-backgroundLight dark:bg-backgroundDark transition-colors duration-300 flex flex-col lg:flex-row group rounded-lg shadow hover:shadow-lg">
      {/* Cover Image */}
      <div className="relative flex-shrink-0 w-full lg:w-48 h-64 lg:h-auto overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary dark:text-white mb-1 line-clamp-2">
            {book.title}
          </h3>

          <p className="text-textSecondary dark:text-gray-400 text-sm mb-2">
            by {book.author}
          </p>

          {book.genre && (
            <span className="inline-block bg-primary/10 text-primary dark:bg-primary.dark/20 dark:text-primary.light text-xs px-2 py-1 rounded-full mb-3">
              {book.genre}
            </span>
          )}

          {book.description && (
            <p className="text-textPrimary dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {book.description}
            </p>
          )}
        </div>

        <button
          onClick={handleAddToLibrary}
          disabled={isAdding || isAdded}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border
        ${isAdded
              ? 'bg-green-50 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'
              : isAdding
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600'
                : 'bg-primary text-white hover:bg-primary.dark dark:bg-primary.dark dark:hover:bg-primary'
            }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span className="font-bold">Added to Library</span>
            </>
          ) : isAdding ? (
            <>
              <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span className="font-bold">Adding...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span className="font-bold">Want to Read</span>
            </>
          )}
        </button>
      </div>
    </div>


  );
};

export default BookCard;