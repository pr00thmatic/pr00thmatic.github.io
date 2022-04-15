var Word = {
  instances : [],
  gimmieWord : function (positionY, info) {
    var word = {
      sprite : scene.add.nineslice(phaserConfig.width/2, positionY, 340, 50, 'info-box-fill', 5).
        setOrigin(0.5, 0).
        setDepth(10).
        setTint(gameStatus.colors.stroke).
        setInteractive(),
      info : info
    };
    Word.instances.push(word);
    word.sprite.parent = word;
    word.label = Label.gimmieLabel(word.sprite, word.info.label,{
      color: '#fff',
      font: '12px Montserrat',
      fixedWidth: 320,
      wordWrap: { width: 320 },
      align: 'left',
    });

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
