var Frog = {};
Frog.gimmieFroggy = function () {
  var frog = {
    sprite: scene.physics.add.sprite(config.width/2, gameSettings.originY * gameSettings.tileSize, 'palta'),
    tileY: function () { return Math.round(this.sprite.y / gameSettings.tileSize); },
    tileX: function () { return Math.round(this.sprite.x / gameSettings.tileSize); },
    step: 0,

    moveToTile: function (x, y) {
      if (x || x === 0) this.sprite.x = gameSettings.tileSize * x + gameSettings.tileSize / 2;
      if (y || y === 0) {
        this.sprite.scaleX *= -1;
        this.sprite.play('jump');
        var tween = scene.tweens.add({
          targets: this.sprite,
          y: gameSettings.tileSize * y,
          ease: 'InOut',
          duration: 100,
          onComplete: () => { if (this.sprite) this.sprite.play('idle'); },
          onCompleteScope: this
        });
      }
    },

    froggyJump: function () {
      if (this.done || UI.isOver) return;
      this.moveToTile(null, gameSettings.frogSteps[this.step++]);
      if (this.step >= gameSettings.frogSteps.length) {
        scene.input.off('pointerdown', this.froggyJump, this);
        this.done = true;
        gameStatus.rescuedFroggies++;
        setTimeout(() => {
          this.destroy();
          characters.frog = Frog.gimmieFroggy();
          gameStatus.emitter.emit('score change');
        }, 1000);
      }
    },

    destroy : function () {
      this.sprite.destroy();
      this.sprite = null;
      scene.input.off('pointerdown', this.froggyJump, this);
    },

    die: function () {
      this.destroy();
      gameStatus.emitter.emit('dead froggy');
    },

    createSavedFroggy: function () {
      var saved = scene.add.image(gameStatus.rescuedFroggies * gameSettings.tileSize +
                                  (gameStatus.rescuedFroggies - 1) * gameSettings.tileSize/2,
                                  gameSettings.frogWin * gameSettings.tileSize,
                                  'saved froggies');
      saved.setOrigin(0,1);
    }
  };

  frog.sprite.play('idle');
  frog.sprite.setOrigin(0.5, 1);
  scene.input.on('pointerdown', frog.froggyJump, frog);

  return frog;
};
