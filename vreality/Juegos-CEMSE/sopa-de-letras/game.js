var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    scene.load.image('background', 'sopa-de-letras/assets/background.png');
    scene.load.image('cell', 'sopa-de-letras/assets/cell.png');
    scene.load.image('word holder', 'sopa-de-letras/assets/word holder.png');
    DragBox.preload('sopa-de-letras/assets/');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    gameStatus.background = scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

    gameStatus.sopa = Sopa.gimmieSopa();
    Found.create();
    VictoryCriteria.create();
    // SopaEditor.edit();

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
             update  :  update
           }
         };

})();

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height

var editMode = function () {
  SopaEditor.edit();
};

var print = function () {
  var element = document.getElementById('json');
  element.value = SopaEditor.getPuzzleString();
  element.select();
}

var get = function () {
  var element = document.getElementById('json');
  gameStatus.sopa.feed(element.value);
}
