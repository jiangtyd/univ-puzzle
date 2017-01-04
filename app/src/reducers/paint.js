import Immutable from 'immutable';
import { START_PAINTING, STOP_PAINTING  } from '../actions';

const paint = (state, action) => {
  switch (action.type) {
    case START_PAINTING:
      console.log('start painting');
      return Immutable.fromJS(
          {
            painting: true,
            fillId: action.fillId,
            cellTypes: action.cellTypes
          }
        );
    case STOP_PAINTING:
      console.log('stop painting');
      return state.set('painting', false);
    default:
      return state;
  }
}

export default paint;
