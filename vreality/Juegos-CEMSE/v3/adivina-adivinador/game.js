let data = [];
var scene;
var gameStatus = {
  current: 0,
  right: 0
};
var mainState = ( function () {

  var preload = function () {
    let id = utils.preloadCapsuleIdFromURL();
    data = banco.trivia[id]; data.capsulaId = id;
    scene = this;
    utils.preloadSharedAssets(scene);
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    this.background = utils.createBackground();

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
      var next = scene.add.image(mainState.width/2, mainState.height - 20, 'button').
          setOrigin(0.5,1).
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
           transparent: true,
           plugins: {
             global: [ NineSlice.Plugin.DefaultCfg ]
           },
           scene: {
             preload : preload,
             create : create,
             update : update
           }
         };

})();

var game = new Phaser.Game(mainState);
