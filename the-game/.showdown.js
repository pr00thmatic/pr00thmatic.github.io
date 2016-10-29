var Ray = (function () {
  var overlaps = function (ray, tile) {
    if (tile.index > 0) {
      ray.wallBlocked = true;
    }
  }

  var shoot = function (ray, target) {
    if (!ray.fired && !ray.wallBlocked) {
      ray.source.shoot(ray, target);
    }
  };

  // ...
  return {
    update : function () {
      // ...
      if (this.source.owner.isActive() && this.source.owner.opponent.isActive()) {
        game.physics.arcade.overlap(this, this.source.owner.opponent,
                                    shoot, null, this);
      }
    },
    // ...
  };
});
