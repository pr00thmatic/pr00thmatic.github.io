var Lives = (() => {
  var margins = { x: 75, y: 80 };
  var offset = 55;
  var amount = 10;

  var gimmieLives = () => {
    scene.anims.create({
      key: 'ok',
      frames: utils.frames('life', [0]),
      frameRate: 1
    });
    scene.anims.create({
      key: 'broken',
      frames: utils.frames('life', [1]),
      frameRate: 1
    });

    var lives = {
      sprites: [],
      errors: amount - gameStatus.remainingLives
    };
    let breakHeart = function (heart) {
      heart.play('broken');
      heart.setTint('0xaaaaaa');
    };
    var wong = (function (lives) {
      return () => {
        lives.errors++; gameStatus.remainingLives--;
        breakHeart(lives.sprites[lives.sprites.length-lives.errors]);
        if (lives.errors == lives.sprites.length) {
          gameStatus.emitter.emit('gameover');
          gameStatus.emitter.off('wong', wong);
        }
      };
    })(lives);

    var start = mainState.width / 2 - (amount / 4) * offset;

    for (let i=0; i<amount; i++) {
      lives.sprites.push(scene.add.sprite(start + (i % Math.round(amount/2)) * offset,
                                          margins.y + (i < amount/2? 30: -30), 'life').
                         setOrigin(0, 0).
                         setTint(colors.global.right));
    }

    for (i=0; i<lives.errors; i++) {
      breakHeart(lives.sprites[lives.sprites.length - i - 1]);
    }

    gameStatus.emitter.on('wong', wong);
  };

  return {
    gimmieLives : gimmieLives
  };
})();
