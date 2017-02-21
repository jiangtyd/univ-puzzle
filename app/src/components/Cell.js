import React, { PropTypes } from 'react';
import CellDot from './cell_values/CellDot';
import CellFill from './cell_values/CellFill';
import CellText from './cell_values/CellText';
import { CellValueType, CellTypeLengths } from '../constants/cell';
import "./Cell.css";

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
  let bgClasses = ["grid-cell-bg"];
  if (selected) {
    bgClasses.push("grid-cell-selected");
  }
  let bgColor = rendering.cellBackgrounds[type];
  return (
    <g className="grid-cell"
      id={id}
    >
      <rect className={bgClasses.join(" ")}
        width={width}
        height={height}
        x={x}
        y={y}
        id={id+'-bg'}
        {...bgColor}
      />
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
