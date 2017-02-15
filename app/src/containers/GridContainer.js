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

// assume that grid has standard layout. TODO may want to not assume this
const computeDimension = (n, { face, edge, gap }) => face * Math.floor((n)/2) + edge * Math.floor((n+1)/2) + gap * (n-1);

const mapStateToProps = (state) => {
  let inputState = state.get('input');
  let cells = [];
  let gridY = 0, gridX = 0;
  for(let row of state.get('grid')) {
    gridX = 0;
    for(let cell of row) {
      let { type, data } = cell.toJS();
      let cellProps = {
        value: String(data),
        type: type,
        gridX: gridX,
        gridY: gridY,
        selected: isSelected(inputState, gridX, gridY),
        id: serializeGridXY(gridX, gridY)
      };
      cells.push(cellProps);
      ++gridX;
    }
    ++gridY;
  }

  let gridHeight = state.get('gridHeight');
  let gridWidth = state.get('gridWidth');
  let rules = state.getIn(['puzzleDefs', 'rules']).toJS();
  let rendering = state.getIn(['puzzleDefs', 'rendering']).toJS();

  let ret = {
    cells: cells,
    rules: rules,
    rendering: rendering,
    gridProps: {
      height: gridHeight,
      width: gridWidth,
      renderHeight: computeDimension(gridHeight, rendering.gridSizeProps),
      renderWidth: computeDimension(gridWidth, rendering.gridSizeProps),
    }
  }
  if (isAnyCellSelected(inputState)) {
    ret.selectedCell = {
      x: inputState.getIn(['entry', 'selectionX']),
      y: inputState.getIn(['entry', 'selectionY'])
    }
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
