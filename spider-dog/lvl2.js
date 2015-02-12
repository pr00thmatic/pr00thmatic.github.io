var lvl2 = ( function () {
    var level;

    var preload = function () {
        game.gravity = 400;
        game.load.tilemap('map', 'img/map/mapa.json', null,
                          Phaser.Tilemap.TILED_JSON);
        game.load.image('tile', 'img/map/tile.png');
        game.load.spritesheet('spiderdog', 'img/spiderdog.png', 46,43);
        game.load.spritesheet('bone', 'img/bone.png', 25,25);
        game.stage.smoothed = false;
    }

    var create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#eee';

        level.mapa = new Map(level, game, 'lvl2');
        level.spiderdog = new SpiderDog(game);

        game.cursor = game.input.keyboard.createCursorKeys();
        game.cursor.jump = game.input.keyboard.addKey(Phaser.Keyboard.A);
        game.score = new Score(game);
    }

    var update = function () {
        spiderdog.update();
    };

    return { preload : preload,
             create : create,
             update : update,
             level : level };

})();

game.state.add('lvl2', lvl2);
