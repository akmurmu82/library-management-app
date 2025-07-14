const express = require('express');
const MyBook = require('../models/MyBook');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's books
router.get('/', auth, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id })
      .populate('bookId');
    res.json(myBooks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add book to user's library
router.post('/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;
    const { title, author, coverImage, description, genre } = req.body;

    // Check if book already exists in user's library
    const existingBook = await MyBook.findOne({ userId, bookId });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already in your library' });
    }

    // Check if book exists in Books collection
    let book = await Book.findById(bookId);

    // If not, create it
    if (!book) {
      book = new Book({
        _id: bookId,  // keep the same _id from Google
        title,
        author,
        coverImage,
        description,
        genre
      });
      await book.save();
    }

    const myBook = new MyBook({ userId, bookId });
    await myBook.save();

    const populatedBook = await MyBook.findById(myBook._id).populate('bookId');
    res.status(201).json(populatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update reading status
router.patch('/:bookId/status', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { status },
      { new: true }
    ).populate('bookId');

    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your library' });
    }

    res.json(myBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update rating
router.patch('/:bookId/rating', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const userId = req.user._id;

    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { rating },
      { new: true }
    ).populate('bookId');

    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your library' });
    }

    res.json(myBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;