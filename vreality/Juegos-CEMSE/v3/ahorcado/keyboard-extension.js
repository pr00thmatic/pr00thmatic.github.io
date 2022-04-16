var KeyboardExtension = (() => {
  var data = {
    lastNope: null,
    pressedKeys: []
  };

  var extend = (keyboard) => {
    var onKeyPress = ((data) => { return (key) => {
      if (data.pressedKeys[key.letter] !== undefined) {
        data.pressedKeys[key.letter]++;
        return;
      }
      data.pressedKeys[key.letter] = 0;

      data.lastNope = key.sprite
      data.lastNope.setTint(colors.global.right);
      key.strike = data.lastNope;
    }; })(data);

    var onWong = () => {
      data.lastNope.setTint(colors.global.wrong);
    };

    gameStatus.emitter.on('keyboard.keyPress', onKeyPress);
    gameStatus.emitter.on('wong', onWong);
    gameStatus.emitter.on('gameover', () => {
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
      gameStatus.emitter.off('wong', onWong);
    });

    KeyboardExtension.pressedKeys = data.pressedKeys;
  };

  let tintKeys = (keyboard, tint) => {
    for (let i=0; i<keyboard.keysArray.length; i++) {
      let key = keyboard.keysArray[i];
      key.sprite.setTint(tint);
    }
  };

  let addSprites = (keyboard, spriteName) => {
    for (let i=0; i<keyboard.keysArray.length; i++) {
      let key = keyboard.keysArray[i];
      scene.anims.create({
        key: 'skey-' + key.letter,
        frames: utils.frames(spriteName, [i]),
        frameRate: 1,
        repeat: -1
      });

      let sprite = scene.add.sprite(key.sprite.getCenter().x, key.sprite.getCenter().y, spriteName);
      sprite.play('skey-' + key.letter);
    }
  };

  var reset = (keyboard) => {
    data.pressedKeys = [];
    KeyboardExtension.pressedKeys = data.pressedKeys;
    // data.pressedKeys.splice(0, data.pressedKeys.length);
    data.lastNope = null;
    for (let i=0; i<keyboard.keysArray.length; i++) {
      let key = keyboard.keysArray[i];
      key.sprite.setTint(gameStatus.colors.stroke);
      key.strike = undefined;
    }
  };

  return { extend, tintKeys, addSprites, reset };
})();
