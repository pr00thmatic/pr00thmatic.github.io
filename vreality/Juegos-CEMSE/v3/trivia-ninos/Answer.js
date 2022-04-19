let Answer = (() => {
  return {
    gimmieAnswer : function (img) {
      if (gameStatus.gameOver) return;

      if (Answer.instance) {
        Answer.instance.image.destroy();
        Answer.instance.ok.destroy(); Answer.instance.oknt.destroy();
        Answer.instance.result.destroy();
      }

      let size = Math.min(mainState.width, mainState.height) - 15;
      let image = scene.add.image(mainState.width/2, 310, img).
          setOrigin(0.5, 0);

      let h = image.height; let w = image.width;
      image.setDisplaySize(size * (h > w? w/h: 1) , size * (h < w? h/w: 1));

      let y = mainState.height - 10

      let correctAnswer = data[gameStatus.currentQuestion].correctAnswer;
      let isRightAnswer = correctAnswer.length === undefined?
          gameStatus.currentAnswer === correctAnswer:
          correctAnswer.indexOf(gameStatus.currentAnswer) >= 0;
      let ok = scene.add.image(10, y, 'ok-ninos').
          setOrigin(0, 1).setInteractive().setDepth(100).
          on('pointerdown', () => { Answer.fadeOut(isRightAnswer? 'right-facey': 'wrong-facey'); });

      let oknt = scene.add.image(mainState.width-10, y-3, 'oknt-ninos').
          setOrigin(1, 1).setInteractive().setDepth(100).
          on('pointerdown', () => { Answer.fadeOut(!isRightAnswer? 'right-facey': 'wrong-facey'); });

      ok.jumpy = scene.tweens.add({ targets: ok, y: y-3, duration: 300, ease: 'Sine.easeInOut',
                                    repeat: -1, yoyo: -1 });
      oknt.jumpy = scene.tweens.add({ targets: oknt, y: y, duration: 300, ease: 'Sine.easeInOut',
                                      repeat: -1, yoyo: -1 });

      let answer = {};
      answer.image = image; answer.ok = ok; answer.oknt = oknt;
      Answer.instance = answer;
    },

    fadeOut : function (result) {
      let answer = Answer.instance;
      gameStatus.total++;
      gameStatus.rightGuesses += result === 'right-facey'? 1: 0;

      Answer.instance.result = scene.add.image(answer.image.getCenter().x, answer.image.getCenter().y, result).
        setDepth(-1);
      scene.tweens.add({ targets: answer.image, alpha: 0, duration: 500 });
      answer.ok.jumpy.stop(); answer.oknt.jumpy.stop();
      scene.tweens.add({ targets: [answer.ok, answer.oknt], y: mainState.height + 300, duration: 500 });
      Answer.instance.ok.removeInteractive();
      Answer.instance.oknt.removeInteractive();
      setTimeout(() => {
        scene.tweens.add({ targets: Answer.instance.result, alpha: 0, y: mainState.height + 300, duration: 500 });
        gameStatus.emitter.emit('fade out', result);
      }, 1500);
      setTimeout(() => {
        Answer.gimmieAnswer(data[gameStatus.currentQuestion].answers[gameStatus.currentAnswer]);
      }, 2200);

      if (++gameStatus.currentAnswer >= data[gameStatus.currentQuestion].answers.length) {
        gameStatus.currentAnswer = 0;
        if (++gameStatus.currentQuestion >= data.length) {
          gameStatus.emitter.emit('game over');
        }
      }
    }
  };
})();
