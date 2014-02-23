class BoardViewSettings
  constructor: (@cellHeight = 40, @cellWidth = 40, @borderWidth = 1) ->
    @faceColorScheme =
      -1: Color.LIGHT_GREY
      0: Color.WHITE
      1: Color.BLACK

newRect = (topleftx, toplefty, height, width) -> $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr(
  x: topleftx
  y: toplefty
  height: height
  width: width)

class BoardView
  # @param boardWrapper: id of DOM element wrapping the game board UI
  # @param boardModel: underlying BoardModel
  constructor: (@boardWrapper, @boardModel, @settings) ->
    @painting = false
    @$boardWrapper = $("#{@boardWrapper}").attr(
      onselectstart: "return false;"
      oncontextmenu: "return false;")
    @$boardWrapper.css(
      width: @boardModel.width * @settings.cellWidth + (@boardModel.width + 1) * @settings.borderWidth
      height: @boardModel.height * @settings.cellHeight + (@boardModel.width + 1) * @settings.borderWidth)

    @$boardElement = $("<svg/>").attr(
      xmlns: "http://www.w3.org/2000/svg"
      version: "1.1"
      id: "gameBoard")

    @cellsView = []
    for y in [0..2*@boardModel.height]
      cellsViewRow = []
      for x in [0..2*@boardModel.width]
        # if both x and y are even, vertex cell
        if x % 2 == 0 && y % 2 == 0
          row.push(newRect())
        # if both x and y are odd, face cell
      @cells.push(row)

  newCell: (cellX, cellY, cellModel)
    if cellX % 2 == 0 && cellY % 2 == 0
      return newVertex()
    else if x % 2 == 1 && y % 2 == 1
      return newFace()
    else
      return newEdge()

  # (x, y) are top-left corner of vertex (ignoring VertexCell.thickness)
  newVertex: (x, y, vertexCellModel) ->
    t = vertexCellModel.thickness
    newRect(x-t/2, y-t/2, @settings.borderWidth+t, @settings.borderWidth+t)





#      $("#gameBoard").mouseleave(function() {
#        stopPainting();
#      });

      // width, height measured in # cells
      for(var i=0; i<width; i++) {
        cells.push([]);
        for(var j=0; j<height; j++) {
          var cell = newRect();
          if((i+j)%2 === 0) { 
            cells[i].push(0);
            colorTable.appendToItem(0, i+'_'+j); // cell ids are separated by '_'
            $(cell).attr("fill", colors[0]);
          } else {
            cells[i].push(1);
            colorTable.appendToItem(1, i+'_'+j);
            $(cell).attr("fill", colors[1]);
          }

          $(cell).attr({
            "width": CELL_WIDTH,
            "height": CELL_HEIGHT,
            "x": i*(1+CELL_WIDTH)+1,
            "y": j*(1+CELL_HEIGHT)+1,
            "id": "c"+i+"_"+j
          });
          $(cell).mousedown(startPainting);
          $(cell).mouseover(toggleCell);
          $(cell).mouseup(stopPainting);

          $(gb).append(cell);
        }   
      }
    }
  };



function Board (gb_input) {
  var gb = gb_input;
  var cells = [], colorTable = new HashTable({});
  var vEdges = [], hEdges = [];
  var vertices = [];
  var CELL_HEIGHT = 40, CELL_WIDTH = 40;
  var width = 0, height = 0;

  var colorInputs = [];
  var colors = [];
    
  var painting = false, alreadyPainting = false;
  var dragTargetColor, dragTargetColorIndex;

  var deleteBoard = function() {
    (gb).empty();
  };


  var startPainting = function(evt) {
    painting = true;
    var target = evt.target;
    var fillColor = $(target).attr("fill");
    var coords = $(target).attr("id").substring(1).split('_');

    for(var i = 0; i < colors.length; i++) {
      if(fillColor === colors[i]) {
        var next = (i+1)%(colors.length);
        dragTargetColor = colors[next];
        dragTargetColorIndex = next;

        $(target).attr("fill", dragTargetColor);
        cells[parseInt(coords[0])][parseInt(coords[1])] = dragTargetColorIndex;
      }
    }
  }

  var stopPainting = function(evt) {
    painting = false;
  }

  var toggleCell = function(evt) {
    if(!painting) return null;

    var target = evt.target;
    var coords = target.getAttribute("id").substring(1).split('_');

    $(target).attr("fill", dragTargetColor);
    cells[parseInt(coords[0])][parseInt(coords[1])] = dragTargetColorIndex;
  }
  
  var getCell = function(i,j) {
    return cells[i][j];
  };

  var getCells = function() {
    return cells;
  };

  var getCellsOfColor = function(i) {
    return colorTable.getItem(i);
  };

  var getPainting = function() {
    return painting;
  }

  return {
    numColors: function() {
      return colors.length;
    },
    addColorInput: function(input) {
      colorInputs.push(input);
      colors.push('\#' + input.toString());
    },
    changeColor: function(i) {
      newColor = '\#' + colorInputs[i].toString();
      $("[fill='" + colors[i] + "']").attr("fill", newColor);
      colors[i] = newColor
    },
    createBoard: function(width, height) { 
      width = width;
      height = height;

      $("#boardDiv").css({
        "width" : width*(1+CELL_WIDTH) + 2,
        "height" : height *(1+CELL_HEIGHT) + 2
      });

      $("#gameBoard").mouseleave(function() {
        stopPainting();
      });

      // width, height measured in # cells
      for(var i=0; i<width; i++) {
        cells.push([]);
        for(var j=0; j<height; j++) {
          var cell = newRect();
          if((i+j)%2 === 0) { 
            cells[i].push(0);
            colorTable.appendToItem(0, i+'_'+j); // cell ids are separated by '_'
            $(cell).attr("fill", colors[0]);
          } else {
            cells[i].push(1);
            colorTable.appendToItem(1, i+'_'+j);
            $(cell).attr("fill", colors[1]);
          }

          $(cell).attr({
            "width": CELL_WIDTH,
            "height": CELL_HEIGHT,
            "x": i*(1+CELL_WIDTH)+1,
            "y": j*(1+CELL_HEIGHT)+1,
            "id": "c"+i+"_"+j
          });
          $(cell).mousedown(startPainting);
          $(cell).mouseover(toggleCell);
          $(cell).mouseup(stopPainting);

          $(gb).append(cell);
        }   
      }
    }
  };
}

var b;

function toggleMenu(headingID, menuID) {
  if (!document.getElementById) return;
  var heading = document.getElementById(headingID).innerHTML;
  document.getElementById(headingID).innerHTML = heading.charAt(0) === "+" ? "-" + heading.substring(1) : "+" + heading.substring(1);
  var menu = document.getElementById(menuID).style;
  menu.display = (menu.display === 'block')?'none': 'block';
};


function initBoard(id) {
  b = new Board(document.getElementById(id));
};

function initContent(w, h) {
  b.createBoard(w,h);
};

function newRect() {
  return document.createElementNS("http://www.w3.org/2000/svg", "rect");
}


function addColor(color) {
  var idx = b.numColors();

  var cDiv = document.createElement("div");
  $(cDiv).attr({
    "class": "menuItem",
    "id": "colorDiv"+idx
  });

  var cDelete = document.createElement("input");
  $(cDelete).attr({
    "type": "button",
    "value": "x"
  });

  var cMenuItem = document.createElement("input"); // color picker
  var col = new jscolor.color(cMenuItem);
  col.fromString(color);
  b.addColorInput(col);
  $(cMenuItem).attr({
    "style": cMenuItem.getAttribute("style") + " width: 5em;",
    "id": "color"+idx,
    "onchange": "b.changeColor("+idx+");"
  });

  $(cDiv).append([cDelete, cMenuItem]);
  $("#colorMenu").append(cDiv);
};

function removeColor(idx) {
  if(b.getCellsOfColor(idx).length === 0) {
  }
};

function addCollapsibleMenu(menuName, menuTitle) {
  var menu = document.createElement("div");
  $(menu).attr({
    "class": "menuHeading", 
    "onclick": "toggleMenu('"+menuName+"Title"+"', '"+menuName+"');"
  });
  
  var menuTitleH3 = document.createElement("h3");
  $(menuTitleH3).attr("id", menuName+"Title");
  $(menuTitleH3).text("+ "+menuTitle);

  var collapsible = document.createElement("div");
  $(collapsible).attr({
    "class": "menuCollapsible", 
    "id": menuName
  });

  menu.appendChild(menuTitleH3);
  $("#menu").append([menu, collapsible]);
};

function initColorMenu() {
  addCollapsibleMenu("colorMenu", "Colors");
  var addNewColorButton = document.createElement("input");
  $(addNewColorButton).attr({
    "type": "button",
    "value": "Add new color",
    "onclick": "addColor('000000');"
  });

  $("#colorMenu").append(addNewColorButton);
  addColor("777777");
  addColor("FFFFFF");

  var paintingDiv = document.createElement("div");
  $("#menu").append(paintingDiv);
};

function initMenu() {
  initColorMenu();
};

function init() {
  initBoard("gameBoard");
  initMenu();
  initContent(10, 10);
};
