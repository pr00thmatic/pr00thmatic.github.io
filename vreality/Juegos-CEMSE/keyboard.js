var Keyboard = (() => {
  var gimmieKeyboard = function (assetsFolder = "ahorcado/assets/", config) {
    var keyboard = {};
    keyboard.keyChars = [ "QWERTYUIOP",
                          "ASDFGHJKLÑ",
                          "ZXCVBNM" ];
    if (config && config.extraChars) {
      for (let i=0; i<config.extraChars.length; i++) {
        keyboard.keyChars.push(config.extraChars[i]);
      }
    }

    keyboard.keys = {};
    keyboard.margin = { x: 44, y: 470 };
    keyboard.offset = 26;

    keyboard.preload = () => {
      scene.load.spritesheet('keyboard', assetsFolder + 'keyboard.png', { frameWidth: 24, frameHeight: 24 });
      if (config && config.space) scene.load.image('space', assetsFolder + 'space.png');
      if (config && config.backspace) scene.load.image('backspace', assetsFolder + 'backspace.png');
    };

    keyboard.createKey = function (sprite, keyEmitted, i = -1) {
      var x, y;

      if (i !== -1) {
        x = keyboard.margin.x + ((i % 10) * keyboard.offset + (keyboard.offset/2) * Math.floor(i/10)) -
          (config && config.backspace? keyboard.offset/2: 0);
        y = keyboard.margin.y + Math.floor(i/10) * keyboard.offset;
      } else {
        x = keyEmitted.x;
        y = keyEmitted.y;
      }

      keyEmitted.sprite =
        scene.add.sprite(x, y, sprite).
        setOrigin(0,0).
        setInteractive();

      keyEmitted.sprite.on('pointerdown', ((keyEmitted) => { return () => {
        gameStatus.emitter.emit('keyboard.keyPress', keyEmitted);
      }; } )(keyEmitted));
      keyboard.keys[keyEmitted.letter] = keyEmitted;

      return keyEmitted;
    };

    keyboard.create = function () {
      var joinedKeys = keyboard.keyChars.join('');
      for (let i=0; i<joinedKeys.length; i++) {
        scene.anims.create({
          key: 'key-' + joinedKeys[i],
          frames: utils.frames('keyboard', [i]),
          frameRate: 1,
          repeat: -1
        });

        var key  = {};
        key.letter = joinedKeys[i];
        keyboard.createKey('keyboard', key, i);
        key.sprite.play('key-' + joinedKeys[i]);
      }

      if (config && config.space) {
        keyboard.createKey('space', {
          letter: ' ',
          x: keyboard.margin.x + keyboard.offset + keyboard.offset/2,
          y: keyboard.margin.y + keyboard.offset * 3
        });
      }

      if (config && config.backspace) {
        keyboard.backspace = keyboard.createKey('backspace', {
          letter: 'BACKSPACE',
          x: keyboard.margin.x + keyboard.offset * 9.5,
          y: keyboard.margin.y
        }).sprite.setTint(0xff5555);
      }

      scene.input.keyboard.on('keydown', ((keyboard) => { return function (event) {
        let key = event.key.toUpperCase();
        if (keyboard.keys[key] !== undefined) {
          gameStatus.emitter.emit('keyboard.keyPress', keyboard.keys[key]);
        }
      }; })(keyboard));
    };

    return keyboard;
  };

  return {
    gimmieKeyboard : gimmieKeyboard
  };
})();
