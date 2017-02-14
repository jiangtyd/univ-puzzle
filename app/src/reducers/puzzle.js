import { CHOOSE_INPUT_METHOD, affectsGridState, CHOOSE_PLAY_MODE } from '../actions';
import { paintGrid, enterInGrid } from './grid';
import paint from './paint';
import entry from './entry';
import { initialStateForPuzzle } from '../puzzles/initialstate';
import numberTestDefs from '../puzzles/number_test';

import { INPUT_METHODS } from '../constants/inputmethods';

const playMode = (state, action) => {
  if (action.type === CHOOSE_PLAY_MODE) {
    return state.set('playMode', action.mode);
  }
}

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

const puzzleReducer = (state = initialStateForPuzzle(numberTestDefs), action) => {
  let playModeState = state.get('playMode');
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
  } else if (action.type === CHOOSE_PLAY_MODE) {
    return playMode(state, action);
  } else {
    return state.set('input', input(inputState, action));
  }
}

export default puzzleReducer;
