var Tutorial = (function () {
  var Instance = (function () {
    return {
      update : function () {
        this.espacio.update(); // fuck this...
      }
    };
  })();

  var Guide = (function () {
    var Instance = (function () {
      return {
        update : function () {
          this.x = this.owner.x + 5;
          this.y = this.owner.y + 5;

          if (Building.canUseAny()) {
            this.enable();
          } else {
            this.disable();
          }
        },
        enable : function () {
          this.alpha = 1;
        },
        disable : function () {
          this.alpha = 0;
        }
      };
    })();

    return {
      create : function (key, owner) {
        var guide = game.add.sprite(0,0, key);
        guide.anchor.set(.8, 0);
        guide.owner = owner;
        util.inheritFunctions(guide, Instance);
        zOrder.putInLayer(guide, 'MENU');
        guide.animations.add('blink', [0,1], 5, true).play();
        guide.disable();

        return guide;
      }
    };
  })();

  return {
    create : function (pc) {
      var tutorial = {
        espacio : Guide.create('espacio', pc)
      };
      util.inheritFunctions(tutorial, Instance);

      return tutorial;
    }
  };
})();
