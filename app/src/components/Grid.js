import React from 'react';
import Cell from './Cell';
import { CellTypeMap } from '../reducers/cell'

// maps 'c1-1', 'c1-1-bg', 'c1-1-value' to [1, 1]
const deserializeGridXY = (serialized) => serialized.substring(1).split('-').map(Number).slice(0, 2);

const globalDrawProps = {
  stroke: "#111",
  strokeWidth: 0.5,
}

const checkBounds = (x, y, width, height) => x >= 0 && x < width && y >= 0 && y < height;

const nextCellIfPossible = (x, y, dx, dy, width, height) =>
  checkBounds(x + dx, y + dy, width, height) ? [x + dx, y + dy] : [x, y];

const directionToDxDy = (keyCode) => {
  switch (keyCode) {
    case 37: // left
      return [-1, 0];
    case 38: // up
      return [0, -1];
    case 39: // right
      return [1, 0];
    case 40: // down
      return [0, 1];
    default:
      return [0, 0];
  }
}

let Grid = ({ cells, gridProps, selectedCell, dispatches }) => {
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
        dispatches.onCellMouseDown(gridX, gridY, getCellByCoords(gridX, gridY).value, [CellTypeMap[0], CellTypeMap[1], CellTypeMap[2], CellTypeMap[3]]);
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
        dispatches.onCellSelect(gridX, gridY);
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
      console.log("keyDown: " + keyCode);
      if(keyCode === 27) {
        dispatches.onEscape();
      } else if(keyCode >= 48 && keyCode <= 57) {
        dispatches.onNumberKey(keyCode-48);
      } else if(keyCode >= 37 && keyCode <= 40) {
        if (selectedCell) {
          dispatches.onCellSelect(...nextCellIfPossible(selectedCell.x, selectedCell.y, ...directionToDxDy(keyCode), gridProps.width, gridProps.height));
        }
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
