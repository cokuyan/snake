(function () {
  if (typeof SnakeSpace === "undefined") {
    window.SnakeSpace = {};
  }

  var Coord = SnakeSpace.Coord = function(pos){
    this.pos = pos;
  }

  Coord.prototype.plus = function(dir){
    result = this.pos.slice();
    switch (dir){
      case "N":
        result[0]--;
        break;
      case "E":
        result[1]++;
        break;
      case "S":
        result[0]++;
        break;
      case "W":
        result[1]--;
        break;
      default:
        throw "Cannot move in this direction"
    }
    return result;
  }

  Coord.prototype.toSquare = function (dimX, dimY) {
    return this.pos[0] * dimX + this.pos[1];
  }

  Coord.prototype.isOverlapping = function (other) {
    return this.pos[0] === other.pos[0] && this.pos[1] === other.pos[1];
  }

})();
