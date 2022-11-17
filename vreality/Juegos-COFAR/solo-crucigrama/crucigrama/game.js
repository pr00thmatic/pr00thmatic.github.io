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
    gameStatus.colors = colors.global;
    scene.load.image('background', 'crucigrama/assets/background.png');
    scene.load.image('cell', 'crucigrama/assets/cell.png');
    DragBox.preload('crucigrama/assets/');
    Victory.preload();

    gameStatus.keyboard = Keyboard.gimmieKeyboard('crucigrama/assets/', {
      space: true,
      extraChars: ',.',
      backspace: true
    });
    gameStatus.keyboard.preload();
  }

  var create = function () {
    gameStatus.puzzleString = banco.crucigrama.puzzle;
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    Victory.create();
    if (gameStatus.editMode) {
      CrucigramaEditor.edit();
    } else {
      gameStatus.keyboard.config.space = false;
      gameStatus.keyboard.config.extraChars = ' ';
      gameStatus.sopa = Sopa.gimmieSopa({
        rows: 11,
        columns: 18,
        cellSize: 20,
        cellTint: gameStatus.colors.stroke,
        allowDiagonals: false,
        cellAlpha: 1,
        validColor: 0x111111,
        invalidColor: 0x885555,
        allowCapsuleCreation: false
      });
      if (gameStatus.puzzleString) {
        Loader.load(gameStatus.puzzleString);
      }
    }
    gameStatus.keyboard.create();
    gameStatus.emitter.emit('create');
  }

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

function editMode () {
  mainState.restart(true);
  stop();
}

function print () {
  var element = document.getElementById('json');
  element.value = CrucigramaEditor.getPuzzleString();
  element.select();
  stop();
}

function get () {
  var element = document.getElementById('json');
  gameStatus.puzzleString = element.value;
  mainState.restart(false);
  stop();
}

function stop () {
  document.getElementById('json').blur();
  document.getElementById('edit-mode').blur();
  document.getElementById('print').blur();
  document.getElementById('get').blur();
  this.focus(null);
}
