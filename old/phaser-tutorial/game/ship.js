var ship = function (tilemap, cursor) {
    var sprite = game.add.sprite(100,100, 'ship');
    sprite.anchor.set(0,1);
    sprite.animations.add('stand', [0], null, true);
    sprite.animations.add('fly', [1,2], 15, true);
    sprite.animations.add('open', [3,4,5,6], 4, false);
    sprite.animations.add('close', [6,5,4,3], 4, false);
    sprite.animations.play('stand');

    //physic properties
    game.physics.arcade.enable(sprite);
    sprite.body.acceleration.y = world.gravity;
    sprite.power = 50;

    // propiedades
    sprite.hp = 5;
    sprite.isParked = false;
    sprite.isDeployed = false;
    sprite.astronaut = astronaut(tilemap.floor, cursor, sprite);

    // control del personaje
    sprite.cursor = cursor;

    sprite.damageSensors = [false,false,false,false];
    sprite.defense = 100;

    sprite.updateDamageSensors = function () {
        this.damageSensors = [ [this.body.velocity.x <= -this.defense, 'left'],
                               [this.body.velocity.x >= this.defense, 'right'],
                               [this.body.velocity.y >= this.defense, 'down'],
                               [this.body.velocity.y <= -this.defense, 'up'] ];
    };

    sprite.updateDamage = function () {
        var i,
            max,
            crush = false;

        sprite.updateDamageSensors();

        for (i=0, max = this.damageSensors.length; i < max && !crush; i++) {
            crush = this.damageSensors[i][0] &&
                this.body.blocked[this.damageSensors[i][1]];
        }

        if (crush) {
            this.hp--;
        }

        return crush;
    };

    sprite.checkSurface = function () {
        var brick = { x: Math.round(sprite.x/16),
                      y: Math.round(sprite.y/16)},
            right = tilemap.getTile(brick.x, brick.y, tilemap.floor),
            left = tilemap.getTile(brick.x +3, brick.y, tilemap.floor);

        return right && left &&
            tilemap.isFloor(right.index) &&
            tilemap.isFloor(left.index);
    };

    sprite.updateParking = function (hasCrashed)  {
        if (!hasCrashed && this.body.blocked.down) {
            if (this.checkSurface()) {
                this.isParked = true;
            } else {
                this.isParked = false;
                this.body.velocity.y = -50;
            }
        }
    };

    sprite.hitFloor = function () {
        this.updateParking(this.updateDamage());
    };

    sprite.deployment = function () {
        var currentAnimation = this.animations.currentAnim;
        if (this.isParked && !this.isDeployed && currentAnimation.name !== 'close') {
            if (this.cursor.down.isDown) {
                this.animations.play('open');
                this.isDeployed = true;
            }
        }

        if (this.isDeployed && !this.astronaut.alive && !this.animations.currentAnim.isPlaying) {
            this.astronaut.spawn(this.x, this.y - 16);
        }
    };

    sprite.update = function () {
        this.isParked = false;
        game.physics.arcade.collide(this, tilemap.floor, this.hitFloor, null, this);
        this.deployment();
        this.life.update(this.hp);

        if (!this.isDeployed) {
            this.updateDamageSensors();

            if (!this.body.blocked.down) {
                if (this.cursor.right.isDown) {
                    this.body.acceleration.x = this.power;
                } else if (this.cursor.left.isDown) {
                    this.body.acceleration.x = -this.power;
                } else {
                    this.body.acceleration.x = 0;
                }
            } else {
                this.body.acceleration.x = this.body.velocity.x = 0;
            }

            if (this.cursor.jump.isDown) {
                this.body.acceleration.y = -this.power;
                this.animations.play('fly');
            } else {
                this.body.acceleration.y = world.gravity;
                this.animations.play('stand');
            }
        }
    };

    sprite.undeploy = function () {
        this.isDeployed = false;
        this.animations.play('close');
    };

    // vidas
    sprite.createLife = function (posX, posY) {
        var i;

        this.life = game.add.sprite(posX, posY, 'life');
        this.life.ship = this;

        for (i=0; i<5; i++) {
            this.life.animations.add(i, [i], null, false);
        }

        this.life.update = function () {
            this.animations.play(5 - this.ship.hp);
        };
    };
    sprite.createLife(0,0);

    return sprite;
};
