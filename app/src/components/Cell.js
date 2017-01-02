import React, { PropTypes } from 'react';

const fillColors = [
  "#DDD",
  "#C00",
  "#0C0",
  "#00C",
]

function Cell({ fillId, width, height, x, y, id, onMouseDown, onMouseOver, onMouseUp }) {

  return (
    <rect className="grid-face"
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
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
  fillId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
};

export default Cell;
