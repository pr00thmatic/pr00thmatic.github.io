// import './shared-assets/nineslice.min.js'

console.log('wtf');

var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    scene.load.image('9sliced', 'shared-assets/children-background.png');
    scene.load.image('smol', 'shared-assets/smol-background.png');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    // game.physics.startSystem(Phaser.Physics.ARCADE); or ninja, or p2
    // game.add.tileSprite(0,0, width, height, image, 0)
    // or game.stage.backgroundColor = "#rrggbb"
    this.dlg = this.add.nineslice(
      110, 110,   // this is the starting x/y location
      340, 240,   // the width and height of your object
      '9sliced', // a key to an already loaded image
      88,         // the width and height to offset for a corner slice
      24          // (optional) pixels to offset when computing the safe usage area
    );

    this.dlg = this.add.nineslice(
      0, 0,   // this is the starting x/y location
      600, 800,   // the width and height of your object
      '9sliced', // a key to an already loaded image
      88,         // the width and height to offset for a corner slice
      24          // (optional) pixels to offset when computing the safe usage area
    ).setOrigin(0,0).
      setDepth(-100).
      setTint('0xff9999');

    this.dlg = this.add.nineslice(
      110, 510,   // this is the starting x/y location
      100, 240,   // the width and height of your object
      'smol', // a key to an already loaded image
      15,         // the width and height to offset for a corner slice
      // 10          // (optional) pixels to offset when computing the safe usage area
    );
    gameStatus.idk = this;

    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  let phaserConfig = {
    type: Phaser.WEBGL,
    parent: 'phaser-display',
    backgroundColor: '0x9a9a9a',
    width: 600,
    height: 800,
    plugins: {
      global: [ NineSlice.Plugin.DefaultCfg ],
    },
    scene: [
      {
        preload : preload,
        create : create,
        update : update
      }
    ]
  };

  return phaserConfig;

})();

var game = new Phaser.Game(mainState);
// width = 600. accessible from game.world.width
// height = 800 acccessible from game.world.height
