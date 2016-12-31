import React, { PropTypes } from 'react';

const fillColors = [
  "#DDD",
  "#C00",
  "#0C0",
  "#00C",
]

function Cell({ onClick, fillId, width, height, x, y, id }) {

  return (
    <rect className="grid-face"
      onClick={onClick}
      fill={fillColors[fillId]}
      width={width}
      height={height}
      x={x}
      y={y}
      id={id}
    />
   );
}

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  fillId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default Cell;
