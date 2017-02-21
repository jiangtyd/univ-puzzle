import _ from 'lodash';
import Immutable from 'immutable';
let _keycode = require('keycode'); // it's a function...

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

export const createOnKeyDownHandler = (rules, gridProps, selectedCell, dispatches) => {
  return (e) => {
    e.stopPropagation();
    let keyCode = Number(e.keyCode);
    let character = _keycode(keyCode);
    console.log("keyDown: " + keyCode);
    if(character === 'esc') {
      dispatches.onEscape();
    } else if(Immutable.Set(rules.inputRules.GIVE.entryRules[selectedCell.type].alphabet).contains(character)) {
      // only works for typeable non-shifted characters probably
      dispatches.onAlphabetEntryKey(character);
    } else if(directions.contains(character)) {
      if (selectedCell) {
        dispatches.onCellSelect(
            ...nextCellIfPossible(
              selectedCell.gridX, selectedCell.gridY,
              ...directionToDxDy(_keycode(keyCode)),
              gridProps.width, gridProps.height));
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

export const createOnCellMouseDownHandler = (cells, rules, gridProps, dispatches) => {
  const getCellByCoords = (gridX, gridY) => cells[gridX + gridY*gridProps.width];
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    let target = getTargetCell(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      let cell = getCellByCoords(gridX, gridY);
      let paintRules = rules.inputRules.GIVE.paintRules;
      let valueList = paintRules[cell.type].left;
      dispatches.onCellMouseDown(gridX, gridY, getNextCyclic(valueList, _.indexOf(valueList, cell.value)), _.keys(paintRules));
    }
  };
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

export const createOnCellClickHandler = (dispatches) => {
  return (e) => {
    e.preventDefault();
    let target = getTargetCell(e);
    if (target) {
      let [gridX, gridY] = deserializeGridXY(target.getAttribute('id'));
      dispatches.onCellSelect(gridX, gridY);
    }
  };
}

