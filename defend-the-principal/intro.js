var intro = ( function () {
    var hack;

    var preload = function () {
        // game.load.spritesheet('intro', 'assets/hack.png', 200, 160);
        // game.stage.smoothed = false;
    }

    var create = function () {
        // game.stage.backgroundColor = '#fff';
        // hack = game.add.sprite(0,0, 'intro');
        // hack.scale.set(4,4);
        // hack.animations.add('exist', [7,6,5,4,3,2,1,0]);
        // hack.animations.play('exist', 0.15, false, true);
    }

    var update = function () {
        // if (!hack.alive) {
            game.state.start('tutorial');
        // }
    };

    return { preload : preload,
             create : create,
             update : update };

})();

game.state.add('intro', intro);
game.state.start('tutorial');
