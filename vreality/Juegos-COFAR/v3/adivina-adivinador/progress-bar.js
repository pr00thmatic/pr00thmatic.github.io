var ProgressBar = (() => {
  var instance = {};
  var config = {
    margin: null, // gets initialized on create
    size: { x: 200, y: 26 }
  };

  var create = () => {
    config.margin = { x: (mainState.width - 280) / 2, y: 40 },
    instance.background = scene.add.nineslice(config.margin.x, config.margin.y, config.size.x, config.size.y,
                                              'progress-bar', 5).
      setOrigin(0,0);

    instance.right = scene.add.nineslice(config.margin.x, config.margin.y, 1, config.size.y, 'progress-bar', 5).
      setOrigin(0,0).
      setTint(colors.global.right).
      setDepth(20).
      setAlpha(0);

    instance.wrong = scene.add.nineslice(config.margin.x, config.margin.y, 1, config.size.y, 'progress-bar', 5).
      setOrigin(0,0).
      setTint(colors.global.wrong).
      setDepth(10).
      setAlpha(0);

    instance.label = scene.add.text(config.margin.x + config.size.x + 20, config.margin.y, '', {
      color: colors.toHex(colors.global.right),
      font: 'bold 20px Montserrat'
    });

    updateBar();
    gameStatus.emitter.on('question answered', updateBar);
    gameStatus.emitter.on('game over', updateBar);
  };

  var updateBar = function () {
    if (gameStatus.current > 0) instance.wrong.setAlpha(1);
    instance.wrong.resize(config.size.x * (gameStatus.current / data.length), instance.wrong.height);

    let wrongProportion = (gameStatus.current == 0? 0: (gameStatus.right / gameStatus.current));
    if (wrongProportion > 0)  instance.right.setAlpha(1);
    instance.right.resize(instance.wrong.width * wrongProportion, instance.right.height);
    // instance.right.width = instance.wrong.width * wrongProportion;
    instance.label.text = gameStatus.current + '/' + data.length;
  }

  return {
    instance,
    config,
    create
  };
})();
