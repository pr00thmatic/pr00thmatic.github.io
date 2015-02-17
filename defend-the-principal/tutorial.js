var tutorial = ( function () {
    var tutorial;

    var preload = function () {
        game.load.spritesheet('tutorial', 'assets/tutorial.png', 200, 160);
    }

    var create = function () {
        game.stage.backgroundColor = '#fff';
        tutorial = game.add.sprite(0,0, 'tutorial');
        tutorial.scale.set(4,4);
        tutorial.animations.add('teach', [0,1,2,3]);
        tutorial.animations.play('teach', 0.2, false, true);
    }

    var update = function () {
        if (!tutorial.alive) {
            game.state.start('main');
        }
    };

    return { preload : preload,
             create : create,
             update : update };

})();

game.state.add('tutorial', tutorial);
