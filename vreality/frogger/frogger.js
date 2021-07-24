var config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 1800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [ froggerGame ]
};
var game = new Phaser.Game(config);
