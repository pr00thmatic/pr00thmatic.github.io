var Scene = (function () {

  var Instance = (function () {
    return {
      preload : function () {
        game.load.image('main', 'assets/psychic/story/' +
                        this.mainImage + '.png');
        game.load.image('fear', 'assets/psychic/story/fear.png');
      },
      create : function () {
        var mainImage = game.add.sprite(0,0, 'main');
        game.time.events.add(this.durationTime, this.next, this);
        if (this.fear) {
          this.fear = Fear.create();
        }
      },
      next : function () {
        game.state.start(this.nextState);
      }
    };
  })();

  return {
    create : function (mainImage, time, nextState, fear) {
      var scene = {
        mainImage : mainImage,
        durationTime : time,
        nextState : nextState,
        fear : fear
      };
      util.inheritFunctions(scene, Instance);

      game.state.add(mainImage, scene);

      return scene;
    }
  };
})();
