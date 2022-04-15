var config = {
  words: {
    margin: { x: 10, y: 140 },
    yOffset: 52,
    fakeBackend: null
  }
};

var phaserConfig = {
  type: Phaser.WEBGL,
  width: 360,
  height: 600,
  transparent: true,
  plugins: {
    global: [ NineSlice.Plugin.DefaultCfg ]
  },
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
  gameStatus.capsulaID = utils.preloadCapsuleIdFromURL();
  config.words.fakeBackend = banco.ordenar[gameStatus.capsulaID];
  Container.readCategories();

  utils.preloadSharedAssets(scene);
  gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
  scene.load.spritesheet('word', 'ordenar/assets/word.png', {frameWidth: 130, frameHeight: 40});
  scene.load.spritesheet('container', 'ordenar/assets/container.png', { frameWidth: 140, frameHeight: 160 });
  scene.load.image('background', 'ordenar/assets/background.png');
}

function create () {
  gameStatus.emitter = new Phaser.Events.EventEmitter();
  utils.shuffle(config.words.fakeBackend);

  utils.createBackground();

  Word.createWords();
  Container.createContainers();

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
