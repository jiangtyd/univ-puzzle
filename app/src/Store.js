import { createStore } from 'redux';
import { puzzle } from './reducers/grid';

let store = createStore(puzzle);

export default store;
