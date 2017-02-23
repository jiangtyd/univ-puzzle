import _ from 'lodash';
import Immutable from 'immutable';
let _keycode = require('keycode'); // it's a function...

import { INPUT_METHODS } from '../constants/inputmethods';

/************
 * KEYBOARD *
 ************/

// Arrow keys
const directions = Immutable.Set.of('left', 'up', 'right', 'down');

const checkBounds = (x, y, width, height) =>
  x >= 0 && x < width && y >= 0 && y < height;

const nextCellIfPossible = (x, y, dx, dy, width, height) =>
  checkBounds(x + dx, y + dy, width, height) ? [x + dx, y + dy] : [x, y];

const directionToDxDy = (direction) => {
  switch (direction) {
    case 'left':
      return [-1, 0];
    case 'up': // up
      return [0, -1];
    case 'right': // right
      return [1, 0];
    case 'down': // down
      return [0, 1];
    default:
      return [0, 0];
  }
}

export const createOnKeyDownHandler = (inputMethod, inputRules, gridProps, selectedCell, dispatches) => {
  return (e) => {
    e.stopPropagation();
    if (inputMethod === INPUT_METHODS.ENTRY && selectedCell) {
      let entryRules = inputRules.entryRules;
      let keyCode = Number(e.keyCode);
      let character = _keycode(keyCode);
      console.log("keyDown: " + keyCode);
      if(character === 'esc') {
        dispatches.onEscape();
      }
      else if(directions.contains(character)) {
        if (selectedCell) {
          dispatches.onCellSelect(
              ...nextCellIfPossible(
                selectedCell.gridX, selectedCell.gridY,
                ...directionToDxDy(_keycode(keyCode)),
                gridProps.width, gridProps.height));
        }
      } else if(selectedCell.type in entryRules && Immutable.Set(entryRules[selectedCell.type].alphabet).contains(character)) {
        // only works for typeable non-shifted characters probably
        dispatches.onAlphabetEntryKey(character);
      }
    }
  };
}

/*********
 * MOUSE *
 *********/
// maps 'c1-1', 'c1-1-bg', 'c1-1-value' to [1, 1]
const deserializeGridXY = (serialized) => serialized.substring(1).split('-').map(Number).slice(0, 2);

const getNextCyclic = (list, idx) => list[(idx + 1) % list.length];

const getTargetCell = (e) => {
  let t = e.target;
  if(t.classList.contains('grid-cell')) {
    return t;
  } else if(t.parentElement.classList.contains('grid-cell')) {
    return t.parentElement;
  } else {
    return undefined;
  }
}

const createPaintOnMouseDownHandler = (cells, paintRules, gridProps, dispatches) => {
  const getCellByCoords = (gridX, gridY) => cells[gridX + gridY*gridProps.width];
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    let target = getTargetCell(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      let cell = getCellByCoords(gridX, gridY);
      // TODO support other kinds of mousedown events other than left click
      if (cell.type in paintRules) {
        let valueList = paintRules[cell.type].left;
        dispatches.onCellMouseDown(gridX, gridY, getNextCyclic(valueList, _.indexOf(valueList, cell.value)), _.keys(paintRules));
      }
    }
  };
}

const createEntryOnMouseDownHandler = (dispatches) => {
  return (e) => {
    e.preventDefault();
    let target = getTargetCell(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      dispatches.onCellSelect(gridX, gridY);
    }
  };
}

export const createOnCellMouseDownHandler = (cells,  inputMethod, inputRules, gridProps, dispatches) => {
  switch (inputMethod) {
    case INPUT_METHODS.PAINT:
      if ('paintRules' in inputRules) {
        return createPaintOnMouseDownHandler(cells, inputRules.paintRules, gridProps, dispatches);
      }
      break;
    case INPUT_METHODS.ENTRY:
      if ('entryRules' in inputRules) {
        return createEntryOnMouseDownHandler(dispatches);
      }
      break;
    default:
      break;
  }
  return (e) => {
    e.preventDefault();
  }
}

export const createOnCellMouseOverHandler = (dispatches) => {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    let target = getTargetCell(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      dispatches.onCellMouseOver(gridX, gridY);
    }
  };
}

