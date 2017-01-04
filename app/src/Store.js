import { createStore } from 'redux';
import puzzle from './reducers/puzzle';

let store = createStore(puzzle);

export default store;
