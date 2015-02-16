var Student = function (level, offices, students) {
    var i,
    max,
    FEMALE = 1,
    MALE = 0,
    quantityBodyParts;

    this.color = Math.round(Math.random() * (this.colors.length - 0) + 0);
    this.color = this.colors[this.color];

    this.level = level;
    this.offices = offices;
    this.students = students;

    // properties
    this.enraged = false;
    this.goUpstairs = false;
    this.speed = 100;
    this.stairCounter = 0;
    this.climbCooldown = 0;
    this.problem = Math.round(Math.random() * (150 - 300) + 300);;
    this.enragedToleratedDistance = 50;
    this.toleratedDistance = Math.round(Math.random() * (30 - 23) + 23);;
    /*
     * when a student started to walk inmediatly after the student in
     * front started to walk, the student behind would stop on little
     * intervals, causing it's patience to lower, even though he wasn't
     * queueing. A little waitDelay before continue walking when he
     * realises there is any student in front of him, almost fixed this ;)
     * in the patience controller, i have to verify if the student in front
     * is moving.
     * also it is visualy cool XD
     */
    this.waitDelay = 0;

    // bodyParts...
    this.bodyPart = [];
    // 1: female, 0: male
    this.gender = Math.round(Math.random());
    quantityBodyParts = 5 + this.gender;

    for (i=0; i<quantityBodyParts; i++) {
        this.bodyPart[i] = game.add.sprite(0,0, 'student');
        this.bodyPart[i].anchor.set(.5, 0);
    }

    // setting up animations for each bodyPart
    this.setHands();
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
    this.hands.bringToTop();
    this.sprite.kill();
};

// singleton, i guess...
Student.prototype.colors = [0xcc3333, 0x33cc33, 0x3333cc,
                            0x883333, 0x338833, 0x333388,
                            0x33bbbb, 0xbb33bb, 0xbbbb33,
                            0x338888, 0x883388, 0x888833,
                            0x888888, 0xcccccc];

Student.prototype.setHead = function () {
    this.head = this.bodyPart[0];
    this.head.animations.add('stand', [0]);
};

Student.prototype.setHair = function () {
    this.hair = this.bodyPart[1];
    this.hair.animations.add('stand', [1+this.gender]);
    this.hair.tint = this.color;
}

Student.prototype.setLegs = function () {
    var i;

    this.legs = this.bodyPart[2];
    this.legs.animations.add('stand', [3]);
    this.legs.animations.add('walk', [4,3],
                             Math.round(Math.random() * (4 - 3) + 3), true);
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
    this.body.tint = this.color;
    this.body.animations.add('stand', [8]);
};

Student.prototype.setHands = function () {
    this.hands = this.bodyPart[4];
    this.hands.animations.add('walk', [5,6,7,6], Math.round(Math.random() * (4 - 3) + 3), true);
    this.hands.animations.add('stand', [6], 1, true);
};

Student.prototype.setBoobs = function () {
    this.boobs = this.bodyPart[5];
    this.boobs.animations.add('stand', [9]);
    this.boobs.tint = this.color;
};

Student.prototype.spawn = function (posX, posY) {
    this.sprite.reset(posX, posY);
    this.sprite.body.acceleration.y = 481;
    this.sprite.body.velocity.x = 50;
    this.sprite.alpha = 1;
    this.resetPatience();
};

Student.prototype.walk = function () {

    // movement
    this.sprite.body.velocity.x = this.speed;
    this.sprite.body.velocity.x *= SpriteGestor.xDirection(this.sprite);

    // walking legs and arms
    if (this.legs.animations.currentAnim.name != 'walk') {
        this.legs.animations.play('walk');
        this.hands.animations.play('walk');
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

Student.prototype.isCloseToOffice = function () {
    var i, atCounter;

    for (i=this.offices.length-1; i>=0; i--) {
        if (Math.abs(this.sprite.x - this.offices[i].office.x) <= 100 &&
            Math.abs(this.sprite.y - this.offices[i].office.y) <= 30) {
            atCounter = true;
            break;
        }
    }

    return atCounter;
};

Student.prototype.rage = function () {
    if (this.studentInFront || this.isCloseToOffice()) {
        this.walk();
    } else {
        this.calmDown();
    }

};

Student.prototype.calmDown = function () {
    this.enraged = false;
    this.head.tint = 0xffffff;
};

Student.prototype.collisionsUpdate = function () {
    var building = this.level.building,
    atCounter = false,
    i;

    this.studentInFront = this.findStudentAtFront();

    game.physics.arcade.collide(this.sprite, building.floor);
    game.physics.arcade.collide(this.sprite, building.walls,
                                this.turnBack, null, this);

    if (this.enraged === true) {
        this.rage();
    } else {
        // checking collision with offices
        for (i=this.offices.length-1; i>=0; i--) {
            game.physics.arcade.collide(this.sprite, this.offices[i].office,
                                        this.officeCollision, null, this);
        }

        // walk, get attention or queue up?
        if (this.studentInFront) {
            if (this.studentInFront.sprite.body.velocity.x == 0) {
                this.patience--;
            }
            this.stand();
            this.waitDelay = Math.round(Math.random() * (60 - 40) + 40);
        } else if (this.atCounter && this.office.alive) {
            this.stand();
            this.getAttention();
        } else if (this.waitDelay == 0) {
            this.walk();
        } else {
            this.waitDelay--;
            this.stand();
        }
    }

};

Student.prototype.getToleratedDistance = function () {
    if (!this.enraged) {
        return this.toleratedDistance;
    } else {
        return this.enragedToleratedDistance;
    }
};

// this can be optimized
/*
 * has a student at front iif there is an "alive" student (on the same floor)
 * in front of him, this student is looking in the same direction and
 * this student is not enraged
*/
Student.prototype.findStudentAtFront = function () {
    var i,
    xDistance=0,
    yDistance=0,
    xDirection=SpriteGestor.xDirection(this.sprite);


    for (i = this.students.length-1; i >= 0; i--) {
        yDistance = Math.abs(this.students[i].sprite.y - this.sprite.y);
        xDistance = this.students[i].sprite.x - this.sprite.x;
        xDistance *= SpriteGestor.xDirection(this.sprite);


        // is this a possible obstacle?
        if (this.students[i] != this && yDistance <= 20 &&
            this.students[i].sprite.alpha == 1 &&
            SpriteGestor.xDirection(this.students[i].sprite) == xDirection &&
            !this.students[i].enraged) {

            // otherwise, students would get stuck
            if (xDistance == 0) {
                this.students[i].sprite.x += 5 *
                    Math.pow(-1, Math.round(Math.random())); // random [0,1]
            }

            if (xDistance <= this.getToleratedDistance() && xDistance > 0) {
                return this.students[i];
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
    this.office = office;
};

Student.prototype.getAttention = function () {
    this.problem--;

    if (this.problem <= 0) {
        this.goAway();
        this.atCounter = false;
    }
};

Student.prototype.resetPatience = function () {
    this.patience = Math.round(Math.random() * (600 - 50) + 50);
};

Student.prototype.enrage = function () {
    this.head.tint = 0xff7777;
    this.resetPatience();
    this.enraged = true;
};

Student.prototype.update = function () {
    if (this.patience === 0) {
        this.enrage();
    }
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
