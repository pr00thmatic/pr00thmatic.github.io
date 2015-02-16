var Office = function (level, type) {
    var dad = this,
    i;
    this.level = level;

    // properties
    this.flipCooldown = 30;
    this.flipCounter = 0;
    this.hp = this.totalHp = 300;
    this.totalLives = 3;
    this.lives = [];

    // setting up sprites
    this.office = game.add.sprite(0,0,'office');

    for (i=0; i<this.totalLives; i++) {
        this.lives[i] = game.add.sprite(41, 22*i, 'life');
        this.lives[i].animations.add('beat', [0,1], 3, true);
        this.lives[i].animations.play('beat');
        SpriteGestor.coherentlyScale(this.lives[i]);
        this.office.addChild(this.lives[i]);
    }

    this.officeMan = game.add.sprite(20,5,'oficinista');
    this.officeMan.anchor.set(.5, 0);
    this.officeMan.animations.add('stand', [0,1], 2, true);
    SpriteGestor.coherentlyScale(this.officeMan);

    /*
     * if the type of the office is 'kardex', then the
     * officeman will be mean at the students.
     */
    if (type == 'kardex') {
        this.swear = game.add.sprite(0,0, 'oficinista');
        this.swear.animations.add('attend', [2, 3], 2, true);
        this.swear.anchor.set(.5, 0);
        this.officeMan.addChild(this.swear);
        this.officeMan.animations.add('attend', [0,1], 8, true);

        // it will even appear to be working slowlier
        this.flipCooldown *= 2;
    } else {
        this.officeMan.animations.add('attend', [0,1], 10, true);
    }

    this.office.addChild(this.officeMan);

    // giving it physical properties
    game.physics.arcade.enable(this.office);
    this.office.body.immovable = true;
    this.office.kill();

    // game.physics.arcade.collide(student's sprite, office's sprite, f)
    // sends only the sprites to the function f. But I need the object
    // office on that function, so I had to make a work arround
    this.office.giveAttention = function (student) {
        dad.giveAttention(student);
    };

};

Office.prototype.spawn = function (posX, posY) {
    var i;
    for (i = this.lives.length-1; i >= 0; i--) {
        this.lives[i].reset(41, 22*i);
    }
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

Office.prototype.setHp = function (hp) {
    this.totalHp = this.hp = hp;
};

Office.prototype.update = function () {

    if (this.office.alive) {
        if (this.hp == 0) {
            this.office.kill();
        }

        if (this.hp % (this.totalHp/this.totalLives) == 0 &&
            this.hp != this.totalHp) {

            this.lives[this.totalLives * (this.hp/this.totalHp)].kill();
        }

        if (this.student && this.student.atCounter) {
            this.updateFlip();
            this.hp--;
        } else {
            this.officeMan.animations.play('stand');
            if (this.swear){
                this.swear.kill();
            }
        }
    }

};
