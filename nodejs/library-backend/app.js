const server = require('./apollo/server');
const connection = require('./utils/connection');

// Add sample database
const sampleDB = require('./utils/addSamples');

// Modules
const Author = require('./models/author');
const Book = require('./models/book');

const app = async () => {
  // Connect to MongoDB
  await connection.on('connected', (err) => {
    if (err) {
      console.log('Failed to connect to MongoDB');
      process.exit(1);
    }

    console.log('Connected to MongoDB');
  });

  // Start Apollo server
  server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
  });

  // Add sample databases
  console.log('Checking initial datdabase...');
  const initialAuthors = await Author.find({});
  const initialBooks = await Book.find({});

  if (initialAuthors.length === 0 && initialBooks.length === 0) {
    console.log('Not found database for authors and books');
    console.log('Adding sample authors and books...');
    await sampleDB.addAuthors();
    await sampleDB.addBooks();
    console.log('Done');
  } else {
    console.log('Database is found');
  }
};

module.exports = app;
