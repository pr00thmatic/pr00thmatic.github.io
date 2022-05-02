// var data = {
//   left: [ 'araña', 'hormiga', 'escarabajo', 'elefante', 'trucha', 'humano', 'gallina', 'vaca', 'iguana' ],
//   right: [ 'arácnidos e insectos', 'mamíferos', 'aves', 'reptiles', 'peces' ]
// };

var data;
var scene;
var gameStatus = {};
var mainState = ( function () {

  var preload = function () {
    scene = this;
    var assets = 'unir-palabras/assets/';
    gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
    gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
    data = banco.unir[gameStatus.capsulaID];
    console.log(data);
    utils.preloadSharedAssets(scene);
    scene.load.image('left', assets + 'left.png');
    scene.load.image('right', assets + 'right.png');
    DragBox.preload(assets);
    DragBox.config.height = 3;
    gameStatus.connections = [];

    for (let i=0; i<data.left.length; i++) {
      if (data.left[i].indexOf('.png') >= 0) {
        scene.load.image(data.left[i], data.dir + data.left[i]);
      }
    }
    for (let i=0; i<data.right.length; i++) {
      if (data.right[i].indexOf('.png') >= 0) {
        scene.load.image(data.right[i], data.dir + data.right[i]);
      }
    }
  }

  var create = function () {
    gameStatus.emitter = new Phaser.Events.EventEmitter();

    this.background = utils.createBackground();
    Words.create(data);
    this.evaluate = {
      evaluate: function () {
        let wrong1 = 0;

        for (let i=0; i<data.answers.length; i++) {
          let found = false;
          for (let j=0; j<gameStatus.connections.length; j++) {
            if (data.answers[i][0] === gameStatus.connections[j][0] &&
                data.answers[i][1] === gameStatus.connections[j][1]) {
              found = true;
              break;
            }
          }

          if (!found) wrong1++;
        }

        let wrong2 = 0;
        for (let j=0; j<gameStatus.connections.length; j++) {
          let found = false;
          for (let i=0; i<data.answers.length; i++) {
            if (data.answers[i][0] === gameStatus.connections[j][0] &&
                data.answers[i][1] === gameStatus.connections[j][1]) {
              found = true;
              break;
            }
          }

          if (!found) wrong2++;
        }

        let hasErrors = (wrong1+wrong2) > 0;

        utils.createResults('Tienes algunos errores', '¡Perfecto!',
                            colors.global.wrong, colors.global.right,
                            (wrong1 + wrong2) === 0,
                            mainState.width, mainState.height, scene);
        // console.log('Lo siento, tienes ' + Math.abs(wrong1 - wrong2) + ' errores');
      }
    };
    this.evaluate.button = scene.add.image(mainState.width / 2, mainState.height - 20, 'button').
      setOrigin(0.5, 1).
      setInteractive();
    this.evaluate.button.on('pointerdown', this.evaluate.evaluate);
    this.evaluate.label = Label.gimmieLabel(this.evaluate.button, 'EVALUAR', {
      font: 'bold 12px Montserrat',
      color: '#ffffff',
      align: 'center'
    });

    gameStatus.emitter.emit('create');
  }

  var update = function (time, deltaTime) {
    gameStatus.deltaTime = deltaTime / 1000;
    gameStatus.emitter.emit('update');
  };

  return { type: Phaser.WEBGL,
           width: 360,
           height: 600,
           transparent: true,
           plugins: {
             global: [ NineSlice.Plugin.DefaultCfg ]
           },
           scene: {
             preload : preload,
             create : create,
             update : update
           }
         };

})();

var game = new Phaser.Game(mainState);
