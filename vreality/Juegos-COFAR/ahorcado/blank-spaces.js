var BlankSpaces = (() => {
  var margin = { x: 44, y: 230 };
  var offset = { x: 22, y: 40 };

  var gimmieBlankSpaces = function (phrase) {
    var blanks = [];

    var words = phrase.split(' ');
    var totalSpaces = 12;
    var lines = [];
    var remainingSpaces = 0;
    var l = -1;

    for (let i=0; i<words.length; i++) {
      if (!(words[i].length <= remainingSpaces - 1 || (words[i].length >= totalSpaces && remainingSpaces == totalSpaces))) {
        remainingSpaces = totalSpaces;
        lines[++l] = [];
      }
      remainingSpaces -= words[i].length + (i != words.length -1? 1: 0);
      lines[l].push(words[i]);
    }

    for (let i=0; i<lines.length; i++) {
      var line = lines[i].join(' ').toUpperCase();
      var start = mainState.width / 2 - (line.length / 2) * offset.x;
      for (let j=0; j<line.length; j++) {
        if (line[j] !== ' ') {
          blanks.push(gimmieBlank(start, j, i, line[j]));
        }
      }
    }

    return blanks;
  };

  var gimmieBlank = function (start, j, i, letter) {
    var blank = {};
    blank.sprite = scene.add.sprite(start + j * offset.x, margin.y + i * offset.y, 'blank').
        setOrigin(0,1);
    blank.label = Label.gimmieLabel(blank.sprite, letter).
        setOrigin(0.5, 1);
    blank.label.alpha = 0;
    blank.letter = letter;
    blank.solved = false;

    var onKeyPress = ((blank) => { return (key) => {
      if (key.letter == blank.letter) {
        blank.label.alpha = 1;
        blank.solved = true;
      }
    }; })(blank);
    gameStatus.emitter.on('keyboard.keyPress', onKeyPress);
    gameStatus.emitter.on('gameover', () => {
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
    });
    gameStatus.emitter.on('win', () => {
      gameStatus.emitter.off('keyboard.keyPress', onKeyPress);
    });
    return blank;
  };

  return {
    gimmieBlankSpaces : gimmieBlankSpaces
  };
})();
