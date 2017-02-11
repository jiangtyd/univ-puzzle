import React from 'react';
import GridContainer from './GridContainer';
import InputMethodContainer from './InputMethodContainer';
import PlayModeContainer from './PlayModeContainer';

const PuzzleContainer = () => (
  <div id="puzzle-container">
    <PlayModeContainer id="play-mode-container"/>
    <InputMethodContainer id="input-method-container"/>
    <GridContainer id="grid-container"/>
  </div>
);

export default PuzzleContainer;
