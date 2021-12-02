var scene;
var gameStatus = {};
var puzzles = ['gatos en el techo',
               'helados bajo el sol',
               'pelea de almohadas',
               'toboganes y columpios',
               'camaron que se duerme se lo lleva la corriente'
              ];
var mainState = ( function () {

  var preload = function () {
    gameStatus.keyboard = Keyboard.gimmieKeyboard();
    scene = this;
    scene.load.image('background', 'ahorcado/assets/background.png');
    scene.load.image('no', 'ahorcado/assets/no.png');
    scene.load.spritesheet('life', 'ahorcado/assets/life.png', { frameWidth: 50, frameHeight: 45 });
    scene.load.image('blank', 'ahorcado/assets/blank.png');
    scene.load.spritesheet('keyboard', 'ahorcado/assets/keyboard.png', { frameWidth: 24, frameHeight: 24 });
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

    gameStatus.keyboard.create();
    KeyboardExtension.extend(gameStatus.keyboard);
    gameStatus.lives = Lives.gimmieLives();
    gameStatus.blanks = BlankSpaces.gimmieBlankSpaces(utils.randomPick(puzzles));

    gameStatus.knownSolvedBlanks = 0;
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
      scene.add.text(0,0, 'GAME OVER', { color: '#ff0000' }).
        setOrigin(0,0)
    });
    gameStatus.emitter.on('win', () => {
      scene.add.text(0,0, 'YOU WIN!', { color: '#009900' }).
        setOrigin(0,0)
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
    });

    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           scene: {
             preload : preload,
             create : create,
             update : update
           }
         };

})();

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
