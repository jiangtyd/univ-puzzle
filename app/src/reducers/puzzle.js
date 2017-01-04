import Immutable from 'immutable';
import { CHOOSE_INPUT_METHOD } from '../actions';
import { emptyGrid, paintGrid, enterInGrid } from './grid';
import paint from './paint';
import entry from './entry';

import { INPUT_METHODS } from '../constants/inputmethods';

const initialRows = 7;
const initialCols = 7;

const initialState = Immutable.fromJS({
  // rows: initialRows,
  // cols: initialCols,
  grid: emptyGrid(initialRows, initialCols),
  inputMethod: INPUT_METHODS.PAINT,
  paint: {
    painting: false,
    fillId: 0,
    cellTypes: Immutable.Set.of(),
  },
  entry: {
    cellSelected: false,
    selectionX: 0,
    selectionY: 0,
  }
});

const puzzle = (state = initialState, action) => {
  let inputMethodState = state.get('inputMethod');
  let paintState = state.get('paint');
  let entryState = state.get('entry');
  let gridState = state.get('grid');
  if (action.type === CHOOSE_INPUT_METHOD) {
    inputMethodState = action.method;
  } else {
    switch (inputMethodState) {
      case INPUT_METHODS.PAINT:
        paintState = paint(state.get('paint'), action);
        gridState = paintGrid(gridState, action, paintState);
        break;
      case INPUT_METHODS.ENTRY:
        entryState = entry(state.get('entry'), action);
        gridState = enterInGrid(gridState, action, entryState);
        break;
      default:
        break;
    }
  }
  return state.merge({
    inputMethod: inputMethodState,
    paint: paintState,
    entry: entryState,
    grid: gridState
  });
}

export default puzzle;
