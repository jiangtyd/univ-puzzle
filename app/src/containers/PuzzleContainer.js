import React from 'react';
import GridContainer from './GridContainer';
import InputMethodContainer from './InputMethodContainer';

const PuzzleContainer = () => (
  <div id="puzzle-container">
    <InputMethodContainer id="input-method-container"/>
    <GridContainer id="grid-container"/>
  </div>
);

export default PuzzleContainer;
