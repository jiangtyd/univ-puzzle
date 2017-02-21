import React, { PropTypes } from 'react';
import '../Cell.css';

const textProps = {
  dxMult: 0.5,
  dyMult: 0.75,
  textLengthMult: 0.8
}

const CellText = ({ value, cellX, cellY, cellHeight, cellWidth, id }) => (
  <text id={id} className="grid-cell-text-value"
    x={cellX}
    y={cellY}
    dx={cellWidth*textProps.dxMult}
    dy={cellHeight*textProps.dyMult}
    fontSize={cellHeight*textProps.dyMult + 'px'}
    textLength={cellWidth*textProps.textLengthMult}
    lengthAdjust="spacingAndGlyphs"
  >
    {value}
  </text>
);

CellText.propTypes = {
  value: PropTypes.string.isRequired,
  cellX: PropTypes.number.isRequired,
  cellY: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CellText;
