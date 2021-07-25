var UI = {
  isOver: false,
  frogCounterLabel: null,

  updateScore: function () {
    UI.frogCounterLabel.setText(' x ' + (gameStatus.rescuedFroggies));
  },

  normalizedPos : function (x, y) { return { x: config.width * x, y: config.height * y }; },

  onOver : function () {
    UI.isOver = true;
    this.originalColor = this.style.backgroundColor;
    this.style.backgroundColor = '#999';
    this.setStyle(this.style);
  },

  onExit : function () {
    UI.isOver = false;
    this.style.backgroundColor = this.originalColor;
    this.setStyle(this.style);
  },

  onAgain : function () { game.scene.start('froggerGame'); },
  onRanking : function () { window.open('ranking'); }, // TODO!

  create : function () {
    UI.frogCounterLabel = scene.add.text(192, 64, ' x 1',
                                         { fontFamily: 'Passion One', fontSize: '64px' } )
      .setOrigin(0, 0)
      .setDepth(gameSettings.uiDepth);
    setTimeout(() => UI.frogCounterLabel.setStyle(UI.style), 100);
    gameStatus.emitter.on('score change', UI.updateScore, UI);
  },

  createGameOver : function () {
    UI.createLabel('game over label', 'GAME OVER', 6);
    UI.createLabel('score', "Puntuación: " + gameStatus.rescuedFroggies, 8);
    UI.createLabel('your ranking', '888vo lugar', 10, '48px');
    UI.createLabel('1st place', '1er lugar: AVA', 23, '48px');
    UI.createGameOverButton('again', 'Jugar de \nnuevo', 13, -32, UI.onOver, UI.onExit, UI.onAgain);
    UI.createGameOverButton('ranking', 'Ver \nranking', 13, +32, UI.onOver, UI.onExit, UI.onRanking);
  },

  createGameOverButton : function (name, content, yTile, xOffset,
                                   over, exit, click) {
    UI[name] = scene.add.text(scene.cameras.main.centerX + xOffset, gameSettings.tileSize * yTile,
                              content, { fontFamily: 'Passion One', fontSize: '48px', color: '#000',
                                         align: 'center', backgroundColor: '#fff', })
      .setOrigin(xOffset == 0? 0.5: (Math.sign(xOffset) < 0? 1: 0) , 0)
      .setDepth(gameSettings.uiDepth)
      .setPadding(64, 16, 64, 16)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', over)
      .on('pointerout', exit)
      .on('pointerdown', click);
  },

  createLabel : function (name, content, yTile, fontSize = '96px') {
    UI[name] = scene.add.text(scene.cameras.main.centerX, yTile * gameSettings.tileSize, content,
                              { fontFamily: 'Passion One', fontSize: fontSize })
      .setOrigin(0.5, 0)
      .setDepth(gameSettings.uiDepth);
  }
}
