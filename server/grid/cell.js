var Immutable = require('immutable');

// A "cell" has a type (vertex, edge, face) and stores some data.
// See grid.js
  
// documentation purposes
/*
var cellType = {0: 'vertex', 1: 'edge', 2: 'face'};

var vertex = data => cell(0, data);
var edge = data => cell(1, data);
var face = data => cell(2, data);
*/

exports.newCell = (type, data) => Immutable.fromJS({type: type, data: data});

exports.isVertex = (cell) => cell.get('type') === 0;
exports.isEdge = (cell) => cell.get('type') === 1;
exports.isFace = (cell) => cell.get('type') === 2;
