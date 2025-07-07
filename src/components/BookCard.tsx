import React, { useState } from 'react';
import { Plus, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { myBooksAPI } from '../services/api';

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
      alert('Please log in to add books to your library');
      return;
    }

    setIsAdding(true);
    try {
      await myBooksAPI.add(book._id);
      setIsAdded(true);
      onAddToLibrary?.(book._id);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error: any) {
      console.error('Error adding book:', error);
      if (error.response?.data?.message === 'Book already in your library') {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-gray-600 mb-2 text-sm">
          by {book.author}
        </p>
        
        {book.genre && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
            {book.genre}
          </span>
        )}
        
        {book.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {book.description}
          </p>
        )}
        
        <button
          onClick={handleAddToLibrary}
          disabled={isAdding || isAdded}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isAdded 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : isAdding
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added to Library</span>
            </>
          ) : isAdding ? (
            <>
              <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Want to Read</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookCard;