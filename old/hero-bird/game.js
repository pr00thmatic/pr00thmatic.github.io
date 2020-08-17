var mainState = Level.create();

var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
