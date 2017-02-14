import React, { PropTypes } from 'react';
import CellDot from './cell_values/CellDot';
import CellFill from './cell_values/CellFill';
import CellText from './cell_values/CellText';
import { CellValueType } from '../constants/cell';

const drawCell = (renderedCell, cellProps) => {
  let { type, value } = renderedCell;
  switch(type) {
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

const renderCellValue = (value, width, height, x, y, id, rendering) => {
  let renderedCell = rendering.renderValue(value);
  let cellProps = {
    cellX: x,
    cellY: y,
    cellWidth: width,
    cellHeight: height,
    id: id+'-value',
  }
  return drawCell(renderedCell, cellProps);
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

let Cell = ({ value, width, height, x, y, id, selected, rendering }) => (
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
      {renderCellValue(value, width, height, x, y, id, rendering)}
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
