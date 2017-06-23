var Score = function (game, level) {
    this.game = game;
    this.level = level;

    this.totalBones = this.level.bones.length + this.level.hiddenBones.length;
    this.eatenBones = 0;

    var style = { font: '20px Mono', fill: '#000', align: 'left' };
    this.scoreBoard = this.game.add.text( 5, 5, '', style );
    this.update();
    this.scoreBoard.stroke = '#fff';
    this.scoreBoard.strokeThickness = 1;
};

Score.prototype.update = function () {
    this.scoreBoard.setText('BONES: ' + this.eatenBones + "/" + this.totalBones);
    console.log('BONES: ' + this.eatenBones + "/" + this.totalBones);
    if (this.eatenBones == this.totalBones)
        nextLevel();
};
