let data = [];
var scene;
var gameStatus = {
  current: 0,
  right: 0
};
var mainState = ( function () {

  var preload = function () {
    let params = new URLSearchParams(window.location.search);
    data = banco.trivia[params.get('capsula')];

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
    let currentData = data[gameStatus.current];
    if (wasRight && --gameStatus.missingAnswers > 0) return;

    gameStatus.current++;
    gameStatus.right += wasRight? 1: 0;
    setTimeout(() => {
      var next = scene.add.tileSprite(mainState.width/2, 100, 150, 30, 'double line sheet').
          setOrigin(0.5,0).
          setInteractive();

      next.label =
        Label.gimmieLabel(next, gameStatus.current >= data.length? 'RESULTADOS!': 'Siguiente', {
          font: 'bold 15px Helvetica',
          color: '#ffffff'
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
    gameStatus.missingAnswers = data[gameStatus.current].correctAnswer.length === undefined? 1:
      data[gameStatus.current].correctAnswer.length;
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
