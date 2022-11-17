var Sopa = ( function () {
  var marginY = 30;
  var tileSize = 20;

  var gimmieSopa = function (config) {
    tileSize = config.cellSize? config.cellSize: tileSize;
    var sopa = {
      rows: config.rows,
      columns: config.columns,
      currentDragbox: null,
      cells: [],
      config : config
    };
    var dragOrigin = null;

    for (var r=0; r<sopa.rows; r++) {
      sopa.cells[r] = [];
      for (var c=0; c<sopa.columns; c++) {
        createCell(sopa, r, c);
      }
    }

    sopa.editWord = function (word, customEditingCellIndex) {
      console.log(word);

      if (sopa.wordBeingEdited) {
        sopa.wordBeingEdited.stopEdition();
      }
      sopa.wordBeingEdited = word;

      if (customEditingCellIndex !== undefined) {
        word.editingCellIndex = customEditingCellIndex;
      } else {
        word.editingCellIndex = word.line.length-1;
      }
      if (!word.setTint) {
        Word.gimmieWord(null, word);
      }
      word.setTint(colors.global.accent);

      // subscribe, edit the first cell.
      word.editCells();
    };

    sopa.getLine = function (capsule) {
      var line = [];
      var step = { r: Math.sign(capsule.origin.r - capsule.end.r),
                   c : Math.sign(capsule.origin.c - capsule.end.c) };
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

    sopa.gimmieDragbox = function (capsule, word, isValid) {
      var dragbox = DragBox.gimmieDragBox(getCell(capsule.origin, this).sprite.getCenter().x,
                                          getCell(capsule.origin, this).sprite.getCenter().y,
                                          { validColor: this.config.validColor, invalidColor: this.config.invalidColor });
      dragbox.target = { x: getCell(capsule.end, this).sprite.getCenter().x,
                         y: getCell(capsule.end, this).sprite.getCenter().y };
      dragbox.setValid(isValid);
      dragbox.update();

      if (word) {
        let line = sopa.getLine(capsule);
        for (let i=0; i<line.length; i++) {
          line[i].label.text = word[line.length - 1 - i];
        }
      }

      return dragbox;
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
      sprite: scene.add.image((mainState.width - sopa.columns * tileSize)/2 +c*tileSize, marginY+r*tileSize, 'cell').
        setOrigin(0,0).
        setTint(sopa.config.cellTint? sopa.config.cellTint: '0xffffff').
        setInteractive()
    };
    createLabel(sopa.cells[r][c], r, c);

    sopa.cells[r][c].sprite.alpha = sopa.config.cellAlpha;
    if (sopa.config && sopa.config.allowCapsuleCreation) {
      sopa.cells[r][c].sprite.on('pointerdown', pointerdown(sopa, r, c));
      sopa.cells[r][c].sprite.on('pointerover', pointerover(sopa, r, c));
      sopa.cells[r][c].sprite.on('pointerup', pointerup(sopa, r, c));
    }

    return sopa.cells[r][c];
  };

  var getCell = function (coord, sopa) {
    return sopa.cells[coord.r][coord.c];
  }

  var pointerdown = ((sopa, r, c) => { return () => {
    sopa.currentDragbox = sopa.gimmieDragbox({ origin: { r, c }, end: { r, c } })
    // sopa.currentDragbox = DragBox.gimmieDragBox(sopa.cells[r][c].sprite.getCenter().x, sopa.cells[r][c].sprite.getCenter().y,
    //                                             { validColor: sopa.config.validColor, invalidColor: sopa.config.invalidColor });
    sopa.currentDragbox.setValid(false);
    dragOrigin = { r: r, c: c };
    gameStatus.emitter.emit('start new dragbox', sopa.currentDragbox);
  }; });

  var pointerover = ((sopa, r, c) => { return () => {
    if (sopa.currentDragbox) {
      sopa.currentDragbox.target = { x: sopa.cells[r][c].sprite.getCenter().x, y: sopa.cells[r][c].sprite.getCenter().y };
      sopa.currentDragbox.update();
      var difR = Math.abs(dragOrigin.r - r);
      var difC = Math.abs(dragOrigin.c - c);

      if ((sopa.config.allowDiagonals &&
           (difR === difC || difR === 0 || difC === 0) && (dragOrigin.r !== r || dragOrigin.c !== c)) ||
          (!sopa.config.allowDiagonals && ((difR === 0 && difC !== 0) || (difR !== 0 && difC == 0)))) {
        sopa.currentDragbox.setValid(true);
        var line = sopa.getLine({ origin: {r: dragOrigin.r, c: dragOrigin.c}, end: {r: r, c: c} });
        for (let i=0; i<line.length; i++) line[i].label.setFontStyle("bold");
      } else {
        sopa.currentDragbox.setValid(false);
      }
    }
  }; });

  var pointerup = ((sopa, r, c) => { return () => {
    if (sopa.currentDragbox) {
      if (!sopa.currentDragbox.valid) {
        sopa.currentDragbox.destroy();
        if (dragOrigin.c == c && dragOrigin.r == r) {
          gameStatus.emitter.emit('delete request', { r : r, c : c });
        }
      } else {
        sopa.currentDragbox.target = { x: sopa.cells[r][c].sprite.getCenter().x, y: sopa.cells[r][c].sprite.getCenter().y };
        sopa.currentDragbox.update();
        var capsule = { origin: dragOrigin, end: { r: r, c: c} };
        gameStatus.emitter.emit('word enclosed', {
          capsule: capsule,
          line: sopa.getLine(capsule),
          dragbox: sopa.currentDragbox
        });
      }
      sopa.currentDragbox = null;
    }
  }; });

  var createLabel = function (cell) {
    cell.label = Label.gimmieLabel(cell.sprite, '');
  };

  var compareCapsules = function (a, b) {
    return ((compareCoords(a.origin, b.origin) && compareCoords(a.end, b.end)) ||
            (compareCoords(a.origin, b.end) && (a.end, b.origin)));
  };

  var compareCoords = function (a, b) {
    return a.r == b.r && a.c == b.c;
  }

  return {
    gimmieSopa,
    getContent,
    compareCapsules
  };
})();
