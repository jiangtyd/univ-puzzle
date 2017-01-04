import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { CellTypeMap } from '../reducers/cell';
import { startPainting, paint, stopPainting } from '../actions';

const gridRenderingProps = {
  vertex: {
    width: 4,
    height: 4
  },
  horizontalEdge: {
    width: 40,
    height: 4
  },
  verticalEdge: {
    width: 4,
    height: 40
  },
  face: {
    width: 40,
    height: 40,
  },
  gap: {
    width: 2,
    height: 2,
  },
};

const serializeGridXY = (gridX, gridY) => "c" + gridX + "-" + gridY;

const mapStateToProps = (state) => {
  let {width: gapWidth, height: gapHeight} = gridRenderingProps.gap
  let cells = [];
  let gridY = 0, y = 0, gridX = 0, x = 0;
  let totalHeight = 0, totalWidth = 0;
  for(let row of state.get('grid')) {
    gridX = 0;
    x = 0;
    let rowHeight = 0;
    for(let cell of row) {
      let {type, data} = cell.toJS();
      let {width, height} = gridRenderingProps[CellTypeMap[type]];
      if (height > rowHeight) {
        rowHeight = height;
      }
      let cellProps = {
        value: String(data),
        width: width,
        height: height,
        x: x,
        y: y,
        gridX: gridX,
        gridY: gridY,
        id: serializeGridXY(gridX, gridY)
      };
      cells.push(cellProps);
      x += (width+gapWidth);
      ++gridX;
    }
    x -= gapWidth;
    if(x > totalWidth) {
      totalWidth = x;
    }
    y += (rowHeight+gapHeight);
    ++gridY;
  }
  y -= gapHeight;
  if(y > totalHeight) {
    totalHeight = y;
  }

  return {
    cells: cells,
    gridProps: {
      height: gridY,
      width: gridX,
      renderHeight: totalHeight,
      renderWidth: totalWidth
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      onCellMouseDown: (gridX, gridY, value, cellTypes) => {
        dispatch(startPainting((Number(value)+1)%4, cellTypes));
        dispatch(paint(gridX, gridY));
      },
      onCellMouseOver: (gridX, gridY) => {
        dispatch(paint(gridX, gridY));
      },
      onGridMouseUp: () => {
        dispatch(stopPainting());
      },
      onGridMouseLeave: () => {
        dispatch(stopPainting());
      },
    }
  };
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
