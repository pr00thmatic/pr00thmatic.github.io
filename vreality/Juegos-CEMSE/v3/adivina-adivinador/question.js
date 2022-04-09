var Question = (() => {
  var config = {
    width: 280,
    height: 140
  };
  var instance = {};

  var load = function (statement) {
    if (!instance.holder) {
      instance.holder = scene.add.tileSprite(mainState.width/2, 140, config.width, config.height, 'line sheet').
        setOrigin(0.5, 0);
      // instance.holder.rotation = utils.randomIntBetween(-1,2) * utils.deg2Rad;
      instance.label = Label.gimmieLabel(instance.holder, '', {
        color: '#000000',
        font: '15px Helvetica',
        wordWrap: {
          width: 250
        },
        align: 'center'
      });
    }
    instance.label.text = statement;
  };

  return {
    instance,
    load
  };
})();
