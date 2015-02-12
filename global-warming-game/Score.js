var Score = function () {
    this.points = 0;
    var style = { font: "30px Mono", fill: "#4444aa", align: "center" };
    this.scoreBoard = game.add.text(game.world.centerX, 10, 'SCORE\n0', style);
    this.scoreBoard.stroke = '#fff';
    this.scoreBoard.strokeThickness = 2;
    this.scoreBoard.anchor.set(0.5,0);
};

Score.prototype.scoreUp = function (points) {
    this.points += points;
    this.scoreBoard.setText('SCORE\n' + this.points);
};
