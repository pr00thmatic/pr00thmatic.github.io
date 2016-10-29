var PsychicLevel = (function () {
  var Instance = (function () {
    return {
      preload : function () {
        game.load.spritesheet('you', 'assets/psychic/psychic.png', 40, 58);
        game.load.spritesheet('0hit', 'assets/psychic/0hit.png', 35, 70);
        game.load.spritesheet('1hit', 'assets/psychic/1hit.png', 35, 105);
        game.load.spritesheet('2hit', 'assets/psychic/2hit.png', 35, 140);
        game.load.spritesheet('arrow', 'assets/psychic/arrow.png', 16,40);
        game.load.spritesheet('shot', 'assets/psychic/shot.png', 15,15);
        game.load.spritesheet('enemy', 'assets/psychic/phobia.png', 35,35);
        game.load.spritesheet('enemy-hit',
                              'assets/psychic/enemy-hit.png', 35,35);
        game.load.spritesheet('glow', 'assets/psychic/back-energy.png', 50,68);

        game.load.tilemap(this.levelInfo.name, this.levelInfo.directory,
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile', 'assets/psychic/tile.png');
      },
      create : function () {
        this.dad.create.call(this);
        game.stage.backgroundColor = "#1a1a1a";
        this.pc.addAnimations();
      }
    };
  })();

  return {
    create : function (levelInfo) {
      var level = Level.create(levelInfo);
      util.inheritFunctions(level, Instance);
      return level;
    }
  };
  util.inheritFunctions(level, Instance);
  return level;
})();

// PsychicLevel.nextLevel = 'good-ending';
// game.state.add('psychic-level', PsychicLevel);
// game.state.start('context-level');
