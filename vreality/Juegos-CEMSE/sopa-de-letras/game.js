var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    scene.load.image('background', 'sopa-de-letras/assets/background.png');
    scene.load.image('left cap', 'sopa-de-letras/assets/left cap.png');
    scene.load.image('right cap', 'sopa-de-letras/assets/right cap.png');
    scene.load.image('midle tile', 'sopa-de-letras/assets/midle tile.png');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    gameStatus.background = scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

    DragBox.subscribeOnClick();

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
