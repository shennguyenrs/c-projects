import express, { Request, Response } from 'express';

const app = express();

// Middleware
app.set('view engine', 'pug');
app.use(express.json());

// Database
let movies = [
  {
    id: '1588323375416',
    title: 'Star Wars: Episode IX - The Rise of Skywalker',
    year: 2019,
    director: 'J.J. Abrams',
  },
  {
    id: '1588323390624',
    title: 'The Irishman',
    year: 2019,
    director: 'Martin Scorsese',
  },
  {
    id: '1588323412643',
    title: 'Harry Potter and the Sorcerers Stone',
    year: 2001,
    director: 'Chris Columbus',
  },
];

let customers = [
  {
    id: '1588323375416',
    firstname: 'John',
    lastname: 'Johnson',
    email: 'john@johnson.com',
    phone: '8233243',
  },
  {
    id: '1588323375417',
    firstname: 'Mary',
    lastname: 'Smith',
    email: 'mary@smith.com',
    phone: '6654113',
  },
  {
    id: '1588323375418',
    firstname: 'Peter',
    lastname: 'North',
    email: 'peter@north.com',
    phone: '901176',
  },
];

// CRUD Functions
// Home
app.get('/', (_req: Request, res: Response) => {
  res.status(200).render('movieslist', { movies: movies });
});

// Add movie
app.get('/addMovie', (_req: Request, res: Response) => {
  res.status(200).render('addMovie');
});

// Post new movie
app.post('/addMovie', (req: Request, res: Response) => {
  const newId = new Date().toDateString();
  const newMovie = {
    id: newId,
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
  };
  movies = [...movies, newMovie];
  console.log(newMovie);

  res.status(200).redirect('/');
});

export default app;
