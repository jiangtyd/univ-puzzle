var Immutable = require('immutable');
var Cell = require('./cell');
import { SET_CELL_FILL } from '../actions';

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
        Cell.newCell(2*(row_idx%2) + col_idx%2, {fillId: 0})
      )
    )
  )
);

const initialRows = 3;
const initialCols = 5;

const initialState = Immutable.fromJS({
  rows: initialRows,
  cols: initialCols,
  grid: emptyGrid(initialRows, initialCols)
});

export default function grid(state = initialState, action) {
  switch (action.type) {
    case SET_CELL_FILL:
      return state.setIn(['grid', action.gridY, action.gridX, 'data', 'fillId'], action.fillId);
    default:
      return state;
  }
}
