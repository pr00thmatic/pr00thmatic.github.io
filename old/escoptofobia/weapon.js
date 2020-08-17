var Weapon = (function () {
  var Instance = (function () {
    return {
      update : function () {
        var key;

        this.x = this.owner.x;
        this.y = this.owner.y;

        if (!this.animations.currentAnim.isPlaying) {
          this.alpha = 0.5;
          this.animations.play('none');
        }
      },

      attackOnCommand : function () {
        console.log(this.index);
        for (key in this.control) {
          if (this.control[key].isDown && this.owner.canUse(this)) {
            this.rotation = util.rotationHash[key];
            this.alpha = 1;
            this.animations.play('attack');
          }
        }

        return this.alpha === 1;
      }
    };
  })();

  return {
    createCursors : function () {
      this.control = {
        up : game.input.keyboard.addKey(Phaser.Keyboard.W),
        right : game.input.keyboard.addKey(Phaser.Keyboard.D),
        down : game.input.keyboard.addKey(Phaser.Keyboard.S),
        left : game.input.keyboard.addKey(Phaser.Keyboard.A)
      };

      return this.control;
    },

    create : function (owner, index) {
      var weapon = game.add.sprite(owner.x,owner.y, index + 'hit'),
          key;
      weapon.anchor.set(0.5, 1);
      weapon.animations.add('none', [0]);
      weapon.animations.add('attack', [1,1,0,1,0], 15, false);
      weapon.animations.play('none');
      weapon.alpha = .5;
      weapon.owner = owner;

      if (!this.control) {
        this.createCursors();
      }

      util.inheritFunctions(weapon, Instance);
      weapon.index = index;

      for (key in this.control) {
        console.log(key + weapon.index);
        this.control[key].onDown.add(weapon.attackOnCommand, weapon);
      }

      zOrder.putInLayer(weapon, 'PC_RAY');

      return weapon;
    }
  };
})();
