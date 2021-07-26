var Pill = {
  gimmiePill : function () {
    var pill = {
      sprite: context.physics.add.image(200, config.height/2, 'pildorita'),
      flap: function () {
        pill.sprite.body.velocity.y = gameStatus.getFlapVelocity();
      },
      update: function () {
        if (pill.sprite.body.y > (config.height - gameSettings.floorLine)) {
          this.die();
          return;
        }
        this.sprite.rotation =
          utils.lerp(-(gameSettings.angle / 360) * Math.PI, (gameSettings.angle / 360) * Math.PI,
                     (gameSettings.velocityRange/2 + this.sprite.body.velocity.y) / gameSettings.velocityRange);
      },
      die : function () {
        gameStatus.emitter.off('update', pill.update, pill);
        context.input.off('pointerdown', pill.flap, pill);
        pill.sprite.destroy();
        pill.sprite = null;

        setTimeout(() => {
          game.scene.pause('flappyPills');
        }, 200);
        setTimeout(() => {
          game.scene.resume('flappyPills');
          gameStatus.emitter.emit('game over');
        }, 1500);

        context.cameras.main.shake(100);
      }
    };

    gameStatus.pill = pill;
    context.input.on('pointerdown', pill.flap, pill);
    gameStatus.emitter.on('update', pill.update, pill);
    return pill;
  }
};
