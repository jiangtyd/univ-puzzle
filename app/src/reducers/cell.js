import Immutable from 'immutable';

// A "cell" has a type (vertex, edge, face) and stores some data.
// See grid.js
  
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

export const newCell = (type, data) => Immutable.fromJS({type: type, data: data});

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
