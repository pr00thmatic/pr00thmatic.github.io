var Container = {
  instances: [],

  config: {
    margin: { x: 35, y: 40 },
    categories: ['Ropa', 'Dulce', 'Salado', 'Mueble'],
    innerMargin: { x: 10, y: 30 },
    wordOffsetY: 40+5
  },

  gimmieContainer : function (origin, category) {
    var container = {};
    Container.initialize(container, origin, category);
    Container.createAnims(container);
    Container.createLabel(container);

    scene.input.
      on('dragenter', function (pointer, gameObject, dropZone) {
        if (dropZone != container.sprite) return;
        container.sprite.anims.play('highlightToDrop');
      });

    scene.input.
      on('dragleave', function (pointer, gameObject, dropZone) {
        if (dropZone != container.sprite) return;
        container.sprite.anims.play('idle');
        var index = container.words.indexOf(gameObject.parent);
        if (index >= 0) {
          container.words.splice(index, 1);
          gameObject.parent.container = null;
          Container.updateWordsPosition(container);
          gameStatus.emitter.emit('container updated');
        }
      });

    scene.input.
      on('drop', function (pointer, gameObject, dropZone) {
        if (dropZone != container.sprite || gameObject.parent === null) return;
        container.sprite.anims.play('idle');
        var index = container.words.indexOf(gameObject.parent);
        if (index < 0) {
          container.words.push(gameObject.parent);
          gameObject.parent.container = container;
          Container.updateWordsPosition(container);
          gameStatus.emitter.emit('container updated');
        }
      });

    Container.instances.push(container);
    return container;

  },

  createAnims : function (container) {
    container.sprite.anims.create({
      key: 'idle',
      frames: utils.frames('container', [0])
    });
    container.sprite.anims.create({
      key: 'highlightToDrop',
      frames: utils.frames('container', [1])
    });
    container.sprite.anims.play('idle');
  },

  initialize : function (container, origin, category) {
    var x = (origin.x == 1? phaserConfig.width : 0) + (origin.x == 1? -1: 1) * Container.config.margin.x;
    var y = (origin.y == 1? phaserConfig.height : 0) + (origin.y == 1? -1: 1) * Container.config.margin.y;

    container.sprite = scene.add.sprite(x, y, 'container').
      setOrigin(origin.x, origin.y).
      setDepth(0).
      setInteractive();
    container.category = category;
    container.words = [];
    container.isOk = () => {
      for (var i=0; i<container.words.length; i++) {
        if (container.words[i].info.category != container.category) return false;
      }
      return true;
    };
    container.sprite.input.dropZone = true;
  },

  createLabel : function (container) {
    container.label = scene.add.text(container.sprite.getTopLeft().x + 10,
                                     container.sprite.getTopLeft().y + 10,
                                     container.category, { color: 0x333333 });
  },

  updateWordsPosition : function (container) {
    for (var i=0; i<container.words.length; i++) {
      container.words[i].sprite.x = container.sprite.getCenter().x;
      container.words[i].sprite.y = container.sprite.getTopLeft().y +
        Container.config.innerMargin.y + Container.config.wordOffsetY * (i+0.5);
    }
  }
};
