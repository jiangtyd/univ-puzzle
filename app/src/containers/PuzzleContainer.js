import React from 'react';
import GridContainer from './GridContainer';
import InputMethodContainer from './InputMethodContainer';

const PuzzleContainer = () => (
  <div id="puzzle-container">
    <div>
      <InputMethodContainer id="input-method-container"/>
    </div>
    <div>
      <GridContainer id="grid-container"/>
    </div>
  </div>
);

export default PuzzleContainer;
