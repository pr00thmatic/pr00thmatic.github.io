var UI = {
  isOver: false,
  frogCounterLabel: null,

  updateScore: function () {
    UI.frogCounterLabel.setText(' x ' + (gameStatus.score));
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

  onAgain : function () { game.scene.start('flappyPills'); },
  onRanking : function () { window.open('ranking'); }, // TODO!

  destroyIndication : function () {
    UI.indication.destroy();
  },

  create : function () {
    UI.frogCounterLabel = context.add.text(192, 64, ' x 0',
                                           { fontFamily: 'Passion One', fontSize: '64px' } )
      .setOrigin(0, 0)
      .setDepth(gameSettings.uiDepth - 10)
      .setScrollFactor(0);
    setTimeout(() => UI.frogCounterLabel.setStyle(UI.style), 1000);
    gameStatus.emitter.on('score change', UI.updateScore, UI);

    UI.indication = context.add.text(config.width/2, 400, '¡Toca para comenzar!',
                                   { fontFamily: 'Passion One', fontSize: '64px', color: '#fff', align: 'center' } )
      .setOrigin(0.5,1)
      .setDepth(gameSettings.uiDepth-6);
    setTimeout(() => UI.indication.setStyle(UI.indication.style), 500);
    context.input.on('pointerdown', this.destroyIndication, UI);
  },

  createGameOver : function () {
    if (gameStatus.gameOver) return;
    this.asfadsfasd = context.add.image(config.width / 2, config.height / 2, 'game over')
      .setDepth(gameSettings.uiDepth-1)
      .setScrollFactor(0);
    UI.createLabel('game over label', '¡Sigue intentando!', 620, '#f68b1f');
    UI.createLabel('score', "x " + gameStatus.score, 386);
    UI.createLabel('your ranking', 'Tu puntaje máximo\n' + backend.getPuntajeMaximo(), 1246, null, '48px');
    UI.createGameOverButton('again', 'Jugar de \nNuevo', 790, 0, UI.onOver, UI.onExit, UI.onAgain);
    UI.createGameOverButton('ranking', 'Ver \nRanking', 1000, 0, UI.onOver, UI.onExit, UI.onRanking);
  },

  createGameOverButton : function (name, content, y, xOffset,
                                   over, exit, click) {
    UI[name] = context.add.text(context.cameras.main.centerX + xOffset, y,
                                content, { fontFamily: 'Passion One', fontSize: '64px', color: '#fff',
                                           align: 'center', backgroundColor: '#602a7e', })
      .setOrigin(xOffset == 0? 0.5: (Math.sign(xOffset) < 0? 1: 0) , 0.5)
      .setDepth(gameSettings.uiDepth)
      .setPadding(64, 16, 64, 16)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', over)
      .on('pointerout', exit)
      .on('pointerdown', click)
      .setScrollFactor(0);
  },

  createLabel : function (name, content, y, color = '#602a7e', fontSize = '96px') {
    if (color === null) color = '#602a7e';
    UI[name] = context.add.text(context.cameras.main.centerX, y, content,
                                { fontFamily: 'Passion One', fontSize: fontSize, color: color, align: 'center' })
      .setOrigin(0.5, 1)
      .setDepth(gameSettings.uiDepth)
      .setScrollFactor(0);
  },
}
