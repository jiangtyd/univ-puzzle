import Immutable from 'immutable';
import { SELECT_CELL, DESELECT_CELL } from '../actions';

const entry = (state, gridHeight, gridWidth, action) => {
  switch (action.type) {
    case SELECT_CELL:
      return Immutable.fromJS({
            cellSelected: true,
            selectionX: action.gridX,
            selectionY: action.gridY,
          });
    case DESELECT_CELL:
      return state.set('cellSelected', false);
    default:
      return state;
  }
}

export default entry;
