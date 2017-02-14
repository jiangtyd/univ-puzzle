import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { startPainting, paint, stopPainting, selectCell, deselectCell, enterText } from '../actions';
import { INPUT_METHODS } from '../constants/inputmethods';

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
  let gridRenderingProps = state.getIn(['puzzleDefs', 'rendering', 'gridRenderingProps']);
  let {width: gapWidth, height: gapHeight} = gridRenderingProps.get('gap').toJS();
  let cells = [];
  let gridY = 0, y = 0, gridX = 0, x = 0;
  let totalHeight = 0, totalWidth = 0;
  for(let row of state.get('grid')) {
    gridX = 0;
    x = 0;
    let rowHeight = 0;
    for(let cell of row) {
      let {type, data} = cell.toJS();
      let {width, height} = gridRenderingProps.get(type).toJS();
      if (height > rowHeight) {
        rowHeight = height;
      }
      let cellProps = {
        value: String(data),
        type: type,
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
    rules: state.getIn(['puzzleDefs', 'rules']).toJS(),
    rendering: state.getIn(['puzzleDefs', 'rendering']).toJS(),
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
      onCellMouseDown: (gridX, gridY, newValue, cellTypes) => {
        dispatch(startPainting(newValue, cellTypes));
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
