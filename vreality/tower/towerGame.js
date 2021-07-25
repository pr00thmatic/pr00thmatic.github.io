var gameSettings = {
};

function resetGameStatus () {
  gameStatus = {
  };
};
var gameStatus = null;

// var images = [ 'background', 'frog', 'car1', 'car2', 'saved froggies' ];
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
    },

      create : function () {
      resetGameStatus();
      UI.isOver = false;
      this.add.image(0,0, 'background').setOrigin(0,0);
      gameStatus.emitter = new Phaser.Events.EventEmitter();
      gameStatus.emitter.on('dead froggy', gameOver, this);
      gameStatus.deltaTime = 0;
      gameStatus.time = Date.now();
      scene = this;
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
