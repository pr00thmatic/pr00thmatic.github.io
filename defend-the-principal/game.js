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
        this.students.push(new Student(this, this.offices, this.students));
        this.students[0].spawn(10*16, 34*16);

        this.students.push(new Student(this, this.offices, this.students));
        this.students[1].spawn(2*16, 34*16);

        this.students.push(new Student(this, this.offices, this.students));
        this.students[2].spawn(6*16, 34*16);

        this.principal = game.add.sprite(16, 16, 'principal');

        this.offices.push(new Office(this, 'kardex'));
        // offices[0].spawn(21*16 - 40, 31*16 - 68);
        this.offices[0].spawn(21*16-40, 37*16-68);
    }

    var update = function () {
        for (var i=0; i<this.students.length; i++) {
            this.students[i].update();
            this.students[0].sprite.bringToTop();
        }
        this.offices[0].update();
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
