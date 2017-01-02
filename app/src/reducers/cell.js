var Immutable = require('immutable');

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

// example data: 'x', '3', etc

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
