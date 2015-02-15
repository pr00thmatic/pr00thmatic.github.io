var Office = function (level, type) {
    var dad = this;
    this.flipCooldown = 25;
    this.flipCounter = 0;
    this.level = level;

    this.office = game.add.sprite(0,0,'office');

    this.office.giveAttention = function (student) {
        dad.giveAttention(student);
    };

    this.officeMan = game.add.sprite(20,5,'oficinista');
    this.officeMan.anchor.set(.5, 0);
    SpriteGestor.coherentlyScale(this.officeMan);

    this.officeMan.animations.add('stand', [0,1], 2, true);
    this.officeMan.animations.play('stand');

    if (type == 'kardex') {
        this.swear = game.add.sprite(0,0, 'oficinista');
        this.swear.animations.add('attend', [2, 3], 2, true);
        this.swear.animations.play('attend');
        this.swear.anchor.set(.5, 0);
        this.officeMan.addChild(this.swear);
        this.officeMan.animations.add('attend', [0,1], 8, true);

        this.flipCooldown *= 2;
    } else {
        this.officeMan.animations.add('attend', [0,1], 10, true);
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

Office.prototype.giveAttention = function (student) {
    this.student = student;
    this.officeMan.animations.play('attend');

    if (this.swear) {
        this.swear.reset(0,0);
        this.swear.animations.play('attend');
    }
};


Office.prototype.update = function () {
    if (this.student && this.student.atCounter) {
        this.updateFlip();
    } else {
        console.log('ding');
        this.officeMan.animations.play('stand');
        if (this.swear){
            this.swear.kill();
        }
    }
};
