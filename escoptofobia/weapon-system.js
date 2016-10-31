var WeaponSystem = (function () {
  // var debug = true;
  var debug = false;

  var Instance = (function () {
    return {
      getSelectedWeapon : function () {
        return this.weapons[this.owner.energy-1];
      },
      isAttacking : function () {
        var i;
        for (i=0; i<this.weapons.length; i++) {
          if (this.weapons[i].isAttacking()) {
            return true;
          }
        }
        return false;
      }
    };
  })();

  var Weapon = (function () {

    var Instance = (function () {
      return {
        update : function () {
          var key,
              i;

          this.x = this.owner.x;
          this.y = this.owner.y;

          if (!this.animations.currentAnim.isPlaying) {
            this.alpha = 0;
            this.animations.play('none');
          } else {
            if (this.animations.currentAnim.frame === 1) {
              for (i=0; i<this.level.enemies.length; i++) {
                if (Phaser.Rectangle.intersects(this.getImpactRectangle(),
                                                this.level.enemies[i].body)) {
                  this.level.enemies[i].startDying();
                }
              }
            }
          }
        },
        attack : function (direction) {
          var step = config.map.tile.width;
          this.rotation = util.rotationHash[direction];
          this.alpha = 1;
          this.animations.play('attack');
          this.direction = direction;
        },
        isAttacking : function () {
          return this.alpha === 1;
        },
        getImpactRectangle : function () {
          var step = 35,
              width = step,
              height = step,
              thicknessPenalty = 17,
              heightPenalty = 10;
              x = this.owner.x, y = this.owner.y;

          switch (this.direction) {
          case 'up':
            height = height*(this.index+2) - heightPenalty;
            width -= thicknessPenalty;
            x -= (step - thicknessPenalty)/2;
            y -= height;
            break;
          case 'down':
            height = height*(this.index+2) - heightPenalty;
            width -= thicknessPenalty;
            x -= (step - thicknessPenalty)/2;
            break;
          case 'right':
            // it is okay for left and right to destroy enemies above and below
            width = width*(this.index+2) - heightPenalty;
            y -= step/2;
            break;
          case 'left':
            width = width*(this.index+2) - heightPenalty;
            y -= step/2;
            x -= width;
            break;
          }

          this.impactRectangle =
            new Phaser.Rectangle(x, y, width, height);
          if (debug) {
            var graphics = game.add.graphics(0,0);
            graphics.beginFill(0xffffff);
            graphics.drawRect(this.impactRectangle.x, this.impactRectangle.y,
                              this.impactRectangle.width,
                              this.impactRectangle.height);
          }
          return this.impactRectangle;
        }
      };
    })();

    return {
      create : function (owner, index) {
        var weapon = game.add.sprite(owner.x, owner.y, index + 'hit');
        weapon.anchor.set(.5, 1);
        weapon.animations.add('none', [0]).play();
        weapon.animations.add('attack', [1,1,0,1,0], 8, false);
        weapon.alpha = 0;
        game.physics.arcade.enable(weapon);
        weapon.body.allowGravity = false;

        weapon.owner = owner;
        weapon.level = owner.level;
        weapon.index = index;

        zOrder.putInLayer(weapon, 'PC_RAY');
        util.inheritFunctions(weapon, Instance);

        return weapon;
      }
    };
  })();

  var attackOnCommand = function () {
    var key;
    for (key in this.control) {
      if (this.control[key].isDown) {
        this.getSelectedWeapon().attack(key);
      }
    }
  };

  return {
    create : function (owner) {
      w = [];
      var i,
          system = {
            weapons : [],
            owner : owner,
            level : owner.level
          };

      for(i=0; i<3; i++) {
        system.weapons.push(Weapon.create(owner, i));
        owner.part.push(system.weapons[i]);
        w.push(system.weapons[i]);
      }

      system.control = {};
      system.control.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
      system.control.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
      system.control.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
      system.control.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
      util.inheritFunctions(system, Instance);

      for (i in system.control) {
        system.control[i].onDown.add(attackOnCommand, system);
      }

      return system;
    }
  };
})();
