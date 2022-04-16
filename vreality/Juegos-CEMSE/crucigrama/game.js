var scene;
var gameStatus = {};
var mainState = ( function () {
  let sopaConfig = {
    rows: 13,
    columns: 21,
    cellSize: 16,
    allowDiagonals: false,
    cellAlpha: 1,
    validColor: 0x111111,
    invalidColor: 0x885555,
    allowCapsuleCreation: false
  };

  var restart = function (editMode) {
    gameStatus.editMode = editMode;
    scene.scene.restart();
    // gameStatus.game = new Phaser.Game(mainState);
  };

  var preload = function () {
    scene = this;
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
    var background = scene.add.sprite(0,0, 'background').
        setOrigin(0,0).
        setDepth(-100);
    if (gameStatus.editMode) {
      CrucigramaEditor.edit();
    } else {
      gameStatus.keyboard.config.space = false;
      gameStatus.keyboard.config.extraChars = '';
      gameStatus.sopa = Sopa.gimmieSopa(sopaConfig);
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
           width: 460,
           height: 600,
           restart: restart,
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
