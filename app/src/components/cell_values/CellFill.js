import React, { PropTypes } from 'react';

const fillProps = {
  fillColors: [
    'x': "#000",
    '-': "#DDD",
  ]
}

let CellFill = ({ value, cellX, cellY, cellHeight, cellWidth }) => (
  <rect className="grid-cell-value"
    fill={fillProps.fillColors[value]}
    width={cellWidth}
    height={cellHeight}
    x={cellX}
    y={cellY}
  />
);

CellFill.propTypes = {
  value: PropTypes.string.isRequired,
  cellX: PropTypes.number.isRequired,
  cellY: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
};

export default CellFill;