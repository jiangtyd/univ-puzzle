import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { CellType } from '../reducers/cell';
import { setCellFill } from '../actions';

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

const mapStateToProps = (state) => {
  let {width: gapWidth, height: gapHeight} = gridRenderingProps.gap
  let cells = [];
  let gridY = 0;
  let y = 0;
  let totalHeight = 0;
  let totalWidth = 0;
  console.log('start');
  for(let row of state.get('grid')) {
    let gridX = 0;
    let x = 0;
    let rowHeight = 0;
    for(let cell of row) {
      let {type, data} = cell.toJS();
      // console.log(cell.toJS());
      let {width, height} = gridRenderingProps[CellType[type]];
      if (height > rowHeight) {
        rowHeight = height;
      }
      let cellProps = {
        fillId: data.fillId,
        width: width,
        height: height,
        x: x,
        y: y,
        gridX: gridX,
        gridY: gridY,
        id: "c" + gridX + "_" + gridY
      };
      // console.log(cellProps);
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
  y -= gapHeight
  if(y > totalHeight) {
    totalHeight = y;
  }

  return {
    cells: cells,
    dimensions: {
      height: totalHeight,
      width: totalWidth
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return { onCellClick: (gridX, gridY, fillId) => 
    {
      dispatch(setCellFill(gridX, gridY, (fillId+1)%4));
    }
  };
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
