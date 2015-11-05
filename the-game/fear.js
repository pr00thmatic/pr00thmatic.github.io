var Fear = (function () {
  return {
    create : function () {
      var fear = game.add.sprite(0,0, 'fear');
      fear.alpha = .0;
      game.add.tween(fear).to({alpha : 1}, 500, Phaser.Easing.Quadratic.In,
                              true, 1000, -1, true);
      return fear;
    }
  };
})();
