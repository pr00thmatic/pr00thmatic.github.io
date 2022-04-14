var scene;
var gameStatus = {};

var mainState = ( function () {

  var preload = function () {
    scene = this;
    scene.load.image('background', 'palabra-faltante/assets/background.png');
    scene.load.image('word container', 'palabra-faltante/assets/word container.png');
    scene.load.image('blank', 'palabra-faltante/assets/blank.png');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    var background = scene.add.sprite(0,0, 'background').
        setOrigin(0,0).
        setDepth(-100);

    gameStatus.story = Story.gimmieStory(samples.pez);
    MissingWords.gimmieMissingWords();
    VictoryCriteria.monitorVictory();

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
