var Office = function (level, type) {
    var swear;

    this.flipRate = 50;
    this.level = level;

    this.office = game.add.sprite(0,0,'office');
    this.officeMan = game.add.sprite(4,5,'oficinista');
    this.officeMan.scale.set( getViewDirection(this.officeMan) *
                              this.level.globalScale, this.level.globalScale );

    this.officeMan.animations.add('stand', [0], 1, true);
    this.officeMan.animations.play('stand');

    if (type == 'kardex') {
        swear = game.add.sprite(0,0, 'oficinista');
        swear.animations.add('attend', [2, 3], 2, true);
        swear.animations.play('attend');
        this.officeMan.addChild(swear);
        this.officeMan.animations.add('attend', [0,1], 3, true);

        this.flipRate *= 2;
    } else {
        this.officeMan.animations.add('attend', [0,1], 5, true);
    }

    this.officeMan.animations.play('attend');

    this.office.addChild(this.officeMan);
    this.office.kill();
};

Office.prototype.spawn = function (posX, posY) {
    this.office.reset(posX, posY);
};

var getViewDirection = function (sprite) {
    var scaleX = sprite.scale.x;
    return scaleX / Math.abs(scaleX);
};
