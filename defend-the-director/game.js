var x = false;
var mainState = ( function () {

    var preload = function () {
        game.load.spritesheet('student', 'assets/student.png', 12, 26);
        game.load.tilemap('building', 'assets/map.json',
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('informatica', 'assets/informatica.png');

        game.stage.smoothed = false;
    }

    var create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.student = new Student(this);
        this.building = new Building();

        this.student.sprite.bringToTop();
        this.student.spawn(game.world.centerX, game.world.centerY);
    }

    var update = function () {
        this.student.update();
        game.physics.arcade.collide(this.student.sprite, this.building.floor);
    };

    return {
        preload : preload,
        create : create,
        update : update,
        globalScale : 2
    };

})();

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
