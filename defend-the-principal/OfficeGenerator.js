var OfficeGenerator = function (offices) {
    this.demo = game.add.sprite(0,0, 'office');
    this.demo.anchor.set(.5,.5);
    this.demo.alpha = .5;
    this.demo.tint = 0x888888;
    this.offices = offices;
    this.spawnCooldown = 0;
    this.totalSpawnCooldown = 500;
};

OfficeGenerator.prototype.update = function () {
    var x = game.input.x,
    y = game.input.y,
    xMin = 13*16,
    xMax = 34*16;

    if (this.spawnCooldown == 0) {
        if (x > xMin && x < xMax) {
            x = Math.round(x/16)*16;
            y = Math.round(y/(6*16)) * (6*16) - 16;

            this.demo.reset(x, y);
        } else {
            this.demo.kill();
        }
    } else {
        this.spawnCooldown--;
    }
};
