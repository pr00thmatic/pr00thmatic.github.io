var Map = (function () {
  return {
    create : function (width, height, key) {
      var tilemap = game.add.tilemap(key, 10, 10, width, height);
      tilemap.addTilesetImage('collision-symbols');
      tilemap.platforms = tilemap.createLayer('layer');
      tilemap.platforms.resizeWorld();
      game.physics.arcade.enable(tilemap.platforms);
      tilemap.setCollisionByExclusion([], true, tilemap.platforms);
      tilemap.platforms.alpha = 0;

      return tilemap;
    }
  };
})();
