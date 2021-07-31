import deepFreeze from 'deep-freeze';
import counterReducer from './feedbackReducer';

describe('Unicafe Reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('Should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('Good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('Reset can work', () => {
    const state = initialState;
    deepFreeze(state);
    const firstState = counterReducer(state, { type: 'GOOD' });
    expect(firstState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
    const resetState = counterReducer(state, { type: 'ZERO' });
    expect(resetState).toEqual(initialState);
  });
});
