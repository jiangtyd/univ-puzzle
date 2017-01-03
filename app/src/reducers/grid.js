var Immutable = require('immutable');
var Cell = require('./cell');
import { START_PAINTING, PAINT, STOP_PAINTING  } from '../actions';
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

let emptyGrid = (rows, cols) => (
  Immutable.fromJS(
    [...xrange(0, 2*rows+1)].map(row_idx => 
      [...xrange(0, 2*cols+1)].map(col_idx =>
        // sick hack. (even, even) coordinates are vertices, (odd, even) are horizontal edges, (even, odd) are vertical edges, (odd, odd) are faces. coordinates look like (col_idx, row_idx)
        Cell.newCell(2*(row_idx%2) + col_idx%2, '0')
      )
    )
  )
);

const initialRows = 3;
const initialCols = 5;

export const PAINTING_STATES = ['no', 'paused', 'yes'];

export const initialState = Immutable.fromJS({
  // rows: initialRows,
  // cols: initialCols,
  grid: emptyGrid(initialRows, initialCols),
  paint: {
    painting: false,
    fillId: 0,
    cellTypes: Immutable.Set.of(),
  },
});

export const paint = function(state = initialState.get('paint'), action) {
  switch (action.type) {
    case START_PAINTING:
      console.log('start painting');
      return Immutable.fromJS(
          {
            painting: true,
            fillId: action.fillId,
            cellTypes: action.cellTypes
          }
        );
    case STOP_PAINTING:
      console.log('stop painting');
      return state.set('painting', false);
    default:
      return state;
  }
}

export const grid = function(state, action, paintState) {
  switch (action.type) {
    case PAINT:
      // console.log('paint state: ' + paintState);
      if(paintState.get('painting') && paintState.get('cellTypes').has(state.getIn([action.gridY, action.gridX, 'type']))) {
        // console.log('successfully painting to color ' + paintState.get('fillId'));
        return state.setIn([action.gridY, action.gridX, 'data'], paintState.get('fillId').toString());
      }
      return state;
    default:
      return state;
  }
}

export const puzzle = function(state = initialState, action) {
  let paintState = paint(state.get('paint'), action);
  let gridState = grid(state.get('grid'), action, paintState);
  return state.merge({
    paint: paintState,
    grid: gridState
  });
}
