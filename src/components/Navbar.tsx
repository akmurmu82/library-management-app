import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Home, Library } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              My Library
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {isAuthenticated && (
              <Link 
                to="/my-books" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/my-books') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Library className="h-4 w-4" />
                <span>My Books</span>
              </Link>
            )}

            {/* User Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/register') 
                      ? 'text-white bg-blue-600' 
                      : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;