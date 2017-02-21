import React from 'react';
import _ from 'lodash';
import Cell from './Cell';
import { createOnKeyDownHandler, createOnCellMouseDownHandler, createOnCellMouseOverHandler, createOnCellClickHandler } from '../handlers/grid';

const globalDrawProps = {
  stroke: "#111",
  strokeWidth: 0.5,
}

let Grid = ({ cells, rules, rendering, gridProps, selectedCell, dispatches }) => {
  return (
    <div id="grid-container-div" // name re-use, sorta, but oh well
      onClick={(e) => {
        e.currentTarget.focus();
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={createOnKeyDownHandler(rules, gridProps, selectedCell, dispatches)}
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
        onMouseDown={createOnCellMouseDownHandler(cells, rules, gridProps, dispatches)}
        onMouseOver={createOnCellMouseOverHandler(dispatches)}
        onClick={createOnCellClickHandler(dispatches)}
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
