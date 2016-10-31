var game = new Phaser.Game(770, 630, Phaser.AUTO, 'game');
domGame.init(game.width, game.height);

var Level = (function () {

  var Instance = (function () {
    // var debug = true;
    var debug = false;

    return {
      preload : function () {
        // artificial loader
        domGame.setLoading(true);
        game.load.spritesheet('you', 'assets/you.png', 35, 35);
        game.load.spritesheet('0hit', 'assets/0hit.png', 35, 70);
        game.load.spritesheet('1hit', 'assets/1hit.png', 35, 105);
        game.load.spritesheet('2hit', 'assets/2hit.png', 35, 140);
        game.load.spritesheet('arrow', 'assets/arrow.png', 13,36);
        game.load.spritesheet('shot', 'assets/shot.png', 15,15);
        game.load.spritesheet('enemy', 'assets/enemy.png', 35,35);
        game.load.spritesheet('enemy-hit', 'assets/enemy-hit.png', 35,35);
        game.load.spritesheet('glow', 'assets/back-energy.png', 45, 45);
        game.load.spritesheet('bonus', 'assets/bonus.png', 20, 20);

        game.load.tilemap(this.levelInfo.name, this.levelInfo.directory,
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile', 'assets/tile.png');
      },
      create : function () {
        var i,
            enemyData,
            bonusData;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = config.world.gravity;
        game.stage.backgroundColor = '#111'

        this.tilemap = Map.create(this.levelInfo.name, 'tile',
                                  this.levelInfo.width, this.levelInfo.height);
        this.pc = You.create(this.levelInfo.pc.x, this.levelInfo.pc.y, this);
        this.enemies = [];
        for (i=0; i<this.levelInfo.enemies.length; i++) {
          enemyData = this.levelInfo.enemies[i];
          enemyData.velocity = enemyData.velocity || {x : 0, y : 0};
          console.log(enemyData.velocity);
          this.enemies[i] =
            Enemy.create(enemyData.x * config.map.tile.width +
                         config.map.tile.width/2,
                         enemyData.y * config.map.tile.height +
                         config.map.tile.height/2,
                         enemyData.weapons, this.pc, this,
                         enemyData.velocity);
        }

        if (this.levelInfo.bonuses) {
          this.bonuses = [];
          for (i=0; i<this.levelInfo.bonuses.length; i++) {
            bonusData = this.levelInfo.bonuses[i];
            this.bonuses[i] = Bonus.create(bonusData.x, bonusData.y,
                                           this.pc, true);
          }
        }

        // artificial loader
        domGame.setLoading(false);
      },
      update : function () {
        zOrder.sort();
      },
      render : function () {
        if (debug) {
          game.debug.body(this.pc);
          for (var i=0; i<this.enemies.length; i++) {
            game.debug.body(this.enemies[i]);
          }
        }
      },
      end : function () {
        if (this.pc.alive) {
          game.state.start(this.nextLevel);
        }
      },
      restart : function () {
        console.log('restart!!');
        game.state.start(this.key, true, false);
      }
    };
  })();

  return {
    create : function (levelInfo) {
      var level = {
        enemies : []
      };
      level.levelInfo = levelInfo;
      util.inheritFunctions(level, Instance);
      /**
       * The floor of the world. Every character collides with this.
       * @abstract
       * @prop {Phaser.TilemapLayer}
       */
      level.floor = null;
      return level;
    }
  };
})();
