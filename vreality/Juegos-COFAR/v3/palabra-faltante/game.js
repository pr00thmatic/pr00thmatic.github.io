var scene;
var gameStatus = {};
var data = "";

var mainState = ( function () {

  var preload = function () {
    scene = this;
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    data = banco.palabrasFaltantes[gameStatus.capsulaID];
    utils.preloadSharedAssets(scene);
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    scene.load.image('word container', 'palabra-faltante/assets/word container.png');
    scene.load.image('blank', 'palabra-faltante/assets/blank.png');

    scene.load.image('aprender.png', 'img/palabras/aprender.png');
    scene.load.image('divertirnos.png', 'img/palabras/divertirnos.png');
    scene.load.image('fotos.png', 'img/palabras/fotos.png');
    scene.load.image('herramienta.png', 'img/palabras/herramienta.png');
    scene.load.image('informacion.png', 'img/palabras/informacion.png');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    utils.createBackground();
    gameStatus.story = Story.gimmieStory(data);
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

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
