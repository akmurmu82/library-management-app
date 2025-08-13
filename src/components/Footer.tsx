import React from 'react';
import { BookOpen, Heart, Coffee, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
  <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                My Library
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4 max-w-md">
              Discover, track, and manage your personal book collection. 
              Build your reading journey with our comprehensive library management system.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Built by</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">AK</span>
              <span>with support of</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">Aman Hansda</span>
              <Heart className="h-4 w-4 text-red-500 ml-1" />
            </div>
          </div>

          {/* Quick Links */}
  <div className="flex">
  
  <div className="text-sm sm:text-xs"> {/* smaller font on small screens */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/my-books" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  My Books
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Support */}
  <div className="text-sm sm:text-xs"> {/* smaller font on small screens */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect & Support
            </h3>
            <div className="space-y-3">
              {/* Social Links */}
              <div className="flex space-x-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@mylibrary.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              {/* Buy Me a Coffee Button */}
              <a
                href="https://buymeacoffee.com/ak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Coffee className="h-4 w-4" />
                <span>Buy Me a Coffee</span>
              </a>
            </div>
          </div>
    </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} My Library. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;