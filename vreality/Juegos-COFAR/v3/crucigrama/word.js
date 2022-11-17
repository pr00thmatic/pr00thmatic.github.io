var Word = (function () {
  var gimmieWord = function (puzzle, word) {
    let y = 250;
    let x = 20;
    let width = mainState.width - 40;
    if (Word.lastText) {
      y = Word.lastText.getBottomCenter().y + 6;
    }
    word.dragbox = gameStatus.sopa.gimmieDragbox(word.capsule, '', true);
    word.line = gameStatus.sopa.getLine(word.capsule);
    word.hint.text = word.hint.text.replaceAll('█', '');
    word.hintLabel = scene.add.text(x, y, word.hint.text, {
      font: '12px Montserrat',
      color: '#000',
      width: width,
      wordWrap: { width: width },
      align: 'left'
    });
    Word.lastText = word.hintLabel;
    word.numberLabel = scene.add.text(word.number.position.x, word.number.position.y, word.number.number, puzzle.numberStyle);

    word.edit = function () {
      if (gameStatus.editingWord) {
        if (gameStatus.editingWord != word) {
          gameStatus.sopa.cancelEdition(word);
        } else {
          return;
        }
      }
      gameStatus.editingWord = word;
      gameStatus.sopa.editWord(word);
      let onWordCompleted = function () {
        gameStatus.editingWord = null;
        gameStatus.emitter.emit('end word edition', word);
        gameStatus.emitter.off('sopa.wordCompleted', onWordCompleted);
      };
      gameStatus.emitter.on('sopa.wordCompleted', onWordCompleted);
      gameStatus.emitter.emit('start word edition', word);
    }

    return word;
  };

  return { gimmieWord };
})();
