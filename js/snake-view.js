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
    $("li").removeClass("snake apple");
    var snakeSegments = this.board.snake.segments;
    var lis = $("li");

    // render apples
    for (var i = 0; i < this.board.apples.length; i++) {
      var id = this.board.apples[i]; //how did you forget this line?
      $(lis[id]).addClass("apple");
    }

    // render snake segments
    for (var i = 0; i < snakeSegments.length; i++) {
      var id = snakeSegments[i].toSquare(View.DIM_X, View.DIM_Y);
      $(lis[id]).addClass("snake");
    }

    // check if apple should be generated
    if (this.ticks % 20 === 0) {
      this.board.generateApple();
    }
    this.ticks++;
  }

  View.prototype.bindKeys = function(){
    var view = this;
    $(window).on("keydown", function (event) {
      event.preventDefault();

      if (event.which >= 37 && event.which <= 40) {
        var dir = View.KEY_MAPPINGS[event.which];
        view.board.snake.turn(dir);
      }
    });
  };

  View.prototype.step = function () {
    this.board.snake.move(this.board.hasEatenApple());
    // if (this.board.hasEatenApple()) {
    //   this.board.snake.move(true);
    // } else {
    //   this.board.snake.move();
    // }

    // move snake dead to snake class?
    if (this.board.isSnakeDead()){
      alert("You DIE!!!");
      location.reload();
    } else {
      this.render();
    }
  }

})();
