import { createStore } from 'redux';
import { grid } from './reducers/grid';

let store = createStore(grid);

export default store;
