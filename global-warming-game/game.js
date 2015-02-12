var mainState = ( function () {
    // var sun;
    var you;
    var cursor;
    var start = 0;

    var preload = function () {
	game.load.spritesheet('iceberg', 'img/iceberg.png', 70,70);
	game.load.spritesheet('sun', 'img/sun.png', 50, 50);

	game.load.spritesheet('glow0', 'img/glow.png', 70,70);
	game.load.spritesheet('glow1', 'img/glow2.png', 91,91);
	game.load.spritesheet('glow2', 'img/glow3.png', 118, 118);
	game.load.spritesheet('glow3', 'img/glow4.png', 153, 153);
	game.load.spritesheet('glow4', 'img/glow5.png', 200, 200);

	game.load.spritesheet('refinery', 'img/refinery.png', 100, 100);
	game.load.spritesheet('smog', 'img/smog.png', 200, 150);
	game.load.image('water', 'img/water.png');

	game.load.spritesheet('text', 'img/intro.png', 800,600);
    };

    var create = function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.tileSprite(0,0, 800,600, 'water', 0);
	game.stage.backgroundColor = '#99f';
	cursor = game.input.keyboard.createCursorKeys();
	cursor.attack = game.input.keyboard.addKey(Phaser.Keyboard.A);

	intro = game.add.sprite(0,0, 'text');
	intro.animations.add('intro', [0,1,2], 0.2);
	addToLayer(intro, SKY);
	intro.animations.play('intro');
	score = new Score();
	you = new Iceberg(game, cursor);
	sun = new Sun(game, you);
	you.sun = sun;
	Corporation = Corporation(); // global variable :(
	Corporation.setPlayer(you);
	Corporation.setGame(game);
    };

    var update = function () {
	if (intro.alive && !intro.animations.currentAnim.isPlaying) {
	    intro.kill();
	}

	sun.update();
	if (!game.isOver) {
	    you.update();
	    Corporation.update();
	}
	simulateDepth();
    };

    return { preload : preload,
	     create : create,
	     update : update };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
game.isOver = false;

game.gameOver = function () {
    if (!game.isOver) {
	gameOver = game.add.sprite(0,0,'text');
	gameOver.animations.add('gameover', [3], .1);
	gameOver.play('gameover');
	addToLayer(gameOver, SKY);
    }
    game.isOver = true;
};
