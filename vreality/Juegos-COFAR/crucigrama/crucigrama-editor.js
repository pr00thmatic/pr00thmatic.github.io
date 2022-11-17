var CrucigramaEditor = (() => {
  var marginY = 30;
  var marginX = 34;
  var hintWidth = 290;
  var hintOffset = 10;
  var tileSize = 20;

  var data = {
    words: [],
    sopa: null,
    currentWord: null,
    numberStyle: { font: '15px Poppins', color: "#FD8204", align: "center" },
    hintStyle: {
      color: "#000000",
      font: '15px Poppins',
      wordWrap: { width: hintWidth }
    }
  };

  var edit = function () {
    data.sopa = Sopa.gimmieSopa({
      rows: 13,
      columns: 18,
      cellSize: 20,
      cellTint: gameStatus.colors.stroke,
      allowDiagonals: false,
      cellAlpha: 1,
      validColor: 0x111111,
      invalidColor: 0x885555,
      allowCapsuleCreation: true
    });
    gameStatus.emitter.on('word enclosed', createBox);
    gameStatus.emitter.on('start new dragbox', stopEditingWord);
  };

  var createBox = function (word) {
    data.words.push(word);
    word.originCell = data.sopa.cells[word.capsule.origin.r][word.capsule.origin.c];
    word.targetCell = data.sopa.cells[word.capsule.end.r][word.capsule.end.c];
    startWordEdition(word); // START WORD EDITION!
  };

  var stopEditingWord = function () {
    if (data.words.length > 0) {
      data.words[data.words.length-1].stopHintEdition();
    }
  };

  // WORD EDITION!
  var startWordEdition = (word, firstTime = true) => {
    if (firstTime) {
      word.number = data.words.length;
      var step = { r: Math.sign(word.capsule.origin.r - word.capsule.end.r),
                   c : Math.sign(word.capsule.origin.c - word.capsule.end.c) };
      let pos = {
        x: word.originCell.sprite.x + step.c * data.sopa.config.cellSize + data.sopa.config.cellSize/4,
          // (step.c == 0? data.sopa.config.cellSize/4: 0),
        y: word.originCell.sprite.y + step.r * data.sopa.config.cellSize
      };
      word.numberLabel =
        scene.add.text(pos.x, pos.y, word.number, data.numberStyle).
        // scene.add.text(word.originCell.sprite.getTopLeft().x + 3, word.originCell.sprite.getTopLeft().y + 3,
        //                word.number, data.numberStyle).
        setOrigin(0,0);
    }

    word.onWordCompleted = function (word) {
      startHintEdition(word);
      word.unsubscribe();
    };
    word.onAttemptDestroyWord = function (word) {
      word.dragbox.destroy();
      word.numberLabel.destroy();
      data.words.splice(data.words.indexOf(word), 1);
      word.unsubscribe();
    };
    word.unsubscribe = function () {
      gameStatus.emitter.off('sopa.wordCompleted', this.onWordCompleted);
      gameStatus.emitter.off('sopa.attemptDestroyWord', this.onAttemptDestroyWord);
    }

    gameStatus.emitter.on('sopa.wordCompleted', word.onWordCompleted);
    gameStatus.emitter.on('sopa.attemptDestroyWord', word.onAttemptDestroyWord);
    data.sopa.editWord(word, firstTime? undefined: 0);
  };

  // HINT EDITION!
  var startHintEdition = function (word) {
    word.hint = "";

    // calculate hint's y position
    var y = 0;
    if (data.words.length > 1) {
      y = data.words[data.words.length-2].hintLabel.getBottomLeft().y + hintOffset;
    } else {
      y = marginY + tileSize * data.sopa.rows + 10;
    }

    word.hintLabel = scene.add.text(marginX, y, word.number + ': █', data.hintStyle).setOrigin(0,0);

    // what will happen when the user  presses a key while editting a hint?
    word.hintFeedFunction = ((word) => { return (key) => {
      if (key.letter == 'BACKSPACE') {
        if (word.hint.length == 0) {
          word.editingCellIndex = 0;
          word.hintLabel.destroy();
          word.hintLabel = null;
          word.stopHintEdition();
          startWordEdition(word, false);
        } else {
          word.hint = word.hint.substr(0, word.hint.length-1);
        }
      } else {
        word.hint += word.hint.length > 0? key.letter.toLowerCase(): key.letter;
      }
      if (word.hintLabel) word.hintLabel.text = word.number + ": " + word.hint + "█";
    }; })(word);

    // subscribe!
    gameStatus.emitter.on('keyboard.keyPress', word.hintFeedFunction);
    // this will happen when you stop editting the hint
    word.stopHintEdition = function () {
      if (word.hintLabel) word.hintLabel.text = word.hintLabel.text.substr(0, word.hintLabel.text.length-1);
      gameStatus.emitter.off('keyboard.keyPress', word.hintFeedFunction);
    }
  };

  var getPuzzleString = function () {
    let puzzle = {
      words: [],
      numberStyle: data.numberStyle,
      hintStyle: data.hintStyle
    };

    for (let i=0; i<data.words.length; i++) {
      let modelWord = data.words[i];
      let word = {
        capsule: modelWord.capsule,
        word: Sopa.getContent(modelWord.line),
        number: {
          position: { x: modelWord.numberLabel.x, y: modelWord.numberLabel.y },
          number: modelWord.number
        },
        hint: {
          text: modelWord.hintLabel.text,
          position: { x: modelWord.hintLabel.x, y: modelWord.hintLabel.y }
        }
      };
      puzzle.words.push(word);
    }

    return JSON.stringify(puzzle);
  };

  return { edit : edit,
           data : data,
           getPuzzleString : getPuzzleString};
})();
