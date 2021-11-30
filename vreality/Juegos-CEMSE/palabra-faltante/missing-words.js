var MissingWords = (() => {
  var words = [];

  var gimmieMissingWords = function () {
    var bottom = gameStatus.story.text.getBottomLeft();
    var offset = { x: 100, y: 20 };

    utils.shuffle(gameStatus.story.missingWords);
    for (let i=0; i<gameStatus.story.missingWords.length; i++) {
      var word = gameStatus.story.missingWords[i];
      word.blank =
        scene.add.tileSprite(word.start.x, word.start.y, Math.abs(word.end.x - word.start.x), 16, 'blank').
        setOrigin(0,0).
        setDepth(10);
      word.blank.setInteractive();
      word.blank.input.dropZone = true;
      word.blank.setTint(0x5fd1ff);
      scene.input.on('dragenter', ((word) => { return (pointer, gameObject, dropZone) => {
        if (dropZone != word.blank) return;
        word.blank.setTint(0xf6ff5f);
      }; })(word));
      scene.input.on('dragleave', ((word) => { return (pointer, gameObject, dropZone) => {
        if (dropZone != word.blank) return;
        word.blank.setTint(0x5fd1ff);
      }; })(word));
      scene.input.on('drop', ((word) => { return (pointer, gameObject, dropZone) => {
        if (dropZone != word.blank || word.word !== gameObject.word.word) {
          word.blank.setTint(0x5fd1ff);
          return;
        }
        word.solved = true;
        word.blank.setTint(0x5fd1ff);
        word.blank.alpha = 0;
        word.blankLabel = Label.gimmieLabel(word.blank, gameObject.word.word, Story.style);
        gameObject.word.container.label.destroy();
        gameObject.destroy();
        gameStatus.emitter.emit('word completed');
      }; })(word));

      word.container = {
        sprite: scene.add.sprite(bottom.x + offset.x * (i % 3), bottom.y + offset.y * Math.floor(i/3), 'word container').
          setOrigin(0,0).
          setDepth(20).
          setInteractive()
      };
      word.container.sprite.word = word;
      word.container.originalPosition = { x: word.container.sprite.x, y: word.container.sprite.y };
      word.container.label =
        Label.gimmieLabel(word.container.sprite, word.word, { color: '#ffffff', font: '10px Helvetica', align: 'center' });
      scene.input.setDraggable(word.container.sprite);
      scene.input.on('dragstart', function (pointer, gameObject) {
        gameObject.alpha = 0.5;
      });
      scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
      scene.input.on('dragend', ((word) => { return () => {
        if (!word.container.sprite) return;
        word.container.sprite.alpha = 1;
        word.container.sprite.x = word.container.originalPosition.x;
        word.container.sprite.y = word.container.originalPosition.y;
      }; })(word));
      words.push(word);
    }
  };

  return { gimmieMissingWords : gimmieMissingWords,
           words: words };
})();
