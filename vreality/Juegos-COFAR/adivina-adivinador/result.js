var Result = (() => {
  var instance = {};

  var create = function () {
    gameStatus.emitter.on('game over', () => {
      instance.sprite = scene.add.sprite(mainState.width/2, mainState.height * 0.8, 'result').
        setDepth(200);
      instance.sprite.rotation = utils.deg2Rad * utils.randomIntBetween(-10, 10);

      instance.label = scene.add.text(mainState.width/2, instance.sprite.getCenter().y - 120,
                                      'Tu puntaje es:\n' +
                                      100 * (gameStatus.right / data.length) +
                                      ' de 100', {
                                        color: '#aa0000',
                                        font: 'bold 20px Helvetica',
                                        align: 'center'
                                      }).
        setDepth(250).
        setOrigin(0.5, 0.5);
    });
  };

  return {
    instance,
    create
  };
})();
