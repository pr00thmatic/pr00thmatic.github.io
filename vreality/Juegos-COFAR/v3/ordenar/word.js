var Word = {
  instances : [],

  createWords : function () {
    let marginY = Container.endingPosY();
    Word.marginY = marginY;
    Word.posY = 1 + marginY;
    Word.totalWords = 0;
    for (var i=0; i<config.words.fakeBackend.length; i++) {
      if (config.words.fakeBackend[i].label) {
        Word.totalWords++;
        let word = this.gimmieWord(Word.posY,
                                   config.words.fakeBackend[i]);
      }
    }
  },

  gimmieWord : function (positionY, info) {
    if (!info.label) return;
    var word = {};
    if (info.label.indexOf('.png') >= 0) {
      word.sprite = scene.add.image(phaserConfig.width/2, positionY, info.label);
    } else {
      word.sprite = scene.add.nineslice(phaserConfig.width/2, positionY, 340, 65, 'info-box-fill', 5).
        setTint(gameStatus.colors.stroke);
    }
    word.sprite.
      setOrigin(0.5, 0).
      setDepth(10).
      setInteractive();
    word.info = info;
    Word.posY += word.sprite.height + 1;

    word.destroy = function () {
      let index = Word.instances.indexOf(this);
      let offset = word.sprite.height + 2;
      Word.instances.splice(index, 1);
      word.sprite.destroy();
      word.label.destroy();
      // let offset = (config.words.yOffset);
      for (let i=index; i<Word.instances.length; i++) {
        Word.instances[i].sprite.y -= offset;
        Word.instances[i].label.y -= offset;
      }
    }
    Word.instances.push(word);
    word.sprite.parent = word;
    word.label = Label.gimmieLabel(word.sprite, word.info.label,{
      color: '#fff',
      font: '15px Montserrat light',
      fixedWidth: 320,
      wordWrap: { width: 320 },
      align: 'left',
    });
    if (word.info.label.indexOf('.png') >= 0) {
      word.label.setAlpha(0);
    }

    scene.input.setDraggable(word.sprite);

    // scene.input.on('dragstart', function (pointer, gameObject) {});
    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    // scene.input.on('dragend', function (pointer, gameObject) {});

    return word;
  }
}
