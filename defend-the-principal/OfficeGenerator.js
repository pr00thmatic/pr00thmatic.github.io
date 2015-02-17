var OfficeGenerator = function (offices, level) {
    this.level = level;
    this.offices = offices;

    this.demo = game.add.sprite(0,0, 'office');
    this.demo.anchor.set(.5,.5);
    this.demo.alpha = .5;
    this.demo.tint = 0x888888;

    this.spawnCooldown = 0;
    this.totalSpawnCooldown = 500;

    game.input.onDown.add(this.spawn, this);
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

OfficeGenerator.prototype.emptySpot = function () {
    var i, dX, dY;

    for (i=this.offices.length-1; i>=0; i--) {
        dX = Math.abs(this.offices[i].office.x - this.demo.x);
        dY = Math.abs(this.offices[i].office.y - this.demo.y);

        console.log(dX, dY);
        if (dX <= 80 && dY <= 40) {
            return false;
        }
    }

    return true;
};

OfficeGenerator.prototype.spawn = function () {
    var office,
    x,
    y;

    console.log('ding');
    if (this.spawnCooldown == 0 && this.emptySpot()) {
        this.spawnCooldown = this.totalSpawnCooldown;
        office = new Office(this.level, 'kardex');
        x = this.demo.x - this.demo.width * this.demo.anchor.x;
        y = this.demo.y - this.demo.height * this.demo.anchor.y;
        office.spawn(x, y);
        this.offices.push(office);
    }
};
