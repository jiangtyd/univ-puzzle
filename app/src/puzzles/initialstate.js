import Immutable from 'immutable';

import { CellTypeMap } from '../constants/cell';
import { PLAY_MODES } from '../constants/playmodes';
import { INPUT_METHODS } from '../constants/inputmethods';

const initialRows = 9;
const initialCols = 9;

// documentation purposes
/*
var cellType = {
0: 'vertex',
1: 'verticalEdge',
2: 'horizontalEdge',
3: 'face'};

var vertex = data => cell(0, data);
var horizontalEdge = data => cell(1, data);
var verticalEdge = data => cell(2, data);
var face = data => cell(3, data);
*/

const newCell = (type, data) => Immutable.fromJS({type: type, data: data});

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

const defaultInitialValues = Immutable.fromJS({
  vertex: 0,
  horizontalEdge: 0,
  verticalEdge: 0,
  face: 0
});

const initialGrid = (rows, cols, initialValues = defaultInitialValues) => (
  Immutable.fromJS(
    [...xrange(0, 2*rows+1)].map(row_idx =>
      [...xrange(0, 2*cols+1)].map(col_idx => {
        // sick hack. (even, even) coordinates are vertices, (odd, even) are horizontal edges, (even, odd) are vertical edges, (odd, odd) are faces. coordinates look like (col_idx, row_idx)
        var cellType = CellTypeMap[2*(row_idx%2) + col_idx%2];
        return newCell(cellType, initialValues.get(cellType));
      })
    )
  )
);

const baseInitialState = Immutable.fromJS({
  puzzleDefs: {},
  gridHeight: 2*initialRows+1,
  gridWidth: 2*initialCols+1,
  grid: initialGrid(initialRows, initialCols),
  playMode: PLAY_MODES.GIVE,
  input: {
    inputMethod: INPUT_METHODS.PAINT,
    paint: {
      painting: false,
      fillValue: "0",
      cellTypes: Immutable.Set.of(),
    },
    entry: {
      cellSelected: false,
      selectionX: 0,
      selectionY: 0,
    }
  }
});

export const initialStateForPuzzle = (puzzleDefs) => {
  return baseInitialState
    .set('puzzleDefs', puzzleDefs)
    .set('grid', initialGrid(initialRows, initialCols, puzzleDefs.get('initialValues')))
    ;
};
