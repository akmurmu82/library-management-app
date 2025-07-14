import React, { useState } from 'react';
import { Star, BookOpen, CheckCircle } from 'lucide-react';
import { myBooksAPI } from '../services/api';
import toast from 'react-hot-toast';

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

interface MyBookCardProps {
  myBook: MyBook;
  onUpdate: (updatedBook: MyBook) => void;
}

const MyBookCard: React.FC<MyBookCardProps> = ({ myBook, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await myBooksAPI.updateStatus(myBook.bookId._id, newStatus);
      onUpdate(response.data);
      toast(`Status updated to ${newStatus}`, { icon: '✅' });
    } catch (error) {
      console.error('Error updating status:', error);
      toast('Failed to update status', { icon: '❌' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setIsUpdating(true);
    try {
      const response = await myBooksAPI.updateRating(myBook.bookId._id, newRating);
      onUpdate(response.data);
      toast(`Rating updated to ${newRating}/5`, { icon: '⭐' });
    } catch (error) {
      console.error('Error updating rating:', error);
      toast('Failed to update rating', { icon: '❌' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to throw away "${myBook.bookId.title}"?`)) return;
    setIsUpdating(true);
    try {
      await myBooksAPI.delete(myBook.bookId._id);
      toast(`You threw away "${myBook.bookId.title}" 📚❌`);
      // call onUpdate with null to tell parent to remove it
      onUpdate({ ...myBook, _deleted: true } as any);
    } catch (error) {
      console.error('Error deleting book:', error);
      toast('Failed to throw the book', { icon: '❌' });
    } finally {
      setIsUpdating(false);
    }
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Want to Read':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'Currently Reading':
        return <div className="h-4 w-4 bg-orange-500 rounded-full animate-pulse" />;
      case 'Read':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Want to Read':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Currently Reading':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Read':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex sm:flex-row flex-col items-start sm:items-center p-4">
        <div className="w-full sm:w-32 flex-shrink-0">
          <img
            src={myBook.bookId.coverImage}
            alt={myBook.bookId.title}
            className="w-full h-auto object-cover"
          />
        </div>


        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {myBook.bookId.title}
          </h3>

          <p className="text-gray-600 mb-2 text-sm">
            by {myBook.bookId.author}
          </p>

          {myBook.bookId.genre && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
              {myBook.bookId.genre}
            </span>
          )}

          {/* Status Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Status
            </label>
            <select
              value={myBook.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isUpdating}
              className={`w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors ${getStatusColor(myBook.status)
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  disabled={isUpdating}
                  className={`transition-colors ${isUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
                    }`}
                >
                  <Star
                    className={`h-5 w-5 ${star <= (myBook.rating || 0)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                </button>
              ))}
              {myBook.rating && (
                <span className="text-sm text-gray-600 ml-2">
                  ({myBook.rating}/5)
                </span>
              )}
            </div>
          </div>

          {/* Current Status Badge */}
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(myBook.status)
            }`}>
            {getStatusIcon(myBook.status)}
            <span>{myBook.status}</span>
          </div>

          <button
            onClick={handleDelete}
            disabled={isUpdating}
            className="mt-2 text-red-600 text-sm hover:underline disabled:opacity-50"
          >
            Throw this book
          </button>

        </div>
      </div>
    </div>
  );
};

export default MyBookCard;