var mainState = ( function () {

    var preload = function () {
        game.load.spritesheet('student', 'assets/student.png', 12, 26);
        game.stage.smoothed = false;
    }

    var create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#eee';
        this.student = new Student(this);
        this.student.spawn(game.world.centerX, game.world.centerY);
    }

    var update = function () {
        this.student.update();
    };

    return {
        preload : preload,
        create : create,
        update : update,
        globalScale : 5
    };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
// width = 800. accessible from game.world.width
// height = 600 acccessible from game.world.height
