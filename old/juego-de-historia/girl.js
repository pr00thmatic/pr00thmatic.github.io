var Girl = (function () {
  var Instance = (function () {
    return {
      update : function () {
        util.execute(this.updates, this);
        this.animationUpdate();
        this.movementUpdate();
        this.tutorial.update.call(this.tutorial);
      },
      movementUpdate : function () {
        this.body.velocity.x = 0;
        if (this.controls.left.isDown) {
          this.body.velocity.x = -this.speed;
          this.scale.x = -1;
        }
        if (this.controls.right.isDown) {
          this.body.velocity.x = this.speed;
          this.scale.x = 1;
        }
      },
      jump : function () {
        if (this.controls.up.isDown && this.body.blocked.down) {
          this.body.velocity.y = -this.jumpSpeed;
        }
      },
      animationUpdate : function () {
        if (this.body.velocity.y < 0) {
          this.animations.play('jump-up');
        } else if (this.body.velocity.y > 0) {
          this.animations.play('jump-down');
        } else if (Math.abs(Math.round(this.body.velocity.x,0)) > 0) {
          this.animations.play('run');
        } else {
          this.animations.play('stand');
        }
      }
    };
  })();

  return {
    create : function (x,y, level) {
      var girl = Sentient.create(x,y, 'girl', level);
      girl.level = level;
      girl.animations.add('run', [3,4,5,4], 5, true);
      girl.animations.add('stand', [0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,0,1,2,2,2,1],
                          8, true);
      girl.animations.add('jump-up', [6,7], 6, true);
      girl.animations.add('jump-down', [8,9], 6, true);

      girl.controls = game.input.keyboard.createCursorKeys();
      girl.controls.enter = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      util.inheritFunctions(girl, Instance);
      girl.controls.up.onDown.add(girl.jump, girl);

      girl.speed = 200;
      girl.jumpSpeed = util.calculateJumpSpeed(config.girl.jumpHeight,
                                               game.physics.arcade.gravity.y);
      girl.tutorial = Tutorial.create(girl);

      game.camera.follow(girl, Phaser.Camera.FOLLOW_PLATFORMER);
      return girl;
    }
  };
})();
