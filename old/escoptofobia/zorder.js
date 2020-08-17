var zOrder = (function () {
  var order = [],
      nLayers = 6,
      i;

  for (i=0; i<nLayers; i++) {
    order.push([]);
  }
  
  return {
    order : order,

    FLOOR : 0,
    PC_RAY : 1,
    PC : 2,
    ENEMY_RAY : 3,
    ENEMIES : 4,
    WEAPON : 5,
    MENU : 6,

    sort : function () {
      var i, j;

      for (i=0; i<order.length; i++) {
        for (j=0; j<order[i].length; j++) {
          order[i][j].bringToTop();
        }
      }
    },

    putInLayer : function (sprite, layerKey) {
      this.order[this[layerKey]].push(sprite);
      if (layerKey === 'ACTION') {
        if (!this.actionGroup) {
          this.actionGroup = game.add.group();
        }

        this.actionGroup.add(sprite);
      }
    }
  };
})();
