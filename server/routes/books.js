const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ availability: true });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed books (for development)
router.post('/seed', async (req, res) => {
  try {
    await Book.deleteMany({});
    
    const sampleBooks = [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        coverImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "A practical guide to better programming",
        genre: "Technology"
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        coverImage: "https://images.pexels.com/photos/1560941/pexels-photo-1560941.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "A handbook of agile software craftsmanship",
        genre: "Technology"
      },
      {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        coverImage: "https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "Essential reading for anyone interested in design",
        genre: "Design"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        coverImage: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "Tiny changes, remarkable results",
        genre: "Self-Help"
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        coverImage: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "Timeless lessons on wealth, greed, and happiness",
        genre: "Finance"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        coverImage: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
        availability: true,
        description: "A brief history of humankind",
        genre: "History"
      }
    ];

    await Book.insertMany(sampleBooks);
    res.json({ message: 'Books seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;