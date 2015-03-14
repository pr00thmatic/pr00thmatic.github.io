var world = {
    gravity: 100,
    scoreUp: function () {}
};

var level1 = {
    preload: function () {
        game.load.spritesheet('astronaut', 'assets/astronaut.png', 12, 16);
        game.load.spritesheet('ship', 'assets/ship.png', 64,64);
        game.load.spritesheet('life', 'assets/lifes.png', 32, 32);

        game.load.tilemap('map', 'assets/map.json',
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mars', 'assets/tile.png');
        game.stage.smoothed = false;
    },

    create: function () {
        // creando el mapa...
        this.tilemap = game.add.tilemap('map', 800, 640, 16, 16);
        this.tilemap.addTilesetImage('mars');

        // creando las capas...
        this.tilemap.sky = this.tilemap.createLayer('sky');
        this.tilemap.floor = this.tilemap.createLayer('floor');
        this.tilemap.bricks = this.tilemap.createLayer('bricks');

        // activando la física de las capas...
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(this.tilemap.floor);
        this.tilemap.setCollision([3,4,5,6,7,8,9], true, this.tilemap.floor);

        this.tilemap.isFloor = function (number) {
            return 3 <= number && number <= 9;
        };

        // creando cursores
        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.ship = ship(this.tilemap, this.cursor);
    },

    update: function () {
        // se ejecuta luego de que termine create.
        // se ejecuta constantemente.
    }
};

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('level1', level1);
game.state.start('level1');
