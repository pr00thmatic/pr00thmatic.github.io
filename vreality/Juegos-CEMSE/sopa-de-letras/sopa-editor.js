var SopaEditor = ( function () {
  var sopaData = {
    words: [],
    currentWord: null,
    editMode: false,
    label: null
  };

  var edit = function () {
    if (!sopaData.label) sopaData.label = scene.add.text(0,0, 'MODO EDICIÓN!!', { color: '#00aa00' }).setOrigin(0,0);
    sopaData.editMode = true;
    scene.input.keyboard.on('keydown', function (event) {
      if (!sopaData.currentWord) return;

      if (event.key == 'Backspace') {
        // TODO
      } else if (event.key.length == 1) {
        var word = sopaData.currentWord;
        word.line[word.currentLetter].label.text = event.key.toUpperCase();
        if (!word.nextLetter()) {
          sopaData.currentWord.dragbox.setTint(0x111111);
          sopaData.currentWord = null;
        }
      }
    });

    gameStatus.emitter.on('delete request', (coords) => {
      var cell = gameStatus.sopa.cells[coords.r][coords.c];
      for (let i=0; i<sopaData.words.length; i++) {
        for (let j=0; j<sopaData.words[i].line.length; j++) {

          if (cell == sopaData.words[i].line[j]) {
            for (let l=0; l<sopaData.words[i].line.length; l++) {
              sopaData.words[i].line[l].randomize();
              sopaData.words[i].line[l].sprite.setTint(0xffffff);
            }
            if (sopaData.currentWord == sopaData.words[i]) {
              sopaData.currentWord = null;
            }
            sopaData.words[i].dragbox.destroy();
            sopaData.words.splice(i, 1);
            return;
          }

        }
      }
    });

    gameStatus.emitter.on('word enclosed', (word) => {
      sopaData.currentWord = word;
      word.dragbox.setTint(0x10fcff);
      sopaData.words.push(word);

      for (let i=0; i<word.line.length; i++) {
        word.line[i].label.text = "";
      }

      word.nextLetter = function () {
        if (word.line[word.currentLetter]) {
          word.line[word.currentLetter].sprite.setTint(0xffffff);
        }
        word.currentLetter--;
        if (word.currentLetter < 0) return false;
        word.line[word.currentLetter].sprite.setTint(0xf6f499);
        return true;
      };

      word.currentLetter = word.line.length;
      word.nextLetter();
    });
  };

  var getPuzzleString = function () {
    var json = [];
    for (let i=0; i<sopaData.words.length; i++) {
      json[i] = {
        capsule : sopaData.words[i].capsule,
        word: Sopa.getContent(sopaData.words[i].line)
      };
    }
    return JSON.stringify(json);
  };

  return { edit : edit,
           getPuzzleString : getPuzzleString,
           sopaData : sopaData };
} )();
