var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    utils.preloadSharedAssets(scene);
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    scene.load.image('cell', 'sopa-de-letras/assets/cell.png');
    scene.load.image('word holder', 'sopa-de-letras/assets/word holder.png');
    DragBox.preload('sopa-de-letras/assets/');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    utils.createBackground();

    gameStatus.sopa = Sopa.gimmieSopa();
    Found.create();
    VictoryCriteria.create();
    // SopaEditor.edit();
    let json = banco.sopa[gameStatus.capsulaID];
    gameStatus.sopa.feed(json);

    gameStatus.emitter.on('word enclosed', () => {
      for (let i=0; i<Found.holders.length; i++) {
        let holder = Found.holders[i];
        if (Found.holders[i].sprite.alpha === 1 && !holder.disclosed) return;
      }

      utils.createResults('¡Muy bien!', '¡Muy bien!',
                          colors.global.wrong, colors.global.right, true,
                          mainState.width, mainState.height, scene);
    }, this);

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
             update  :  update
           }
         };

})();

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
