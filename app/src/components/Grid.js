import React from 'react';
import Cell from './Cell';

// const deserializeGridXY = (serialized) => serialized.substring(1).split('-').map(Number);

const globalDrawProps = {
  stroke: "#111",
  strokeWidth: 0.5,
}

function Grid({ cells, gridProps, dispatches }) {
  let onCellMouseDown = (gridX, gridY) => (
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatches.onCellMouseDown(gridX, gridY, cells[gridX + gridY*gridProps.width].value, [0, 1, 2, 3]);
    }
    );
  let onCellMouseOver = (gridX, gridY) => (
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatches.onCellMouseOver(gridX, gridY);
    }
  );
  return (
    <svg
      height={gridProps.renderHeight}
      width={gridProps.renderWidth}
      onMouseLeave={(e) => {
        e.preventDefault();
        dispatches.onGridMouseLeave();
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        dispatches.onGridMouseUp();
      }}
      {...globalDrawProps}
    >
      {cells.map(cellProps =>
        <Cell key={cellProps.id}
          {...cellProps}
          onCellMouseDown={onCellMouseDown(cellProps.gridX, cellProps.gridY)}
          onCellMouseOver={onCellMouseOver(cellProps.gridX, cellProps.gridY)}
        />)
      }
    </svg>
  );
}

export default Grid;
