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
    id: id+'-value',
  }
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

const SELECTION_COLOR="#3377DD";

const renderSelected = (width, height, x, y, id) => (
  <rect className="grid-cell-selected"
    fill={SELECTION_COLOR}
    opacity={0.4}
    width={width}
    height={height}
    x={x}
    y={y}
    id={id+'-selected'}
  />
);

let Cell = ({ value, width, height, x, y, id, selected }) => (
    <g className="grid-cell"
      id={id}
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
      {selected && renderSelected(width, height, x, y, id)}
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
};

export default Cell;
