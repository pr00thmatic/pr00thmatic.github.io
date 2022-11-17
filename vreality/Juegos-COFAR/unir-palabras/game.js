// var data = {
//   left: [ 'araña', 'hormiga', 'escarabajo', 'elefante', 'trucha', 'humano', 'gallina', 'vaca', 'iguana' ],
//   right: [ 'arácnidos e insectos', 'mamíferos', 'aves', 'reptiles', 'peces' ]
// };

var data = {
  left: [ 'manzana', 'silla', 'dona', 'gato', 'mesa' ],
  right: [ 'tiene cuatro patas', 'es una comida popular', 'está vivo' ]
};
var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    var assets = 'unir-palabras/assets/';
    scene.load.image('background', assets + 'background.png');
    scene.load.image('left', assets + 'left.png');
    scene.load.image('right', assets + 'right.png');
    DragBox.preload(assets);
    DragBox.config.height = 3;
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    var background = scene.add.image(0,0, 'background').
        setOrigin(0,0).
        setDepth(-100);
    // DragBox.subscribeOnClick();
    Words.create(data);

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
             update : update
           }
         };

})();

var game = new Phaser.Game(mainState);
