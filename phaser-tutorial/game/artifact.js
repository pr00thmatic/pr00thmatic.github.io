var arctifact = function (astronaut) {
    var sprite = game.add.sprite(0,0, 'arctifact');
    sprite.astronaut = astronaut;

    sprite.update = function () {
        collide(this, sprite.astronaut, this.beFound, null, this);
    };

    sprite.beFound = function () {
        this.kill();
    };

    return sprite;
};
