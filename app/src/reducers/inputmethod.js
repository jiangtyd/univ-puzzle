import Immutable from 'immutable';
import { CHOOSE_INPUT_METHOD } from '../actions';

const chooseInputMethod = (state, action) => {
  switch (action.type) {
    case CHOOSE_INPUT_METHOD:
      console.log('choosing input method');
      return action.method;
    default:
      return state;
  }
}

export default chooseInputMethod;
