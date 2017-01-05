import React from 'react';
import Cell from './Cell';

// maps 'c1-1', 'c1-1-bg', 'c1-1-value' to [1, 1]
const deserializeGridXY = (serialized) => serialized.substring(1).split('-').map(Number).slice(0, 2);

const globalDrawProps = {
  stroke: "#111",
  strokeWidth: 0.5,
}

let Grid = ({ cells, gridProps, dispatches }) => {
  let getCellByCoords = (gridX, gridY) => cells[gridX + gridY*gridProps.width];
  let getTargetCell = (e) => {
    let t = e.target;
    if(t.classList.contains('grid-cell')) {
      return t;
    } else if(t.parentElement.classList.contains('grid-cell')) {
      return t.parentElement;
    } else {
      return undefined;
    }
  }
  let onCellMouseDown =
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      let target = getTargetCell(e);
      if (target) {
        let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
        dispatches.onCellMouseDown(gridX, gridY, getCellByCoords(gridX, gridY).value, [0, 1, 2, 3]);
      }
    }
  let onCellMouseOver =
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      let target = getTargetCell(e);
      if (target) {
        let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
        dispatches.onCellMouseOver(gridX, gridY);
      }
    }
  let onCellClick =
    (e) => {
      e.preventDefault();
      let target = getTargetCell(e);
      if (target) {
        let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
        dispatches.onCellClick(gridX, gridY);
      }
    }
  let onGridContainerDivClick =
    (e) => {
      e.currentTarget.focus();
      e.preventDefault();
      e.stopPropagation();
    }
  let onKeyDown =
    (e) => {
      e.stopPropagation();
      let keyCode = Number(e.keyCode);
      if(keyCode === 27) {
        dispatches.onEscape();
      } else if(keyCode >= 48 && keyCode <= 57) {
        dispatches.onNumberKey(keyCode-48);
      }
    }
  return (
    <div id="grid-container-div" // name re-use, sorta, but oh well
      onClick={onGridContainerDivClick}
      onKeyDown={onKeyDown}
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
        onMouseDown={onCellMouseDown}
        onMouseOver={onCellMouseOver}
        onClick={onCellClick}
        height={gridProps.renderHeight}
        width={gridProps.renderWidth}
        {...globalDrawProps}
      >
        {cells.map(cellProps =>
          <Cell key={cellProps.id}
            {...cellProps}
          />)
        }
      </svg>
    </div>
  );
}

export default Grid;
