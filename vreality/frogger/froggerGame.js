var gameSettings = {
  normalizedDifficulty: function () { return gameStatus.rescuedFroggies / gameSettings.highestDifficulty; },
  // estos parámetros se pueden modificar para hacer al juego más divertido
  highestDifficulty: 5,
  spawnCooldown: [ [ 3, 6 ], [ 1.5, 3 ] ],
  slowCarSpeed: [ [ 300, 400 ], [ 600, 700 ] ],
  fastCarSpeed: [ [ 600, 700 ], [ 900, 1000 ] ],

  // estos no!!
  tileSize: 64,
  originY: 26,
  destinationY: 4,
  lanes: [23.5, 21, 16.5, 14, 9.5, 7],
  slowProbability: 0.7,
  uiDepth: 500,
  frogSteps: [24, 21.5, 19,
              17, 14.5, 12,
              10, 7.5, 5],
  frogWin: 2
};

function resetGameStatus () {
  gameStatus = {
    rescuedFroggies: 0,
    deltaTime: 0,
    time: 0,
  };
};
var gameStatus = null;

var characters = {};

var images = [ 'background', 'background over', 'frog', 'car1', 'car2', 'bus1', 'bus2' ];
var scene;

var froggerGame = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function froggerGame () {
    Phaser.Scene.call(this, { key: 'froggerGame' });
  },

  preload : function () {
    this.load.setBaseURL('assets');
    for (var i=0; i<images.length; i++) {
      this.load.image(images[i]);
    }
    this.load.spritesheet('palta', 'palta.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('ads', 'ads.png', { frameWidth: 512, frameHeight: 256 });
  },

  create : function () {
    scene = this;
    resetGameStatus();
    UI.isOver = false;
    scene.anims.create({
      key: 'idleAd',
      frames: scene.anims.generateFrameNumbers('ads', { frames: [ 0, 1 ] }),
      frameRate: 0.1,
      repeat: -1
    });
    this.add.image(0,0, 'background').setOrigin(0,0);
    this.add.image(0,0, 'background over').setDepth(gameSettings.uiDepth-1).setOrigin(0,0);
    this.add.sprite(560, 300, 'ads').setDepth(10).setOrigin(0,1).play('idleAd');
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    gameStatus.emitter.on('dead froggy', gameOver, this);
    gameStatus.deltaTime = 0;
    gameStatus.time = Date.now();
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('palta', { frames: [ 0, 1, 2, 1, 0] }),
      frameRate: 16,
      repeat: -1
    });
    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('palta', { frames: [ 3 ] }),
      frameRate: 16,
      repeat: -1
    });

    characters.frog = Frog.gimmieFroggy(this);

    for (var lane = 0; lane < gameSettings.lanes.length/2; lane++) {
      CarLane.getCarLane(lane, 1);
      CarLane.getCarLane(lane, -1);
    }

    UI.create();
  },

  update : function () {
    gameStatus.deltaTime = Date.now() - gameStatus.time;
    gameStatus.time = Date.now();
    gameStatus.emitter.emit('update');
  },

});

function gameOver () {
  characters.frog = null;
  UI.createGameOver();
}
