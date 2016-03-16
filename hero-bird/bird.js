// 6, 20, 14, 21, 19, 12, 5, 21

var Bird = (function () {
  var Instance = (function () {
    var updateAnimation = function () {
      if (this.body.blocked.down) {
        if (Math.abs(this.body.velocity.x) < .1) {
          this.animations.play('stand');
        } else {
          this.animations.play('walk');
        }
      } else {
        this.animations.play('fly');
      }
    };

    var updateMovement = function () {
      var factorX = 0;
      this.body.velocity.x = 0;

      if (this.cursor.right.isDown) {
        factorX = 1;
      } else if (this.cursor.left.isDown) {
        factorX = -1;
      }

      if (factorX) {
        this.scale.set(factorX, 1);
      }

      this.body.velocity.x = this.speed * factorX;
    };

    var collideWithMap = function (bird, platform) {
      var i;

      console.log(platform.index);

      for (i = 0; i<TileInfo.spikeIndex.length; i++) {
        if (platform.index == TileInfo.spikeIndex[i]) {
          game.state.start("main");
        }
      }
    };

    return {
      update : function () {
        game.physics.arcade.collide(this.platforms, this, collideWithMap);
        updateAnimation.call(this);
        updateMovement.call(this);

        this.flyCooldown--;
      },

      fly : function () {
        if (this.flyCooldown <= 0) {
          this.body.velocity.y = -this.jumpVelocity;
          this.flyCooldown = this.flyCooldownTime;
        }
      }
    };
  })();
  
  var create = function (x,y, platforms) {
    var bird = game.add.sprite(x,y, 'bird');

    bird.animations.add("walk", [3,4,5,4], 12, true);
    bird.animations.add("stand", [0,1,2,1], 6, true);
    bird.animations.add("fly", [6,7,8,7], 6, true);
    bird.animations.play("fly");

    game.physics.arcade.enable(bird);
    bird.body.acceleration.set(0,600);
    bird.anchor.set(0.5,1);
    bird.body.setSize(40, 35, 0, -5);

    bird.cursor = game.input.keyboard.createCursorKeys();
    bird.cursor.fly = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    bird.platforms = platforms;
    bird.update = Instance.update;
    bird.fly = Instance.fly;

    bird.cursor.fly.onDown.add(bird.fly, bird);

    bird.speed = 150;
    bird.jumpVelocity = 250;
    bird.flyCooldownTime = 10; // 10 frames o.O
    bird.flyCooldown = bird.flyCooldownTime;
    
    return bird;
  };

  return {
    create : create
  };
})();
