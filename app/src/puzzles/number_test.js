import Immutable from 'immutable';
import { CellValueType } from '../constants/cell';

const alphabetList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// allowed values that can be stored in cells
const alphabet = Immutable.Set(alphabetList);

const palette = ["#111"]

const initialValues = {
  vertex: "0",
  horizontalEdge: "0",
  verticalEdge: "0",
  face: "0"
};

const rules = {
  paintRules: {
    vertex: {
      left: ["0", "1", "2", "3"]
    },
    horizontalEdge: {
      left: ["0", "1", "2", "3"]
    },
    verticalEdge: {
      left: ["0", "1", "2", "3"]
    },
    face: {
      left: ["0", "1", "2", "3"]
    }
  },
  entryRules: {
    vertex: {
      alphabet: alphabet
    },
    horizontalEdge: {
      alphabet: alphabet
    },
    verticalEdge: {
      alphabet: alphabet
    },
    face: {
      alphabet: alphabet
    }
  }
}

const inputRules = {
  GIVE: rules,
  SOLVE: rules
}

const bg = {
  fill: "#FFF",
  opacity: 0
}

const cellBackgrounds = {
  vertex: bg,
  horizontalEdge: bg,
  verticalEdge: bg,
  face: bg
}

const paintRenderingRules = {
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
  edge: 4,
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

const numberTestDefs = Immutable.fromJS({
  name: 'Number test',
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

export default numberTestDefs;
