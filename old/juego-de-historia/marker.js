var Marker = (function () {

  var Instance = (function () {
    return {
      spawn : function (level) {
        this.level = level;
        if (this.place.levelName === level.key) {
          this.marker = game.add.sprite(this.place.x, this.place.y, this.key);
          this.marker.smoothed = false;
          this.marker.anchor.set(0.5, 1);
          game.add.tween(this.marker.scale)
            .to({y : .8}, 800,
                Phaser.Easing.Exponential.Out, true, 0, -1, true);

          zOrder.putInLayer(this.marker, 'MENU');
        }
      },
      canBeLooted : function () {
        return this.level && !this.isCollected &&
          this.place.levelName == this.level.key &&
          Phaser.Math.distance(this.level.girl.x, this.level.girl.y,
                               this.marker.x, this.marker.y) < 50;
        // Phaser.Rectangle.intersects(this.level.pc, this.marker);
      },
      getLooted : function () {
        var t;
        this.isCollected = true;
        var style = { font: '15px Sans', fill: '#000', align: 'center',
                      wordWrap: true, wordWrapWidth: game.width/2};
        var background = game.add.sprite(game.width/2,
                                         50, 'question-background');
        background.anchor.set(0.5);
        background.fixedToCamera = true;

        t = game.add.text(0,0, this.text, style);
        // t.fixedToCamera = true;
        t.anchor.set(0.5)
        background.addChild(t);

        zOrder.putInLayer(background, 'MENU');
        this.marker.kill();
        game.add.tween(background.scale)
          .to({y: 0}, 500, Phaser.Easing.Exponential.In, true, 5000);
        game.add.tween(background.cameraOffset)
          .to({x: game.camera.x}, 500, Phaser.Easing.Linear.In, true, 5000);

      },
      canBeSpawned : function () {
        return true;
      }
    };
  })();

  return {
    /**
     * Creates a question.
     * @param{string} text - the question asked in text.
     * @param{Answer.create()} answer - the answer that answers this question.
     * @param{{x: int, y: int, levelName: string}} place -
     * a rectangle delimiting the place and the level where this question can
     * be looted.
     */
    create : function (text, place, key) {
      var marker = {
        isCollected : false,
        place : place,
        text : text,
        key : key
      };
      util.inheritFunctions(marker, Instance);

      return marker;
    },
    spawn : function (level) {
      for (i=0; i<this.collection.length; i++) {
        console.log(this.collection[i].canBeSpawned(), this.collection[i].text);
        if (this.collection[i].canBeSpawned()) {
          this.collection[i].spawn(level);
        }
      }
    },
    Instance : Instance
  };
})();
