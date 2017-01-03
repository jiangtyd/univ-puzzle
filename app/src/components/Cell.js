import React, { PropTypes } from 'react';

const fillColors = [
  "#DDD",
  "#C00",
  "#0C0",
  "#00C",
]

let Cell = ({ fillId, width, height, x, y, id, onCellMouseDown, onCellMouseOver}) =>
  (
    <g className="grid-cell"
      id={id}
      onMouseDown={onCellMouseDown}
      onMouseOver={onCellMouseOver}
    >
      <rect className="grid-cell-bg"
        // fill={fillColors[fillId]}
        width={width}
        height={height}
        x={x}
        y={y}
        id={id+'-bg'}
      />
      <rect className="grid-cell-value"
        fill={fillColors[fillId]}
        width={width}
        height={height}
        x={x}
        y={y}
        id={id+'-value'}
      />
    </g>
  );

Cell.propTypes = {
  fillId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onCellMouseDown: PropTypes.func.isRequired,
  onCellMouseOver: PropTypes.func.isRequired
};

export default Cell;
