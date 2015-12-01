var util = (function () {
  return {
    inheritFunctions : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) === 'function') {
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
    calculateJumpSpeed : function (height, gravity) {
      return Math.sqrt(2 * height * gravity);
    }
  };
})();
