var scene;
var gameStatus = {
  currentPuzzle: 0,
  remainingLives: 10
};
var puzzles;
let order = [];
var mainState = ( function () {

  var preload = function () {
    gameStatus.keyboard = Keyboard.gimmieKeyboard();
    scene = this;
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    utils.preloadSharedAssets(scene);
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    scene.load.image('no', 'ahorcado/assets/no.png');
    scene.load.spritesheet('life', 'ahorcado/assets/life.png', { frameWidth: 50, frameHeight: 45 });
    scene.load.image('blank', 'ahorcado/assets/blank.png');
    scene.load.spritesheet('keyboard', 'ahorcado/assets/keyboard.png', { frameWidth: 24, frameHeight: 24 });
    scene.load.spritesheet('keyboard letters', 'ahorcado/assets/keyboard letters.png',
                           { frameWidth: 24, frameHeight: 24});
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    puzzles = banco.ahorcado[gameStatus.capsulaID];
    if (!gameStatus.shuffled) {
      if (order.length != puzzles) {
        for (let i=0; i<puzzles.length; i++) {
          order[i] = i;
        }

        utils.shuffle(order);
        gameStatus.shuffled = true;
      }
    }
    utils.createBackground();

    gameStatus.keyboard.create();
    KeyboardExtension.extend(gameStatus.keyboard);
    KeyboardExtension.tintKeys(gameStatus.keyboard, gameStatus.colors.stroke);
    KeyboardExtension.addSprites(gameStatus.keyboard, 'keyboard letters');

    gameStatus.lives = Lives.gimmieLives();
    createBlanks();

    var onKeyPress = (key) => {
      if (KeyboardExtension.pressedKeys[key.letter] > 0) return;
      var solvedBlanks = 0;
      for (let i=0; i<gameStatus.blanks.length; i++) {
        if (gameStatus.blanks[i].solved) {
          solvedBlanks++;
        }
      }
      if (solvedBlanks === gameStatus.knownSolvedBlanks) {
        gameStatus.emitter.emit('wong');
      }
      gameStatus.knownSolvedBlanks = solvedBlanks;
      if (solvedBlanks == gameStatus.blanks.length) {
        gameStatus.emitter.emit('win');
      }
    };

    gameStatus.emitter.on('keyboard.keyPress', onKeyPress);
    gameStatus.emitter.on('gameover', () => {
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
      utils.createResults('¡Te quedaste sin vidas!\ninténtalo de nuevo', '',
                          colors.global.wrong, colors.global.right, false);
    });
    gameStatus.emitter.on('win', () => {
      let text = (gameStatus.currentPuzzle + 1) >= puzzles.length? 'Adivinaste todo\n¡Bien hecho!':
          'Haz adivinado ' + (gameStatus.currentPuzzle + 1) + ' de ' + puzzles.length + '\n¡Sigue así!';
      gameStatus.results = utils.createResults(text, text, colors.global.wrong, colors.global.right, true);
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
      setTimeout(() => {
        if (mainState.hasNext()) {
          gameStatus.emitter.on('keyboard.keyPress', onKeyPress);
          gameStatus.results.label.destroy();
          gameStatus.results.background.destroy();
          gameStatus.results = undefined;
          mainState.next();
        }
      }, 2000);
    });

    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  var createBlanks = function () {
    if (gameStatus.blanks) {
      for (let i=0; i<gameStatus.blanks.length; i++) {
        gameStatus.blanks[i].unsubscribe();
        gameStatus.blanks[i].sprite.destroy();
        gameStatus.blanks[i].label.destroy();
      }
    }

    gameStatus.blanks = BlankSpaces.gimmieBlankSpaces(puzzles[order[gameStatus.currentPuzzle]]);
    gameStatus.knownSolvedBlanks = 0;
  }

  let hasNext = function () {
    return !(gameStatus.currentPuzzle + 1 >= puzzles.length);
  };

  var next = function () {
    if (++gameStatus.currentPuzzle === puzzles.length) {
      return false;
    }
    KeyboardExtension.reset(gameStatus.keyboard);
    // createBlanks();
    scene.scene.restart();
    return true;
  }

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           transparent: true,
           plugins: {
             l: [ NineSlice.Plugin.DefaultCfg ]
           },
           scene: {
             preload : preload,
             create : create,
             update : update
           },
           next,
           hasNext
         };

})();

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
