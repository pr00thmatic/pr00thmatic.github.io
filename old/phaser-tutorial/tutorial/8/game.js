var game = new Phaser.Game(800,640, Phaser.AUTO, 'gameDiv');

var level1 = {
    preload: function () {
        // aquí cargas imágenes y sonidos.
        game.load.spritesheet('nave', 'assets/ship.png', 64, 64);
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
        // console.log(this.personaje.body);
        game.physics.arcade.enable(this.personaje);
        // console.log(this.personaje.body);

        // this.personaje.body.velocity.x = 10;
        // this.personaje.body.velocity.y = 30;
        this.personaje.body.acceleration.y = 50;
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */

        if (this.teclado.volar.isDown) {
            this.personaje.animations.play('volar');
            this.personaje.body.acceleration.y = -30;
        } else {
            this.personaje.body.acceleration.y = 50;
            this.personaje.animations.play('normal');
        }


        // // CUIDADO!
        // this.personaje.body.velocity.x = 0;
        if (this.teclado.right.isDown) {
            this.personaje.body.acceleration.x = 30;
        } else if (this.teclado.left.isDown) {
            this.personaje.body.acceleration.x = -30;
        } else {
            this.personaje.body.acceleration.x = 0;
        }

    }
};

game.state.add('1', level1);
game.state.start('1');
