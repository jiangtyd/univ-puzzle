import React, { PropTypes } from 'react';
import CellDot from './cell_values/CellDot';
import CellFill from './cell_values/CellFill';
import CellText from './cell_values/CellText';
import { CellValueType, CellTypeLengths } from '../constants/cell';

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

// assume that grid has standard layout. TODO may want to not assume this
const computeOffset = (n, { face, edge, gap }) => face * Math.floor(n/2) + edge * Math.floor((n+1)/2) + gap * n ;

const computeCellProperties = (value, type, gridX, gridY, gridSizeProps) => (
    {
      width: gridSizeProps[CellTypeLengths[type].width],
      height: gridSizeProps[CellTypeLengths[type].height],
      x: computeOffset(gridX, gridSizeProps),
      y: computeOffset(gridY, gridSizeProps)
    }
  );

let Cell = ({ value, type, gridX, gridY, id, selected, rendering }) => {
  let { width, height, x, y } = computeCellProperties(value, type, gridX, gridY, rendering.gridSizeProps);
  return (
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
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  gridX: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  rendering: PropTypes.object.isRequired
};

export default Cell;
