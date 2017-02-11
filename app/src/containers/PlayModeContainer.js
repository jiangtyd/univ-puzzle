import { connect } from 'react-redux';
import { choosePlayMode } from '../actions';
import PlayMode from '../components/PlayMode';

const mapStateToProps = (state) => {
  return {
    currentPlayMode: state.get('playMode')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      onPlayModeChange: (method) => {
        dispatch(choosePlayMode(method));
      }
    }
  };
}

const PlayModeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMode);

export default PlayModeContainer;
