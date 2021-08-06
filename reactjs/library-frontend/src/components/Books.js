import React from 'react';
import PropTypes from 'prop-types';

const Books = ({ show, books }) => {
  if (!show) return null;

  return (
    <>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;

// PropTypes validation
Books.propTypes = {
  show: PropTypes.bool,
  books: PropTypes.array,
};
