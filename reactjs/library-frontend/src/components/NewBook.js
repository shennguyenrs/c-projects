import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import useField from '../hooks/useField';

import { ALL_DATA, ADD_BOOK } from '../queries.js';

const NewBook = ({ show, setErr }) => {
  if (!show) return null;

  const [genres, setGenres] = useState([]);
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetPublished, ...published } = useField('text');
  const { reset: resetGenre, ...genre } = useField('text');
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_DATA }],
    onError: (err) => {
      setErr(err.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title: title.value,
        published: Number(published.value),
        author: author.value,
        genres,
      },
    });

    resetTitle();
    resetPublished();
    resetAuthor();
    resetGenre();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default NewBook;

// PropTypes validation
NewBook.propTypes = {
  show: PropTypes.bool,
  setErr: PropTypes.func,
};
