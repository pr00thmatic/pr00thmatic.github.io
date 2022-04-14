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
      instance.label = Label.gimmieLabel(instance.holder, '', {
        color: '#000',
        font: 'bold 14px Montserrat',
        wordWrap: {
          width: 250
        },
        align: 'left'
      }).setDepth(10);
    }
    instance.label.text = statement;
  };

  return {
    instance,
    load
  };
})();
