import React, { useState } from 'react';
import { Star, BookOpen, CheckCircle, Trash } from 'lucide-react';
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
  onDelete: (bookId: string) => void;
}

const MyBookCard: React.FC<MyBookCardProps> = ({ myBook, onUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await myBooksAPI.updateStatus(myBook.bookId._id, newStatus);
      onUpdate(response.data);
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
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
      setIsDeleted(true);
      setTimeout(() => {
        onDelete(myBook._id);
      }, 400);
    } catch {
      toast.error('Failed to throw the book');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-500 transform
        ${isDeleted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      <div className="flex sm:flex-row flex-col items-start sm:items-center p-3 sm:p-4">
        <div className="w-full sm:w-28 lg:w-32 flex-shrink-0 mb-3 sm:mb-0">
          <img
            src={myBook.bookId.coverImage}
            alt={myBook.bookId.title}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="flex-1 sm:p-4 p-2">
          <h3 className="text-sm sm:text-lg font-semibold text-textPrimary dark:text-white mb-2">
            {myBook.bookId.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-2 text-xs sm:text-sm">
            by {myBook.bookId.author}
          </p>

          {myBook.bookId.genre && (
            <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full mb-3">
              {myBook.bookId.genre}
            </span>
          )}

          <select
            value={myBook.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm font-medium
              bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600
              text-textPrimary dark:text-white transition-colors
              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </select>

          <button
            onClick={handleDelete}
            disabled={isUpdating}
            className={`mt-2 inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md border text-xs sm:text-sm font-medium transition-colors
              ${isUpdating
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-900/50'}
            `}
          >
            <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Remove from Library</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookCard;
