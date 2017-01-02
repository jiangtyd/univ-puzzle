import React from 'react';
import Cell from './Cell';

function Grid({ cells, gridProps, dispatches }) {
  return (
    <svg
      height={gridProps.height}
      width={gridProps.width}
      onMouseLeave={(e) => {
        e.preventDefault();
        dispatches.onGridMouseLeave();
      }}
    >
      {cells.map(cellProps =>
        <Cell key={cellProps.id} {...cellProps}
          onMouseDown={(e) => {
            e.preventDefault();
            dispatches.onCellMouseDown(cellProps.gridX, cellProps.gridY, cellProps.fillId, [0, 1, 2, 3]);
          }}
          onMouseOver={(e) => {
            e.preventDefault();
            dispatches.onCellMouseOver(cellProps.gridX, cellProps.gridY);
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            dispatches.onCellMouseUp();
          }}
        />)
      }
    </svg>
  );
}

export default Grid;
