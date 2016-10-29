var RangedAttack = (function () {

  var Shot = (function () {
    var Instance = (function () {

      var updateFriction = function () {
        if (this.body.blocked.down) {
          this.body.drag.x = 2000;
        } else {
          this.body.drag.x = 0;
        }
      };

      var damage = function (shot, enemy) {
        enemy.startDying();
        shot.kill();
      };

      var damageUpdate = function () {
        var i,
            enemy;

        for (i=0; i<this.level.enemies.length; i++) {
          enemy = this.level.enemies[i];
          game.physics.arcade.collide(this, enemy, damage);
        }
      }

      return {
        update : function () {
          if (!this.isReturning()) {
            // behaves like a shot
            game.physics.arcade.collide(this, this.level.tilemap.platforms);
            updateFriction.call(this);
            damageUpdate.call(this);

            if (Math.abs(this.body.velocity.x) < 10 &&
                Math.abs(this.body.velocity.y) < 10) {
              this.returnToOwner();
            }

          } else {
            // just returns to the owner
            this.returnToOwner();
          }

          game.physics.arcade.collide(this, this.owner,
                                      this.mergeWithOwner, null, this);
        },

        isReturning : function () {
          return this.alpha < 1;
        },

        returnToOwner : function () {
          this.alpha = .5;
          this.body.allowGravity = false;
          game.physics.arcade.moveToXY(this, this.owner.x, this.owner.y, 500);
          if (Phaser.Math.distance(this.x, this.y,
                                   this.owner.x, this.owner.y) < this.owner.width) {
            this.mergeWithOwner();
          }
        },

        mergeWithOwner : function () {
          if (this.canMerge) {
            this.owner.energy++;
            this.destroy();
          }
        },
      };
    })();

    var enableMerge = function () {
      this.canMerge = true;
    };

    return {
      create : function () {
        var shot = game.add.sprite(this.owner.x, this.owner.y, 'shot');
        this.owner.part.push(shot);

        util.inheritFunctions(shot, Instance);

        shot.level = this.level;
        shot.owner = this.owner;

        shot.canMerge = false;
        game.time.events.add(100, enableMerge, shot);

        game.physics.arcade.enable(shot);
        game.physics.arcade.
          moveToXY(shot,
                   shot.x + config.shot.speed * Math.sin(Math.PI-this.arrow.rotation),
                   shot.y + config.shot.speed * Math.cos(Math.PI-this.arrow.rotation),
                   800);

        shot.body.bounce.set(0.5);
        shot.body.collideWorldBounds = true;

        return shot;
      }
    };
  })();

  var Arrow = (function () {
    var Instance = (function () {
      return {
        update : function () {
          this.x = this.origin.x;
          this.y = this.origin.y;

          this.body.angularVelocity = 0;
          if (this.controls.clockwise.isDown) {
            this.body.angularVelocity = this.speed;
          }
          if (this.controls.counterClockwise.isDown) {
            this.body.angularVelocity = -this.speed;
          }
        },

      };
    })();

    return {
      create : function (pc) {
        var arrow = game.add.sprite(pc.x, pc.y, 'arrow');
        util.inheritFunctions(arrow, Instance);

        game.physics.arcade.enable(arrow);
        arrow.body.allowGravity = false;
        arrow.anchor.set(0.5, 1);

        arrow.origin = pc;
        arrow.speed = 200;

        arrow.controls = {};
        arrow.controls.clockwise =
          game.input.keyboard.addKey(Phaser.Keyboard.E);

        arrow.controls.counterClockwise =
          game.input.keyboard.addKey(Phaser.Keyboard.Q);

        return arrow;
      }
    };
  })();

  var shoot = function () {
    if (this.owner.energy > 1) {
      this.owner.energy--;
      Shot.create.call(this);
    }
  };

  return {
    create : function (pc) {
      var system = {};
      system.owner = pc;
      system.level = pc.level;
      system.arrow = Arrow.create(pc);
      pc.part.push(system.arrow);
      
      system.controls = {};
      system.controls.shoot =
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      system.controls.shoot.onDown.add(shoot, system);

      return system;
    }
  };
})();
