var Level = (function () {
  var Instance = (function () {
    return {
      preload : function () {
        // artificial loader
        domGame.setLoading(true);

        game.load.tilemap('map', 'assets/ambience/' + this.key + '/map.json',
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('collision-symbols',
                        'assets/map/collision-symbols.png');
        game.load.spritesheet('girl', 'assets/sentients/girl.png', 56, 86);
        game.load.spritesheet('espacio', 'assets/tutorial/espacio.png', 44, 18);
        game.load.image('selected-question-frame',
                        'assets/selected-question-frame.png');
        game.load.image('answer', 'assets/answer.png');
        game.load.image('question', 'assets/question.png');
        game.load.image('question-background',
                        'assets/question-background.png');
      },
      create : function () {
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.physics.arcade.gravity.y = 1700;

        this.tilemap = Map.create(config[this.key].width,
                                  config[this.key].height, 'map');
        this.girl = Girl.create(progress.spawn.x,
                                progress.spawn.y, this);
        Question.spawn(this);
        Answer.spawn(this);
        Answer.initialize(this);
        this.qaMenu = QAMenu.create(this);
        domGame.setLoading(false);
      },
      update : function () {
        zOrder.sort();
        Question.update();
        this.qaMenu.update();
      }
    };
  })();
  
  return {
    create : function (key) {
      var level = {
        key : key
      };
      util.inheritFunctions(level, Instance);
      game.state.add(key, level, false);

      return level;
    }
  };
})();
