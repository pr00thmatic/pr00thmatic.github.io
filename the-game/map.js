var Map = (function () {

  return {
    create : function (mapName, tileName, width, height) {
      map = game.add.tilemap(mapName, config.map.tile.width,
                             config.map.tile.height, width, height);
      map.addTilesetImage(tileName);

      map.platforms = map.createLayer('platforms');
      map.platforms.resizeWorld();
      game.physics.arcade.enable(map.platforms);
      map.setCollision([1], true, map.platforms);

      map.exit = map.createLayer('exit');
      game.physics.arcade.enable(map.exit);
      map.setCollision([2], true, map.exit);

      return map;
    }
  };
})();
