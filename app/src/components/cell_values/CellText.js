import React, { PropTypes } from 'react';

const textProps = {
  dxMult: 0.5,
  dyMult: 0.75,
  textLengthMult: 0.8
}

// todo css this
const globalTextProps = {
 textAnchor: "middle",
 lengthAdjust: "spacingAndGlyphs"
}

const CellText = ({ value, cellX, cellY, cellHeight, cellWidth }) => (
  <text className="grid-cell-value"
    x={cellX}
    y={cellY}
    dx={cellWidth*textProps.dxMult}
    dy={cellHeight*textProps.dyMult}
    fontSize={cellHeight*textProps.dyMult + 'px'}
    textLength={cellWidth*textProps.textLengthMult}
    {...globalTextProps}
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
};

export default CellText;
