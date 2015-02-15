var Office = function (level, type) {
    this.flipCooldown = 50;
    this.flipCounter = 0;
    this.level = level;

    this.office = game.add.sprite(0,0,'office');
    this.officeMan = game.add.sprite(20,5,'oficinista');
    this.officeMan.anchor.set(.5, 0);
    SpriteGestor.coherentlyScale(this.officeMan);

    this.officeMan.animations.add('stand', [0], 1, true);
    this.officeMan.animations.play('stand');

    if (type == 'kardex') {
        this.swear = game.add.sprite(0,0, 'oficinista');
        this.swear.animations.add('attend', [2, 3], 2, true);
        this.swear.animations.play('attend');
        this.swear.anchor.set(.5, 0);
        this.officeMan.addChild(this.swear);
        this.officeMan.animations.add('attend', [0,1], 3, true);

        this.flipCooldown *= 2;
    } else {
        this.officeMan.animations.add('attend', [0,1], 5, true);
    }

    this.officeMan.animations.play('attend');

    this.office.addChild(this.officeMan);
    game.physics.arcade.enable(this.office);
    this.office.body.immovable = true;
    this.office.kill();
};

Office.prototype.spawn = function (posX, posY) {
    this.office.reset(posX, posY);
};

Office.prototype.updateFlip = function () {
    this.flipCounter--;

    if (this.flipCounter <= 0) {
        this.flipCounter = this.flipCooldown;
        SpriteGestor.flipX(this.officeMan);
    }
};


Office.prototype.update = function () {
    this.updateFlip();
};
