var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
domGame.init(game.width, game.height);

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
    var x = game.input.mousePointer.x,
    y = game.input.mousePointer.y,
    xMin = 13*16,
    xMax = 34*16;

    x = Math.round(x/16)*16;
    y = Math.round(y/(6*16)) * (6*16) - 16;
    this.demo.reset(x, y);

    this.demo.tint = 0xFF0000;
    if (this.spawnCooldown <= 0) {
        console.log('ready');
        if (x > xMin && x < xMax && this.emptySpot()) {
            this.demo.tint = 0x00FF00;
        }
    } else {
        this.spawnCooldown--;
    }
};

OfficeGenerator.prototype.emptySpot = function () {
    var i, dX, dY;

    for (i=this.offices.length-1; i>=0; i--) {
        if (this.offices[i].office.alive) {
            dX = Math.abs(this.offices[i].office.x - this.demo.x + 20);
            dY = Math.abs(this.offices[i].office.y - this.demo.y);

            if (dX <= 60 && dY <= 40) {
                return false;
            }
        }
    }

    return true;
};

OfficeGenerator.prototype.spawn = function () {
    var office,
    x = game.input.mousePointer.x,
    y = game.input.mousePointer.y;

    x = Math.round(x/16)*16;
    y = Math.round(y/(6*16)) * (6*16) - 16;

    if (this.spawnCooldown <= 0 && this.demo.tint == 0x00FF00) {
        // this.emptySpot()) {
        this.spawnCooldown = this.totalSpawnCooldown;
        office = new Office(this.level, 'kardex');
        x -= this.demo.width * this.demo.anchor.x;
        y -= this.demo.height * this.demo.anchor.y;
        // x = this.demo.x - this.demo.width * this.demo.anchor.x;
        // y = this.demo.y - this.demo.height * this.demo.anchor.y;
        office.spawn(x, y);
        this.offices.push(office);
    }
};
