var Result = (() => {
  var instance = {};

  var create = function () {
    gameStatus.emitter.on('game over', () => {
      instance.sprite = scene.add.sprite(0,0, 'results').
        setDepth(200).
        setOrigin(0,0);

      let score = Math.round(100 * (gameStatus.right / data.length));
      let message = 'Tu puntaje es:\n' + score + ' de 100';
      instance.label =
        scene.add.text(mainState.width/2, instance.sprite.getCenter().y, message, {
          color: colors.toHex(score > 50? colors.global.right: colors.global.wrong),
          font: 'bold 20px Montserrat',
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
