var Sopa = ( function () {
  var rows = 13;
  var columns = 13;

  var alfabet = "ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  var currentDragbox = null;

  var gimmieSopa = function () {
    var sopa = {};
    sopa.cells = [];
    for (var r=0; r<rows; r++) {
      sopa.cells[r] = [];
      for (var c=0; c<columns; c++) {
        sopa.cells[r][c] = scene.add.image((360 - columns * 20)/2 +c*20, 40+r*20, 'cell').
          setOrigin(0,0).
          setInteractive();
        Label.gimmieLabel(sopa.cells[r][c], utils.randomPick(alfabet));
        sopa.cells[r][c].on('pointerdown', function (pointer) {
          currentDragbox = DragBox.gimmieDragBox(this.getCenter().x, this.getCenter().y);
          gameStatus.emitter.on('update', currentDragbox.updateToCursor);
        });
      }
    }

    return sopa;
  };

  return {
    gimmieSopa : gimmieSopa
  };
})();
