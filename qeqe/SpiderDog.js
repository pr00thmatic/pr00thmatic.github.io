var SpiderDog = function (game, level, spawnPoint) {
    this.digTimeTaken = 100;
    this.digTimeElapsed = 0;
    this.speed = 150;
    this.runningLimit = 20;
    this.jumpPower = 350;

    this.level = level;
    this.game = game;
    this.plataforms = this.level.map.layer;

    this.sprite  = this.game.add.sprite(spawnPoint[0],spawnPoint[1], 'spiderdog');
    this.sprite.anchor.set(.5,.5);
    this.sprite.animations.add('run', [3,4,5,6,6,7,8,9,10], 19, true);
    this.sprite.animations.add('jump', [9,2,2,3,3,4,4,5,5], 16, false);
    this.sprite.animations.add('fall', [6,7], 6, false);
    this.sprite.animations.add('stand', [0,1,2,1], 10, true);
    this.sprite.animations.add('dig', [11,12,13,12], 8, true);
    this.sprite.animations.add('sniff', [14,15,16,15], 8, true);

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.acceleration.y = this.level.gravity;
    this.sprite.body.maxVelocity.set(this.speed,500);
    this.sprite.animations.play('run');
    this.sprite.body.setSize(20, 40, 0,0);
};

SpiderDog.prototype.looks = function (action) {
    return this.sprite.animations.currentAnim.name == action;
};

SpiderDog.prototype.isOnTheFloor = function () {
    return this.sprite.body.blocked.down;
};

SpiderDog.prototype.isDigging = function () {
    return this.looks('dig') && this.digTimeElapsed < this.digTimeTaken;
};

SpiderDog.prototype.isSniffing = function () {
    return this.looks('sniff');
};



SpiderDog.prototype.graphicUpdate = function () {
    if (!this.isOnTheFloor()) {
        var velocityY = this.sprite.body.velocity.y;
        if (velocityY < 0) {
            if (!this.looks('jump')) {
                this.sprite.animations.play('jump');
            }
        } else {
            if (!this.looks('fall')) {
                this.sprite.animations.play('fall');
            }
        }
    } else {
        if (this.level.cursor.sniff.isDown) {
            this.sprite.animations.play('sniff');
        } else if (this.sprite.body.velocity.x < -this.runningLimit) {
            this.sprite.animations.play('run');
        } else if (this.sprite.body.velocity.x > this.runningLimit) {
            this.sprite.animations.play('run');
        } else {
            if (this.level.cursor.down.isDown && this.getDownTile()) {
                this.sprite.animations.play('dig');
            } else {
                this.sprite.animations.play('stand');
            }
        }
    }


    if (this.sprite.body.velocity.x < 0)
        this.sprite.scale.set(-1,1);
    if (this.sprite.body.velocity.x > 0)
        this.sprite.scale.set(1,1);

};

SpiderDog.prototype.getDownTile = function () {
    var down = this.getDownCoordinates();
    return this.level.map.tileMap.getTile(down[X], down[Y]);
};

SpiderDog.prototype.getDownCoordinates = function () {
    var x = Math.floor(this.sprite.x/this.level.map.tileMap.tileWidth);
    var y = Math.floor(this.sprite.y/this.level.map.tileMap.tileHeight + 1);

    return [x,y];
};


SpiderDog.prototype.dig = function () {
    this.digTimeElapsed++;

    if (this.digTimeElapsed >= this.digTimeTaken) {
        var down = this.getDownCoordinates();

        this.level.map.tileMap.removeTile(down[0], down[1]);
        this.digTimeElapsed = 0;

        // making neighbours of the hole visualy coherent with the floor
        for (var i=0; i<this.level.map.direction.length; i++) {
            this.level.map.makeCoherent( down[0] + this.level.map.direction[i][0],
                                         down[1] + this.level.map.direction[i][1]);
        }

        // this will force the dog to fall into the hole, if he fits.
        if (this.sprite.body.velocity.y == 0)
            this.sprite.body.velocity.y = -80;

    }
};


SpiderDog.prototype.update = function () {
    this.game.physics.arcade.collide(this.sprite, this.level.map.hidden);
    this.game.physics.arcade.collide(this.sprite, this.plataforms);

    if (!this.looks('sniff')) {
        if (this.isOnTheFloor() && this.level.cursor.up.isDown) {
            this.sprite.body.velocity.y = -this.jumpPower;
        }

        if (this.level.cursor.right.isDown) {
            this.sprite.body.velocity.x = this.speed;
        } else if (this.level.cursor.left.isDown) {
            this.sprite.body.velocity.x = -this.speed;
        } else {
            this.sprite.body.velocity.x = 0;

            if (this.level.cursor.down.isDown && this.isOnTheFloor()) {
                this.dig();
            } else {
                this.digTimeElapsed = 0;
            }

        }

    } else {
        this.sprite.body.velocity.x = 0;
    }

    this.game.physics.arcade.collide(this.sprite,
                                     this.level.bones, this.eatBone);

    this.game.physics.arcade.collide(this.sprite,
                                     this.level.hiddenBones, this.eatBone);


    this.graphicUpdate();
};

SpiderDog.prototype.eatBone = function (dog, bone) {
    bone.kill();
    level.score.eatenBones++;
    level.score.update();
    console.log('om nom nom');
};
