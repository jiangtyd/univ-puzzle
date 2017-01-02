var Immutable = require('immutable');
var Cell = require('./cell');
import { START_PAINTING, PAINT, STOP_PAINTING  } from '../actions';

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
  rows: initialRows,
  cols: initialCols,
  grid: emptyGrid(initialRows, initialCols),
  paint: {
    painting: false,
    fillId: 0,
    cellTypes: Immutable.Set.of(),
  },
});

export const grid = function(state = initialState, action) {
  switch (action.type) {
    case START_PAINTING:
      console.log('start painting');
      return state.set('paint',
        Immutable.fromJS({
          painting: true,
          fillId: action.fillId,
          cellTypes: action.cellTypes
        })
      );
    case PAINT:
      console.log('paint state: ' + state.get('paint'));
      if(state.getIn(['paint', 'painting']) && state.getIn(['paint', 'cellTypes']).has(state.getIn(['grid', action.gridY, action.gridX, 'type']))) {
        console.log('successfully painting to color ' + state.getIn(['paint', 'fillId']));
        return state.setIn(['grid', action.gridY, action.gridX, 'data'], state.getIn(['paint', 'fillId']).toString());
      }
      return state;
    case STOP_PAINTING:
      console.log('stop painting');
      return state.setIn(['paint', 'painting'], false);
    default:
      return state;
  }
}
