var houseLevel = (function () {
  var level = Level.create('house');

  var oldPreload = level.preload;
  level.preload = function () {
    oldPreload.call(this);
    game.load.image('facade', 'assets/ambience/house/facade.png');
    game.load.image('door', 'assets/ambience/house/door.png');
  };

  var oldCreate = level.create;
  level.create = function () {
    oldCreate.call(this);
    game.stage.backgroundColor = '#fff';
    this.facade = game.add.sprite(0,0, 'facade');
    zOrder.putInLayer(this.facade, 'SKY');

    this.door = Building.create(game.world.width, game.world.height - 20,
                                'door', this, mainLevel,
                                { x : config['main-level'].house.x,
                                  y : config['main-level'].house.y });
    this.door.anchor.set(1,1);
  };

  return level;
})();
