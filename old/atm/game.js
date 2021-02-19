var asdf = 5;
var game = (() => {
  var numpadNames = [
    "zero", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine"
  ];

  var usedScreens = [
    "4", "25", "26", "27", "0", "57",
    "12", "22", "12", "7", "5", "16",
    "14", "33", "42", "30", "10", "4",
    "8", "28", "20", "28", "24", "46",
    "19", "45", "11", "29", "45", "47",
    "32", "14", "30", "23", "1", "2",
    "3", "6", "60"];

  var amountPanel;

  var screenTextures = {};

  var registerNumpadFunction = function (name, value, scene) {
    var mesh = scene.getMeshByName(name);
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        console.log("plick " + name);
        if (game.numbersPanel.isEnabled()) {
          game.numbersPanel.button.textBlock.text += game.hidePin? "X": value;
          if (!game.numbersPanel.button.input) game.numbersPanel.button.input = "";
          game.numbersPanel.button.input += value;
          document.dispatchEvent(game.onNumpadInput);
        }
        if (game.amountPanel.isEnabled()) {
          if (!game.amountPanel.value) game.amountPanel.value = "";
          game.amountPanel.value = eval(game.amountPanel.value + "" + value);
          game.amountPanel.button.textBlock.text = (game.amountPanel.value / 100).toFixed(2);
          document.dispatchEvent(game.onNumpadInput);
        }
        if (game.accountPanel.isEnabled()) {
          game.accountPanel.button.textBlock.text += value;
        }
      }
    ));
  };

  var createButton = function (scene, meshName, buttonName, color = "white") {
    var mesh = scene.getMeshByName(meshName);
    var tex =
        BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(mesh);
    var button = BABYLON.GUI.Button.CreateSimpleButton(buttonName, "");
    mesh.button = button;
    button.width = 1;
    button.height = 1;
    button.color = color;
    button.fontSize = 100;
    tex.addControl(button);
    return mesh;
  };

  var setupLighting = function (scene) {
    var light = scene.getLightByName("ambience light");
    light.intensity = 2.5;

    var sun = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(0, 1, -3), scene);
    sun.intensity = 15;
    light.excludedMeshes.push(scene.getMeshByName("pin"));
  };

  var setupScreenMaterial = function (scene) {
    screenMaterial = new BABYLON.PBRMaterial("ScreenMaterial", scene);
    screen = scene.getMeshByName("screen");
    screen.material = screenMaterial;
    screen.material.unlit = true;
  };

  var goToScreen = function (screenName) {
    screen.material.albedoTexture = screenTextures[screenName];
    // screen.material.albedoTexture = new BABYLON.Texture("screens/" + screenName + ".png");
  };

  var setupGreenThing = function (scene) {
    var greenThing = scene.getMeshByName("green thing");
    greenThing.material = new BABYLON.StandardMaterial("green thing material", scene);
    greenThing.material.diffuseColor = new BABYLON.Color3(0,0.1,0);
    greenThing.material.alpha = 0.7;
  };

  var setupTouchButtons = function (scene) {
    game.invisibleMaterial = new BABYLON.StandardMaterial("touch buttons", scene);
    game.invisibleMaterial.alpha = 0;
    for (var i=0; i<4; i++) {
      var mesh = scene.getMeshByName("touch r " + i);
      mesh.material = game.invisibleMaterial;
      var mesh = scene.getMeshByName("touch l " + i);
      mesh.material = game.invisibleMaterial;
    }
    scene.getMeshByName("receipt hitbox").material =
      scene.getMeshByName("money out hitbox").material =
      scene.getMeshByName("money in hitbox").material =
      scene.getMeshByName("spitted money").material =
      game.invisibleMaterial;
    scene.getMeshByName("spitted money").setEnabled(false);
    scene.getMeshByName("money in hitbox").setEnabled(false);
  };

  var cancelFunction = function () {
    if (!game.isCardInAnimationOver || game.capturedCard || game.blocked) return;
    flow.cancel();
  };

  var erasePanels = function () {
    game.numbersPanel.button.textBlock.text = "";
    game.numbersPanel.button.input = "";
    game.amountPanel.value = 0
    game.amountPanel.button.textBlock.text = "0.00";
  };

  var initialize = function (scene) {
    for (var i=0; i<numpadNames.length; i++) {
      registerNumpadFunction(numpadNames[i], i, scene);
    }
    flow.scene = scene;
    game.card = scene.getMeshByName("card");
    game.card.actionManager = new BABYLON.ActionManager(scene);
    game.card.stickInAction = new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        if (game.isCardInside) return;
        game.isCardInside = true;
        game.card.actionManager.actions = [];
        game.skeleton.beginAnimation("StickTheCard", false, 1, flow.initializeChip);
      }
    );
    game.card.actionManager.registerAction(game.card.stickInAction);

    game.numbersPanel = createButton(scene, "numbers screen", "but1");
    game.amountPanel = createButton(scene, "amount", "amount button");
    game.accountPanel = createButton(scene, "account", "account button");

    game.quantityPanel = createButton(scene, "quantity", "quantity button", "yellow");
    game.multipliedPanel = createButton(scene, "multiplied", "multiplied button", "yellow");
    game.totalPanel = createButton(scene, "total", "total button", "yellow");


    setupLighting(scene);
    setupScreenMaterial(scene);
    setupGreenThing(scene);
    setupTouchButtons(scene);
    goToScreen("0");
    game.numbersPanel.setEnabled(false);
    game.amountPanel.setEnabled(false);

    game.scene = scene;
    game.skeleton = game.scene.getSkeletonByName("Armature");

    game.cancelButton = utils.onClick(scene, "cancel", cancelFunction);
    game.okButton = scene.getMeshByName("ok");
    game.eraseButton = utils.onClick(scene, "erase", erasePanels);

    // responsivessnessiness
    if (window.innerHeight < window.innerWidth) {
      game.scene.cameras[0].fov=0.6911;
    } else {
      game.scene.cameras[0].fov=1.2;
    }
  };

  var screenMaterial;
  var screen;
  var numbersPanel;

  var preload = function () {
    for (var i=0; i<usedScreens.length; i++) {
      screenTextures[usedScreens[i]] = new BABYLON.Texture("screens/" + usedScreens[i] + ".png");
    }
  };

  var currentCameraTarget = cameraTargets.whole;
  var transitionElapsed = 0;
  var lastTarget;

  return {
    onSceneLoad: function (scene) {
      preload();
      initialize(scene);
      // var light = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(0, 1, -3), scene);
      // light.intensity = 10;
      // game.secondaryLight = light;

      game.scene.registerBeforeRender(() => {
        if (lastTarget != game.currentCameraTarget) {
          transitionElapsed = 0;
          lastTarget = game.currentCameraTarget;
        }

        var p = utils.lerp(game.scene.cameras[0].position, game.currentCameraTarget.position,
                           transitionElapsed / game.transitionDuration);
        var r = utils.lerp(game.scene.cameras[0].rotation, game.currentCameraTarget.rotation,
                           transitionElapsed / game.transitionDuration);

        utils.set(p, game.scene.cameras[0].position);
        utils.set(r, game.scene.cameras[0].rotation);

        transitionElapsed += game.scene._engine._deltaTime / 1000;
      });

      // game.scene.getLightByName("ambience light").intensity = 2.5;
      // game.secondaryLight.intensity = 20;
    },
    transitionDuration: 6,
    currentCameraTarget: currentCameraTarget,
    cameraTargets: cameraTargets,
    onNumpadInput: new Event('onNumpadInput'),
    screenMaterial: screenMaterial,
    screen: screen,
    goToScreen: goToScreen,
    cancelFunction : cancelFunction,
    wrongCode: 0,
    isCardInside: false,
    capturedCard: false,
    isCardInAnimationOver: false,
    blocked: false,
    erasePanels: erasePanels,
    spitsMoney: true,
    atmCode: '0000', // I replaced this with '0000' everywhere so the pin doesn't change as the client requested
    changeAtmCode: '',
    screenTextures: screenTextures
  };
})();
