/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const initialState = anecdotesAtStart.map(asObject); */

// Import services
import services from '../services/services';

const AnecdoteReducer = (state = [], action) => {
  // Declare varibales outside the switch-cases
  // to prevent lexical definition
  let id = 0;
  let anecdoteToChange = {};
  let newVote = 0;
  let changedAnecdote = {};

  switch (action.type) {
    case 'VOTE':
      id = action.data.id;
      // Filter state to return a array include the result anecdote
      // so using [0] to take the result out the array
      anecdoteToChange = state.filter((anecdote) => anecdote.id === id)[0];
      newVote = anecdoteToChange.votes + 1;
      changedAnecdote = {
        ...anecdoteToChange,
        votes: newVote,
      };

      // Update information on backend
      services.updateObj(changedAnecdote);

      // Change only the anecdote which has the id
      // is equal to the id of anecdoteToChange
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case 'NEW_ANECDOTE':
      /* newAnecdote = asObject(action.data.content);
      return state.concat(newAnecdote); */
      return action.data.content;

    case 'INIT_ANECDOTE':
      return action.data.anecdotes;

    default:
      return state;
  }
};

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const res = await services.getAll();
    dispatch({
      type: 'INIT_ANECDOTE',
      data: res,
    });
  };
};

export const voteAnecdote = (id, content) => {
  return (dispatch) => {
    dispatch({
      type: 'VOTE',
      data: {
        id: id,
        content: content,
      },
    });
  };
};

export const createAnecdote = (newContent) => {
  // Create object in the backend database
  return async (dispatch) => {
    const newAnecdote = await services.addNew(newContent);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.anecdotes,
        notification: newContent,
      },
    });
  };
};

export default AnecdoteReducer;
