var Victory = (() => {
  var preload = function () {
    scene.load.image('victory0', 'crucigrama/assets/a.png');
    scene.load.image('victory1', 'crucigrama/assets/b.png');
    scene.load.image('victory2', 'crucigrama/assets/c.png');
    scene.load.image('victory3', 'crucigrama/assets/d.png');
  }

  var create = function () {
    gameStatus.emitter.on('win', () => {
      setTimeout(() => {
        Victory.victoryThing = scene.add.sprite(360/2, 600/2, 'victory' + Math.floor(Math.random() * 4));
        Victory.victoryThing.depth = 1000;
      }, 800);
    });
  };

  return {
    preload,
    create
  };
})();
