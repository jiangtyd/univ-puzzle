export const SET_CELL_FILL = 'SET_CELL_FILL';

export function setCellFill(gridX, gridY, fillId) {
  return {
    type: SET_CELL_FILL,
    gridX: gridX,
    gridY: gridY,
    fillId: fillId
  };
}
