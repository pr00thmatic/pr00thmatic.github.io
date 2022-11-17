var ProgressBar = (() => {
  var instance = {};
  var config = {
    margin: null, // gets initialized on create
    size: { x: 200, y: 26 }
  };

  var create = () => {
    config.margin = { x: (mainState.width - 280) / 2, y: 60 },
    instance.background = scene.add.tileSprite(config.margin.x, config.margin.y, config.size.x, config.size.y, 'bricks').
      setOrigin(0,0);

    instance.right = scene.add.tileSprite(config.margin.x, config.margin.y, 1, config.size.y, 'double line sheet').
      setOrigin(0,0).
      setTint(Answers.config.correctColor).
      setDepth(20);

    instance.wrong = scene.add.tileSprite(config.margin.x, config.margin.y, 1, config.size.y, 'double grid sheet').
      setOrigin(0,0).
      setTint(Answers.config.incorrectColor).
      setDepth(10);

    instance.label = scene.add.text(config.margin.x + config.size.x + 20, config.margin.y, '', {
      color: '#000000',
      font: 'bold 20px Helvetica'
    });

    updateBar();
    gameStatus.emitter.on('question answered', updateBar);
    gameStatus.emitter.on('game over', updateBar);
  };

  var updateBar = function () {
    instance.wrong.width = config.size.x * (gameStatus.current / data.length);
    instance.right.width = instance.wrong.width * (gameStatus.current == 0? 0: (gameStatus.right / gameStatus.current));
    instance.label.text = gameStatus.current + '/' + data.length;
  }

  return {
    instance,
    config,
    create
  };
})();
