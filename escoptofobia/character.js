var Character = (function () {

  var Instance = (function () {
    var die = function () {
      this.kill();
    };

    return {
      update : function () {
        game.physics.arcade.collide(this, this.level.tilemap.platforms);
      },

      takeDamage : function () {
        if (!this.isDying()) {
          this.startDying();
        }
      },

      startDying : function () {
        var i;
        this.dyingTween = game.add.tween(this)
          .to({alpha: 0}, 250, Phaser.Easing.Linear.In, true);

        for (i=0; i<this.part.length; i++) {
          this.part[i].kill();
        }
        // this.rangedAttack.arrow.die();
        game.time.events.add(250, die, this);
      },

      isDying : function () {
        return this.dyingTween && this.dyingTween.isRunning;
      },

      isActive : function () {
        return !this.isDying() && this.alive;
      }
    };
  })();

  return {
    create : function (x,y, key, level) {
      var character = game.add.sprite(x,y, key);
      game.physics.arcade.enable(character);
      character.anchor.set(0.5);

      character.level = level;
      character.part = [];

      util.inheritFunctions(character, Instance);

      return character;
    }
  };
})();
