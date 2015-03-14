var game = new Phaser.Game(800,640, Phaser.AUTO, 'gameDiv');

var level1 = {
    preload: function () {
        // aquí cargas imágenes y sonidos.
        console.log('cargando imágenes y sonidos...');
        game.load.spritesheet('nave', 'assets/ship.png', 64, 64);
    },

    create: function () {
        /*
           create se ejecuta una sola vez, antes de comenzar
           el ciclo infinito de ejecuciones de update.

           Ideal para crear a los personajes y darle valor a
           las propiedades iniciales del mundo!!
         */
        console.log('create');
        this.personaje = game.add.sprite(100,100, 'nave');
        console.log(this.personaje.x);

        this.contador = 0;
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */

        this.contador++;

        if (this.contador >= 50) {
            this.personaje.kill();
        }

        if (this.contador >= 100) {
            this.contador = 0;
            this.personaje.reset(50,50);
        }

        console.log('update');
    }
};

game.state.add('1', level1);
game.state.start('1');
