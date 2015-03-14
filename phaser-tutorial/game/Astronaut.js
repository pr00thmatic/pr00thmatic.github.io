var X = 0, Y = 0;

var astronaut = function (floor, cursor, ship) {
    var sprite = game.add.sprite(50,500, 'astronaut', 1);
    sprite.anchor.set(0.5,0.5);

    // animations
    sprite.animations.add('jump', [3,4], 8, true);
    sprite.animations.add('walk', [0,1,2,1], 4, true);
    sprite.animations.add('stand', [2]);

    // physics
    game.physics.arcade.enable(sprite);
    sprite.body.acceleration.y = world.gravity;

    // control del astronauta
    sprite.cursor = cursor;
    sprite.speed = 30;
    sprite.force = 80;

    // properties
    sprite.ship = ship;

    sprite.spawn = function (x, y) {
        this.reset(x,y);
        this.body.acceleration.y = world.gravity;
    };

    sprite.update = function () {
        var distance;

        game.physics.arcade.collide(floor, this);

        this.body.velocity.x = 0;
        if (this.cursor.right.isDown) {
            this.body.velocity.x = this.speed;
            this.scale.set(1,1);
        }

        if (this.cursor.left.isDown) {
            this.body.velocity.x = -this.speed;
            this.scale.set(-1,1);
        }

        if (this.cursor.jump.isDown && this.body.blocked.down) {
            this.body.velocity.y = -this.force;
            this.animations.play('jump');
        }

        if (this.body.velocity.x != 0 && this.body.velocity.y === 0) {
            this.animations.play('walk');
        } else if(this.body.velocity.y === 0) {
            this.animations.play('stand');
        }

        if (this.cursor.down.isDown) {
            distance = this.cartessianDistanceToShip();
            if (0 <= distance[X] && distance[X] <= 64 &&
                0 <= distance[Y] && distance[Y] <= 64) {
                this.ship.undeploy();
                this.kill();
            }
        }
    };

    sprite.cartessianDistanceToShip  = function () {
        return [this.x - this.ship.x, this.y - this.ship.y];
    };

    sprite.enterShip = function (astronaut, ship) {
        astronaut.kill();
        ship.isDeployed = false;
        ship.animations.play('close');
    };

    sprite.kill();

    return sprite;
};
