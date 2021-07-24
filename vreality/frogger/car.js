var Car = {};

Car.gimmieCar = function (lane, orientation) {
  var car = {
    isSlow: (Math.random() < gameSettings.slowProbability),
    sprite: null,
    orientation: orientation,
    lane: lane,
    speed: NaN,

    update : function () {
      this.sprite.x += this.orientation * this.speed * (gameStatus.deltaTime / 1000);
      if (characters.frog && characters.frog.sprite &&
          Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), characters.frog.sprite.getBounds())) {
        characters.frog.die();
      }
      if (this.sprite.x < -150 || this.sprite.x > config.width + 150) {
        this.destroy();
      }
    },

    destroy: function () {
      this.sprite.destroy();
      this.sprite = null;
      gameStatus.emitter.off('update', car.update, car);
      delete this;
    }
  };

  car.speed = car.isSlow?
    utils.randomLerpedRange(gameSettings.slowCarSpeed, gameSettings.normalizedDifficulty()):
    utils.randomLerpedRange(gameSettings.fastCarSpeed, gameSettings.normalizedDifficulty());

  car.sprite =
    scene.physics.add.image((orientation == 1? -100: config.width + 100),
                            gameSettings.tileSize * gameSettings.lanes[lane * 2 + (orientation === 1? 0: 1)]
                            -5 * orientation, car.isSlow? 'car1': 'car2');

  car.sprite.setOrigin(0.5, 1);
  gameStatus.emitter.on('update', car.update, car);

  return car;
};
