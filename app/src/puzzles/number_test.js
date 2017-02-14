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
      alphabet: alphabetList
    },
    horizontalEdge: {
      alphabet: alphabetList
    },
    verticalEdge: {
      alphabet: alphabetList
    },
    face: {
      alphabet: alphabetList
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
  faceWidth: 40,
  edgeWidth: 4,
  gap: 0
}

const gridRenderingProps = ({faceWidth, edgeWidth, gap}) => {
  return {
    vertex: {
      width: edgeWidth,
      height: edgeWidth
    },
    horizontalEdge: {
      width: faceWidth,
      height: edgeWidth
    },
    verticalEdge: {
      width: edgeWidth,
      height: faceWidth
    },
    face: {
      width: faceWidth,
      height: faceWidth,
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
    gridRenderingProps: gridRenderingProps(gridSizeProps)
  }
});

export default numberTestDefs;