(function(){
  if (typeof SnakeSpace === "undefined") {
    window.SnakeSpace = {};
  }

  var View = SnakeSpace.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeSpace.Board(View.DIM_X, View.DIM_Y);
    this.setup();
    this.bindKeys();
    this.ticks = 0;
    this.renderingMove = false;
    setInterval(this.step.bind(this), 125);
  };

  View.KEY_MAPPINGS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S"
  }

  View.DIM_X = 32;
  View.DIM_Y = 32;

  View.prototype.setup = function () {
    var $grid = $("<ul></ul");
    $grid.addClass("grid");
    $grid.addClass("group");
    this.$el.append($grid);

    for (var i = 0; i < (View.DIM_X * View.DIM_Y); i++) {
      var $square = $("<li></li>");
      $square.addClass("square");
      $grid.append($square);
    }
  }

  View.prototype.render = function () {
    $("li.square").removeClass("snake apple");
    var snakeSegments = this.board.snake.segments;
    var squares = $("li.square");

    // render or generate apple
    if (this.board.apple) {
      $(squares[this.board.apple]).addClass("apple");
    } else {
      this.board.generateApple();
    }

    // render snake segments
    for (var i = 0; i < snakeSegments.length; i++) {
      var id = snakeSegments[i].toSquare(View.DIM_X, View.DIM_Y);
      $(squares[id]).addClass("snake");
    }
  };

  View.prototype.bindKeys = function(){
    var view = this;
    $(window).on("keydown", function (event) {
      event.preventDefault();

      if (view.renderingMove) {
        return;
      }

      if (View.KEY_MAPPINGS[event.which]) {
        var dir = View.KEY_MAPPINGS[event.which];
        view.board.snake.turn(dir);
        view.renderingMove = true;
      }
    });
  };

  View.prototype.step = function () {
    this.board.snake.move(this.board.hasEatenApple());
    this.renderingMove = false
    // move snake dead to snake class?
    if (this.board.isSnakeDead()){
      // need to find a better way to alert death...
      alert("You DIE!!!");
      location.reload();
    } else {
      this.render();
    }
  }

})();
