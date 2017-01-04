import Immutable from 'immutable';

export const START_PAINTING = 'START_PAINTING';
export const PAINT = 'PAINT';
export const STOP_PAINTING = 'STOP_PAINTING';

export function startPainting(fillId, cellTypes) {
  return {
    type: START_PAINTING,
    fillId: fillId,
    cellTypes: Immutable.Set(cellTypes) // cellTypes to paint
  };
}

export function paint(gridX, gridY) {
  return {
    type: PAINT,
    gridX: gridX,
    gridY: gridY,
  }
}

export function stopPainting() {
  return {
    type: STOP_PAINTING
  }
}

export const SELECT_CELL = 'SELECT_CELL';
export const DESELECT_CELL = 'DESELECT_CELL'; // for example, hit esc key
export const ENTER_TEXT = 'ENTER_TEXT';

export function selectCell(gridX, gridY) {
  return {
    type: SELECT_CELL,
    gridX: gridX,
    gridY: gridY
  };
}

export function enterText(text) {
  return {
    type: ENTER_TEXT,
    text: text
  };
}

export const CHOOSE_INPUT_METHOD = 'CHOOSE_INPUT_METHOD';

export function chooseInputMethod(method) {
  return {
    type: CHOOSE_INPUT_METHOD,
    method: method
  };
}
