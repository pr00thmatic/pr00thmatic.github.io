var Word = (function () {
  var gimmieWord = function (puzzle, word) {
    word.dragbox = gameStatus.sopa.gimmieDragbox(word.capsule, '', true);
    word.line = gameStatus.sopa.getLine(word.capsule);
    word.hint.text = word.hint.text.replaceAll('█', '');
    word.hintLabel = scene.add.text(word.hint.position.x, word.hint.position.y, word.hint.text, puzzle.hintStyle);
    word.numberLabel = scene.add.text(word.number.position.x, word.number.position.y, word.number.number, puzzle.numberStyle);

    word.edit = function () {
      gameStatus.sopa.editWord(word);
    }

    return word;
  };

  return { gimmieWord };
})();
