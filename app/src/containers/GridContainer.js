import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { CellTypeMap } from '../reducers/cell';
import { startPainting, paint, stopPainting, selectCell, deselectCell, enterText } from '../actions';
import { INPUT_METHODS } from '../constants/inputmethods';

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

const isAnyCellSelected = (state) => (
    state.get('inputMethod') === INPUT_METHODS.ENTRY
    && state.getIn(['entry', 'cellSelected'])
);

const isSelected = (state, gridX, gridY) => (
    isAnyCellSelected(state)
    && state.getIn(['entry', 'selectionX']) === gridX
    && state.getIn(['entry', 'selectionY']) === gridY
);

const mapStateToProps = (state) => {
  let inputState = state.get('input');
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
        selected: isSelected(inputState, gridX, gridY),
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

  let selectedCell;
  if (isAnyCellSelected(inputState)) {
    selectedCell = {
      x: inputState.getIn(['entry', 'selectionX']),
      y: inputState.getIn(['entry', 'selectionY'])
    }
  }

  let ret = {
    cells: cells,
    gridProps: {
      height: state.get('gridHeight'),
      width: state.get('gridWidth'),
      renderHeight: totalHeight,
      renderWidth: totalWidth
    }
  }
  if (selectedCell) {
    ret.selectedCell = selectedCell;
  }
  return ret;
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
      onCellSelect: (gridX, gridY) => {
        dispatch(selectCell(gridX, gridY));
      },
      onEscape: () => {
        dispatch(deselectCell());
      },
      onNumberKey: (number) => {
        dispatch(enterText(String(number)));
      }
    }
  };
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

export default GridContainer;
