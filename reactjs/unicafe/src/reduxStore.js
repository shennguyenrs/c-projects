import { createStore } from 'redux';

import counterReducer from './reducers/feedbackReducer.js';

//Redux create store
const store = createStore(counterReducer);

export default store;
