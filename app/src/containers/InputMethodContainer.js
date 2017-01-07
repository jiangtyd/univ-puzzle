import { connect } from 'react-redux';
import { chooseInputMethod } from '../actions';
import InputMethod from '../components/InputMethod';

const mapStateToProps = (state) => {
  return {
    currentInputMethod: state.getIn(['input', 'inputMethod'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      onInputMethodChange: (method) => {
        dispatch(chooseInputMethod(method));
      }
    }
  };
}

const InputMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputMethod);

export default InputMethodContainer;
