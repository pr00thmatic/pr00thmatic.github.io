var Pipe = {
  group: null,
  create: function () {
    this.group = context.physics.add.staticGroup();
  },
  gimmiePipe : function () {
    var pipe = {
      sprite: this.group.create(gameSettings.pipeSpawnX(),
                                config.height / 2 + utils.randomBetween(gameSettings.pipeSpawnOffsetY[0],
                                                                        gameSettings.pipeSpawnOffsetY[1]),
                                'pipes'),
      scored: false,
      update: function () {
        this.sprite.x -= gameStatus.deltaTime * gameStatus.getXSpeed();
        if (this.sprite.x < -192) {
          this.die();
          return;
        }
        if (gameStatus.pill && gameStatus.pill.sprite) {
          if (!this.scored && (this.sprite.x < 200)) {
            this.scored = true;
            gameStatus.score++;
            gameStatus.emitter.emit('score change');
          }
          if (this.sprite.x > 0 && this.sprite.x < 400) {
            if(!(gameStatus.pill.sprite.y < this.sprite.y + 450/2 && gameStatus.pill.sprite.y > this.sprite.y - 450/2)) {
              gameStatus.pill.die();
            }
          }
        }
      },
      die: function () {
        this.sprite.destroy();
        this.sprite = null;
        gameStatus.emitter.off('update', pipe.update, pipe);
      }
    };
    gameStatus.emitter.on('update', pipe.update, pipe);
    context.physics.add.collider(gameStatus.pill, Pipe.group);
    return pipe;
  }
}
