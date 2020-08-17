var mainLevel = (function () {
  var level = Level.create('main-level');

  var oldPreload = level.preload;
  level.preload = function () {
    oldPreload.call(this);
    game.load.image('house', 'assets/ambience/main-level/house.png');
    game.load.image('terrain', 'assets/ambience/'
                    + this.key + '/terrain.png');
    game.load.image('sky', 'assets/ambience/'
                    + this.key + '/sky.png');
    game.load.image('mountains', 'assets/ambience/'
                    + this.key + '/mountains.png');
    game.load.image('floor', 'assets/ambience/'
                    + this.key + '/floor.png');
    game.load.image('front-floor', 'assets/ambience/'
                    + this.key + '/front-floor.png');
    game.load.image('storage-room',
                    'assets/ambience/main-level/storage-room.png');
    game.load.image('beach', 'assets/ambience/main-level/beach.png');
  };

  var oldCreate = level.create;
  level.create = function () {
    oldCreate.call(this);
    this.house = Building.create(config[this.key].house.x,
                                 config[this.key].house.y, 'house',
                                 this, houseLevel, {x : 750, y : 380});
    this.storage = Building.create(config[this.key].storage.x,
                                   config[this.key].storage.y, 'storage-room',
                                   this, storageLevel, {x : 570, y : 350});
    this.beach = Building.create(0,350, 'beach', this, beachLevel,
                                 { x : 550, y : 240});
    this.beach.anchor.set(0,1);
    this.parallax = Parallax.create();
  };

  game.state.start('main-level');
  return level;
})();
