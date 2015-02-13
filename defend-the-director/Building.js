var Building = function () {
    this.tilemap = game.add.tilemap('building', 16, 16, 800, 640);
    this.tilemap.addTilesetImage('informatica');

    this.background = this.tilemap.createLayer('background');

    this.floor = this.tilemap.createLayer('floor');
    game.physics.arcade.enable(this.floor);
    this.tilemap.setCollisionByExclusion([], true, this.floor);
};
