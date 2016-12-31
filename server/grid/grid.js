var Immutable = require('immutable');
var Cell = require('./cell');

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

exports.emptyGrid = (rows, cols) => (
  Immutable.fromJS(
    [...xrange(0, 2*rows+1)].map(row_idx => 
      [...xrange(0, 2*cols+1)].map(col_idx =>
        // sick hack. (even, even) coordinates are vertices, (even, odd)/(odd, even) are edges, (odd, odd) are faces.
        Cell.newCell(col_idx%2 + row_idx%2, {})
      )
    )
  )
);
