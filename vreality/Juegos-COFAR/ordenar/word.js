var Word = {
  instances : [],
  gimmieWord : function (position, origin, info) {
    var word = {
      sprite : scene.add.sprite(position.x, position.y, 'word').
        setOrigin(origin.x, origin.y).
        setDepth(10).
        setInteractive(),
      info : info
    };
    Word.instances.push(word);
    word.sprite.parent = word;
    word.sprite.x += word.sprite.width * (0.5 - word.sprite.originX);
    word.sprite.y += word.sprite.height * (0.5 - word.sprite.originY);
    word.sprite.setOrigin(0.5, 0.5);
    word.label = Label.gimmieLabel(word.sprite, word.info.label);

    word.sprite.anims.create({
      key: 'idle',
      frames: utils.frames('word', [0])
    });
    word.sprite.anims.create({
      key: 'dragged',
      frames: utils.frames('word', [1])
    });

    scene.input.setDraggable(word.sprite);
    scene.input.on('dragstart', function (pointer, gameObject) {
      gameObject.anims.play('dragged');
    });

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    scene.input.on('dragend', function (pointer, gameObject) {
      gameObject.anims.play('idle');
    });

    return word;
  }
}
