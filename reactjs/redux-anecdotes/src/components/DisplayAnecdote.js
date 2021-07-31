import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Reducers
import { voteAnecdote } from '../reducers/AnecdoteReducer';

const DisplayAnecdote = ({ anecdotes, voteAnecdote }) => {
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') return { anecdotes: state.anecdotes };

  // If the filter is SET_FILTER
  const pattern = new RegExp(state.filter);
  const filteredAnecdote = state.anecdotes.filter((item) =>
    pattern.test(item.content)
  );

  return { anecdotes: filteredAnecdote };
};

const mapDispatchToProps = {
  voteAnecdote,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAnecdote);

// Props validation
DisplayAnecdote.propTypes = {
  anecdotes: PropTypes.array,
  voteAnecdote: PropTypes.func,
};
