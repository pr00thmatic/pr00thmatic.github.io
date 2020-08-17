var Sun = function (game, player) {
    this.lvlUpFlags = [0, 15, 25, 40, 70, 90];
    this.lvl = 0;
    this.power = 0;
    this.glow = [];
    this.speed = 90;
    this.strength = 20;
    this.position = [game.world.centerX, game.world.centerY-50];

    this.fireball = game.add.sprite(this.position[X], this.position[Y], 'sun');
    this.fireball.anchor.setTo(0.5,0.6);
    this.fireball.animations.add('happy', [3,4,5,4], 8, true);
    this.fireball.animations.add('mad', [0,1,2,1], 8, true);
    addToLayer(this.fireball, GALAXY+1);
    this.target = player;

    this.fireball.animations.play('happy');

    for (var i=0; i<5; i++) {
	this.addGlowSprite(('glow' + i), game);
    }

    this.switchToGlow(0);
    // the sun is not harmfull until the refineries destroy the ozone layer
    this.sprite.alpha = 0;

};

Sun.prototype.switchToGlow = function (index) {
    if (this.sprite) {
	this.sprite.kill();
    }

    this.sprite = this.glow[index];
    this.sprite.reset(this.position[X], this.position[Y]);
};

Sun.prototype.addGlowSprite = function (spritesheetName, game) {
    glow = game.add.sprite(0,0, spritesheetName);
    glow.animations.add('glow', [0,1,2,3,4], 16, true);
    glow.anchor.setTo(0.5,0.5);
    game.physics.enable(glow, Phaser.Physics.ARCADE);
    glow.body.maxVelocity.setTo(this.speed, this.speed);
    glow.animations.play('glow');
    glow.kill();
    addToLayer(glow, GALAXY);
    this.glow.push(glow);
};

Sun.prototype.update = function () {

    if (this.isHarmfull()) {
	var direction = Dot.minus([this.target.sprite.position.x,
				   this.target.sprite.position.y],
				  [this.sprite.position.x,
				   this.sprite.position.y]);
	direction = Dot.unitVector(direction);
	this.sprite.body.velocity.x += direction[X]*this.strength;
	this.sprite.body.velocity.y += direction[Y]*this.strength;

	this.position[X] = this.fireball.position.x = this.sprite.position.x;
	this.position[Y] = this.fireball.position.y = this.sprite.position.y;
    }

    if (this.lvl < 6 && this.power > this.lvlUpFlags[this.lvl+1])
	this.lvlUp();
};

Sun.prototype.powerUp = function () {
    this.power++;
};

Sun.prototype.lvlUp = function () {
    this.lvl++;
    this.fireball.animations.play('mad');
    console.log('lvl up!' + this.lvl);
    if (this.sprite.alpha == 0) {
	this.sprite.alpha = 1;
    } else {
	if (this.lvl < 6) {
	    this.switchToGlow(this.lvl-1);
	}
    }
};

Sun.prototype.isHarmfull = function () {
    return this.sprite.alpha == 1;
};
