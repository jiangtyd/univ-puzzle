import React from 'react';
import Cell from './Cell';

function Grid({ cells, dimensions, onCellClick }) {
  return (
    <svg height={dimensions.height} width={dimensions.width}>
      {cells.map(cellProps => <Cell key={cellProps.id} {...cellProps}
        onClick={() => onCellClick(cellProps.gridX, cellProps.gridY, cellProps.fillId)}
      />)}
    </svg>
  );
}

export default Grid;
