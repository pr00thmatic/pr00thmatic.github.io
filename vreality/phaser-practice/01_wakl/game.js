var characters = {};

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var gameStatus = {};

var game = new Phaser.Game(config);

function preload () {
  this.load.spritesheet('wakler', 'assets/wakler.png', {frameWidth: 60, frameHeight: 90});
  this.load.spritesheet('sunofabitch', 'assets/sunofabitch.png', {frameWidth: 180, frameHeight: 160});
  this.load.image('background', 'assets/background.png');
  this.load.image('floor', 'assets/floor.png');
}

function create () {
  gameStatus.scene = this;
  gameStatus.emitter = new Phaser.Events.EventEmitter();
  gameStatus.cursors = this.input.keyboard.createCursorKeys();

  this.add.image(400, 300, 'background');
  this.add.image(400, 595, 'floor');
  characters.wakler = Wakler.gimmieWakler();
  characters.sun = Sun.gimmieSun();

  gameStatus.emitter.emit('create');
}

function update (time, delta) {
  gameStatus.time = time / 1000;
  gameStatus.delta = delta / 1000;
  gameStatus.emitter.emit('update');
}

function stepRight () {
}

var utils = {
  frames: function (key, nums) {
    var arr = [];
    for (var i=0; i<nums.length; i++) {
      arr[i] = { key: key, frame: nums[i] };
    }

    return arr;
  }
}
