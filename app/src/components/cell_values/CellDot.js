import React, { PropTypes } from 'react';

let CellDot = ({ cellX, cellY, cellHeight, cellWidth, id}) => {
  let centerX = cellX + cellWidth*0.5;
  let centerY = cellY + cellHeight*0.5;
  return <line id={id}
    x1={centerX} y1={centerY}
    x2={centerX} y2={centerY}
  />
}

CellDot.propTypes = {
  cellX: PropTypes.number.isRequired,
  cellY: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CellDot;
