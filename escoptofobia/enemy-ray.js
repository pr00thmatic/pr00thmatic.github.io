var Ray = (function () {
  var Instance = (function () {
    var getReady = function () {
      this.fired = false;
      this.alpha = 0;
    };

    var overlaps = function (ray, tile) {
      if (tile.index > 0) {
        ray.wallBlocked = true;
      }
    }

    var shoot = function (ray, target) {
      if (!ray.fired && !ray.wallBlocked) {
        ray.source.shoot(ray, target);
        for (var i=0; i<ray.source.ray.length; i++) {
          console.log(i, ray.source.ray[i].wallBlocked);
        }
      }
    };

    var debugWallBlock = function () {
      if (this.wallBlocked) {
        this.tint = 0xff0000;
        this.alpha = this.intensity;
      } else {
        this.tint = 0x00ff00;
        this.alpha = this.intensity;
      }
    };

    return {
      update : function () {
        // debugWallBlock.call(this);
        this.x = this.source.x +
          util.directionHash[this.source.direction][X] *
          config.ray.width * this.index;

        this.y = this.source.y +
          util.directionHash[this.source.direction][Y] *
          config.ray.height * this.index;

        if (this.source.owner.isActive() &&
            this.source.owner.opponent.isActive()) {
          game.physics.arcade.overlap(this, this.source.owner.opponent,
                                      shoot, null, this);
        }
      },
      activate : function () {
        this.alpha = this.intensity;
        this.fired = true;
        game.time.events.add(500, getReady, this);
      },
      checkWallBlocked : function (ray, tile) {
        if (tile.index > 0) {
          ray.wallBlocked = true;
        } else if (ray.index > 0) {
          ray.wallBlocked = ray.source.ray[ray.index-1].wallBlocked;
        } else {
          ray.wallBlocked = false;
        }
      }
    };
  })();

  return {
    create : function (weapon) {
      var i = weapon.x,
          j = weapon.y,
          counter,
          ray;

      weapon.ray = [];


      for (counter = 0; counter < config.ray.range; counter++) {
        ray = game.add.sprite(i,j, 'enemy-hit');
        game.physics.arcade.enable(ray);
        ray.body.setSize(ray.width/1.5, ray.height/1.5);
        ray.body.gravity.y = -config.world.gravity;
        ray.anchor.set(0.5, 1);
        ray.rotation = weapon.rotation;
        ray.intensity = 1/(counter + 1);
        ray.alpha = 0;
        ray.platforms = weapon.owner.level.tilemap.platforms;

        util.inheritFunctions(ray, Instance);

        ray.source = weapon;
        ray.index = counter;

        weapon.ray.push(ray);

        i += util.directionHash[weapon.direction][X] * config.ray.width;
        j += util.directionHash[weapon.direction][Y] * config.ray.height;
      }

      return weapon.ray;
    }
  };
})();
