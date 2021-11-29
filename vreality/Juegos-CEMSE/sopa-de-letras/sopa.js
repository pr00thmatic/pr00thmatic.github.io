var Sopa = ( function () {
  var rows = 13;
  var columns = 13;

  var alfabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZAEIOUBCGRBCDFEPABCDEFGILMNOPRSTUVAEIOUABCDEFGHIJKLMNÑOPQRSTUVW";
  var currentDragbox = null;

  var gimmieSopa = function () {
    var sopa = {};
    sopa.cells = [];
    var dragOrigin = null;

    for (var r=0; r<rows; r++) {
      sopa.cells[r] = [];
      for (var c=0; c<columns; c++) {
        createCell(sopa, r, c);
      }
    }

    sopa.clearBold = function () {
      for (var r=0; r<rows; r++) {
        for (var c=0; c<columns; c++) {
          sopa.cells[r][c].label.setFontStyle("");
        }
      }
    };

    sopa.getLine = function (capsule) {
      var line = [];
      var step = { r: Math.sign(capsule.origin.r - capsule.end.r), c : Math.sign(capsule.origin.c - capsule.end.c) };
      var current = { r: capsule.end.r - step.r, c: capsule.end.c - step.c};
      var guard = 0;

      do {
        current.r += step.r; current.c += step.c;
        line.push(sopa.cells[current.r][current.c]);
        sopa.cells[current.r][current.c].label.setFontStyle("bold");
        guard++;
      } while ((current.r !== capsule.origin.r || current.c !== capsule.origin.c) && guard < 1000);

      if (guard >= 1000) {
        line = "CAPSULE NOT VALID";
      }

      return line;
    };

    return sopa;
  };

  var getContent = function (line) {
    var content = "";
    for (let i=line.length-1; i>=0; i--) {
      content += line[i].label.text;
    }

    return content;
  };

  var createCell = function (sopa, r, c) {
    sopa.cells[r][c] = {
      sprite: scene.add.image((360 - columns * 20)/2 +c*20, 40+r*20, 'cell').
        setOrigin(0,0).
        setInteractive()
    };

    sopa.cells[r][c].label = Label.gimmieLabel(sopa.cells[r][c].sprite, '');
    sopa.cells[r][c].randomize = ((r, c) => { return () => {
      sopa.cells[r][c].label.text = utils.randomPick(alfabet);
    }; })(r, c);
    sopa.cells[r][c].randomize();

    sopa.cells[r][c].sprite.on('pointerdown', ((r, c) => { return () => {
      currentDragbox = DragBox.gimmieDragBox(sopa.cells[r][c].sprite.getCenter().x, sopa.cells[r][c].sprite.getCenter().y);
      currentDragbox.setValid(false);
      dragOrigin = { r: r, c: c };
    }; })(r, c));

    sopa.cells[r][c].sprite.on('pointerover', ((r, c) => { return () => {
      if (currentDragbox) {
        currentDragbox.target = { x: sopa.cells[r][c].sprite.getCenter().x, y: sopa.cells[r][c].sprite.getCenter().y };
        currentDragbox.update();
        var difR = Math.abs(dragOrigin.r - r);
        var difC = Math.abs(dragOrigin.c - c);

        sopa.clearBold();
        if ((difR === difC || difR === 0 || difC === 0) && (dragOrigin.r !== r || dragOrigin.c !== c)) {
          currentDragbox.setValid(true);
          var line = sopa.getLine({ origin: {r: dragOrigin.r, c: dragOrigin.c}, end: {r: r, c: c} });
          for (let i=0; i<line.length; i++) line[i].label.setFontStyle("bold");
        } else {
          currentDragbox.setValid(false);
        }
      }
    }; })(r, c));

    sopa.cells[r][c].sprite.on('pointerup', ((r, c) => { return () => {
      if (currentDragbox) {
        if (!currentDragbox.valid) {
          currentDragbox.destroy();
          if (dragOrigin.c == c && dragOrigin.r == r) {
            gameStatus.emitter.emit('delete request', { r : r, c : c });
          }
        } else {
          currentDragbox.target = { x: sopa.cells[r][c].sprite.getCenter().x, y: sopa.cells[r][c].sprite.getCenter().y };
          currentDragbox.update();
          var capsule = { origin: dragOrigin, end: { r: r, c: c} };
          gameStatus.emitter.emit('word enclosed', {
            capsule: capsule,
            line: sopa.getLine(capsule),
            dragbox: currentDragbox
          });
        }
        currentDragbox = null;
      }
    }; })(r, c));
  }

  return {
    gimmieSopa : gimmieSopa,
    getContent : getContent
  };
})();
