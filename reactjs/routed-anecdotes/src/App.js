import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Hooks
import useField from './hooks/useField';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/anecdotes">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create New
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const SingleAnecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((item) => item.id === id);
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
    </>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is a story with a point.
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { reset: authorReset, ...author } = useField('text');
  const { reset: contentReset, ...content } = useField('text');
  const { reset: infoReset, ...info } = useField('text');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      infor: info.value,
      votes: 0,
    });
    history.push('/anecdotes');
  };

  const handleReset = (e) => {
    e.preventDefault();
    authorReset();
    contentReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (notification !== '') {
        setNotification('');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`New anecdote: ${anecdote.content}`);
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  /* const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  }; */

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <div>{notification}</div>
      <Switch>
        {/* Switch renders the first route it macches in the order that it is given,
					so uses 'exact' to match only '/' if the '/' is given as the first place, 
					and the switch can render other routes */}
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
          <CreateNew addNew={addNew} />
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <SingleAnecdote anecdotes={anecdotes} />
        </Route>
        <Route exact path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

// PropTypes validation
AnecdoteList.propTypes = {
  anecdotes: PropTypes.array,
};

CreateNew.propTypes = {
  addNew: PropTypes.func,
};

SingleAnecdote.propTypes = {
  anecdotes: PropTypes.array,
};
