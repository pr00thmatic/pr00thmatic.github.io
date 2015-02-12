var bodyPartsIndex = {
    HEAD: 0,
    HAIR: 1,
    LEGS: 2,
    BODY: 3,
    BOOBS: 4
};

var Student = function (level) {
    var i,
    bpi = bodyPartsIndex,
    max;

    this.level = level;

    // TODO: fix this mess!!
    this.bodyPart = [];
    // 1: female, 0: male
    this.gender = Math.round(Math.random());
    this.quantityBodyParts = 4 + this.gender;

    for (i=0; i<this.quantityBodyParts; i++) {
        this.bodyPart[i] = game.add.sprite(0,0, 'student');
    }

    // head
    this.bodyPart[bpi.HEAD].animations.add('stand', [0]);

    // hair
    this.bodyPart[bpi.HAIR].animations.add('stand', [1+this.gender]);

    // legs
    this.bodyPart[bpi.LEGS].animations.add('stand', [3]);
    this.bodyPart[bpi.LEGS].animations.add('walk', [3,4], 3,  true);

    // body
    this.bodyPart[bpi.BODY].animations.add('stand', [6]);
    this.bodyPart[bpi.BODY].animations.add('walk', [5,6,7,6], 3, true);

    // boobs XD
    if (this.bodyPart[bpi.BOOBS]) { // if has boobs XD
        this.bodyPart[bpi.BOOBS].animations.add('stand', [8]);
    }

    for (i=0, max=this.quantityBodyParts; i<max; i++) {
        this.bodyPart[i].animations.play('stand');

        if (i != bpi.LEGS) {
            this.bodyPart[bpi.LEGS].addChild(this.bodyPart[i]);
        }

        this.bodyPart[i].bringToTop();
    }

    this.sprite = this.bodyPart[bpi.LEGS];
    this.sprite.kill();

};

Student.prototype.spawn = function (posX, posY) {
    this.sprite.reset(posX, posY);
};

Student.prototype.walk = function () {

    if (this.sprite.animations.currentAnim.name != 'walk') {
        this.sprite.animations.play('walk');
        this.bodyPart[bodyPartsIndex.BODY].animations.play('walk');
    }

    if (this.sprite.animations.currentAnim.frame == 3) {
        this.moveHeadTo(0,1);
    } else {
        this.moveHeadTo(0,0);
    }

};

Student.prototype.moveHeadTo = function (posX, posY) {
    var head = this.bodyPart[bodyPartsIndex.HEAD];
    var hair = this.bodyPart[bodyPartsIndex.HAIR];

    hair.x = head.x = posX;
    hair.y = head.y = posY;
};


Student.prototype.update = function () {
    this.sprite.scale.set(this.level.globalScale, this.level.globalScale);
    this.walk();
};
