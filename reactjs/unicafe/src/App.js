import React from 'react';

import './App.css';

import NavBar from './components/navbar.jsx';
import store from './reduxStore.js';

const App = () => {
  const showFeedback = () => {
    const { good, ok, bad } = store.getState();

    if (good + ok + bad > 0) {
      return (
        <>
          <h4>Good: {good}</h4>
          <h4>Neutral: {ok}</h4>
          <h4>Bad: {bad}</h4>
        </>
      );
    } else {
      return (
        <>
          <h4>There is no feedback yet!</h4>
        </>
      );
    }
  };

  return (
    <>
      <NavBar onReset={() => store.dispatch({ type: 'ZERO' })} />
      <div className="w-100 mt-2 d-block text-center">
        <div>
          <h1>Give Feedback</h1>
          <div className="btn-group">
            <div className="m-2">
              <button
                onClick={() => store.dispatch({ type: 'GOOD' })}
                className="btn btn-success"
              >
                Good
              </button>
            </div>
            <div className="m-2">
              <button
                onClick={() => store.dispatch({ type: 'OK' })}
                className="btn btn-primary"
              >
                Neutral
              </button>
            </div>
            <div className="m-2">
              <button
                onClick={() => store.dispatch({ type: 'BAD' })}
                className="btn btn-danger"
              >
                Bad
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1>Statistic</h1>
          {showFeedback()}
        </div>
      </div>
    </>
  );
};

export default App;
