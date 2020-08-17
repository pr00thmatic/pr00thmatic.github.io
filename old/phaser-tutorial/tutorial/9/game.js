var game = new Phaser.Game(800,640, Phaser.AUTO, 'gameDiv');

var level1 = {
    preload: function () {
        // aquí cargas imágenes y sonidos.
        game.load.spritesheet('nave', 'assets/ship.png', 64, 64);

        // cargando los recursos del mapa
        game.load.tilemap('espacio', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mars', 'assets/tile.png');

    },

    create: function () {
        /*
           create se ejecuta una sola vez, antes de comenzar
           el ciclo infinito de ejecuciones de update.

           Ideal para crear a los personajes y darle valor a
           las propiedades iniciales del mundo!!
         */
        // creando un sprite
        this.personaje = game.add.sprite(100,100, 'nave');

        // punto de anclaje
        this.personaje.anchor.set(0.5, 0.5);

        // animaciones ...
        this.personaje.animations.add('normal', [0]);
        this.personaje.animations.add('volar', [1,2], 12, true);
        this.personaje.animations.add('abrir', [3,4,5,6], 6, false);
        this.personaje.animations.add('cerrar', [6,5,4,3,0], 6, false);
        this.personaje.animations.play('normal');

        // añadiendo el teclado...
        this.teclado = game.input.keyboard.createCursorKeys();
        this.teclado.volar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // añadiendo física
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.personaje);

        this.personaje.body.acceleration.y = 50;

        // añadiendo el mapa
        this.mapa = game.add.tilemap('espacio', 16,16, 49*16, 39*16);
        this.mapa.addTilesetImage('mars');

        // añadiendo la capa del cielo
        this.cielo = this.mapa.createLayer('sky');

        // añadiendo la capa del suelo
        this.suelo = this.mapa.createLayer('floor');
        // colisiones...
        // activando la física del suelo
        game.physics.arcade.enable(this.suelo);
        // console.log(this.mapa.getTile(12,18, this.suelo).index); // 7!
        // this.mapa.setCollisionByExclusion([7], true, this.suelo); //??
        this.mapa.setCollisionByExclusion([], true, this.suelo); //??

        // añadiendo la capa de ladrillos
        this.ladrillos = this.mapa.createLayer('bricks');

        this.personaje.bringToTop();
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */

        // movimiento de la nave
        if (this.teclado.volar.isDown) {
            this.personaje.animations.play('volar');
            this.personaje.body.acceleration.y = -30;
        } else {
            this.personaje.body.acceleration.y = 50;
            this.personaje.animations.play('normal');
        }

        if (this.teclado.right.isDown) {
            this.personaje.body.acceleration.x = 30;
        } else if (this.teclado.left.isDown) {
            this.personaje.body.acceleration.x = -30;
        } else {
            this.personaje.body.acceleration.x = 0;
        }

        // colisiones
        game.physics.arcade.collide(this.personaje, this.suelo);

    }
};

game.state.add('1', level1);
game.state.start('1');
