var Level = function (name, tilemapFile, game, dogSpawnPoint) {
    this.dogSpawnPoint = dogSpawnPoint;
    this.game = game;
    this.name = name;
    this.tilemapFile = tilemapFile;

};

Level.prototype.preload = function () {
    this.gravity = 400;
    // loading tilemap of the level
    this.game.load.tilemap( 'map', 'img/map/' + this.tilemapFile,
                       null, Phaser.Tilemap.TILED_JSON );
    this.game.load.image('tile', 'img/map/tile.png');
    this.game.load.image('tutorial', 'img/map/tutorial.png');

    // loading sprites...
    this.game.load.spritesheet('spiderdog', 'img/spiderdog.png', 46,43);
    this.game.load.spritesheet('arrow', 'img/arrow.png', 80, 80);
    this.game.load.spritesheet('bone', 'img/bone.png', 25, 25);

    // do not blurr the images
    this.game.stage.smoothed = false;

};

Level.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#eee';

    console.log('ding');
    this.map = new Map(this.game, this);
    this.dog = new SpiderDog(this.game, this, this.dogSpawnPoint);
    this.score = new Score(this.game, this);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.cursor.sniff = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.arrows = [];

    // setting up Arrows...
    this.hiddenBones.forEach( function (hiddenBone) {
        this.arrows.push(new Arrow(this.game, this.cursor, this.dog, hiddenBone));
    }, this);

};

Level.prototype.update = function () {
    this.dog.update();
    this.hiddenBones.forEach( function (hiddenBone) {
        hiddenBone.update();
    });

    for (var i=0; i<this.arrows.length; i++) {
        this.arrows[i].update();
    }
};
