var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    scene.load.image('background', 'sopa-de-letras/assets/background.png');
    scene.load.image('cell', 'sopa-de-letras/assets/cell.png');
    scene.load.image('word holder', 'sopa-de-letras/assets/word holder.png');
    DragBox.preload('sopa-de-letras/assets/');
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    gameStatus.background = scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

    gameStatus.sopa = Sopa.gimmieSopa();
    Found.create();
    VictoryCriteria.create();
    // SopaEditor.edit();
    let json = '[{"capsule":{"origin":{"r":0,"c":0},"end":{"r":12,"c":12}},"word":"PARTICIPACION"},{"capsule":{"origin":{"r":5,"c":0},"end":{"r":5,"c":9}},"word":"PROTECCION"},{"capsule":{"origin":{"r":4,"c":11},"end":{"r":12,"c":11}},"word":"EDUCACION"},{"capsule":{"origin":{"r":8,"c":1},"end":{"r":8,"c":9}},"word":"IDENTIDAD"},{"capsule":{"origin":{"r":12,"c":2},"end":{"r":8,"c":2}},"word":"SALUD"},{"capsule":{"origin":{"r":1,"c":4},"end":{"r":1,"c":11}},"word":"LIBERTAD"}]';
    gameStatus.sopa.feed(json);


    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           scene: {
             preload : preload,
             create : create,
             update  :  update
           }
         };

})();

var game = new Phaser.Game(mainState);
// width = 360. accessible from game.world.width
// height = 600 acccessible from game.world.height
