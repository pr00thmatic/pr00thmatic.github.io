var gameSettings = {
  maxHeight: 1000000,
  tileSize: 64,
  boxHeight: 256,
  floorHeight: 264,
  boxWidth: 427,
};

var gameStatus = null;
function resetGameStatus () {
  gameStatus = {
    score: 0,
    maxScoreToHardest: 10,
    xSpeed: [ 1080/2, 1080 ],
    getXSpeed : function () {
      return utils.lerp(this.xSpeed[0], this.xSpeed[1], this.score / this.maxScoreToHardest);
    },
    getBoxSpawnY : function () {
      return context.floor.y - gameStatus.score * gameSettings.boxHeight - 800;
    }
  };
};

var images = [ 'gradient', 'floor', 'caja1', 'caja2' ];
var context;

var towerGame = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function towerGame () {
    Phaser.Scene.call(this, { key: 'towerGame' });
  },

  preload : function () {
    this.load.setBaseURL('assets');
    for (var i=0; i<images.length; i++) {
      this.load.image(images[i]);
    }
  },

  create : function () {
    resetGameStatus();
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    context = this;
    UI.create();
    UI.isOver = false;

    this.floor = this.matter.add.image(config.width/2, gameSettings.maxHeight - gameSettings.floorHeight / 2, 'floor')
      .setStatic(true);

    this.gradient = this.add.image(config.width/2, gameSettings.maxHeight, 'gradient')
        .setDepth(-1).setOrigin(0.5,1);
    this.gradient.scaleX = config.width;

    this.createCamera();
    Box.gimmieBox();
    gameStatus.emitter.on('game over', gameOver, this);
  },

  update : function (time, deltaTime) {
    gameStatus.time = time / 1000;
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  },

  createCamera : function () {
    this.cameras.main.setBounds(0, 0, 1080, gameSettings.maxHeight);
    this.cameras.main.setBackgroundColor('#262262');
    context.cameras.main.centerOnY(context.floor.y);
    this.dummyFollow = this.add.image(this.floor.x, this.floor.y);
    context.cameras.main.startFollow(this.dummyFollow, false, 0.1, 0.1);
    context.cameras.main.setLerp(1, 0.01);
  }

});

function gameOver () {
  UI.createGameOver();
}

var config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 1800,
  physics: {
    default: 'matter',
    matter: {
    }
  },
  scene: [ towerGame ]
};
var game = new Phaser.Game(config);
