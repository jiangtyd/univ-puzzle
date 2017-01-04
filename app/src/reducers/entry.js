import Immutable from 'immutable';
import { SELECT_CELL, DESELECT_CELL } from '../actions';

const entry = (state, action) => {
  switch (action.type) {
    case SELECT_CELL:
      console.log('selected cell');
      return Immutable.fromJS(
          {
            cellSelected: true,
            selectionX: action.gridX,
            selectionY: action.gridY,
          }
        );
    case DESELECT_CELL:
      console.log('deselected cell');
      return state.set('cellSelected', false);
    default:
      return state;
  }
}

export default entry;