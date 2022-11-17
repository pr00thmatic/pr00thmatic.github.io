var Question = (() => {
  var config = {
    width: 280,
    height: 140
  };
  var instance = {};

  var load = function (statement) {
    if (!instance.holder) {
      instance.holder = utils.createBorderNineslice({x:mainState.width/2, y:80},
                                                    {x:config.width, y:config.height}, 'info-box', 10).
        setOrigin(0.5, 0);
      instance.holder.stroke.setTint(colors.global.right);
      instance.holder.fill.setTint(colors.global.right);
    }

    if (instance.label) {
      instance.label.destroy();
    }

    if (statement.indexOf('.png') >= 0) {
      let imgPos = instance.holder.getCenter();
      let size = Math.min(config.width, config.height) - 10;
      instance.label = scene.add.image(imgPos.x, imgPos.y, statement).
        setDisplaySize(size * 1.29, size);
    } else {
      instance.label = Label.gimmieLabel(instance.holder, '', {
        color: '#fff',
        font: 'bold 15px Montserrat',
        width: Question.config.width,
        wordWrap: {
          width: 250
        },
        align: 'left'
      }).setDepth(10);
      instance.label.text = statement;
    }
  };

  return {
    instance,
    load,
    config
  };
})();
