var gameOver = ( function () {
    var gameOver;
    var score;
    var scoreboard;

    var setScore = function (scoreboard) {
        score = scoreboard.getScore();
    };

    var preload = function () {
        game.load.spritesheet('game-over', 'assets/game-over.png', 200, 160);
    }

    var create = function () {
        game.stage.backgroundColor = '#fff';
        gameOver = game.add.sprite(0,0, 'game-over');
        gameOver.scale.set(4,4);
        gameOver.animations.add('exist', [0]);
        gameOver.animations.play('exist', 0.2, false);

        var style = { font: '30px Sans', fill: '#000', align: 'center' };
        scoreboard = game.add.text(game.world.centerX, 24,
                                   'Final Score: ' + score, style);
        scoreboard.anchor.set(0.5, 0)
    }

    var update = function () {
    };

    return { preload : preload,
             create : create,
             update : update,
             setScore : setScore };

})();

game.state.add('gameOver', gameOver);
