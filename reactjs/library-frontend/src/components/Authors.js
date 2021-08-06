import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import useField from '../hooks/useField';

import { UPDATE_AUTHOR, ALL_DATA } from '../queries';

const Authors = ({ show, authors, setErr }) => {
  if (!show) return null;

  const options = [];
  const [author, setAuthor] = useState('');
  const { reset: resetBorn, ...born } = useField('text');
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_DATA }],
    onError: (e) => {
      setErr(e.graphQLErrors[0].message);
    },
  });

  const handleUpdateAuthor = (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name: author, born: Number(born.value) } });
    resetBorn();
  };

  const handleSelectAuthor = ({ value }) => {
    setAuthor(value);
  };

  authors.forEach((p) => {
    options.push({ value: p.name, label: p.name });
  });

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>update birthyear</h2>
        <Select
          options={options}
          onChange={handleSelectAuthor}
          placeholder="Select an author"
        />
        born
        <input {...born} />
        <input
          type="submit"
          value="update author"
          onClick={handleUpdateAuthor}
        />
      </div>
    </>
  );
};

export default Authors;

// PropTypes validation
Authors.propTypes = {
  show: PropTypes.bool,
  authors: PropTypes.array,
  setErr: PropTypes.func,
};
