var Refinery = function (x, y, iceberg, sun) {
    this.points = 1000;
    this.hp = 30;
    this.iceberg = iceberg;
    this.sun = sun;

    this.initializeBuilding(x,y); // 'refinery' sprite
    this.initializeSmog(x,y); // 'smog' sprite
    this.reset(x,y);
};

Refinery.prototype.update = function () {

    // activate collisions between iceberg and refinery.
    game.physics.arcade.collide(this.sprite, this.iceberg.sprite);

    if (this.isAlive()) {
	if (this.isDying()) {
	    // die() must be executed until this is completely death.
	    // proceed dying sir.
	    this.die();
	} else if (this.isTakingDamage()) {
	    this.takeDamage();
	} else {
	    this.exist();
	}

    }

    if (this.isAlive() && !this.isDying()) {
	if (this.points > 10)
	    this.points--;
	sun.powerUp();
    }
};

Refinery.prototype.initializeBuilding = function () {
    // will be set on reset
    this.sprite = game.add.sprite(0, 0, 'refinery');
    this.sprite.anchor.set(0.5,1);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.setSize(70,35, 5,0);
    this.sprite.body.immovable = true;

    this.sprite.animations.add('float', [0,0,0,0,0,0,0,0,1,2,3,4], 12, true);
    this.sprite.animations.add('die', [6,7,8,9,10,11], 8, false);
    this.sprite.animations.add('spawn', [11,10,9,8,7,6], 8, false);
    this.sprite.animations.add('hurt', [0,6], 5, false);

    addToLayer(this.sprite, FLOAT);
};

Refinery.prototype.initializeSmog = function () {
    // will be set on reset
    this.smog = game.add.sprite(0,0,'smog');
    this.smog.anchor.setTo(0.77,1);

    this.smog.animations.add('flow', [0,1,2,3], 7, true);

    addToLayer(this.smog, SKY);
};

Refinery.prototype.reset = function (x, y) {
    this.sprite.reset(x,y);
    this.sprite.animations.play('spawn');
    this.smog.reset(x, y-81);
    this.smog.animations.play('flow');
    this.hp = 50;
    this.sprite.alpha = this.smog.alpha = 1;
    this.sprite.tint = 0xffffff;
};

Refinery.prototype.isAlive = function () {
    return this.sprite.alive || this.smog.alive;
};

Refinery.prototype.die = function () {

    if (!this.isDying()) {
	// just once. I don't want it to loop
	this.sprite.animations.play('die');
    }

    // this.sprite always fades slower than this.smog
    if (this.sprite.alpha <= 0) {
	this.justDie();
    } else {
	this.smog.alpha -= .1;
	this.sprite.alpha -= .05;
    }

};

Refinery.prototype.takeDamage = function () {

    if (this.hp <= 0)
	this.die();
    else {
	this.sprite.tint = 0xaaaaff;
	this.hp--;
	this.sprite.animations.play('hurt');
    }

};

Refinery.prototype.isDying = function () {
    return this.sprite.animations.currentAnim.name == 'die';
};

Refinery.prototype.isTakingDamage = function () {
    // game.physics.arcade.collide is not enough.
    // That's why distanceBetween comes for.
    // the iceberg would have to charge against the refinery
    // for the refinery to take damage.
    // (the game gets pretty hard)
    return game.physics.arcade.distanceBetween(this.iceberg.sprite,
					       this.sprite) < 90
	&& this.iceberg.isAttacking;
};

Refinery.prototype.exist = function () {
    // what refinery does when it's not dying, or getting hurt.
    if (!(this.sprite.animations.currentAnim.name == 'spawn' &&
	this.sprite.animations.currentAnim.isPlaying)) {

	this.sprite.animations.play('float');
	this.sprite.tint = 0xffffff;

    }
};

Refinery.prototype.justDie = function () {
    this.smog.kill();
    this.sprite.kill();
    score.scoreUp(this.points);
};
