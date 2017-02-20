// A "cell" has a type (vertex, edge, face) and stores some data.
// See grid.js

// example data:
// currently just a string/number.
/*
 * TODO: structure data like this
 {
   value: {
     value: 1,
     given: true
     // TODO: add "guesses"
   },
   bg: { // optional
     value: 0,
     given: false,
   }
   // maybe add "possibilities" a la sudoku?
 }
*/

export const isVertex = (cell) => cell.get('type') === 0;
export const isHorizontalEdge = (cell) => cell.get('type') === 1;
export const isVerticalEdge = (cell) => cell.get('type') === 2;
export const isFace = (cell) => cell.get('type') === 3;

export const CellTypeMap = {
  0: 'vertex',
  1: 'horizontalEdge',
  2: 'verticalEdge',
  3: 'face'
};

export const CellTypeLengths = {
  // vertex has the width of an edge and the height of an edge
  vertex: { width: 'edge', height: 'edge' },
  // horizontalEdge has the width of an face and the height of an edge
  horizontalEdge: { width: 'face', height: 'edge' },
  // etc
  verticalEdge: { width: 'edge', height: 'face' },
  face: { width: 'face', height: 'face' },
};

export const CellValueType = {
  NONE:    'none',
  TEXT:    'text',
  FILL:    'fill',
  DOT:     'dot',
  RECT:    'rect',
  LINE:    'line',
  CIRCLE:  'circle',
  X_SHAPE: 'x_shape'
};

