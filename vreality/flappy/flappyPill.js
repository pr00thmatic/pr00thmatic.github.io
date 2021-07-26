var gameSettings = {
  uiDepth: 1000,
  tileSize: 64,
  floorLine : 200,
  angle: 80,
  velocityRange: 1000,
  distanceBetweenPipes: 900,
  pipeSpawnX: function () { return config.width + 192; },
  pipeSpawnOffsetY: [ -421, 249 ],
  flapHeight: 150,
};

var gameStatus = null;
function resetGameStatus () {
  gameStatus = {
    pill: null,
    gameOver: false,
    score: 0,
    maxScoreToHardest: 30,
    xSpeed: [ 1080/2, 1080 * 1.1 ],
    pipeSpawnCooldown: 2,
    getXSpeed : function () {
      return utils.lerp(this.xSpeed[0], this.xSpeed[1], this.score / this.maxScoreToHardest);
    },
    gravityRange: [ 980*1.5, 980*4.5 ],
    getGravity: function () { return utils.lerp(gameStatus.gravityRange[0], gameStatus.gravityRange[1],
                                                this.score / this.maxScoreToHardest); },
    getFlapVelocity: function () { return -Math.sqrt(2 * context.physics.world.gravity.y * gameSettings.flapHeight); }
  };
};

var images = [ 'city', 'terrain-loopseamless', 'pildorita', 'pipes', 'background over' ];
var context;

var flappyPills = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function flappyPills () {
    Phaser.Scene.call(this, { key: 'flappyPills' });
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

    var background = this.add.image(config.width/2, config.height - 164, 'city')
        .setOrigin(0.5,1)
        .setDepth(-100);
    this.add.image(config.width/2, config.height/2, 'background over')
      .setDepth(200);
    gameStatus.floor =
      this.add.tileSprite(config.width/2, config.height, config.width, 480, 'terrain-loopseamless')
      .setOrigin(0.5,1)
      .setDepth(100);
    Pipe.create();
    Pill.gimmiePill();

    gameStatus.emitter.on('game over', gameOver, this);
    gameStatus.emitter.on('score change', this.scoreChange, this);
    this.cameras.main.setBackgroundColor('#262262');
  },

  update : function (time, deltaTime) {
    gameStatus.time = time / 1000;
    gameStatus.deltaTime = deltaTime / 1000;

    gameStatus.pipeSpawnCooldown -= gameStatus.deltaTime;
    if (gameStatus.pipeSpawnCooldown <= 0) {
      gameStatus.pipeSpawnCooldown = gameSettings.distanceBetweenPipes / gameStatus.getXSpeed();
      Pipe.gimmiePipe();
    }
    gameStatus.emitter.emit('update');
    gameStatus.floor.setTilePosition(gameStatus.floor.tilePositionX + gameStatus.deltaTime * gameStatus.getXSpeed() * 1.5);
  },

  scoreChange: function () {
    context.physics.world.gravity.y = gameStatus.getGravity();
  }

});

function gameOver () {
  gameStatus.gameOver = true;
  UI.createGameOver();
}

var config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 1800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 980*1.5 }
    }
  },
  scene: [ flappyPills ]
};
var game = new Phaser.Game(config);
