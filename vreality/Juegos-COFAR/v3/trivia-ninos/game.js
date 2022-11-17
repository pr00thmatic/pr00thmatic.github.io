var scene;
var gameStatus = {
  currentQuestion: 0,
  currentAnswer: 0,
  rightGuesses: 0,
  total: 0
};
let data = [];

var mainState = ( function () {

  var preload = function () {
    scene = this;
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    let requiresAudio = banco.triviaWithVoice.indexOf(gameStatus.capsulaID) >= 0;
    utils.preloadSharedAssets(scene);
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    data = banco.trivia[gameStatus.capsulaID];
    for (let i=0; i<data.length; i++) {
      if (data[i].question.indexOf('.png') >= 0) {
        scene.load.image(data[i].question, data[i].dir + data[i].question);
      }
      if (requiresAudio) {
        let code = gameStatus.capsulaID.split('_');
        code = code[1] + '_' + code[2] + '_' + i;
        scene.load.audio('mus_' + i, [ 'audio/' + code + '.mp3' ]);
      }
      for (let j=0; j<data[i].answers.length; j++) {
        if (data[i].answers[j].indexOf('.png') >= 0) {
          scene.load.image(data[i].answers[j], data[i].dir + data[i].answers[j]);
        }
        if (requiresAudio &&
            banco.triviaVoiceButNoAnswers.indexOf(gameStatus.capsulaID) < 0) {
          let code = gameStatus.capsulaID.split('_');
          code = code[1] + '_' + code[2] + '_' + i + '_' + j;
          scene.load.audio('mus_' + i + '_' + j, [ 'audio/' + code + '.mp3' ]);
        }
      }
    }
    scene.load.image('open question mark', 'trivia-ninos/img/open question mark.png');
    scene.load.image('closed question mark', 'trivia-ninos/img/closed question mark.png');
    Question.knownLastQuestion = 0;
  };

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();
    gameStatus.emitter.on('game over', onGameOver);
    gameStatus.background = utils.createBackground();
    gameStatus.emitter.emit('create');
    Question.gimmieQuestion(data[0].question);
    Answer.gimmieAnswer(data[0].answers[0]);
  };

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  var onGameOver = function () {
    if (gameStatus.gameOver) return;

    gameStatus.gameOver = true;
    let background = scene.add.image(0,0, 'results').
        setOrigin(0,0).
        setDepth(1000).
        setAlpha(0);

    let score = gameStatus.rightGuesses / gameStatus.total;
    let emoji = score < 1/3? 'muy mal': (score < 2/3? 'meh': 'muy bien');
    let label = scene.add.image(mainState.width/2, mainState.height/2, emoji).
        setAlpha(0).
        setDepth(1001);

    scene.tweens.add({
      targets: [ background, label ],
      alpha: 1,
      duration: 500
    });
  }

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
           },
           onGameOver
         };

})();

var game = new Phaser.Game(mainState);
