class Cell
  constructor: ->

class VertexCell extends Cell
  # @param given: whether this vertex is given by the puzzle or not
  # @param fill: whether this vertex is colored/filled or not (number correspond to type of fill)
  # @param thickness: thickness of drawn vertex
  constructor: (@given = true, @fill = 0, @thickness = 1) ->
  @cellType: -> "vertex"

class EdgeCell extends Cell
  # @param given: whether this edge is given by the puzzle or not
  # @param fill: whether this edge is colored/filled or not (number corresponds to type of fill)
  # @param thickness: thickness of drawn edge
  constructor: (@given = false, @fill = 0, @thickness = 1) ->
  @cellType: -> "edge"

# man I dunno what to call this
# so thank you polytopes 
class FaceCell extends Cell
  # @param num: numerical contents of cell
  # TODO support multiple numbers
  # @param fill: "fill" contents of cell
  # @param givenNum: whether num is given or not
  # @param givenFill: whether fill is given or not
  constructor: (@givenNum = false, @givenFill = false, @num = null, @fill = 0) ->
  @cellType: -> "face"

class Color
  constructor: (@red, @green, @blue) ->
  toRGBA: -> "rgba(#{@red}, #{@green}, #{@blue})"
  mix: (color2) ->
    new Color( (@red + color2.red)/2,
      (@green + color2.green)/2,
      (@blue + color2.blue)/2 )

  @WHITE = new Color(255, 255, 255)
  @LIGHT_GREY = new Color(191, 191, 191)
  @GREY = new Color(127, 127, 127)
  @DARK_GREY = new Color(63, 63, 63)
  @BLACK = new Color(0, 0, 0)

  @RED = new Color(255, 0, 0)
  @GREEN = new Color(0, 255, 0)
  @BLUE = new Color(0, 0, 255)

class BoardModel
  #
  # In an m x n grid, we store
  # (2m+1) x (2n+1) "cells" to account for
  # edges and corners.
  #
  # Ex: in a Slitherlink we might need 
  # something like
  #
  # .  =  .  =  .
  # || 3  .  3 ||
  # .  =  .  =  .
  #
  # which has 2 x 1 "faces"/"squares" but 5 x 3 "cells."
  #
  
  constructor: (@width, @height) ->
    @cells = []

    for y in [0..2*@height]
      row = []
      for x in [0..2*@width]
        # if both x and y are even, vertex cell
        if x % 2 == 0 && y % 2 == 0
          row.push(new VertexCell)
        # if both x and y are odd, face cell
        else if x % 2 == 1 && y % 2 == 1
          row.push(new FaceCell)
        else
          row.push(new EdgeCell)
      @cells.push(row)

