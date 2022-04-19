var utils = {
  tilefy: function (vector, tileSize) {
    return { x: Math.floor(vector.x / tileSize) * tileSize, y: Math.floor(vector.y / tileSize) * tileSize };
  },
  frames: function (key, nums) {
    var arr = [];
    for (var i=0; i<nums.length; i++) {
      arr[i] = { key: key, frame: nums[i] };
    }

    return arr;
  },

  shuffle: function (arr) {
    for (var i=0; i<arr.length-1; i++) {
      var tmp = arr[i];
      var b = utils.randomIntBetween(i+1, arr.length);
      arr[i] = arr[b]
      arr[b] = tmp;
    }
  },

  randomIntBetween: function (a, b) {
    var max = Math.max(a, b);
    var min = Math.min(a, b);

    return Math.floor(min + Math.random() * (max - min));
  },

  distance: function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  },

  difference: function (a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  },

  randomPick : function (arr) {
    return arr[utils.randomIntBetween(0, arr.length)];
  },

  createBorderNineslice : function (pos, size, imgName, bbq) {
    nineslice = {
      fill: scene.add.nineslice(pos.x, pos.y,
                                size.x, size.y,
                                imgName + '-fill', bbq),
      stroke: scene.add.nineslice(pos.x, pos.y,
                                  size.x, size.y,
                                  imgName + '-stroke', bbq),
      setOrigin : function (x, y) {
        this.fill.setOrigin(x, y); this.stroke.setOrigin(x, y); return this;
      },
      setDepth : function (depth) {
        this.fill.setDepth(depth); this.stroke.setDepth(depth); return this;
      },
      getCenter: function () {
        return this.fill.getCenter();
      }
    };

    return nineslice;
  },

  preloadSharedAssets : function (scene) {
    scene.load.image('background-fill', 'shared-assets/generic-background-fill.png');
    scene.load.image('background-stroke', 'shared-assets/generic-background-stroke.png');
    scene.load.image('button', 'shared-assets/button.png');
    scene.load.image('progress-bar', 'shared-assets/progress-bar.png');
    scene.load.image('info-box-fill', 'shared-assets/info-box-fill.png');
    scene.load.image('info-box-stroke', 'shared-assets/info-box-stroke.png');
    scene.load.image('ok', 'shared-assets/ok.png');
    scene.load.image('oknt', 'shared-assets/oknt.png');
    scene.load.image('ok-ninos', 'shared-assets/ok-button-ninos.png');
    scene.load.image('oknt-ninos', 'shared-assets/no-button-ninos.png');
    scene.load.image('results', 'shared-assets/results.png');
    scene.load.image('right-facey', 'shared-assets/right.png');
    scene.load.image('wrong-facey', 'shared-assets/wrong.png');
    scene.load.image('muy mal', 'shared-assets/muy mal.png');
    scene.load.image('meh', 'shared-assets/meh.png');
    scene.load.image('muy bien', 'shared-assets/muy bien.png');
  },

  preloadCapsuleIdFromURL : function () {
    return new URLSearchParams(window.location.search).get('capsula');
  },

  createBackground : function () {
    // pos, size, pic, radius
    let id = utils.preloadCapsuleIdFromURL();
    let background = utils.createBorderNineslice({x:0, y:0}, {x:360, y:600}, 'background', 88).
      setOrigin(0,0).
      setDepth(-100);
    background.fill.setTint(colors[id.split('_')[0]].fill);
    background.stroke.setTint(colors[id.split('_')[0]].stroke);

    return background
  },

  createResults : function (badText, goodText, badColor, goodColor, isGood,
                            width, height, scen) {
    if (!badColor) badColor = colors.global.wrong;
    if (!goodColor) goodColor = colors.global.right;
    if (isGood === undefined) isGood = true;
    if (width === undefined) width = mainState.width;
    if (height === undefined) height = mainState.height;
    if (!scen) scen = scene;

    let background = scen.add.image(0,0, 'results').
      setOrigin(0,0).
      setDepth(1000).
      setAlpha(0);

    let label = Label.gimmieLabel({ x: width/2, y: height/2 },
                      isGood? goodText: badText, {
                        color: colors.toHex(isGood? goodColor: badColor),
                        align: 'center',
                        font: 'bold 14px Montserrat'
                      }).
      setAlpha(0).
      setDepth(1001);
    scen.tweens.add({
      targets: [ background, label ],
      alpha: 1,
      duration: 500
    });

    return { label, background };
  },

  displayInevitableVictory : function () {
    utils.createResults('¡Muy bien!', '¡Muy bien!',
                        colors.global.wrong, colors.global.right, true,
                        mainState.width, mainState.height, scene);
  },

  deg2Rad : 2 * Math.PI / 360,
  rad2Deg : 360 / (Math.PI * 2)
};
