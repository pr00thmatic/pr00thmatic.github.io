var Map = function (game, level) {
    // Bit wizardry: down = 1, right = 2, up = 4, left = 8.
    // and there is a coherent floor for every combination of those directions.
    this.FLOOR_COHERENT_HASH = [14, 10, 13, 1, 12, 16, 7, 4,
                                11, 3, 15, 2, 9, 6, 8, 5];
    this.direction = [[-1,0, 8], [1,0, 2], [0,1, 1], [0,-1, 4]];
    this.game = game;
    this.level = level;

    this.tileMap = this.game.add.tilemap('map');
    this.tileMap.addTilesetImage('tile');
    this.tileMap.addTilesetImage('tutorial');

    // setting up the layer of the hidden bones
    this.hidden = this.tileMap.createLayer('hidden');

    // setting up the layer of the platforms
    this.layer = this.tileMap.createLayer('layer');
    this.layer.resizeWorld();
    this.game.physics.arcade.enable(this.layer);
    this.tileMap.setCollisionByExclusion([17], true, this.layer);

    // setting up visible bones
    this.level.bones = this.game.add.group();
    this.tileMap.createFromTiles(17, -1, 'bone',
                                 this.layer, this.level.bones);
    this.game.physics.arcade.enable(this.level.bones);
    this.level.bones.forEach( function (bone) {
        bone.animations.add('exist', [0,1], 5, true);
        bone.animations.play('exist');
    });

    // setting up hidden bones
    this.level.hiddenBones = this.game.add.group();
    this.tileMap.createFromTiles(18, -1, 'bone',
                                 this.hidden, this.level.hiddenBones);
    this.game.physics.arcade.enable(this.level.hiddenBones);
    this.level.hiddenBones.forEach( function (hiddenBone) {
        hiddenBone.animations.add('exist', [0,1], 5, true);
        hiddenBone.play('exist');
        hiddenBone.tint = 0x9999ff;
        hiddenBone.update = function () {
            var tileX = Math.round(this.x/level.map.tileMap.tileWidth);
            var tileY = Math.round(this.y/level.map.tileMap.tileHeight);
            if (level.map.tileMap.getTile(tileX, tileY, level.map.layer)) {
                this.alpha = .01;
            } else {
                this.alpha = 1;
            }
        };
    });
};

Map.prototype.setTile = function (x, y, destiny) {
    this.tileMap.replace( this.tileMap.getTile(x,y).index, destiny, x,y, 1, 1 );
};

Map.prototype.isFloor = function (index) {
    return 0 < index && index < 17 || 18 <= index;
};

Map.prototype.makeCoherent = function (x, y) {

    var c = 0;
    if (this.tileMap.getTile(x,y)) {
        for (var i=0; i<this.direction.length; i++) {
            var neighbour = this.tileMap.getTile( this.direction[i][0] + x,
                                                  this.direction[i][1] + y);
            if (neighbour) {
                if (this.isFloor(neighbour.index)) {
                    c += this.direction[i][2];
                }
            }
        }

        this.setTile(x,y, this.FLOOR_COHERENT_HASH[c]);
    }
};
