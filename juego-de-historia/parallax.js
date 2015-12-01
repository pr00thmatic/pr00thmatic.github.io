/**
 * Must be created just once.
 */
var Parallax = (function () {

  var Layer = (function () {
    return {
    };
  })();

  return {
    create : function () {
      var sky = game.add.tileSprite(0,0, game.width, game.height,
                                    'sky'),
          mountains = game.add.tileSprite(0,0, game.width, game.height,
                                          'mountains'),
          floor = game.add.tileSprite(0, 195,
                                      game.width, 150,
                                      'floor'),
          frontFloor = game.add.tileSprite(0, 280,
                                           game.width, 120,
                                           'front-floor');
      sky.fixedToCamera = true;
      zOrder.putInLayer(sky, 'SKY');
      game.add.tween(sky.tilePosition)
        .to({
          x : sky.tilePosition.x + config.parallax.skyWidth
        }, 1000000, Phaser.Easing.Linear.In, true, 0, -1);

      mountains.fixedToCamera = true;
      mountains.update = function () {
        this.tilePosition.x = -game.camera.x * .1;
      };
      zOrder.putInLayer(mountains, 'MOUNTAINS');

      floor.fixedToCamera = true;
      floor.update = function () {
        this.tilePosition.x = -game.camera.x;
      };
      zOrder.putInLayer(floor, 'FLOOR');

      frontFloor.fixedToCamera = true;
      frontFloor.update = function () {
        this.tilePosition.x = -game.camera.x * 2.5;
      }
      zOrder.putInLayer(frontFloor, 'FRONT');
      
      return {
        sky : sky
      };
    }
  };
  
})();
