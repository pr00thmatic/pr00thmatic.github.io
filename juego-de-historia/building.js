var Building = (function () {
  var Instance = (function () {
    return {
      canBeUsed : function () {
        return this.currentLevel.girl.x > this.x - this.width/2 &&
          this.currentLevel.girl.x < this.x + this.width/2;
      },
      update : function () {
        if (this.canBeUsed()) {
          this.currentLevel.girl.tutorial.espacio.enable();
        }
      },
      attemptEntry : function () {
        if (this.canBeUsed()) {
          progress.spawn = this.spawn;
          game.state.start(this.nextLevel.key, true, false);
        }
      }
    };
  })();

  return {
    create : function (x,y, key, currentLevel, nextLevel, spawn) {
      var building = game.add.sprite(x,y, key);
      building.anchor.set(0.5, 1);
      building.currentLevel = currentLevel;
      building.nextLevel = nextLevel;
      building.spawn = spawn;

      util.inheritFunctions(building, Instance);
      zOrder.putInLayer(building, 'BUILDING');

      currentLevel.girl.controls.enter.onDown.add(building.attemptEntry,
                                                  building);

      this.collection.push(building);

      return building;
    },
    collection : [],
    canUseAny : function () {
      var i;

      for (i=0; i<this.collection.length; i++) {
        if (this.collection[i].alive &&
            this.collection[i].canBeUsed()) {
          return true;
        }
      }

      return false;
    }
  };
})();
