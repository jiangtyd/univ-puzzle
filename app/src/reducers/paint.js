import Immutable from 'immutable';
import { START_PAINTING, STOP_PAINTING  } from '../actions';

const paint = (state, action) => {
  switch (action.type) {
    case START_PAINTING:
      return Immutable.fromJS(
          {
            painting: true,
            fillId: action.fillId,
            cellTypes: action.cellTypes
          }
        );
    case STOP_PAINTING:
      return state.set('painting', false);
    default:
      return state;
  }
}

export default paint;
