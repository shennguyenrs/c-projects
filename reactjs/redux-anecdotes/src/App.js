import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import component
import CreateAnecdote from './components/CreateAnecdote';
import DisplayAnecdote from './components/DisplayAnecdote';
import Notification from './components/Notification';
import FilteredAnecdotes from './components/FilteredAnecdotes';

// Reducers
import { initializeAnecdote } from './reducers/AnecdoteReducer';

const App = ({ initializeAnecdote }) => {
  // Initialize anecdotes
  useEffect(() => {
    initializeAnecdote();
  }, []);

  return (
    <>
      <h2>Anecdotes</h2>
      <FilteredAnecdotes />
      <Notification />
      <DisplayAnecdote />
      <CreateAnecdote />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeAnecdote: () => {
      dispatch(initializeAnecdote());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

// PropTypes validation
App.propTypes = {
  initializeAnecdote: PropTypes.func,
};
