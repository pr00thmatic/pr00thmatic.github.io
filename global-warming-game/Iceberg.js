var Iceberg = function (game, cursor) {
    this.totalHP = 1000;
    this.hp = this.totalHP;
    this.speed = 150;
    this.strength = 5;
    this.isAttacking = false;
    this.isMelting = false;
    this.cursor = cursor;

    this.sprite = game.add.sprite(100, 100, 'iceberg');
    this.sprite.anchor.setTo(0.5,1);
    this.sprite.animations.add('float', [3,4,5,4], 4, true);
    this.sprite.animations.add('attack', [0,1,2,1], 8, true);
    this.sprite.animations.add('getHurt', [6,7,8,7], 4, true);
    this.sprite.animations.play('float');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.drag.set(0.2);
    this.sprite.body.maxVelocity.setTo(this.speed, this.speed);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(70,35, 0,0);
    addToLayer(this.sprite, FLOAT);
};

Iceberg.prototype.attack = function () {
    if (!this.isMelting) {
	this.isAttacking = true;
	this.sprite.animations.play('attack');
    }
};

Iceberg.prototype.update = function () {
    /*
      La velocidad no va a crecer más que el límite impuesto por
      this.sprite.body.maxVelocity.setTo(this.speed, this.speed);
     */

    if (this.isDead()) {
	this.die()
    } else {

	this.isMelting = false;
	this.isAttacking = false;

	game.physics.arcade.overlap(this.sprite, this.sun.sprite,
				    function () {
					this.takeDamage();
				    }, null, this);

	if (this.cursor.attack.isDown)
	    this.attack(); // no puede cambiar su velocidad mientras ataca
	else {
	    if (this.cursor.down.isDown)
		this.sprite.body.velocity.y += this.strength;
	    if (this.cursor.up.isDown)
		this.sprite.body.velocity.y -= this.strength;
	    if (this.cursor.left.isDown)
		this.sprite.body.velocity.x -= this.strength;
	    if (this.cursor.right.isDown)
		this.sprite.body.velocity.x += this.strength;

	    if (!this.isMelting)
		this.sprite.animations.play('float');
	}
    }
}

Iceberg.prototype.takeDamage = function () {
    if (sun.isHarmfull()) {
	this.sprite.animations.play('getHurt');
	this.hp--;
	this.sprite.alpha = this.hp/this.totalHP;
	this.isMelting = true;
    }
};

Iceberg.prototype.isDead = function () {
    return this.sprite.alpha <= .1;
};

Iceberg.prototype.die = function () {
    if (!game.isOver)
	game.gameOver();

    this.sprite.alpha = 0;
    this.sprite.body.velocity.x = this.sprite.body.velocity.y = 0;
};
