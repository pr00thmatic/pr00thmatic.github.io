var VictoryCriteria = (() => {
  var monitorVictory = function () {
    gameStatus.emitter.on('word completed', () => {
      for (let i=0; i<MissingWords.words.length; i++) {
        if (!MissingWords.words[i].solved) {
          return;
        }
      }

      gameStatus.emitter.emit('victory');
      scene.add.text(0,0, 'COMPLETO!', { color: "#009900" }).
        setOrigin(0,0);
    });
  };

  return { monitorVictory : monitorVictory };
})();
