import React from 'react';

function Face(props) {
  /*
  function getRectProps () {
    var[xCoord, yCoord] = props.gridProps.computeCoords(props.gridX, props.gridY);
    return {
      fill: props.fillMap[props.fillId],
      width: props.gridProps.faceWidth,
      height: props.gridProps.faceHeight,
      x: xCoord,
      y: yCoord,
      id: props.id
    }
  };
  */

  function getRectProps () {
    return {
      fill: props.fill, // props.fillMap[props.fillId],
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
      id: props.id
    }
  };

  function handleClick(e) {

  };


  var rectProps = getRectProps();
  return (
    <rect className="grid-face"
     fill={rectProps.fill}
     width={rectProps.width}
     height={rectProps.height}
     x={rectProps.x}
     y={rectProps.y}
     id={rectProps.id} />
   );
}

export default Face;
