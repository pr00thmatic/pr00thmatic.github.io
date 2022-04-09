var Found = (() => {
  var y = 323;
  var x = 50;
  var yOffset = 35;
  var holders = [];

  var create = function () {
    for (var i=0; i<14; i++) {
      var holder = scene.add.image((i%2 === 1? mainState.width: 0) + (i%2 === 1? -1: 1) * x,
                                   y + Math.floor(i/2)*yOffset, 'word holder').
          setOrigin(i%2 === 1? 1 : 0, 0);
      var label = Label.gimmieLabel(holder, '', {
        color: '#43960e',
        font: 'bold 12px Montserrat'
      });
      holder.alpha = 0;
      holders.push({ sprite: holder, label: label });
    }

    gameStatus.emitter.on('got words', () => {
      for (let i=0; i<gameStatus.words.length; i++) {
        Found.holders[i].sprite.alpha = 1
        Found.holders[i].toDisclose = gameStatus.words[i].word;
        Found.holders[i].disclose = function () {
          this.label.text = this.toDisclose;
        }
      }
    });
  };

  return {
    create : create,
    holders : holders
  };
})();
