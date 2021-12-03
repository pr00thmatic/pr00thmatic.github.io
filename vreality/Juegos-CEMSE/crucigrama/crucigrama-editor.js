var CrucigramaEditor = (() => {
  var marginY = 30;
  var marginX = 34;
  var hintWidth = 290;
  var hintOffset = 10;
  var tileSize = 20;

  var data = {
    words: [],
    sopa: null,
    currentWord: null
  };

  var edit = function () {
    data.sopa = Sopa.gimmieSopa({
      rows: 10,
      columns: 15,
      allowDiagonals: false,
      cellAlpha: 0.25,
      validColor: 0x111111,
      invalidColor: 0x885555
    });
    gameStatus.emitter.on('word enclosed', createWord);
    gameStatus.emitter.on('start new dragbox', () => {
      if (data.words.length > 0) {
        data.words[data.words.length-1].stopHintEdition();
      }
    });
  };

  var createWord = function (word) {
    data.words.push(word);
    word.originCell = data.sopa.cells[word.capsule.origin.r][word.capsule.origin.c];
    word.targetCell = data.sopa.cells[word.capsule.end.r][word.capsule.end.c];
    completeWordBoxCreation(word);
  }

  var completeWordBoxCreation = (word) => {
    word.number = data.words.length;
    var originCell = data.sopa.cells[word.capsule.origin.r]
    word.numberLabel = scene.add.text(word.originCell.sprite.getTopLeft().x + 3, word.originCell.sprite.getTopLeft().y + 3,
                                      word.number, { font: '8px Helvetica', color: "#000000" }).
      setOrigin(0,0);
    word.currentEditingCell = word.line.length-1;

    var editCell = function (key) {
      var currentCell = null;
      if (word.currentEditingCell < word.line.length && word.currentEditingCell >= 0) {
        currentCell = word.line[word.currentEditingCell];
      }
      if (currentCell) currentCell.sprite.setTint(0xffffff);

      if (key) {
        if (key.letter === 'BACKSPACE') {
          if (currentCell) currentCell.label.text = '';
          word.currentEditingCell++;
        } else {
          currentCell.label.text = key.letter;
          word.currentEditingCell--;
        }
      }

      if (word.currentEditingCell < 0) {
        gameStatus.emitter.off('keyboard.keyPress', editCell);
        completeWordFill(word);
      } else if (word.currentEditingCell >= word.line.length) {
        gameStatus.emitter.off('keyboard.keyPress', editCell);
        word.dragbox.destroy();
        word.numberLabel.destroy();
        data.words.splice(data.words.indexOf(word), 1);
      } else {
        word.line[word.currentEditingCell].sprite.setTint(0xffff00);
      }
    };
    word.editCells = function () {
      gameStatus.emitter.on('keyboard.keyPress', editCell);
      editCell();
    };
    word.editCells();
  };

  var completeWordFill = function (word) {
    word.hint = "";
    var y = 0;
    if (data.words.length > 1) {
      y = data.words[data.words.length-2].hintLabel.getBottomLeft().y + hintOffset;
    } else {
      y = marginY + tileSize * data.sopa.rows + 10;
    }
    word.hintLabel = scene.add.text(marginX, y, word.number + ': ',{
      color: "#000000",
      font: '15px Helvetica',
      wordWrap: { width: hintWidth }
    }).
      setOrigin(0,0);

    word.hintFeedFunction = ((word) => { return (key) => {
      if (key.letter == 'BACKSPACE') {
        if (word.hint.length == 0) {
          word.currentEditingCell = 0;
          word.hintLabel.destroy();
          word.hintLabel = null;
          word.stopHintEdition();
          word.editCells();
        } else {
          word.hint = word.hint.substr(0, word.hint.length-1);
        }
      } else {
        word.hint += word.hint.length > 0? key.letter.toLowerCase(): key.letter;
      }
      if (word.hintLabel) word.hintLabel.text = word.number + ": " + word.hint;
    }; })(word);

    gameStatus.emitter.on('keyboard.keyPress', word.hintFeedFunction);
    word.stopHintEdition = function () {
      gameStatus.emitter.off('keyboard.keyPress', word.hintFeedFunction);
    }
  };

  return { edit : edit,
           data : data };
})();
