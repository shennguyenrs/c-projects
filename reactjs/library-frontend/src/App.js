import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notification from './components/Notification';

import { ALL_DATA } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errMes, setErrMess] = useState(null);
  const allData = useQuery(ALL_DATA);

  if (allData.loading) return <>Loading...</>;

  const notify = (message) => {
    setErrMess(message);
    setTimeout(() => {
      setErrMess(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notification errMes={errMes} />
      <Authors
        show={page === 'authors'}
        authors={allData.data.allAuthors}
        setErr={notify}
      />
      <Books show={page === 'books'} books={allData.data.allBooks} />
      <NewBook show={page === 'add'} setErr={notify} />
    </div>
  );
};

export default App;
