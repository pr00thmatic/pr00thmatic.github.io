var Arrow = function (game, cursor, dog, target) {
    this.game = game;
    this.cursor = cursor;
    this.dog = dog;
    this.target = target;

    this.sprite = this.game.add.sprite(0,0, 'arrow');
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.anchor.set(0.5,0.5);
    this.sprite.animations.add('exist', [0,1,2,3], 4, true);
    this.sprite.animations.play('exist');
    this.sprite.kill();
};

Arrow.prototype.updatePosition = function () {
    var scale = .8*this.dog.sprite.scale.x;
    var x = this.dog.sprite.position.x - this.dog.sprite.width*scale - 10;
    var y = this.dog.sprite.position.y - this.dog.sprite.height*.95;

    if (this.sprite.alive) {
        this.sprite.body.x = x;
        this.sprite.body.y = y;
    } else {
        this.sprite.reset(x,y);
    }

};

Arrow.prototype.updateAngle = function () {
    var rads = this.game.physics.arcade.angleBetween(this.sprite, this.target);
    var angle = 360 * (rads / (2 * Math.PI));
    this.sprite.angle = angle;
};

Arrow.prototype.update = function () {
    if (this.dog.isSniffing() && this.target.alive) {
        this.updatePosition();
        this.updateAngle();
    } else if (this.sprite.alive) {
        this.sprite.kill();
    }
};
