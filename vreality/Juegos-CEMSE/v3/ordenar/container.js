var Container = {
  instances: [],

  config: {
    categories: [],
    innerMargin: { x: 10, y: 8 },
    wordOffsetY: 30,
    size: { x: 360 - 40, y: 130, yTotal: 132 }
  },

  endingPosY : function () {
    return this.config.categories.length * this.config.size.yTotal + this.config.innerMargin.y;
  },

  readCategories : function () {
    for (let i=0; i<config.words.fakeBackend.length; i++) {
      let entry = config.words.fakeBackend[i];
      if (this.config.categories.indexOf(entry.category) < 0) {
        this.config.categories.push(entry.category);
      }
    }
  },

  createContainers : function () {
    for (let i=0; i<this.config.categories.length; i++) {
      this.gimmieContainer(this.config.categories[i],
                           { x: phaserConfig.width/2,
                             y: i * this.config.size.yTotal + this.config.innerMargin.y }, // pos
                           { x: phaserConfig.width - 40, y: this.config.size.y }); // size
    }
  },

  gimmieContainer : function (category, pos, width) {
    var container = {};
    Container.initialize(container, pos, width, category);
    Container.createLabel(container);

    scene.input.
      on('dragenter', function (pointer, gameObject, dropZone) {
        if (dropZone != container.sprite) return;
        container.sprite.setTint('0xe0dd60');
      });

    scene.input.
      on('dragleave', function (pointer, gameObject, dropZone) {
        if (dropZone != container.sprite) return;
        container.sprite.setTint(colors.global.right);
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
        container.sprite.setTint(colors.global.right);
        var index = container.words.indexOf(gameObject.parent);
        let isOk = gameObject.parent.info.category === container.category
        if (index < 0) {
          container.words.push(gameObject.parent);
          gameObject.parent.container = container;
          Container.updateWordsPosition(container);
          gameStatus.ok = (gameStatus.ok? gameStatus.ok: 0) + (isOk? 1: 0);
          gameStatus.oknt = (gameStatus.oknt? gameStatus.oknt: 0) + (isOk? 0: 1);
          gameStatus.emitter.emit('container updated');
        }

        let tween = scene.tweens.add({
          targets: [ gameObject, gameObject.parent.label ],
          alpha: 0,
          delay: 50,
          duration: 250,
          onComplete: function () {
            let image = isOk? 'ok': 'oknt';
            let feedback = scene.add.image(gameObject.x, gameObject.y + 5, image).
                setAlpha(0).
                setTint('0xaaaaaa').
                setOrigin(0.5, 0);

            scene.tweens.add({
              targets: feedback,
              alpha: 1,
              yoyo: true,
              duration: 500,
              onComplete: function () {
                gameObject.parent.destroy();
                gameObject.parent = null;
                // l.destroy();
                // gameObject.destroy();
                feedback.destroy();
              }
            });
          }
        });

      });

    Container.instances.push(container);
    return container;

  },

  initialize : function (container, pos, size, category) {
    container.sprite = scene.add.nineslice(pos.x, pos.y, size.x, size.y, 'info-box-fill', 5).
      setOrigin(0.5, 0).
      setDepth(0).
      setTint(colors.global.right).
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
                                     container.category, {
                                       color: '#ffffff',
                                       font: 'bold 12px Montserrat',
                                       width: this.config.size.x,
                                       wordWrap: { width: this.config.size.x }
                                     });
  },

  updateWordsPosition : function (container) {
    for (var i=0; i<container.words.length; i++) {
      container.words[i].sprite.x = container.sprite.getCenter().x;
      container.words[i].sprite.y = container.sprite.getTopLeft().y +
        Container.config.innerMargin.y + Container.config.wordOffsetY; // * (i+0.5);
    }
  }
};
