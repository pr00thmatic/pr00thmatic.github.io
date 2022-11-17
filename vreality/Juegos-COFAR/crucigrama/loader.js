var Loader = (() => {
  var load = function (puzzleString) {
    var words = [];
    var puzzle = JSON.parse(puzzleString);
    console.log(puzzle.hintStyle);

    for (let i=0; i<puzzle.words.length; i++) {
      words.push(Word.gimmieWord(puzzle, puzzle.words[i]));
    }

    var attemptEdit = ((cell) => { return function () {
      for (let i=0; i<words.length; i++) {
        if (words[i].line.indexOf(cell) >= 0) {
          words[i].edit();
        }
      }
    }; });

    for (let r=0; r<gameStatus.sopa.rows; r++) {
      for (let c=0; c<gameStatus.sopa.columns; c++) {
        gameStatus.sopa.cells[r][c].sprite.on('pointerdown', attemptEdit(gameStatus.sopa.cells[r][c]));
      }
    }

    gameStatus.emitter.on('sopa.wordCompleted', (word) => {
      word.attempt = Sopa.getContent(word.line);
      console.log(word.attempt, word.word);
      for (let i=0; i<words.length; i++) {
        if (words[i].attempt !== words[i].word) {
          console.log('esta palabra falta: ', words[i].word, ' ahora está como: ', words[i].attempt);
          return;
        }
      }

      gameStatus.emitter.emit('win');
      console.log('A WINNER IS YOU!');
    });

    for (let i=0; i<gameStatus.sopa.cells.length; i++) {
      for (let j=0; j<gameStatus.sopa.cells[i].length; j++) {
        gameStatus.sopa.cells[i][j].sprite.setAlpha(0);
      }
    }

    for (let i=0; i<words.length; i++) {
      console.log(words[i].capsule);
      let line = gameStatus.sopa.getLine(words[i].capsule);
      for (let j=0; j<line.length; j++) {
        line[j].sprite.setAlpha(1);
      }
      words[i].dragbox.setAlpha(0);
    }

    return words;
  };

  return { load };
})();
