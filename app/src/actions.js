var Immutable = require('immutable');

export const START_PAINTING = 'START_PAINTING';
export const PAINT = 'PAINT';
export const STOP_PAINTING = 'STOP_PAINTING';

export const PAUSE_PAINTING = 'PAUSE_PAINTING';
export const RESUME_PAINTING = 'RESUME_PAINTING';

export function startPainting(fillId, cellTypes) {
  return {
    type: START_PAINTING,
    fillId: fillId,
    cellTypes: Immutable.Set(cellTypes) // cellTypes to paint
  };
}

export function paint(gridX, gridY) {
  return {
    type: PAINT,
    gridX: gridX,
    gridY: gridY,
  }
}

export function stopPainting() {
  return {
    type: STOP_PAINTING
  }
}

export function pausePainting() {
  return {
    type: PAUSE_PAINTING
  }
}

export function resumePainting() {
  return {
    type: RESUME_PAINTING
  }
}
