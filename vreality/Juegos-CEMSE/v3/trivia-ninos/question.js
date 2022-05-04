let Question = (() => {
  return {
    gimmieQuestion : function (img) {
      if (gameStatus.gameOver) return;

      let requiresAudio = banco.triviaWithVoice.indexOf(gameStatus.capsulaID) >= 0;
      if (Question.instance) {
        if (Question.instance.voice) Question.instance.voice.destroy();
        if (Question.instance.play) Question.instance.play.destroy();
        Question.instance.image.destroy();
        Question.instance.open.destroy(); Question.instance.closed.destroy();
      } else {
        gameStatus.emitter.on('fade out', Question.fadeOut);
      }

      Question.instance = {};
      if (requiresAudio) {
        Question.instance.voice = scene.sound.add('mus_' + gameStatus.currentQuestion);
      }
      let size = Math.min(mainState.width, mainState.height) - 15;
      let image = scene.add.image(mainState.width/2, 8, img).
          setOrigin(0.5, 0);
      if (requiresAudio) {
        image.setInteractive().
          on('pointerdown', () => {
            Question.instance.voice.play();
          });
      }

      let h = image.height; let w = image.width;
      image.setDisplaySize(size * (h > w? w/h: 1) , size * (h < w? h/w: 1));
      scene.tweens.add({ targets: image, y: 10, duration: 800,
                         yoyo: 1, repeat: -1, ease: 'Sine.easeInOut' });

      let open = scene.add.image(20, 150, 'open question mark').setOrigin(0, 0.5);
      let closed = scene.add.image(mainState.width - 20, 150, 'closed question mark').setOrigin(1, 0.5);
      scene.tweens.add({ targets: open, y: 140, duration: 1000, yoyo: 1,
                         repeat: -1, ease: 'Sine.easeInOut' });
      scene.tweens.add({ targets: closed, y: 140, duration: 1200, yoyo: 1,
                         repeat: -1, ease: 'Sine.easeInOut' });

      if (requiresAudio) {
        let play = scene.add.image(image.getBottomLeft().x, image.getBottomLeft().y, 'play_sound').
            setOrigin(0,1).
            setDepth(10);
        scene.tweens.add({ targets: [play], scaleX: 1.025, scaleY: 1.025, ease: 'Sine.easeInOut',
                           duration: 300, yoyo: 1, repeat: -1});

        Question.instance.play = play;
      }
      Question.instance.image = image;
      Question.instance.open = open; Question.instance.closed = closed;
      return Question.instance;
    },

    fadeOut: function () {
      if (Question.knownLastQuestion !== gameStatus.currentQuestion) {
        Question.knownLastQuestion = gameStatus.currentQuestion;
      } else {
        return;
      }

      scene.tweens.add({ targets: Question.instance.open, alpha: 0, y: -600, duration: 500, delay: 200 });
      scene.tweens.add({ targets: Question.instance.closed, alpha: 0, y: -600, duration: 500, delay: 400 });
      scene.tweens.add({ targets: Question.instance.image, alpha: 0, y: -600, duration: 500, delay: 600 });
      setTimeout(() => {
        if (gameStatus.currentQuestion >= data.length) return;
        Question.gimmieQuestion(data[gameStatus.currentQuestion].question);
      }, 600);
    }
  };
})();
