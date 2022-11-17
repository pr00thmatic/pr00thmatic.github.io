var Lives = (() => {
  var margins = { x: 75, y: 80 };
  var offset = 55;
  var amount = 5;

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
      errors: 0
    };
    var wong = (function (lives) {
      return () => {
        lives.errors++;
        lives.sprites[lives.sprites.length-lives.errors].play('broken');
        if (lives.errors == lives.sprites.length) {
          gameStatus.emitter.emit('gameover');
          gameStatus.emitter.off('wong', wong);
        }
      };
    })(lives);

    var start = mainState.width / 2 - (amount / 2) * offset;

    for (let i=0; i<amount; i++) {
      lives.sprites.push(scene.add.sprite(start + i * offset, margins.y, 'life').
                         setOrigin(0, 0));
    }

    gameStatus.emitter.on('wong', wong);
  };

  return {
    gimmieLives : gimmieLives
  };
})();
