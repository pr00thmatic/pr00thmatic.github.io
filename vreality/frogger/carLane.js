var CarLane = {
  getCarLane : function (lane, orientation) {
    var carLane = {
      orientation : orientation,
      lane: lane,
      lastSpawnTime: -1,
      nextSpawnTime: -1,
      lastCar : null,
      update: function () {
        if (Date.now() > this.nextSpawnTime) {
          this.reset();
          this.lastCar = Car.gimmieCar(this.lane, this.orientation);
        }
      },
      reset: function () {
        this.lastSpawnTime = Date.now();
        this.nextSpawnTime = Date.now() +
          utils.randomLerpedRange(gameSettings.spawnCooldown, gameSettings.normalizedDifficulty()) * 1000;
      },
    };
    carLane.reset();
    gameStatus.emitter.on('update', carLane.update, carLane);
    this.lastCar = Car.gimmieCar(carLane.lane, carLane.orientation);
    this.lastCar.sprite.x = Math.random() * config.width;
    console.log(carLane.nextSpawnTime - Date.now());
    carLane.nextSpawnTime -= (this.lastCar.sprite.x / this.lastCar.speed) * 1000;
    console.log(" - " + (carLane.nextSpawnTime - Date.now()));
  }
};
