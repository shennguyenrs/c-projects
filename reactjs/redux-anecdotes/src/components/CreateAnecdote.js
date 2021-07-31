import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Reducers
import { createAnecdote } from '../reducers/AnecdoteReducer';

const CreateAnecdote = ({ createAnecdote }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => createAnecdote(e.target.new_anecdote.value)}>
        <div>
          <input type="text" name="new_anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
};

export default connect(null, mapDispatchToProps)(CreateAnecdote);

// PropTypes Validation
CreateAnecdote.propTypes = {
  createAnecdote: PropTypes.func,
};
