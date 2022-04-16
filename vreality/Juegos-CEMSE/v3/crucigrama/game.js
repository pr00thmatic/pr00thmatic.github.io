var scene;
var gameStatus = {};
var mainState = ( function () {
  var restart = function (editMode) {
    gameStatus.editMode = editMode;
    scene.scene.restart();
    // gameStatus.game = new Phaser.Game(mainState);
  };

  var preload = function () {
    scene = this;
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    utils.preloadSharedAssets(scene);
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    scene.load.image('background', 'crucigrama/assets/background.png');
    scene.load.image('cell', 'crucigrama/assets/cell.png');
    DragBox.preload('crucigrama/assets/');

    gameStatus.keyboard = Keyboard.gimmieKeyboard('crucigrama/assets/', {
      space: true,
      extraChars: ',.',
      backspace: true
    });
    gameStatus.keyboard.preload();
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    utils.createBackground();
    if (gameStatus.editMode) {
      CrucigramaEditor.edit();
    } else {
      gameStatus.keyboard.config.space = false;
      gameStatus.keyboard.config.extraChars = ' ';
      gameStatus.sopa = Sopa.gimmieSopa({
        rows: 13,
        columns: 21,
        cellSize: 16,
        cellTint: gameStatus.colors.stroke,
        allowDiagonals: false,
        cellAlpha: 1,
        validColor: 0x111111,
        invalidColor: 0x885555,
        allowCapsuleCreation: false
      });
      gameStatus.puzzleString = banco.crucigrama[gameStatus.capsulaID];
      Loader.load(gameStatus.puzzleString);
    }
    gameStatus.keyboard.create();
    gameStatus.keyboard.setVisible(false);

    gameStatus.emitter.on('start word edition', editWord);
    gameStatus.emitter.on('end word edition', endEditWord);
    gameStatus.emitter.on('win', () => {
      utils.createResults('¡Muy bien!', '¡Muy bien!',
                          colors.global.wrong, colors.global.right, true,
                          mainState.width, mainState.height, scene);
    });
    gameStatus.emitter.emit('create');
  };

  var editWord = function (word) {
    gameStatus.keyboard.setVisible(true);
  };

  var endEditWord = function (word) {
    gameStatus.keyboard.setVisible(false);
  };

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           restart: restart,
           transparent: true,
           plugins: {
             global: [ NineSlice.Plugin.DefaultCfg ]
           },
           scene: {
             preload : preload,
             create : create,
             update : update
           }
         };

})();

gameStatus.game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
