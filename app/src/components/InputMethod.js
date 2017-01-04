import React, { PropTypes } from 'react';
import { INPUT_METHOD_DISPLAY } from '../constants/inputmethods';

const isCurrentInputMethod = (currentInputMethodName, inputMethod) => currentInputMethodName === inputMethod.name;

let InputMethod = ({ currentInputMethod, dispatches}) => {
  let onInputMethodChange = (e) => {
    dispatches.onInputMethodChange(e.target.value);
  }
  return (
    <div id="input-method-selector">
      <form id="input-method-form">
        {INPUT_METHOD_DISPLAY.map(inputMethod =>
          <div key={inputMethod.name}>
            <input type="radio"
              key={inputMethod.name}
              name={inputMethod.name}
              value={inputMethod.name}
              onChange={onInputMethodChange}
              checked={isCurrentInputMethod(currentInputMethod, inputMethod)}
            / >
            <span>{inputMethod.displayName}</span>
          </div>)}
      </form>
    </div>
  );
}

InputMethod.propTypes = {
  currentInputMethod: PropTypes.string.isRequired,
  dispatches: PropTypes.object.isRequired,
};

export default InputMethod;
