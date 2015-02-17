var gameOver = ( function () {
    var gameOver;

    var preload = function () {
        game.load.spritesheet('game-over', 'assets/game-over.png', 200, 160);
    }

    var create = function () {
        game.stage.backgroundColor = '#fff';
        gameOver = game.add.sprite(0,0, 'game-over');
        gameOver.scale.set(4,4);
        gameOver.animations.add('exist', [0]);
        gameOver.animations.play('exist', 0.2, false);
    }

    var update = function () {
    };

    return { preload : preload,
             create : create,
             update : update };

})();

game.state.add('gameOver', gameOver);
