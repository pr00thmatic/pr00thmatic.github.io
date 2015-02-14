var Building = function () {
    this.tilemap = game.add.tilemap('building', 16, 16, 800, 640);
    this.tilemap.addTilesetImage('informatica');

    this.background = this.tilemap.createLayer('background');

    this.floor =  this.addCollisionLayer('floor');
    this.walls =  this.addCollisionLayer('walls');
    this.stairs = this.addCollisionLayer('stairs');

};

Building.prototype.addCollisionLayer = function (name) {
    var layer = this.tilemap.createLayer(name);
    game.physics.arcade.enable(layer);
    this.tilemap.setCollisionByExclusion([], true, layer);

    return layer;
};
