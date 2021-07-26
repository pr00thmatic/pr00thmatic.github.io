var Box = {
  theBox: null,
  lastY: 0,
  gimmieBox : function () {
    var box = {};

    box.drop = function () {
      gameStatus.score++;
      box.sprite.setStatic(false);
      gameStatus.emitter.off('update', box.update, box);
      context.input.off('pointerdown', this.drop, this);

      box.sprite.setOnCollide(pair => {
        if (box.collided) return;
        box.collided = true;
        context.dummyFollow.y = Box.theBox.sprite.y - 500;
        Box.lastY = box.sprite.y;
        Box.gimmieBox();
        context.cameras.main.shake(50);
        gameStatus.emitter.emit('score change');
      });
    }

    box.sprite = context.matter.add.image(Math.random() * (config.width - gameSettings.boxWidth/2) + gameSettings.boxWidth / 2,
                                          Box.theBox !== null? Box.lastY - 800: gameStatus.getBoxSpawnY(),
                                          'caja' + (Math.random() > 0.5? '1': '2'))
      .setOrigin(0.5,1)
      .setFriction(0.25,0,0.25);
    box.sprite.setStatic(true);
    box.orientation = Math.random() > 0.5? -1: 1;
    box.update = function () {
      this.sprite.x += box.orientation * gameStatus.getXSpeed() * gameStatus.deltaTime;
      if (this.orientation < 0 && this.sprite.x < gameSettings.boxWidth/2 ||
          this.orientation > 0 && this.sprite.x > config.width - gameSettings.boxWidth/2) {
        this.orientation *= -1;
      }
    }

    gameStatus.emitter.on('update', box.update, box);
    context.input.on('pointerdown', box.drop, box);

    this.theBox = box;
    return box;
  }
};
