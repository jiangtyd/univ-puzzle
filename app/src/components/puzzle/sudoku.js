import Immutable from 'immutable';

const allowedData = Immutable.Set(['', 'x', 1, 2, 3, 4, 5, 6, 7, 8, 9]);

const markingRenderingProps = {
  '': {
    type: CellValueType.NONE,
  },
  "x": {
    type: CellValueType.FILL,
    color: 0
  },
};

const getRenderingProps = (value) => {
  if(value in markingRenderingProps) {
    return markingRenderingProps[value];
  } else if(!isNaN(value)) { // is a number
    return {
      type: CellValueType.TEXT,
      value: value
    };
  } else {
    return {
      type: CellValueType.NONE,
    };
  }
}
