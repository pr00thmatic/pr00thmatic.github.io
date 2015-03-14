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
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */

        if (this.teclado.up.isDown) {
            console.log("estás presionando la tecla 'arriba'");
        }

        if (this.teclado.volar.isDown) {
            console.log("estás volando! :O");
            this.personaje.animations.play('volar');
        } else {
            this.personaje.animations.play('normal');
        }
    }
};

game.state.add('1', level1);
game.state.start('1');
