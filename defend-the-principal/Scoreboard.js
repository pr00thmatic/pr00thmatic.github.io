var Scoreboard = function (studentSpawner) {
    var style = { font: '20px Sans', fill: '#855', align: 'center' },
    multipliers = [1],
    i;

    this.studentSpawner = studentSpawner;

    this.problemCounter = 0;
    this.time = 0;

    this.sprite = game.add.text(game.world.centerX, 24, '', style);
    this.sprite.anchor.set(0.5, 0)
};

Scoreboard.prototype.update = function () {
    var text = 'SCORE ';

    this.time = Math.round(this.studentSpawner.time / 100);
    this.time *= this.studentSpawner.currentLvl;

    this.sprite.text = text + ' ' + (this.time + this.problemCounter);
};

Scoreboard.prototype.problemSolved = function (problemTime) {
    this.problemCounter += Math.round(problemTime/100);
};
