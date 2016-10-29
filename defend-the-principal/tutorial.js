var tutorial = ( function () {
    var tutorial;

    var preload = function () {
        // artificial loader
        domGame.setLoading(true);
        game.load.spritesheet('tutorial', 'assets/tutorial.png', 200, 160);
        game.stage.smoothed = false;
    }

    var create = function () {
        game.stage.backgroundColor = '#fff';
        tutorial = game.add.sprite(0,0, 'tutorial');
        tutorial.scale.set(4,4);
        tutorial.animations.add('teach', [0,1,2,3]);
        tutorial.animations.play('teach', 0.25, false, true);
        // artificial loader
        domGame.setLoading(false);
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
