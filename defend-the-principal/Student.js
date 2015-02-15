var Student = function (level, offices, students) {
    var i,
    max,
    FEMALE = 1,
    MALE = 0,
    quantityBodyParts;

    this.level = level;
    this.offices = offices;
    this.students = students;

    // properties
    this.goUpstairs = false;
    this.speed = 40;
    this.stairCounter = 0;
    this.climbCooldown = 0;
    this.problem = 200;
    this.patience = 300;
    this.toleratedDistance = 30;

    // bodyParts...
    this.bodyPart = [];
    // 1: female, 0: male
    this.gender = Math.round(Math.random());
    quantityBodyParts = 4 + this.gender;

    for (i=0; i<quantityBodyParts; i++) {
        this.bodyPart[i] = game.add.sprite(0,0, 'student');
        this.bodyPart[i].anchor.set(.5, 0);
    }

    // setting up animations for each bodyPart
    this.setHead();
    this.setHair();
    this.setBody();
    if (this.gender == FEMALE) {
        this.setBoobs();
    }
    this.setLegs();

    // the main sprite of a student are his legs.
    // All the other sprites are legs children
    this.sprite = this.legs;
    this.sprite.anchor.set(.5,0);
    this.sprite.kill();
};

Student.prototype.setHead = function () {
    this.head = this.bodyPart[0];
    this.head.animations.add('stand', [0]);
};

Student.prototype.setHair = function () {
    this.hair = this.bodyPart[1];
    this.hair.animations.add('stand', [1+this.gender]);
}

Student.prototype.setLegs = function () {
    var i;

    this.legs = this.bodyPart[2];
    this.legs.animations.add('stand', [3]);
    this.legs.animations.add('walk', [4,3], 3, true);
    game.physics.arcade.enable(this.legs);

    for (i=0, max=this.bodyPart.length; i<max; i++) {
        this.bodyPart[i].animations.play('stand');

        if (this.bodyPart[i] != this.legs) {
            this.legs.addChild(this.bodyPart[i]);
        }

        this.bodyPart[i].bringToTop();
    }

};

Student.prototype.setBody = function () {
    this.body = this.bodyPart[3];
    this.body.animations.add('stand', [6]);
    this.body.animations.add('walk', [5,6,7,6], 3, true);
};

Student.prototype.setBoobs = function () {
    this.boobs = this.bodyPart[4];
    this.boobs.animations.add('stand', [8]);
};

Student.prototype.spawn = function (posX, posY) {
    this.sprite.reset(posX, posY);
    this.sprite.body.acceleration.y = 481;
    this.sprite.body.velocity.x = 50;
    this.sprite.alpha = 1;
};

Student.prototype.walk = function () {

    // movement
    this.sprite.body.velocity.x = this.speed;
    this.sprite.body.velocity.x *= SpriteGestor.xDirection(this.sprite);

    // walking legs and arms
    if (this.legs.animations.currentAnim.name != 'walk') {
        this.legs.animations.play('walk');
        this.body.animations.play('walk');
    }

    // bobbing head
    if (this.legs.animations.currentAnim.frame == 3) {
        this.moveHeadTo(0,1);
    } else {
        this.moveHeadTo(0,0);
    }

};

Student.prototype.moveHeadTo = function (posX, posY) {
    this.hair.x = this.head.x = posX;
    this.hair.y = this.head.y = posY;
};

Student.prototype.stand = function () {
    var i;

    this.sprite.body.velocity.x = 0;

    for (i=this.bodyPart.length-1; i>=0; i--) {
        this.bodyPart[i].animations.play('stand');
    }
};

Student.prototype.collisionsUpdate = function () {
    var building = this.level.building,
    i;

    game.physics.arcade.collide(this.sprite, building.floor);
    game.physics.arcade.collide(this.sprite, building.walls,
                                this.turnBack, null, this);
    for (i=this.offices.length-1; i>=0; i--) {
        game.physics.arcade.collide(this.sprite, this.offices[i].office,
                                    this.officeCollision, null, this);
    }

    if (this.hasStudentAtFront()) {
        this.patience--;
        this.stand();
    } else if (this.atCounter) {
        this.stand();
        this.getAttention();
    } else {
        this.walk();
    }

};

// this can be optimized
/*
 * has a student at front iif there is an student (on the same floor)
 * in front of him and this student is looking in the same direction
*/
Student.prototype.hasStudentAtFront = function () {
    var i,
    xDistance=0,
    yDistance=0,
    xDirection=SpriteGestor.xDirection(this.sprite);

    for (i = this.students.length-1; i >= 0; i--) {
        yDistance = this.students[i].sprite.y - this.sprite.y;

        if (this.students[i] != this && yDistance === 0 &&
            SpriteGestor.xDirection(this.students[i].sprite) == xDirection) {

            xDistance = this.students[i].sprite.x - this.sprite.x;
            xDistance *= SpriteGestor.xDirection(this.sprite);
            if (xDistance <= this.toleratedDistance && xDistance >= 0) {
                return true;
            }

        }

    }

    return false;
};


Student.prototype.turnBack = function (student, wall) {
    SpriteGestor.flipX(this.sprite);
    this.goUpstairs = true;
    this.stairCounter = 0;
};

Student.prototype.climbStair = function (student, stair) {
    this.climbCooldown--;

    if (this.climbCooldown <= 0 &&
        (this.sprite.body.blocked.left || this.sprite.body.blocked.right)) {
        this.stairCounter++;
        this.sprite.position.y -= 20;
        this.climbCooldown = 20;
    }

};

Student.prototype.goAway = function () {
    this.sprite.alpha -= .05;

    if (this.sprite.alpha <= 0) {
        this.sprite.kill();
    }
};


Student.prototype.officeCollision = function (student, office) {
    this.atCounter = true;
    office.giveAttention(this);
};

Student.prototype.getAttention = function () {
    this.problem--;

    if (this.problem <= 0) {
        this.goAway();
        this.atCounter = false;
    }
};



Student.prototype.update = function () {
    if (this.sprite.alive) {
        if (this.problem <= 0) {
            this.goAway();
        } else {
            var building = this.level.building;
            this.collisionsUpdate();
            SpriteGestor.coherentlyScale(this.sprite);


            if (this.goUpstairs) {
                game.physics.arcade.collide(this.sprite, building.stairs,
                                            this.climbStair, null, this);
                if (this.stairCounter == 6) {
                    this.goUpstairs = false;
                    this.climbCooldown = 0;
                }
            }
        }
    }
};
