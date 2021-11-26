var Sun = {
  gimmieSun : function () {
    var sun = {
      sprite : gameStatus.scene.add.sprite(380, 230, 'sunofabitch').
        setDepth(50),

      create: function () {
        sun.sprite.anims.create({
          key: 'idle',
          frames: utils.frames('sunofabitch', [0,1]),
          frameRate: 4,
          repeat: -1
        });

        sun.sprite.anims.play('idle', true);
      }
    }

    gameStatus.emitter.on('create', sun.create);

    return sun;
  }
};
