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
        var fillColor = target.getAttribute("fill");
        var coords = target.getAttribute("id").substring(1).split('_');

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