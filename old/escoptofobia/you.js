var You = (function () {
  var Instance = (function () {
    var updateEnd = function () {
      var worldRectangle =
          new Phaser.Rectangle(0,0, game.world.width, game.world.height);

      if (!worldRectangle.containsRect(this)) {
        this.level.end();
      }
    };

    var updateAnimations = function () {
      if (this.hasAnimations) {
        if (this.isAttacking()) {
          this.animations.play('attack');
        } else if (this.body.velocity.y < 0) {
          this.animations.play('jump-up');
        } else if (this.body.velocity.y > 0) {
          this.animations.play('jump-down');
        } else if (Math.abs(this.body.velocity.x) < 1) {
          this.animations.play('stand');
        } else {
          this.animations.play('run');
        }
      }
    };

    return {
      addAnimations : function () {
        this.hasAnimations = true;
        this.animations.add('stand', [0,0,0,0,0,0,1,2,3,3,3,2,1,0,0,0,0,1,4,3,3,3,2,1], 6, true);
        this.animations.add('attack', [10,11,12,13,13,12,12,13,13,13,13,12,12,11,11,10,10], 26, false);
        this.animations.add('run', [5,6,7,8,9,8,7,6], 10, true);
        this.animations.add('jump-up', [14]);
        this.animations.add('jump-down', [15]);
      },
      update : function () {
        var movement = this.control;
        updateEnd.call(this);
        this.dad.update.call(this);

        this.body.velocity.x = 0;

        if (movement.left.isDown) {
          this.body.velocity.x = - this.speed;
          this.scale.x = -1;
        }
        if (movement.right.isDown) {
          this.body.velocity.x = this.speed;
          this.scale.x = 1;
        }
        updateAnimations.call(this);
      },

      isAttacking : function () {
        return this.weapon.isAttacking();
      },

      canUse : function (weapon) {
        return weapon.index === this.energy-1;
      },

      // TODO : a standard initial jump
      jump : function () {
        if (this.body.blocked.down) {
          this.body.velocity.y = -1.5 * this.jumpSpeed/2;
          game.time.events.add(150, this.jumpMore, this);
        }
      },

      jumpMore : function () {
        if (this.control.up.isDown) {
          this.body.velocity.y += -0.8 * this.jumpSpeed/2
        }
      },

      startDying : function () {
        this.dad.startDying.call(this);
        game.time.events.add(1000, this.level.restart, this.level);
      },

      getX : function () {
        return this.x + Math.sign(this.body.velocity.x) * 10;
      }
    };
  })();

  var Glow = (function () {
    var Instance = (function () {
      return {
        update : function () {
          this.x = this.owner.getX();
          this.y = this.owner.y;
          this.animations.play(this.levels[this.owner.energy-1]);
        }
      };
    })();

    return {
      create : function (owner) {
        var glow = game.add.sprite(owner.x, owner.y, 'glow');
        glow.anchor.set(.5);
        glow.scale.set(1, 1.2);
        glow.owner = owner;
        util.inheritFunctions(glow, Instance);
        glow.levels = ['1', '2', '3'];
        glow.animations.add('1', [0]);
        glow.animations.add('2', [1]);
        glow.animations.add('3', [2]);
        zOrder.putInLayer(glow, 'PC_RAY');
        owner.part.push(glow);

        return glow;
      }
    };
  })();
  
  return {
    create : function (x,y, level) {
      var you = Character.create(x,y, 'you', level);

      you.body.setSize(you.width/1.8, you.height/1.2, 0, you.height/11);
      you.control = game.input.keyboard.createCursorKeys();
      you.jumpSpeed = Math.sqrt(2 * config.you.jumpHeight *
                                config.world.gravity);
      you.speed = config.you.speed;
      you.weapon = WeaponSystem.create(you);

      you.rangedAttack = RangedAttack.create(you);
      you.energy = 3;

      you.glow = Glow.create(you);

      util.inheritFunctions(you, Instance);
      you.control.up.onDown.add(you.jump, you);

      zOrder.putInLayer(you, 'PC');
      
      return you;
    }
  };
})();
