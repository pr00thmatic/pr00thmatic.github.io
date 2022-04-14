var Answers = (() => {
  var config = {
    marginX : 40,
    marginY : 230,
    spaceHeight : 320,
    indicatorPosX : 20,
    correctColor: 0x43960e,
    incorrectColor: 0xe55c00
  };
  var instance = {
    options: []
  }

  var load = function (statements, correctIndex) {
    Answers.destroy();
    var offset = config.spaceHeight / statements.length;
    // var offset = 20;
    // let height = (config.spaceHeight - offset * statements.length) / statements.length;
    for (let i=0; i<statements.length; i++) {
      let answer = {
        isCorrect: correctIndex.length === undefined? i == correctIndex: correctIndex.indexOf(i) !== -1
      };
      instance.options.push(answer);
      answer.holder = scene.add.nineslice(0, 0, 260, offset * 0.93, 'info-box-fill', 10).
        setOrigin(0, 0).setInteractive();
      answer.statement = Label.gimmieLabel(answer.holder, statements[i], {
        color: '#000000',
        font: 'bold 14px Montserrat',
        wordWrap: {
          width: 220
        },
        align: 'left',
      });

      answer.destroy = () => {
        if (answer.holder) answer.holder.destroy();
        if (answer.indicator) answer.indicator.destroy();
        if (answer.statement) answer.statement.destroy();
        gameStatus.emitter.off('question answered', answer.onQuestionAnswered);
      };

      answer.rebeal = () => {
        answer.holder.setTint(answer.isCorrect? colors.global.right: colors.global.wrong);
        answer.statement.setFill('#ffffff');

        answer.indicator = scene.add.sprite(mainState.width - config.indicatorPosX, answer.holder.getCenter().y, answer.isCorrect? 'ok': 'oknt').
          setOrigin(1,0.5);
      };

      answer.onPointerdown = ((answer) => {return () => {
        answer.rebeal();
        gameStatus.emitter.emit('question answered', answer.isCorrect);
      };})(answer);

      answer.onQuestionAnswered = ((answer) => { return (wasCorrect) => {
        if (!wasCorrect && answer.isCorrect) {
          setTimeout(((answer) => { return () => { answer.rebeal() }; })(answer), 500);
        }
        if (gameStatus.missingAnswers <= 0) {
          answer.holder.off('pointerdown', answer.onPointerdown);
        }
      }; })(answer)

      answer.holder.on('pointerdown', answer.onPointerdown);
      gameStatus.emitter.on('question answered', answer.onQuestionAnswered);
    }
    // rearrange
    utils.shuffle(instance.options);
    for (let i=0; i<statements.length; i++) { // noise
      instance.options[i].holder.setPosition(config.marginX, config.marginY + offset * i);
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
