var mainState = ( function () {

    var preload = function () {
        game.load.spritesheet('student', 'assets/student.png', 12, 26);
        game.load.spritesheet('office', 'assets/office.png', 40, 68);
        game.load.spritesheet('oficinista', 'assets/kardex.png', 16, 26);
        game.load.spritesheet('life', 'assets/life.png', 11, 11);
        game.load.spritesheet('tutorial', 'assets/tutorial.png', 200, 160);

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

        this.principal = game.add.sprite(16, 16, 'principal');
        game.physics.arcade.enable(this.principal);
        this.principal.body.immovable = true;

        this.officeSpawner = new OfficeGenerator(this.offices, this);
        this.spawner = new StudentSpawner( 2*16, 34*16,
                                           this.students, this, this.offices,
                                           this.officeSpawner );
    }

    var update = function () {
        var i;
        this.spawner.update();

        this.officeSpawner.update();

        for (i = this.students.length - 1; i >= 0; i--) {
            this.students[i].update();
            this.students[i].sprite.bringToTop();
            game.physics.arcade.collide(this.students[i].sprite, this.principal,
                                        this.bug, null, this);
        }

        for (i = this.offices.length - 1; i >= 0; i--) {
            this.offices[i].update();
        }

        if (this.hp === 0) {
            this.gameOver();
        }

    };

    var bug = function (student, principal) {
        if (student.alpha === 1) {
            this.hp--;
            student.goAway();
        }
    };

    var gameOver = function () {
        game.state.start('gameOver');
    };

    return {
        preload : preload,
        create : create,
        update : update,
        globalScale : 2,
        hp : 3,
        bug : bug,
        gameOver : gameOver
    };

})();

game.state.add('main', mainState);
