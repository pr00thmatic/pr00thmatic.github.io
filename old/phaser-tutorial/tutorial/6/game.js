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
        this.personaje = game.add.sprite(100,100, 'nave');

        this.personaje.animations.add('volar', [1,2], 12, true);
        this.personaje.animations.add('abrir', [3,4,5,6], 6, false);
        this.personaje.animations.add('cerrar', [6,5,4,3,0], 6, false);

        this.personaje.animations.play('cerrar');
        console.log(this.personaje.animations.currentAnim.name);

        this.personaje.anchor.set(0.5, 0.5);
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */

        // // CUIDADO!!!
        // this.personaje.animations.play('abrir');
        // this.personaje.animations.play('volar');

        // Código "sucio": guarda en "caché" la animación...
        // if (!this.personaje.animations.currentAnim.isPlaying) {
        //     if (this.personaje.animations.currentAnim.name === 'abrir') {
        //         this.personaje.animations.play('cerrar');
        //     } else {
        //         this.personaje.animations.play('abrir');
        //     }
        // }

        // limpiando el código...
        var animacion = this.personaje.animations;
        if (!animacion.currentAnim.isPlaying) {
            if (animacion.currentAnim.name === 'abrir') {
                animacion.play('cerrar');
            } else {
                animacion.play('abrir');
            }
        }

    }
};

game.state.add('1', level1);
game.state.start('1');
