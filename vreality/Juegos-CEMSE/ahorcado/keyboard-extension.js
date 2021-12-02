var KeyboardExtension = (() => {
  var extend = (keyboard) => {
    var data = {
      lastNope: null,
      pressedKeys: []
    };

    var onKeyPress = ((data) => { return (key) => {
      if (data.pressedKeys[key.letter] !== undefined) {
        data.pressedKeys[key.letter]++;
        return;
      }
      data.pressedKeys[key.letter] = 0;

      data.lastNope = scene.add.sprite(key.sprite.getCenter().x, key.sprite.getCenter().y, 'no');
      data.lastNope.alpha = 0.5;
      data.lastNope.setTint(0x00ff00);
      key.strike = data.lastNope;
    }; })(data);

    var onWong = () => {
      data.lastNope.setTint(0xff0000);
    };

    gameStatus.emitter.on('keyboard.keyPress', onKeyPress);
    gameStatus.emitter.on('wong', onWong);
    gameStatus.emitter.on('gameover', () => {
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
      gameStatus.emitter.off('wong', onWong);
    });

    KeyboardExtension.pressedKeys = data.pressedKeys;
  }

  return { extend : extend };
})();
