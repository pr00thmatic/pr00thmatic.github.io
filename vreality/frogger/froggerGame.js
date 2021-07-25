var gameSettings = {
  normalizedDifficulty: function () { return gameStatus.rescuedFroggies / gameSettings.highestDifficulty; },
  // estos parámetros se pueden modificar para hacer al juego más divertido
  highestDifficulty: 5,
  spawnCooldown: [ [ 3, 6 ], [ 1.5, 3 ] ],
  slowCarSpeed: [ [ 300, 400 ], [ 600, 700 ] ],
  fastCarSpeed: [ [ 600, 700 ], [ 900, 1000 ] ],

  // estos no!!
  tileSize: 64,
  originY: 27,
  destinationY: 4,
  lanes: [23.5, 21, 16.5, 14, 9.5, 7],
  slowProbability: 0.7,
  uiDepth: 500,
  frogSteps: [24, 21.5, 19,
              17, 14.5, 12,
              10, 7.5, 4],
  frogWin: 2
};

function resetGameStatus () {
  if (gameStatus && gameStatus.carSpawners) {
    for (var spawner in gameStatus.carSpawners) {
      if (gameStatus.carSpawners[spawner]) {
        clearInterval(gameStatus.carSpawners[spawner]);
      }
    }
  }

  gameStatus = {
    rescuedFroggies: 0,
    deltaTime: 0,
    time: 0,
    carSpawners: {}
  };
};
var gameStatus = null;

var characters = {};

var images = [ 'background', 'frog', 'car1', 'car2', 'saved froggies' ];
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
      startCarSpawner(lane, 1);
      startCarSpawner(lane, -1);
      // gameStatus.carSpawners[lane + ", " + 1] =
      //   setInterval(((lane) => { return () => { Car.gimmieCar(lane, 1); } })(lane),
      //               utils.randomLerpedRange(gameSettings.spawnCooldown, gameSettings.normalizedDifficulty()) * 1000);

      // gameStatus.carSpawners[lane + ", " + "-1"] =
      //   setInterval(((lane) => { return () => { Car.gimmieCar(lane, -1); }})(lane),
      //               utils.randomLerpedRange(gameSettings.spawnCooldown, gameSettings.normalizedDifficulty()) * 1000);
    }

    UI.create();
  },

  update : function () {
    gameStatus.deltaTime = Date.now() - gameStatus.time;
    gameStatus.time = Date.now();
    gameStatus.emitter.emit('update');
  },

});

function startCarSpawner (lane, orientation) {
  var key = lane + ", " + orientation;
  gameStatus.carSpawners[key] = setTimeout(((lane) => {
    return () => {
      Car.gimmieCar(lane, orientation);
      gameStatus.carSpawners[key] = startCarSpawner(lane, orientation);
    };
  })(lane), utils.randomLerpedRange(gameSettings.spawnCooldown, gameSettings.normalizedDifficulty()) * 1000);
  return gameStatus.carSpawners[key];
}


function gameOver () {
  characters.frog = null;
  UI.createGameOver();
}
