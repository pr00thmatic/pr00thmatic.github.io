var VictoryCriteria = (() => {
  var create = function () {
    gameStatus.emitter.on('word enclosed', (word) => {
      if (!gameStatus.words) {
        if (!SopaEditor.sopaData.editMode) {
          word.dragbox.destroy();
        }
        return;
      }
      var found = false;
      for (let i=0; i<gameStatus.words.length; i++) {
        if (Sopa.compareCapsules(gameStatus.words[i].capsule, word.capsule)) {
          for (let j=0; j<word.line.length; j++) {
            word.line[j].sprite.setTint(0xaaffaa);
          }
          Found.holders[i].disclose();
          found = true;
          break;
        }
      }

      if (!found) {
        word.dragbox.destroy();
      } else {
        word.dragbox.setTint(0x00aa00);
      }
    });
  };

  return {
    create : create
  };
})();
