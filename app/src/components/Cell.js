import React, { PropTypes } from 'react';
import _ from 'lodash';
import CellDot from './cell_values/CellDot';
import CellFill from './cell_values/CellFill';
import CellText from './cell_values/CellText';

export const CellValueType = {
  NONE:    'none',
  TEXT:    'text',
  FILL:    'fill',
  DOT:     'dot',
  RECT:    'rect',
  LINE:    'line',
  CIRCLE:  'circle',
  X_SHAPE: 'x_shape'
};

const markingRenderingProps = {
  '': {
    type: CellValueType.NONE,
  },
  "x": {
    type: CellValueType.FILL,
  },
  "-": {
    type: CellValueType.FILL,
  }
};

const getRenderingProps = (value) => {
  if(value in markingRenderingProps) {
    return markingRenderingProps[value];
  } else if(!isNaN(value)) { // is a number
    return {
      type: CellValueType.TEXT,
      value: String(value)
    };
  } else {
    return {
      type: CellValueType.NONE,
    };
  }
}

const renderCellValue = (value, width, height, x, y, id) => {
  let cellProps = {
    cellX: x,
    cellY: y,
    cellWidth: width,
    cellHeight: height,
  }
  // console.log("value in RenderingProps = " + value);
  let renderingProps = getRenderingProps(value);
  switch(renderingProps.type) {
    case CellValueType.NONE:
      return;
    case CellValueType.TEXT:
      return (<CellText value={value} {...cellProps} />);
    case CellValueType.FILL:
      return (<CellFill value={value} {...cellProps} />);
    case CellValueType.DOT:
      return (<CellDot {...cellProps} />);
    default:
      return;
  }
};

let Cell = ({ value, width, height, x, y, id, onCellMouseDown, onCellMouseOver}) => (
    <g className="grid-cell"
      id={id}
      onMouseDown={onCellMouseDown}
      onMouseOver={onCellMouseOver}
    >
      <rect className="grid-cell-bg"
        // fill={fillColors[fillId]}
        opacity={0}
        width={width}
        height={height}
        x={x}
        y={y}
        id={id+'-bg'}
      />
      {renderCellValue(value, width, height, x, y, id)}
    </g>
  );

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onCellMouseDown: PropTypes.func.isRequired,
  onCellMouseOver: PropTypes.func.isRequired
};

export default Cell;
