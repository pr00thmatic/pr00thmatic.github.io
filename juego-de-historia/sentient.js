var Sentient = (function () {
  var Instance = (function () {
    return {
      dontInherit : {
        update : function () {
          game.physics.arcade.collide(this, this.level.tilemap.platforms);
        },
      }
    };
  })();

  return {
    create : function (x,y, key, level) {
      var sentient = game.add.sprite(x,y, key);
      sentient.smoothed = false;
      sentient.anchor.set(.5, 1);
      sentient.updates = [Instance.dontInherit.update];
      sentient.level = level;
      game.physics.arcade.enable(sentient);
      util.inheritFunctions(sentient, Instance);

      zOrder.putInLayer(sentient, 'ACTION');

      return sentient;
    }
  };
})();
