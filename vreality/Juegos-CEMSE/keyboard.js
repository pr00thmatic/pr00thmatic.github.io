var Keyboard = (() => {
  var gimmieKeyboard = function (assetsFolder = "ahorcado/assets/", config) {
    var keyChars = [ "QWERTYUIOP",
                     "ASDFGHJKLÑ",
                     "ZXCVBNM" ];
    if (config && config.extraChars) {
      for (let i=0; i<config.extraChars.length; i++) {
        keyChars.push(config.extraChars[i]);
      }
    }
    var keys = [];
    var margin = { x: 44, y: 470 };
    var offset = 26;

    var preload = () => {
      scene.load.spritesheet('keyboard', assetsFolder + 'keyboard.png', { frameWidth: 24, frameHeight: 24 });
      scene.load.image('space', assetsFolder + 'space.png');
    };

    var create = () => {
      var joinedKeys = keyChars.join('');
      for (let i=0; i<joinedKeys.length; i++) {
        scene.anims.create({
          key: 'key-' + joinedKeys[i],
          frames: utils.frames('keyboard', [i]),
          frameRate: 1,
          repeat: -1
        });

        var key  = {
          sprite: scene.add.sprite(margin.x + ((i % 10) * offset + (offset/2) * Math.floor(i/10)),
                                   margin.y + Math.floor(i/10) * offset, 'keyboard').
            setOrigin(0,0).
            setInteractive(),
          letter: joinedKeys[i]
        };

        key.sprite.on('pointerdown', ((key) => { return () => {
          gameStatus.emitter.emit('keyboard.keyPress', key);
        }; } )(key));
        key.sprite.play('key-' + joinedKeys[i]);
        keys.push(key);
      }
      if (config && config.space) {
        var key = {
          sprite: scene.add.sprite(margin.x + offset + offset/2, margin.y + offset * 3, 'space').
            setOrigin(0,0).
            setInteractive(),
          letter: ' '
        };
        key.sprite.on('pointerdown', ((key) => { return () => {
          gameStatus.emitter.emit('keyboard.keyPress', key);
        }; })(key));
        keys.push(key);
      }
    };

    return {
      keys : keys,
      preload : preload,
      create : create
    };
  };

  return {
    gimmieKeyboard : gimmieKeyboard
  };
})();
