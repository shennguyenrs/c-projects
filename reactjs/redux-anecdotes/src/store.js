import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import AnecdoteReducer from './reducers/AnecdoteReducer';
import NotiReducer from './reducers/NotificationReducer';
import FilterReducer from './reducers/FilterReducer';

const reducers = combineReducers({
  anecdotes: AnecdoteReducer,
  notification: NotiReducer,
  filter: FilterReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
