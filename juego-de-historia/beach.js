var beachLevel = (function () {
  var level = Level.create('beach');

  var oldPreload = level.preload;
  level.preload = function () {
    oldPreload.call(this);
    game.load.image('facade', 'assets/ambience/beach/facade.png');
    game.load.image('floor', 'assets/ambience/beach/main-level.png');
  };

  var oldCreate = level.create;
  level.create = function () {
    oldCreate.call(this);
    // game.stage.backgroundColor = '#fff';
    this.facade = game.add.sprite(0,0, 'facade');
    zOrder.putInLayer(this.facade, 'SKY');

    this.mainLevel = Building.create(600, 250,
                                     'floor', this, mainLevel,
                                     { x : 50,
                                       y : config['main-level'].storage.y });
    this.mainLevel.anchor.set(1,1);
  };

  return level;
})();
