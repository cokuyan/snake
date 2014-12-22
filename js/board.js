(function () {

  if (typeof SnakeSpace === "undefined") {
    window.SnakeSpace = {};
  }

  var Board = SnakeSpace.Board = function (dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.snake = new SnakeSpace.Snake(this.generateStartingPos());
    this.apples = []; // only have one apple at a time?
  }

  Board.prototype.generateStartingPos = function () {
    // generate position in the middle of the grid
    var x = Math.floor(Math.random() * this.dimX / 2 + this.dimX / 4);
    var y = Math.floor(Math.random() * this.dimY / 2 + this.dimY / 4);
    return new SnakeSpace.Coord([y, x]);
  }

  Board.prototype.generateApple = function () {
    lis = $("li");
    do {
      var appleSquare = Math.floor(Math.random() * this.dimX * this.dimY);
    } while ($(lis[appleSquare]).hasClass("snake"));

    $(lis[appleSquare]).addClass("apple");
    this.apples.push(appleSquare);
  }

  Board.prototype.isOutOfBounds = function (coord) {
    var pos = coord.pos;
    return pos[1] < 0 || pos[1] >= this.dimX || pos[0] < 0 || pos[0] >= this.dimY
  }

  // move to snake class?
  Board.prototype.isSnakeDead = function (){
    return this.isOutOfBounds(this.snake.segments[this.snake.length() - 1]) ||
           this.isOverlapping();
  }

  // only check head of snake?
  Board.prototype.isOverlapping = function () {
    for (var i = 0; i < this.snake.length(); i++) {
      for (var j = i + 1; j < this.snake.length(); j++) {
        if (this.snake.segments[i].isOverlapping(this.snake.segments[j])) {
          return true;
        }
      }
    }
    return false;
  };

  // move to snake class?
  Board.prototype.hasEatenApple = function () {
    for (var i = 0; i < this.apples.length; i++) {
      var square = this.apples[i];
      if ( $($("li")[square]).hasClass("snake") ) {
        this.apples.splice(i, 1);
        return true;
      }
    }
    return false;
  };

})();
