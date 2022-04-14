var config = {
  words: {
    margin: { x: 40, y: 210 },
    yOffset: 45,
    amount: 8,
    fakeBackend: [
      { category: 'Ropa', label: 'Gorra' },
      { category: 'Dulce', label: 'Chocolate' },
      { category: 'Salado', label: 'Pizza' },
      { category: 'Mueble', label: 'Cama' },
      { category: 'Ropa', label: 'Zapatos' },
      { category: 'Dulce', label: 'Galletas' },
      { category: 'Salado', label: 'Lasaña' },
      { category: 'Mueble', label: 'Mesa' }
    ]
  }
};

var phaserConfig = {
  type: Phaser.WEBGL,
  width: 360,
  height: 600,
  // parent: 'phaser-
  scene: {
    preload: preload,
    create: create,
    update : update
  }
};

var gameStatus = {
  statusLabel: null,
  emitter: null
};

var game = new Phaser.Game(phaserConfig);
var scene;

function preload () {
  scene = this;
  scene.load.spritesheet('word', 'ordenar/assets/word.png', {frameWidth: 130, frameHeight: 40});
  scene.load.spritesheet('container', 'ordenar/assets/container.png', { frameWidth: 140, frameHeight: 160 });
  scene.load.image('background', 'ordenar/assets/background.png');
}

function create () {
  gameStatus.emitter = new Phaser.Events.EventEmitter();
  utils.shuffle(config.words.fakeBackend);

  var background = scene.add.sprite(0,0, 'background').
      setOrigin(0,0).
      setDepth(-100);

  for (var i=0; i<config.words.amount; i++) {
    var left = (i%2) == 0;
    var j = Math.floor(i/2);
    var word = Word.gimmieWord({
      x: (left? config.words.margin.x: phaserConfig.width - config.words.margin.x),
      y: config.words.margin.y + (j * config.words.yOffset)
    }, { x: (left? 0: 1) , y: 0 }, config.words.fakeBackend[i]);
  }

  Container.gimmieContainer({ x: 0, y: 0 }, 'Ropa');
  Container.gimmieContainer({ x: 1, y: 0 }, 'Dulce');
  Container.gimmieContainer({ x: 0, y: 1 }, 'Salado');
  Container.gimmieContainer({ x: 1, y: 1 }, 'Mueble');

  gameStatus.statusLabel = scene.add.text(0,0, 'INCOMPLETO', { color: 0x222222 });
  gameStatus.emitter.on('container updated', () => {
    for (var i=0; i<Container.instances.length; i++) {
      if (!Container.instances[i].isOk()) {
        console.log("this container isn't ok :C", Container.instances[i]);
        gameStatus.statusLabel.text = 'INCOMPLETO';
        return;
      }
    }

    for (var i=0; i<Word.instances.length; i++) {
      if (Word.instances[i].container == null) {
        gameStatus.statusLabel.text = 'INCOMPLETO';
        return;
      }
    }

    gameStatus.statusLabel.text = 'COMPLETO!';
  });
}

function update () {
  gameStatus.emitter.emit('update');
}
