var X=0,
    Y=1;

var util = (function () {
  return {
    rotationHash : {
      up : 0,
      left : Math.PI * (3/2),
      down : Math.PI,
      right : Math.PI * (1/2)
    },
    directionHash : {
      up : [0, -1],
      left : [-1, 0],
      down : [0, 1],
      right : [1, 0]
    },
    expand : function (instance, interfaces) {
      for (i of interfaces) {
        i.initialize(instance);
      }
    },
    inheritFunctions : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) === 'function') {
          if (instance[x]) {
            instance.dad = instance.dad || {};
            instance.dad[x] = instance[x];
          }
          instance[x] = prop;
        }
      }

      return instance;
    },
    inheritProperties : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) !== 'function') {
          instance[x] = prop;
        }
      }

      return instance;
    },
    execute : function (functions, context) {
      if (functions) {
        for (var f of functions) {
          f.call(context);
        }
      }
    },
    safePlay : function (sprite, animation) {
      if (sprite.animations.currentAnim !== animation) {
        sprite.animations.play(animation);
      }
    }
  };
})();
