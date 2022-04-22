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
  config.words.fakeBackend = [];
  for (let i=0; i<banco.ordenar[gameStatus.capsulaID].length; i++) {
    let entry = banco.ordenar[gameStatus.capsulaID][i];
    if (entry.label && entry.category) {
      config.words.fakeBackend.push(entry);
    } else {
      config.anythingGoes = entry.anythingGoes;
    }
  }
  Container.readCategories();

  utils.preloadSharedAssets(scene);
  gameStatus.colors = colors[gameStatus.capsulaID.split('_')[0]];
  scene.load.spritesheet('word', 'ordenar/assets/word.png', {frameWidth: 130, frameHeight: 40});
  scene.load.spritesheet('container', 'ordenar/assets/container.png', { frameWidth: 140, frameHeight: 160 });
  scene.load.image('background', 'ordenar/assets/background.png');
  let data = config.words.fakeBackend;
  for (let i=0; i<data.length; i++) {
    if (!data[i].label) continue;
    if (data[i].label.indexOf('.png') >= 0) {
      scene.load.image(data[i].label, 'img/ordenar/' + gameStatus.capsulaID + '/' + data[i].label);
    }
  }
}

function create () {
  gameStatus.emitter = new Phaser.Events.EventEmitter();
  utils.shuffle(config.words.fakeBackend);

  utils.createBackground();

  Word.createWords();
  Container.createContainers();

  gameStatus.emitter.on('container updated', () => {
    if ((gameStatus.ok + gameStatus.oknt) >= Word.totalWords) {
      let text = 'Tu resultado es:\n' + Math.round((gameStatus.ok / Word.totalWords) * 100) + ' de 100';
      if (config.anythingGoes) text = '¡Muy bien!';
      utils.createResults(text, text, colors.global.wrong, colors.global.right,
                          gameStatus.ok > gameStatus.oknt || config.anythingGoes,
                          phaserConfig.width, phaserConfig.height, scene);
    }
  });
}

function update () {
  gameStatus.emitter.emit('update');
}
