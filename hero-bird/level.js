var Level = (function () {

  var create = function () {

    var level = (function () {

      var tilemap;
      var heroBird;

      var preload = function () {
        game.load.spritesheet("bird", "assets/bird.png", 82, 72);
        game.load.tilemap("map", 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('terrain', 'assets/terrain.png');
      }
      
      var create = function () {
        game.stage.backgroundColor = "#ccf";

        tilemap = game.add.tilemap('map', 32, 32, 2528, 1248);
        tilemap.addTilesetImage('terrain');
        tilemap.platforms = tilemap.createLayer('platforms');
        tilemap.platforms.resizeWorld();
        game.physics.arcade.enable(tilemap.platforms);
        tilemap.setCollisionByExclusion([], true, tilemap.platforms);

        heroBird = Bird.create(6*32, 36*32, tilemap.platforms);
        game.camera.follow(heroBird);
      }
      
      var update = function () {
        
      };
      
      return { tilemap : tilemap,
               heroBird : heroBird,

               preload : preload,
               create : create,
               update : update };

    })();

    return level;
  };

  return { create : create };
})();
