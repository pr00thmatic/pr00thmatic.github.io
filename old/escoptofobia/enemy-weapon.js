var EnemyWeapon = (function () {
  var Instance = (function () {
    var forceShoot = function (target) {
    };
    return {
      update : function () {
        var i;

        this.x = this.owner.x;
        this.y = this.owner.y;

        for (i=0; i<this.ray.length; i++) {
          this.ray[i].wallBlocked = false;
          game.physics.arcade.overlap(this.ray[i], this.platforms,
                                      this.ray[i].checkWallBlocked);
        }
      },

      shoot : function (ray, target) {
        var i;
        target.takeDamage();

        for (i=0; i<this.ray.length; i++) {
          this.ray[i].activate();
        }
      }
    };
  })();

  return {
    createAll : function (owner, attackSurfaces) {
      var weapons = {},
          weapon;

      for (key in attackSurfaces) {
        weapon = game.add.sprite(owner.x,owner.y, 'enemy');
        owner.part.push(weapon);
        weapon.animations.add('weapon', [1]).play();
        weapon.anchor.set(0.5, 0.5);
        weapon.rotation = util.rotationHash[key];

        weapon.direction = key;
        weapon.owner = owner;
        weapon.platforms = owner.level.tilemap.platforms;
        util.inheritFunctions(weapon, Instance);
        weapon.ray = Ray.create(weapon);

        weapons[key] =  weapon;
        zOrder.putInLayer(weapon, 'WEAPON');
      }

      return weapons;
    }
  }
})();
