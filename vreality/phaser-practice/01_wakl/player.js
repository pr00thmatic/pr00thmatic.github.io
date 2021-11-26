var Wakler = {
  gimmieWakler : function () {
    var player = {
      speed: 0,
      sprite: gameStatus.scene.add.sprite(400, 600-10, 'wakler').
        setDepth(100).
        setOrigin(0.5, 1),

      create: function () {
        player.sprite.anims.create({
          key: 'idle',
          // frames: [{ key: 'wakler', frame: 1 }, { key: 'wakler', frame: 0 }],
          frames: utils.frames('wakler', [1, 0]),
          frameRate: 4,
          repeat: -1
        });
        player.sprite.anims.create({
          key: 'step',
          frames: utils.frames('wakler', [2, 3, 0]),
          frameRate: 12,
          repeat: 0
        });

        player.sprite.anims.play('idle', true);
        gameStatus.scene.input.keyboard.on('keydown-RIGHT', player.stepRight);
        gameStatus.scene.input.keyboard.on('keydown-LEFT', player.stepLeft);
      },

      update: function () {
        if (gameStatus.cursors.right.isDown) {
          player.step(1);
        }

        if (gameStatus.cursors.left.isDown) {
          player.step(-1);
        }

        player.sprite.x += player.speed * gameStatus.delta;
      },

      stepRight: function () {
        player.step(1);
      },
      stepLeft: function () {
        player.step(-1);
      },

      step: function (polarity) {
        if (player.speed != 0) {
          player.goAgain = true;
          return;
        }

        player.polarity = polarity;
        player.speed = polarity * 150;
        player.sprite.anims.play('step');
        player.sprite.scaleX = polarity;
        player.sprite.on('animationcomplete', player.goBackToIdle);
      },

      goBackToIdle: function () {
        if (player.goAgain) player.step(player.polarity);

        player.goAgain = false;
        player.speed = 0;
        player.sprite.anims.play('idle');
        player.sprite.off('animationcomplete', player.goBackToIdle);
      }
    };

    gameStatus.emitter.on('create', player.create);
    gameStatus.emitter.on('update', player.update);

    return player;
  }
}
