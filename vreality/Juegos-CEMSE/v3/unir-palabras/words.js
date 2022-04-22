var Words = (() => {
  var instance = {};
  var config = {
    margins: { x: 15, y: 25 },
    containerHeight: 500,
    offset: 8,
    width: 150,
    heightMargin: 5,
    finalColors: [ 0x000000, 0x222222, 0x444444, 0x666666, 0x888888, 0xaaaaaa ],
  };

  var create = function (data) {
    gameStatus.emitter.on('column option created', handleOption);
    scene.input.on('pointerup', onPointerup);

    createColumn('left', config.margins.x, { x: 0, y: 0 },
                 config.width * 0.8 + config.margins.x, data);
    createColumn('right', mainState.width - config.margins.x, { x: 1, y: 0},
                 mainState.width - (config.width * 1.2 + config.margins.x), data);
  };

  var createColumn = function (columnName, posX, origin, dragboxPosX, data) {
    gameStatus.columns = gameStatus.columns? gameStatus.columns: {};
    gameStatus.columns[columnName] = [];
    let column = [];
    for (let i=0; i<data[columnName].length; i++) column.push({ statement: data[columnName][i], id: i });
    data[columnName] = column;

    utils.shuffle(data[columnName]);

    var sum = 0;
    for (let i=0; i<data[columnName].length; i++) {
      if (!data[columnName].statement) continue;
      
      let width = config.width * (columnName === 'left'? 0.8: 1.2);
      var option = {};
      var pos = { x: posX, y: config.margins.y + sum };

      option.destroy = function () {
        let myColumn = gameStatus.columns[this.columnName];
        let index = myColumn.indexOf(this);
        let height = this.sprite.height;
        myColumn.splice(index,1);

        this.text.destroy();
        this.sprite.destroy();

        let offset = height + config.heightMargin * 1.5;
        for (let i=index; i<myColumn.length; i++) {
          myColumn[i].sprite.y -= offset;
          myColumn[i].text.y -= offset;
        }
      };

      option.dragboxPosX = dragboxPosX;
      option.columnName = columnName;

      if (data[columnName][i].statement.indexOf('.png') >= 0) {
        option.text = scene.add.image(pos.x, pos.y, data[columnName][i].statement);
        let size = 200;
        option.textHeight = size * (option.text.height/option.text.width)
        option.text.setDisplaySize(size, option.textHeight);
      } else {
        option.text = scene.add.text(pos.x, pos.y, data[columnName][i].statement, {
          font: '12px Montserrat',
          align: 'left',
          color: '#fff',
          wordWrap: {
            width: width - 20
          }
        }).setOrigin(0.5, 0.5);
        option.textHeight = option.text.height;
      }

      option.id = data[columnName][i].id;

      option.sprite = scene.add.nineslice(pos.x, pos.y, width,
                                          config.heightMargin * 2 + option.textHeight,
                                          'info-box-fill', 10).
        setOrigin(origin.x, origin.y).
        setTint(gameStatus.colors.stroke).
        setInteractive();
      option.text.setPosition(option.sprite.getCenter().x, option.sprite.getCenter().y).
        setDepth(10);
      sum += config.offset + option.sprite.height;
      gameStatus.columns[columnName].push(option);

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
      let lastDragbox = instance.currentDragbox
      instance.currentDragbox = null;
      let left = instance.underPointer.columnName === 'left'? instance.underPointer: selected;
      let right = instance.underPointer.columnName === 'right'? instance.underPointer: selected;
      gameStatus.connections.push([left.id, right.id]);

      feedbackAndLongColumnFix(lastDragbox, left, right);
    } else {
      console.log('already connected');
      destroyCurrentDragbox();
    }
  };

  var feedbackAndLongColumnFix = function (dragbox, left, right) {
    let targets = [dragbox.sprite, dragbox.caps[0], dragbox.caps[1],
                   right.sprite, right.text ];
    if (!(data.destroysLeft === false)) {
      targets.push(left.sprite); targets.push(left.text);
    }
    scene.tweens.add({ targets, alpha: 0, duration: 300, delay: 100});
    setTimeout(() => {
      let isItRight = false;
      for (let i=0; i<data.answers.length; i++) {
        if (data.answers[i][0] === left.id && data.answers[i][1] === right.id) {
          isItRight = true;
          break;
        }
      }
      let feedback = scene.add.image(mainState.width/2, mainState.height/2,
                                     isItRight? 'good feedback': 'bad feedback').
          setDepth(100).
          setAlpha(0);
      scene.tweens.add({ targets: [ feedback ], alpha: 1, duration: 200});
      scene.tweens.add({ targets: [ feedback ], alpha: 0, duration: 200, delay: 500});
      setTimeout(() => { feedback.destroy(); }, 1100);
    }, 250);
    setTimeout(() => {
      dragbox.destroy();
      right.destroy();
      if (!(data.destroysLeft === false)) {
        left.destroy();
      }
      if (data.destroysLeft) {
        left.destroy();
      }
    }, 800);
  }

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
