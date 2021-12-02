var Word = (() => {
  var marginX = 34;
  var hintWidth = 290;
  var hintOffset = 10;
  var marginY = 30;
  var tileSize = 20;
  var columns = 15;
  var rows = 10;

  var data = {
    words: [],
    cells: [],
    currentWord: null
  };

  var subscribeWordOnClick = function () {
    createCells();
  };

  var createCells = function () {
    var start = { x: mainState.width / 2 - tileSize * (columns / 2), y: marginY };

    for (let r=0; r<rows; r++) {
      data.cells[r] = [];
      for (let c=0; c<columns; c++) {
        data.cells[r][c] = {
          sprite: scene.add.image(start.x + tileSize * c, start.y + tileSize * r, 'cell').
            setOrigin(0,0).
            setInteractive().
            setAlpha(0.25),
          r: r,
          c: c
        };
        data.cells[r][c].label = Label.gimmieLabel(data.cells[r][c].sprite, '');
        data.cells[r][c].label.alpha = 0.5;
        data.cells[r][c].sprite.on('pointerdown', pointerdown(r, c));
        data.cells[r][c].sprite.on('pointerover', pointerover(r, c));
        data.cells[r][c].sprite.on('pointerup', pointerup(r, c));
      }
    }
  };

  var pointerdown = ((r, c) => { return () => {
    var cell = data.cells[r][c].sprite;
    var word = {};
    data.currentWord = word;
    word.isValid = true;
    word.originCell = data.cells[r][c];
    word.dragbox = DragBox.gimmieDragBox(cell.getCenter().x, cell.getCenter().y);
    word.dragbox.target = { x: cell.getBottomLeft().x + tileSize, y: word.dragbox.origin.y };
    word.dragbox.setTint(0x111111);
    word.dragbox.update();
    if (data.words.length > 0) {
      data.words[data.words.length-1].stopHintEdition();
    }
  }; });

  var pointerover = ((r, c) => { return () => {
    if (!data.currentWord) return;
    var cell = data.cells[r][c].sprite;
    data.currentWord.dragbox.target = { x: cell.getCenter().x, y: cell.getCenter().y };
    data.currentWord.dragbox.update();
    data.currentWord.isValid = r == data.currentWord.originCell.r || c == data.currentWord.originCell.c;
    data.currentWord.dragbox.setTint(data.currentWord.isValid? 0x111111: 0x885555);
  }; });

  var pointerup = ((r, c) => { return () => {
    if (!data.currentWord) return;
    if (!data.currentWord.isValid) {
      data.currentWord.dragbox.destroy();
      data.currentWord = null;
      return;
    }

    data.currentWord.targetCell = data.cells[r][c];
    data.words.push(data.currentWord);
    completeWordBoxCreation(data.currentWord);
    data.currentWord = null;
  }; });

  var completeWordBoxCreation = (word) => {
    word.cells = getLine({ origin: word.originCell, end: word.targetCell });
    word.number = data.words.length;
    word.numberLabel = scene.add.text(word.originCell.sprite.getTopLeft().x + 3, word.originCell.sprite.getTopLeft().y + 3,
                                      word.number, { font: '8px Helvetica', color: "#000000" }).
      setOrigin(0,0);
    word.currentEditingCell = word.cells.length-1;
    word.cells[word.currentEditingCell].sprite.setTint(0xffff00);

    var editCell = function (key) {
      word.cells[word.currentEditingCell].label.text = key.letter;
      word.cells[word.currentEditingCell].sprite.setTint(0xffffff);
      word.currentEditingCell--;
      if (word.currentEditingCell < 0) {
        gameStatus.emitter.off('keyboard.keyPress', editCell);
        completeWordFill(word);
      } else {
        word.cells[word.currentEditingCell].sprite.setTint(0xffff00);
      }
    };
    gameStatus.emitter.on('keyboard.keyPress', editCell);
  };

  var completeWordFill = function (word) {
    word.hint = "";
    var y = 0;
    if (data.words.length > 1) {
      y = data.words[data.words.length-2].hintLabel.getBottomLeft().y + hintOffset;
    } else {
      y = marginY + tileSize * rows + 10;
    }
    word.hintLabel = scene.add.text(marginX, y, word.number + ': ',{
      color: "#000000",
      font: '15px Helvetica',
      wordWrap: { width: hintWidth }
    });

    word.hintFeedFunction = ((word) => { return (key) => {
      word.hint += word.hint.length > 0? key.letter.toLowerCase(): key.letter;
      word.hintLabel.text = word.number + ": " + word.hint;
    }; })(word);

    gameStatus.emitter.on('keyboard.keyPress', word.hintFeedFunction);
    word.stopHintEdition = function () {
      gameStatus.emitter.off('keyboard.keyPress', word.hintFeedFunction);
    }
  };

  var compareCapsules = function (a, b) {
    return ((compareCoords(a.origin, b.origin) && compareCoords(a.end, b.end)) ||
            (compareCoords(a.origin, b.end) && (a.end, b.origin)));
  };

  var compareCoords = function (a, b) {
    return a.r == b.r && a.c == b.c;
  };

  var getLine = function (capsule) {
    var line = [];
    var step = { r: Math.sign(capsule.origin.r - capsule.end.r), c : Math.sign(capsule.origin.c - capsule.end.c) };
    var current = { r: capsule.end.r - step.r, c: capsule.end.c - step.c};
    var guard = 0;

    do {
      current.r += step.r; current.c += step.c;
      line.push(data.cells[current.r][current.c]);
      data.cells[current.r][current.c].label.setFontStyle("bold");
      guard++;
    } while ((current.r !== capsule.origin.r || current.c !== capsule.origin.c) && guard < 1000);

    if (guard >= 1000) {
      line = "CAPSULE NOT VALID";
    }

    return line;
  };


  return { subscribeWordOnClick : subscribeWordOnClick,
           data : data };
})();
