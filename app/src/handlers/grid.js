import _ from 'lodash';
import Immutable from 'immutable';
let _keycode = require('keycode'); // it's a function...

import { INPUT_METHODS } from '../constants/inputmethods';


const getCellByCoords = (cells, gridProps, gridX, gridY) => cells[gridX + gridY*gridProps.width];

/************
 * KEYBOARD *
 ************/

// Arrow keys
const directions = Immutable.Set.of('left', 'up', 'right', 'down');

const checkBounds = (x, y, width, height) =>
  x >= 0 && x < width && y >= 0 && y < height;

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

const nextCell = (cells, curX, curY, direction, entryRules, gridProps) => {
  // assume curX, curY are within bounds
  let x = curX, y = curY;
  let [dx, dy] = directionToDxDy(direction);
  while (true) {
    x += dx;
    y += dy;
    // we've gone too far; give up
    if (!checkBounds(x, y, gridProps.width, gridProps.height)) {
      return [curX, curY];
    }
    // if it's a cell we're allowed to enter data into, return it
    if (getCellByCoords(cells, gridProps, x, y).type in entryRules) {
      return [x, y];
    }
    // otherwise, continue
  }
}

export const createOnKeyDownHandler = (cells, inputMethod, inputRules, gridProps, selectedCell, dispatches) => {
  return (e) => {
    e.stopPropagation();
    if (inputMethod === INPUT_METHODS.ENTRY && selectedCell) {
      let entryRules = inputRules.entryRules;
      let keyCode = Number(e.keyCode);
      let character = _keycode(keyCode);
      if(character === 'esc') {
        dispatches.onEscape();
      }
      else if(directions.contains(character)) {
        if (selectedCell) {
          dispatches.onCellSelect(
              ...nextCell(cells, selectedCell.gridX, selectedCell.gridY, character, entryRules, gridProps));
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

const getTargetCellElement = (e) => {
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
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    let target = getTargetCellElement(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      let cell = getCellByCoords(cells, gridProps, gridX, gridY);
      // TODO support other kinds of mousedown events other than left click
      if (cell.type in paintRules) {
        // list of possible paint values
        let valueList = paintRules[cell.type].left;
        dispatches.onCellMouseDown(gridX, gridY, getNextCyclic(valueList, _.indexOf(valueList, cell.value)), _.keys(paintRules));
      }
    }
  };
}

const createEntryOnMouseDownHandler = (cells, entryRules, gridProps, dispatches) => {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    let target = getTargetCellElement(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      let cell = getCellByCoords(cells, gridProps, gridX, gridY);
      if (cell.type in entryRules) {
        dispatches.onCellSelect(gridX, gridY);
      }
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
        return createEntryOnMouseDownHandler(cells, inputRules.entryRules, gridProps, dispatches);
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
    let target = getTargetCellElement(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      dispatches.onCellMouseOver(gridX, gridY);
    }
  };
}

