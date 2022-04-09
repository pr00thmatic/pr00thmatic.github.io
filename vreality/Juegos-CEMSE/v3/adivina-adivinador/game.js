var data = [{
  question: '¿Cuáles son los roles de los líderes comunitarios?',
  answers: ['Crear planes o proyectos para la comunidad',
            'Identificar problemáticas dentro de la comunidad',
            'Promover la participación de los miembros de la comunidad',
            'Coordinar con distintas instancias e instituciones',
            'Todas son correctas' ],
  correctAnswer: 4,
}, {
  question: 'Las y los líderes comunitarios para proteger a las niñas, niños y adolescentes pueden realizar acciones de prevención, identificación, atención y derivación de casos de violencia.',
  answers: ['Verdadero', 'Falso' ],
  correctAnswer: 0
}, {
  question: '¿Qué ley se enfoca en la protección de las niñas, niños y adolescentes en Bolivia?',
  answers: ['La ley de educación Avelino Siñani -Elizardo Perez',
            'La constitución',
            'El código Niño, Niña y Adolescente o Ley 548' ],
  correctAnswer: 2
}, {
  question: 'Según el Código Niño, Niña y Adolescente, ¿quiénes son los encargados de proteger el bienestar de los niños, niñas y adolescentes?',
  answers: ['El gobierno',
            'Los padres y madres',
            'El Estado, los gobernantes, las familias y la sociedad en general' ],
  correctAnswer: 2
}];
var scene;
var gameStatus = {
  current: 0,
  right: 0
};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    var assets = 'adivina-adivinador/assets/';
    scene.load.image('background', assets + 'background.png');
    scene.load.image('grid sheet', assets + 'grid sheet.png');
    scene.load.image('bricks', assets + 'bricks.png');
    scene.load.image('double line sheet', assets + 'double line sheet.png');
    scene.load.image('double grid sheet', assets + 'double grid sheet.png');
    scene.load.image('line sheet', assets + 'line sheet.png');
    scene.load.image('wrong', assets + 'wrong.png');
    scene.load.image('right', assets + 'right.png');
    scene.load.image('result', assets + 'result.png');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

    utils.shuffle(data);
    gameStatus.emitter.on('question answered', nextQuestion);
    updateCurrentQuestion();
    ProgressBar.create();
    Result.create();

    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  var nextQuestion = function (wasRight) {
    gameStatus.current++;
    gameStatus.right += wasRight? 1: 0;
    setTimeout(() => {
      var next = scene.add.tileSprite(mainState.width/2, 100, 150, 30, 'double line sheet').
          setOrigin(0,0).
          setInteractive();

      next.label =
        Label.gimmieLabel(next, gameStatus.current >= data.length? 'RESULTADOS!': 'Siguiente', {
          font: 'bold 15px Helvetica',
          color: '0x000000'
        });

      next.on('pointerdown', ((destroy) => { return () => {
        if (gameStatus.current >= data.length) {
          gameStatus.emitter.emit('game over');
        } else {
          updateCurrentQuestion();
        }
        destroy.destroy();
        destroy.label.destroy();
      }; })(next));
    }, 600);
  };

  var updateCurrentQuestion = function () {
    Question.load(data[gameStatus.current].question);
    Answers.load(data[gameStatus.current].answers, data[gameStatus.current].correctAnswer);
  };

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           scene: {
             preload : preload,
             create : create,
             update : update
           }
         };

})();

var game = new Phaser.Game(mainState);
