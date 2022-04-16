var VictoryCriteria = (() => {
  var monitorVictory = function () {
    gameStatus.emitter.on('word completed', () => {
      for (let i=0; i<MissingWords.words.length; i++) {
        if (!MissingWords.words[i].solved) {
          return;
        }
      }

      utils.displayInevitableVictory();
      gameStatus.emitter.emit('victory');
    });
  };

  return { monitorVictory : monitorVictory };
})();
