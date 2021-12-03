var DragBox = ( function () {
  var information = {
    currentBox: { },
    dragging: false,
  };

  var preload = function (folder) {
    scene.load.image('left cap', folder + 'left cap.png');
    scene.load.image('right cap', folder + 'right cap.png');
    scene.load.image('midle tile', folder + 'midle tile.png');
  }

  var subscribeOnClick = function () {
    gameStatus.emitter.on('create', () => {
      scene.input.on('pointerdown', function (pointer) {
        DragBox.information.dragging = true;
        DragBox.information.currentBox = gimmieDragBox(pointer.x, pointer.y);
      });

      scene.input.on('pointermove', function (pointer) {
        if (DragBox.information.dragging) {
          DragBox.information.currentBox.updateToCursor();
        }
      });

      scene.input.on('pointerup', function (pointer) {
        if (DragBox.information.dragging) {
          DragBox.information.dragging = false;
        }
      });
    });
  };

  var gimmieDragBox = function (x, y, config) {
    var box = {
      config : config,
      origin: { x: x, y: y },
      sprite: scene.add.tileSprite(x, y, 10, 20, 'midle tile').setOrigin(0, 0.5),
      caps : [],
      target: { x: x + 10, y: y },
      update: function () {
        box.sprite.width = utils.distance(box.origin, box.target);
        var diff = utils.difference(box.target, box.origin);
        box.sprite.rotation = Math.atan2(diff.y, diff.x); // atan2(y, x) WTF!

        // updates caps
        box.caps[0].rotation = box.caps[1].rotation = box.sprite.rotation;
        box.caps[1].x = box.target.x;
        box.caps[1].y = box.target.y;
      },
      updateToCursor: function () {
        box.target = { x: game.input.activePointer.x, y: game.input.activePointer.y };
        box.update();
      },
      setTint: function (color) {
        box.caps[0].setTint(color); box.caps[1].setTint(color); box.sprite.setTint(color);
      },
      setValid: function (bool) {
        var validColor = config? config.validColor: 0xffff11;
        var invalidColor = config? config.invalidColor: 0xff0000;
        box.setTint(bool? validColor: invalidColor);
        box.valid = bool;
      },
      destroy: function () {
        box.caps[0].destroy(); box.caps[1].destroy(); box.sprite.destroy();
      }
    };

    // creates caps
    box.caps[0] = scene.add.image(x, y, 'left cap').setOrigin(1, 0.5);
    box.caps[1] = scene.add.image(x + 10, y, 'right cap').setOrigin(0, 0.5);

    return box;
  };

  return {
    // properties
    information : information,
    // methods
    subscribeOnClick : subscribeOnClick,
    gimmieDragBox : gimmieDragBox,
    preload : preload
  };
})();
