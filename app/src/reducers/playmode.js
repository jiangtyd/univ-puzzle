import Immutable from 'immutable';
import { CHOOSE_INPUT_METHOD } from '../actions';

const choosePlayMode = (state, action) => {
  switch (action.type) {
    case CHOOSE_PLAY_MODE:
      console.log('choosing play mode');
      return action.mode;
    default:
      return state;
  }
}

export default choosePlayMode;
