var Answers = (() => {
  var config = {
    marginY : 300,
    spaceHeight : 260,
    indicatorPosX : 330,
    correctColor: 0x43960e,
    incorrectColor: 0xe55c00
  };
  var instance = {
    options: []
  }

  var load = function (statements, correctIndex) {
    Answers.destroy();
    var offset = config.spaceHeight / statements.length;
    for (let i=0; i<statements.length; i++) {
      let answer = {
        isCorrect: i == correctIndex
      };
      instance.options.push(answer);
      answer.holder = scene.add.tileSprite(0,0, 250, offset * 0.8, 'grid sheet').setOrigin(0.5, 0).setInteractive();
      // answer.holder.rotation = utils.randomIntBetween(0,5) * utils.deg2Rad;
      answer.statement = Label.gimmieLabel(answer.holder, statements[i], {
        color: '#000000',
        font: 'bold 15px Helvetica',
        wordWrap: {
          width: 220
        },
        align: 'center',
      });

      answer.destroy = () => {
        if (answer.holder) answer.holder.destroy();
        if (answer.indicator) answer.indicator.destroy();
        if (answer.statement) answer.statement.destroy();
        gameStatus.emitter.off('question answered', answer.onQuestionAnswered);
      };

      answer.rebeal = () => {
        answer.holder.setTint(answer.isCorrect? config.correctColor: config.incorrectColor);
        answer.statement.setFill('#ffffff');

        answer.indicator = scene.add.sprite(config.indicatorPosX, answer.holder.getCenter().y, answer.isCorrect? 'right': 'wrong');
        answer.indicator.rotation = utils.randomIntBetween(-7, 7) * utils.deg2Rad;
      };

      answer.onPointerdown = ((answer) => {return () => {
        answer.rebeal();
        gameStatus.emitter.emit('question answered', answer.isCorrect);
      };})(answer);

      answer.onQuestionAnswered = ((answer) => { return (wasCorrect) => {
        if (!wasCorrect && answer.isCorrect) {
          setTimeout(((answer) => { return () => { answer.rebeal() }; })(answer), 500);
        }
        answer.holder.off('pointerdown', answer.onPointerdown);
      }; })(answer)

      answer.holder.on('pointerdown', answer.onPointerdown);
      gameStatus.emitter.on('question answered', answer.onQuestionAnswered);
    }
    // rearrange
    utils.shuffle(instance.options);
    for (let i=0; i<statements.length; i++) {
      instance.options[i].holder.setPosition(mainState.width/2, config.marginY + offset * i);
    }
  };

  var destroy = () => {
    for (let i=0; i<instance.options.length; i++) instance.options[i].destroy();
    instance.options = [];
  }

  return {
    config,
    instance,
    load,
    destroy
  };
})();
