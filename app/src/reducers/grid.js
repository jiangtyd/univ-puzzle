import { PAINT, ENTER_TEXT } from '../actions';

export const paintGrid = (state, action, paintState) => {
  switch (action.type) {
    case PAINT:
      if(paintState.get('painting') && paintState.get('cellTypes').has(state.getIn([action.gridY, action.gridX, 'type']))) {
        return state.setIn([action.gridY, action.gridX, 'data'], String(paintState.get('fillId')));
      }
      return state;
    default:
      return state;
  }
}

export const enterInGrid = (state, action, entryState) => {
  switch (action.type) {
    case ENTER_TEXT:
      if (entryState.get('cellSelected')) {
        return state.setIn([entryState.get('selectionY'), entryState.get('selectionX'), 'data'], String(action.text));
      }
      return state;
    default:
      return state;
  }
}
