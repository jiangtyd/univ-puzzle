import { createStore } from 'redux';
import puzzleReducer from './reducers/puzzle';

let store = createStore(puzzleReducer);

export default store;
