import React, { PropTypes } from 'react';

let CellFill = ({ color, cellX, cellY, cellHeight, cellWidth, id }) => (
  <rect id={id} className="grid-cell-value"
    fill={color}
    width={cellWidth}
    height={cellHeight}
    x={cellX}
    y={cellY}
  />
);

CellFill.propTypes = {
  color: PropTypes.string.isRequired,
  cellX: PropTypes.number.isRequired,
  cellY: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CellFill;
