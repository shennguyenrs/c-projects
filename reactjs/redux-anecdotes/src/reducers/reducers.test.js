import deepFreeze from 'deep-freeze';

import AnecdoteReducer from './AnecdoteReducer';
import NotificationReducer from './NotificationReducer';

// Initial state
const state = {
  anecdotes: [
    {
      content: 'use a node with that id is already in the Store.',
      id: 1,
      votes: 0,
    },
  ],
  notification: '',
};

// Testing vote action
const actionVote = {
  type: 'VOTE',
  data: {
    id: 1,
    content: 'use a node with that id is already in the Store.',
  },
};

// Testing vote result
const resultVote = [
  {
    content: 'use a node with that id is already in the Store.',
    id: 1,
    votes: 1,
  },
];

// New content to add
const addContent = 'this is a testing content';

// Testing adding content action
const actionAdding = {
  type: 'NEW_ANECDOTE',
  data: {
    content: addContent,
  },
};

// Freeze state
// Deep Freeze helps to prevent state from being mutated anywhere in the app
// When the mutation occrus, an error will be thrown by the runtime.
deepFreeze(state);

describe('Anecdote Reducer Testing', () => {
  test('Should return a new vote on the first anecdote', () => {
    const newState = AnecdoteReducer(state.anecdotes, actionVote);
    expect(newState).toEqual(resultVote);
  });

  test('Should add new anecdote to state', () => {
    const newState = AnecdoteReducer(state.anecdotes, actionAdding);
    expect(newState).toHaveLength(2);
  });
});

describe('Notification Reducer Testing', () => {
  test('Should return notification for vote', () => {
    const newState = NotificationReducer(state, actionVote);
    expect(newState).toEqual(
      'You voted: use a node with that id is already in the Store.'
    );
  });

  test('Should return notification for add', () => {
    const newState = NotificationReducer(state, actionAdding);
    expect(newState).toEqual('You created: this is a testing content');
  });
});
