(function () {

  if (typeof SnakeSpace === "undefined") {
    window.SnakeSpace = {};
  }

  var Snake = SnakeSpace.Snake = function (coord) {
    this.dir = "E";
    this.segments = [coord];
  };

  // Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype.move = function (grow) {
    // console.log(grow)
    var pos = this.head().plus(this.dir);
    var new_head = new SnakeSpace.Coord(pos);
    this.segments.push(new_head);
    if (!grow) {
      this.segments.shift();
    }
  };

  Snake.prototype.turn = function (dir) {
    if (dir === "N" && this.dir === "S" ||
        dir === "W" && this.dir === "E" ||
        dir === "S" && this.dir === "N" ||
        dir === "E" && this.dir === "W") {
      return;
    }
    this.dir = dir;
  };

  Snake.prototype.length = function () {
    return this.segments.length;
  };

  Snake.prototype.head = function () {
    return this.segments[this.length() - 1];
  };

})();
