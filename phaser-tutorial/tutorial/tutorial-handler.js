angular.module('tutorialNave', [])
    .controller('TutorialController', function ($scope) {

        var Frame = function (title) {
            this.title = title
        };

        $scope.version = {
            frames: [new Frame('Esqueleto del juego'),
                     new Frame('El nivel'),
                     new Frame('Creando un sprite'),
                     new Frame('Matando y reseteando un sprite'),
                     new Frame('Algunas propiedades del sprite'),
                     new Frame('Punto de anclaje'),
                     new Frame('Animaciones'),
                     new Frame('Eventos del teclado'),
                     new Frame('Física!'),
                     new Frame('tilemaps')],

            current: 0,
            directory: '',

            stepTo: function (frameIndex) {
                if (0 <= frameIndex && frameIndex < this.frames.length) {
                    this.current = frameIndex;
                    this.directory = this.current+1;
                }
            }
        };

        $scope.version.stepTo(1);

    });
