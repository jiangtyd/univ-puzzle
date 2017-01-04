import Immutable from 'immutable';
import { newCell } from './cell';
import { PAINT, ENTER_TEXT } from '../actions';
import { combineReducers } from 'redux';

// In an m x n grid, we store
// (2m+1) x (2n+1) "cells" to account for
// edges and corners.
//
// Ex: in a Slitherlink we might need 
// something like
//
// .  =  .  =  .
// || 3  |  3 ||
// .  =  .  =  .
//
// which has 2 x 1 "faces"/"squares" but 5 x 3 "cells."

function* xrange(start, end) {
  for(let i=start; i<end; i++) {
    yield i;
  }
};

export const emptyGrid = (rows, cols) => (
  Immutable.fromJS(
    [...xrange(0, 2*rows+1)].map(row_idx => 
      [...xrange(0, 2*cols+1)].map(col_idx =>
        // sick hack. (even, even) coordinates are vertices, (odd, even) are horizontal edges, (even, odd) are vertical edges, (odd, odd) are faces. coordinates look like (col_idx, row_idx)
        newCell(2*(row_idx%2) + col_idx%2, '0')
      )
    )
  )
);

export const paintGrid = (state, action, paintState) => {
  switch (action.type) {
    case PAINT:
      // console.log('paint state: ' + paintState);
      if(paintState.get('painting') && paintState.get('cellTypes').has(state.getIn([action.gridY, action.gridX, 'type']))) {
        // console.log('successfully painting to color ' + paintState.get('fillId'));
        return state.setIn([action.gridY, action.gridX, 'data'], String(paintState.get('fillId')));
      }
      return state;
    default:
      return state;
  }
}

export const enterInGrid = (state, action, entryState) => {
  switch (action.type) {
    case ENTER_TEXT:
      if (entryState.get('cellSelected')) {
        return state.setIn([action.gridY, action.gridX, 'data'], String(action.text));
      }
      return state;
    default:
      return state;
  }
}
