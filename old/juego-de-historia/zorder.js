var zOrder = (function () {
  var order = [],
      nLayers = 8,
      i;

  for (i=0; i<nLayers; i++) {
    order.push([]);
  }
  
  return {
    order : order,
    HIDDEN : 0,
    SKY : 1,
    MOUNTAINS : 2,
    FLOOR : 3,
    BUILDING : 4,
    ACTION : 5,
    FRONT : 6,
    MENU : 7,

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
    }
  };
})();
