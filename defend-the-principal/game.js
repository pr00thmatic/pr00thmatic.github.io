var mainState = ( function () {

    var preload = function () {
        game.load.spritesheet('student', 'assets/student.png', 12, 26);
        game.load.spritesheet('office', 'assets/office.png', 40, 68);
        game.load.spritesheet('oficinista', 'assets/kardex.png', 16, 26);
        game.load.spritesheet('life', 'assets/life.png', 11, 11);

        game.load.tilemap('building', 'assets/map.json',
                          null, Phaser.Tilemap.TILED_JSON);

        game.load.image('informatica', 'assets/informatica.png');
        game.load.image('principal', 'assets/principal-office.png');

        game.stage.smoothed = false;
    }

    var create = function () {
        this.offices = [];
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.building = new Building();

        this.students = [];
        this.spawner = new StudentSpawner( 2*16, 34*16,
                                           this.students, this, this.offices );

        this.principal = game.add.sprite(16, 16, 'principal');

        this.offices.push(new Office(this, 'kardex'));
        // offices[0].spawn(21*16 - 40, 31*16 - 68);
        this.offices[0].spawn(21*16-40, 37*16-68);
        this.offices[0].setHp(1200);
    }

    var update = function () {
        var i;
        this.spawner.update();

        for (i = this.students.length - 1; i >= 0; i--) {
            if (!this.students[i].sprite.alive) {
                var x = this.students[i];
                this.students.splice(i, 1);
                delete x;
            } else {
                this.students[i].update();
                this.students[i].sprite.bringToTop();
            }
        }

        for (i = this.offices.length - 1; i >= 0; i--) {
            this.offices[i].update();
        }

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
