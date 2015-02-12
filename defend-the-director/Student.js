var bodyPartsIndex = {
    HEAD: 0,
    HAIR: 1,
    LEGS: 2,
    BODY: 3,
    BOOBS: 4
};

var Student = function () {
    var i,
    bpi = bodyPartsIndex,
    max;

    // TODO: fix this mess!!
    this.bodyPart = [];
    // 0: female, 1: male
    this.gender = Math.floor(Math.random());
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
    this.bodyPart[bpi.LEGS].animations.add('walk', [3,4]);

    // body
    this.bodyPart[bpi.BODY].animations.add('stand', [6]);
    this.bodyPart[bpi.BODY].animations.add('walk', [5,6,7,6], 3, true);

    // boobs XD
    if (this.bodyPart[bpi.BOOBS]) { // if has boobs XD
        this.bodyPart[bpi.BOOBS].animations.add('boobs', [8]);
    }

    for (i=0, max=this.quantityBodyParts; i<max; i++) {
        this.bodyPart[i].animations.play('stand');
        console.log(this.bodyPart[i]);

        if (i != bpi.LEGS) {
            this.bodyPart[bpi.LEGS].addChild(this.bodyPart[i]);
        }

        this.bodyPart[i].bringToTop();
    }

    this.sprite = this.bodyPart[bpi.LEGS];
    this.sprite.kill();
};

Student.prototype.spawn = function (posX, posY) {
    this.sprite.spawn(posX, posY);
};
