var Sopa = ( function () {
  var testPuzzle = '[{"capsule":{"origin":{"r":6,"c":4},"end":{"r":6,"c":9}},"word":"ABUELA"},{"capsule":{"origin":{"r":8,"c":7},"end":{"r":4,"c":11}},"word":"TRANS"},{"capsule":{"origin":{"r":5,"c":7},"end":{"r":11,"c":7}},"word":"LENTEJA"},{"capsule":{"origin":{"r":6,"c":5},"end":{"r":1,"c":5}},"word":"BRILLA"},{"capsule":{"origin":{"r":6,"c":4},"end":{"r":1,"c":9}},"word":"ARRIBA"},{"capsule":{"origin":{"r":1,"c":5},"end":{"r":1,"c":9}},"word":"ARAÑA"}]';
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

    sopa.feed = function (stringified) {
      for (let i=0; i<sopa.cells.length; i++) {
        for (let j=0; j<sopa.cells[i].length; j++) {
          sopa.cells[i][j].randomize();
        }
      }

      var json = JSON.parse(stringified);
      for (let i=0; i<json.length; i++) {
        var line = sopa.getLine(json[i].capsule);
        for (let l=line.length-1; l>=0; l--) {
          line[l].label.text = json[i].word[json[i].word.length-1-l];
        }
      }

      sopa.clearBold();
      gameStatus.words = json;
      gameStatus.emitter.emit('got words');
    }

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
    createLabel(sopa.cells[r][c], r, c);

    sopa.cells[r][c].sprite.on('pointerdown', pointerdown(sopa, r, c));
    sopa.cells[r][c].sprite.on('pointerover', pointerover(sopa, r, c));
    sopa.cells[r][c].sprite.on('pointerup', pointerup(sopa, r, c));

    return sopa.cells[r][c];
  };

  var pointerdown = ((sopa, r, c) => { return () => {
    currentDragbox = DragBox.gimmieDragBox(sopa.cells[r][c].sprite.getCenter().x, sopa.cells[r][c].sprite.getCenter().y);
    currentDragbox.setValid(false);
    dragOrigin = { r: r, c: c };
  }; });

  var pointerover = ((sopa, r, c) => { return () => {
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
  }; });

  var pointerup = ((sopa, r, c) => { return () => {
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
  }; });

  var createLabel = function (cell) {
    cell.label = Label.gimmieLabel(cell.sprite, '');
    cell.randomize = () => {
      cell.label.text = utils.randomPick(alfabet);
    };
    cell.randomize();
  };

  var compareCapsules = function (a, b) {
    return ((compareCoords(a.origin, b.origin) && compareCoords(a.end, b.end)) ||
            (compareCoords(a.origin, b.end) && (a.end, b.origin)));
  };

  var compareCoords = function (a, b) {
    return a.r == b.r && a.c == b.c;
  }

  return {
    testPuzzle : testPuzzle,
    gimmieSopa : gimmieSopa,
    getContent : getContent,
    compareCapsules : compareCapsules
  };
})();
