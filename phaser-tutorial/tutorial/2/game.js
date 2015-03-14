var game = new Phaser.Game(800,640, Phaser.AUTO, 'gameDiv');

var level1 = {
    preload: function () {
        // aquí cargas imágenes y sonidos.
        console.log('cargando imágenes y sonidos...');
    },

    create: function () {
        /*
           create se ejecuta una sola vez, antes de comenzar
           el ciclo infinito de ejecuciones de update.

           Ideal para crear a los personajes y darle valor a
           las propiedades iniciales del mundo!!
         */
        console.log('create');
    },

    update: function () {
        /*
          update se ejecuta una y otra vez, en un ciclo infinito.
         */
        console.log('update');
    }
};

game.state.add('1', level1);
game.state.start('1');
