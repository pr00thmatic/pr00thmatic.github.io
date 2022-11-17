var Word = (function () {
  var gimmieWord = function (puzzle, word) {
    word.dragbox = gameStatus.sopa.gimmieDragbox(word.capsule, '', true);
    word.dragbox.setTint('0xFFFFFF');
    if (puzzle) word.line = gameStatus.sopa.getLine(word.capsule);
    if (puzzle) word.hint.text = word.hint.text.replaceAll('█', '');

    if (puzzle) {
      word.hintLabel = scene.add.text(word.hint.position.x, word.hint.position.y, word.hint.text, puzzle.hintStyle);
      word.numberLabel = scene.add.text(word.number.position.x, word.number.position.y, word.number.number, puzzle.numberStyle);
    }

    word.edit = function () {
      gameStatus.sopa.editWord(word);
    };

    word.setTint = function (color) {
      for (let i=0; i<word.line.length; i++) {
        word.line[i].sprite.setTint(color);
      }
    };

    word.stopEdition = function () {
      word.stopHighlight();
      word.setTint(colors.global.stroke);
      console.log('but D:');
      gameStatus.emitter.off('keyboard.keyPress', word.editCell);
    };

    word.highlightCell = function () {
      word.last = {
        interval: setInterval(() => {
          word.line[word.editingCellIndex].sprite.
            setTint(word.last.colors[(++word.last.current) % word.last.colors.length]);
        }, 500),
        current: 0,
        colors: [colors.global.highlight, colors.global.accent]
      }
    };

    word.stopHighlight = function () {
      if (word.last) {
        word.currentCell.sprite.setTint(colors.global.accent);
        clearInterval(word.last.interval);
      }
      word.last = null;
    };

    // what will happen when the user pushes a key while editing a word
    word.editCell = function (key) {
      word.currentCell = word.editingCellIndex < word.line.length && word.editingCellIndex >= 0?
          word.line[word.editingCellIndex]: null;

      word.stopHighlight();

      // concatenates the character to the word
      if (key) {
        if (key.letter === 'BACKSPACE') {
          if (word.currentCell) word.currentCell.label.text = '';
          word.editingCellIndex++;
        } else {
          word.currentCell.label.text = key.letter;
          word.editingCellIndex--;
        }
      }

      // checks if edition is over
      if (word.editingCellIndex < 0) {
        gameStatus.emitter.emit('sopa.wordCompleted', word);
        word.stopEdition();
        return;
      } else if (word.editingCellIndex >= word.line.length) {
        // abort this word and it's box! (if it's being edited)
        gameStatus.emitter.emit('sopa.attemptDestroyWord', word);
        word.stopEdition();
        return;
      }

      word.highlightCell();
    };

    word.editCells = function () {
      gameStatus.emitter.on('keyboard.keyPress', word.editCell);
      word.editCell();
    };

    return word;
  };

  return { gimmieWord };
})();
