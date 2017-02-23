import React from 'react';
import _ from 'lodash';
import Cell from './Cell';
import { createOnKeyDownHandler, createOnCellMouseDownHandler, createOnCellMouseOverHandler } from '../handlers/grid';

const globalDrawProps = {
  stroke: "#111",
  strokeWidth: 0.5,
}

let Grid = ({ cells, inputMethod, inputRules, rendering, gridProps, selectedCell, dispatches }) => {
  return (
    <div id="grid-container-div" // name re-use, sorta, but oh well
      onClick={(e) => {
        e.currentTarget.focus();
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={createOnKeyDownHandler(cells, inputMethod, inputRules, gridProps, selectedCell, dispatches)}
      tabIndex="-1" // allow focus so we can read keystrokes, but don't let user tab to focus this div
    >
      <svg
        onMouseLeave={(e) => {
          e.preventDefault();
          dispatches.onGridMouseLeave();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          dispatches.onGridMouseUp();
        }}
        onMouseDown={createOnCellMouseDownHandler(cells, inputMethod, inputRules, gridProps, dispatches)}
        onMouseOver={createOnCellMouseOverHandler(dispatches)}
        height={gridProps.renderHeight}
        width={gridProps.renderWidth}
        {...globalDrawProps}
      >
        {cells.map(cellProps =>
          <Cell key={cellProps.id}
            {...cellProps} rendering={rendering}
          />)
        }
      </svg>
    </div>
  );
}

export default Grid;
