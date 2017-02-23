import Immutable from 'immutable';
import { CellValueType } from '../constants/cell';

// allowed values that can be stored in cells
const alphabet = Immutable.Set(["", "x", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const palette = ["#111"]

const initialValues = {
  vertex: "",
  horizontalEdge: "",
  verticalEdge: "",
  face: ""
};

const inputRules = {
  GIVE: {
    paintRules: {
      horizontalEdge: {
        left: ["", "x"] // cycle through these on left click
      },
      verticalEdge: {
        left: ["", "x"] // cycle through these on left click
      }
    },
    entryRules: {
      face: {
        alphabet: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      }
    }
  },
  SOLVE: {
    entryRules: {
      face: {
        alphabet: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      }
    }
  }
}

const grayBg = {
  stroke: "#888",
  fill: "#888",
  opacity: 1
}

const cellBackgrounds = {
  vertex: grayBg,
  horizontalEdge: grayBg,
  verticalEdge: grayBg,
  face: {
    stroke: "#FFF",
    fill: "#FFF",
    opacity: 0
  }
}

const paintRenderingRules = {
  "": {
    type: CellValueType.NONE,
  },
  "x": {
    type: CellValueType.FILL,
    color: "#000"
  },
};

const renderValue = (value) => {
  if(value in paintRenderingRules) {
    return paintRenderingRules[value];
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

const gridSizeProps = {
  face: 40,
  edge: 2,
  gap: 0
}

const gridRenderingProps = ({face, edge, gap}) => {
  return {
    vertex: {
      width: edge,
      height: edge
    },
    horizontalEdge: {
      width: face,
      height: edge
    },
    verticalEdge: {
      width: edge,
      height: face
    },
    face: {
      width: face,
      height: face,
    },
    gap: {
      width: gap,
      height: gap,
    },
  };
}

const sudokuDefs = Immutable.fromJS({
  name: 'Sudoku',
  alphabet: alphabet,
    initialValues: initialValues,
  rules: {
    inputRules: inputRules,
  },
  rendering: {
    palette: palette,
    cellBackgrounds: cellBackgrounds,
    renderValue: renderValue,
    gridSizeProps: gridSizeProps,
    gridRenderingProps: gridRenderingProps(gridSizeProps)
  }
});

export default sudokuDefs;
