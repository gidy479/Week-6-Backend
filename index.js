const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect('mongodb+srv://gideontetteh792:CjkLE3grbCxUCWGL@cluster0.tzlhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));



// Book Schema & Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);


//Routes

// POST /books - Save a new book
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Retrieve all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve one book by author
app.get('/books/:author', async (req, res) => {
  try {
    const book = await Book.findOne({ author: req.params.author });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});






