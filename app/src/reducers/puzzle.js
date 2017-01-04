import Immutable from 'immutable';
import { CHOOSE_INPUT_METHOD } from '../actions';
import { emptyGrid, paintGrid, enterInGrid } from './grid';
import paint from './paint';
import entry from './entry';

const initialRows = 7;
const initialCols = 7;

const PAINT_METHOD = 'PAINT_METHOD';
const ENTRY_METHOD = 'ENTRY_METHOD';

const initialState = Immutable.fromJS({
  // rows: initialRows,
  // cols: initialCols,
  grid: emptyGrid(initialRows, initialCols),
  inputMethod: PAINT_METHOD,
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
  console.log(inputMethodState);
  if (action.type === CHOOSE_INPUT_METHOD) {
    console.log('choosing input method');
    inputMethodState = action.method;
  } else {
    switch (inputMethodState) {
      case PAINT_METHOD:
        paintState = paint(state.get('paint'), action);
        gridState = paintGrid(gridState, action, paintState);
        break;
      case ENTRY_METHOD:
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
