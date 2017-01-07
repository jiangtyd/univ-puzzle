import Immutable from 'immutable';
import { CHOOSE_INPUT_METHOD, affectsGridState } from '../actions';
import { emptyGrid, paintGrid, enterInGrid } from './grid';
import paint from './paint';
import entry from './entry';

import { INPUT_METHODS } from '../constants/inputmethods';

const initialRows = 7;
const initialCols = 7;

const initialState = Immutable.fromJS({
  gridHeight: 2*initialRows+1,
  gridWidth: 2*initialCols+1,
  grid: emptyGrid(initialRows, initialCols),
  input: {
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
  }
});

const input = (state, action) => {
  if (action.type === CHOOSE_INPUT_METHOD) {
    return state.set('inputMethod', action.method);
  } else {
    switch (state.get('inputMethod')) {
      case INPUT_METHODS.PAINT:
        return state.set('paint', paint(state.get('paint'), action));
      case INPUT_METHODS.ENTRY:
        return state.set('entry', entry(state.get('entry'), action));
      default:
        return state;
    }
  }
}

const puzzle = (state = initialState, action) => {
  let inputState = state.get('input');
  let inputMethodState = inputState.get('inputMethod');
  let gridState = state.get('grid');
  if (affectsGridState(action.type)) {
    switch (inputMethodState) {
      case INPUT_METHODS.PAINT:
        return state.set('grid', paintGrid(gridState, action, inputState.get('paint')));
      case INPUT_METHODS.ENTRY:
        return state.set('grid', enterInGrid(gridState, action, inputState.get('entry')));
      default:
        return state;
    }
  } else {
    return state.set('input', input(inputState, action));
  }
}

export default puzzle;
