var Words = (() => {
  var instance = {};
  var config = {
    margins: { x: 40, y: 170 },
    containerHeight: 370,
    offset: 8,
    width: 100,
    heightMargin: 5,
    finalColors: [
      0xff5b52, 0x41b238,
      0x4249b5, 0x4cc9cc,
      0xdc84d8, 0x84dca8
    ]
  };

  var create = function (data) {
    gameStatus.emitter.on('column option created', handleOption);
    scene.input.on('pointerup', onPointerup);

    createColumn('left', config.margins.x, { x: 0, y: 0 },
                 config.width + config.margins.x - 10, data);
    createColumn('right', mainState.width - config.margins.x, { x: 1, y: 0},
                 mainState.width - (config.width + config.margins.x) + 10, data);
  };

  var createColumn = function (columnName, posX, origin, dragboxPosX, data) {
    utils.shuffle(data[columnName]);

    var sum = 0;
    for (let i=0; i<data[columnName].length; i++) {
      var option = {};
      var pos = { x: posX, y: config.margins.y + sum };

      option.dragboxPosX = dragboxPosX;
      option.columnName = columnName;
      option.text = scene.add.text(pos.x, pos.y, data[columnName][i], {
        font: '12px Helvetica',
        align: 'center',
        color: '#000000',
        wordWrap: {
          width: 90
        }
      }).setOrigin(0.5, 0.5);

      option.sprite = scene.add.tileSprite(pos.x, pos.y, config.width, config.heightMargin * 2 + option.text.height, columnName).
        setOrigin(origin.x, origin.y).
        setInteractive();
      option.text.setPosition(option.sprite.getCenter().x, option.sprite.getCenter().y).
        setDepth(10);
      sum += config.offset + option.sprite.height;

      gameStatus.emitter.emit('column option created', option);
    }
  };

  var onPointerup = function (pointer) {
    let selected = instance.selectedOption;
    instance.selectedOption = null;

    if (!selected) {
      destroyCurrentDragbox();
      console.log('nothing selected');
      return;
    }

    if (!instance.underPointer || instance.underPointer.columnName == selected.columnName) {
      destroyCurrentDragbox();
      console.log('nothing pointed or same column', instance.underPointer, selected);
      return;
    }

    if (connect(instance.underPointer, selected)) {
      instance.currentDragbox.option.stopDragbox();
      instance.currentDragbox.target = { x: instance.underPointer.dragboxPosX, y: instance.underPointer.sprite.getCenter().y };
      instance.currentDragbox.update();
      instance.currentDragbox.setTint(utils.randomPick(Words.config.finalColors));
      instance.currentDragbox = null;
    } else {
      console.log('already connected');
      destroyCurrentDragbox();
    }
  };

  var destroyCurrentDragbox = function () {
    if (!instance.currentDragbox) return;
    instance.currentDragbox.option.stopDragbox();
    instance.currentDragbox.destroy();
    instance.currentDragbox = null;
  };

  var connect = function (optionA, optionB) {
    if (optionA.connected && optionA.connected.indexOf(optionB) >= 0) return false;

    optionA.connected = optionA.connected? optionA.connected: [];
    optionA.connected.push(optionB);
    optionB.connected = optionB.connected? optionB.connected: [];
    optionB.connected.push(optionA);
    return true;
  }

  var handleOption = function (option) {
    option.onPointerdown = ((option) => { return function (pointer) {
      if (instance.selectedOption) {
        destroyCurrentDragbox();
      }

      instance.selectedOption = option;
      option.dragbox = DragBox.gimmieDragBox(option.dragboxPosX, option.sprite.getCenter().y, {
        leftCapOrigin: { x: 0.5, y: 0.5 },
        rightCapOrigin: { x: 0.5, y: 0.5 }
      });
      option.dragbox.setDepth(utils.randomIntBetween(100, 200));
      option.dragbox.setTint(0xffad52);
      option.dragbox.option = option;
      instance.currentDragbox = option.dragbox

      option.updateDragbox = ((option) => { return function () {
        option.dragbox.updateToCursor();
      }; })(option);

      gameStatus.emitter.on('update', option.updateDragbox);
    }; })(option);

    option.stopDragbox = () => {
      gameStatus.emitter.off('update', option.updateDragbox);
    };

    option.onPointermove = ((option) => { return function (pointer) {
      instance.underPointer = option;
    }; })(option);

    option.sprite.on('pointerdown', option.onPointerdown);
    option.sprite.on('pointermove', option.onPointermove);
  };

  return {
    // properties
    instance,
    config,
    // methods
    create
  };
})();
