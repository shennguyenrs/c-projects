// Import libraries
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

const anecdotes = require('./db.json');

// Config environment variable
dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/api/anecdotes', (_req, res) => {
  return res.status(200).json(anecdotes);
});

app.post('/api/anecdotes', (req, res) => {
  const object = req.body;
  anecdotes.anecdotes.push(object);
  return res.status(200).json(anecdotes);
});

app.put('/api/anecdotes/:id', (req, res) => {
  const id = req.params.id;
  const changedObj = req.body;
  const index = anecdotes.anecdotes.findIndex((item) => item.id === id);
  anecdotes.anecdotes[index].votes = changedObj.votes;
  return res.status(200);
});

// Create server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server is listening on port ', PORT);
});
